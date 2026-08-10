-- Chores app — core schema (Supabase / Postgres)
-- Architectural source of truth. Extend, don't reinvent.
-- Key ideas: template/occurrence split, rolling window + missed policies,
-- single signed ledger, approval loop. See PLAN.md.

create type assignment_mode as enum ('each', 'any', 'together', 'rotation');
create type missed_policy   as enum ('expire', 'carry_once', 'carry_reduced');
create type occurrence_status as enum
  ('open', 'claimed', 'pending_approval', 'approved', 'bounced', 'expired');
create type ledger_type as enum
  ('chore_payout', 'iou_credit', 'reward_redemption', 'cash_payout', 'adjustment', 'starting_balance');
create type recurrence_freq as enum ('once', 'daily', 'weekly', 'every_n_weeks');

create table families (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  timezone   text not null default 'America/Denver',  -- drives the nightly generator
  owner_id   uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

-- Kid profiles live under the family account; kids do NOT get auth.users rows.
create table kids (
  id         uuid primary key default gen_random_uuid(),
  family_id  uuid not null references families(id) on delete cascade,
  name       text not null,
  avatar     text not null default 'star',
  pin_hash   text,                       -- optional; null = no PIN
  sort_order int  not null default 0,
  active     boolean not null default true
);

create table chore_templates (
  id            uuid primary key default gen_random_uuid(),
  family_id     uuid not null references families(id) on delete cascade,
  title         text not null,
  description   text,
  mode          assignment_mode not null,
  -- reward: exactly one of stars/cents should be non-zero (enforce in RPC)
  stars         int  not null default 0,
  cents         int  not null default 0,
  freq          recurrence_freq not null,
  interval_weeks int not null default 1,          -- for every_n_weeks
  byweekday     int[] not null default '{}',      -- 0=Mon..6=Sun, for weekly
  due_time      time,                             -- optional local due time
  missed        missed_policy not null default 'expire',
  reduced_pct   int not null default 50,          -- for carry_reduced
  auto_approve  boolean not null default false,
  claim_hours   int not null default 2,           -- soft-claim TTL for mode 'any'
  -- assignment: for each/any/together = eligible kids; for rotation = ordered list
  assigned_kids uuid[] not null,
  rotation_anchor_date date,   -- REQUIRED for rotation; rotation index is computed
                               -- from periods elapsed since anchor, never from "last run"
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

create table occurrences (
  id            uuid primary key default gen_random_uuid(),
  template_id   uuid not null references chore_templates(id) on delete cascade,
  family_id     uuid not null references families(id) on delete cascade,
  -- kid_id: set for 'each' and 'rotation'; NULL for shared 'any'/'together'
  kid_id        uuid references kids(id),
  period_start  date not null,            -- identity of the period this instance covers
  due_at        timestamptz not null,
  status        occurrence_status not null default 'open',
  -- value snapshot (so editing a template never rewrites history; carry_reduced edits these)
  stars         int not null default 0,
  cents         int not null default 0,
  carried_from  uuid references occurrences(id),  -- set by carry_* policies
  claimed_by    uuid references kids(id),
  claim_expires timestamptz,
  helpers       uuid[] not null default '{}',     -- 'together': kids who marked "I helped"
  completed_by  uuid references kids(id),
  completed_at  timestamptz,
  bounce_note   text,
  resolved_at   timestamptz                       -- approved/expired/closed time
);

-- Idempotency: the generator can re-run safely.
create unique index occurrences_identity
  on occurrences (template_id, period_start, coalesce(kid_id, '00000000-0000-0000-0000-000000000000'));

-- One signed ledger; balances are always SUM(). Never written by clients directly.
create table ledger (
  id            uuid primary key default gen_random_uuid(),
  family_id     uuid not null references families(id) on delete cascade,
  kid_id        uuid not null references kids(id) on delete cascade,
  type          ledger_type not null,
  stars         int not null default 0,   -- signed
  cents         int not null default 0,   -- signed
  occurrence_id uuid references occurrences(id),
  reward_id     uuid,                     -- fk added below
  note          text,
  created_by    uuid references auth.users(id),
  created_at    timestamptz not null default now()
);

create table rewards (
  id                  uuid primary key default gen_random_uuid(),
  family_id           uuid not null references families(id) on delete cascade,
  -- null kid_id = available to all kids in the family
  kid_id              uuid references kids(id) on delete cascade,
  title               text not null,
  star_price          int not null check (star_price > 0),
  active              boolean not null default true
);

create table redemptions (
  id                  uuid primary key default gen_random_uuid(),
  reward_id           uuid not null references rewards(id),
  kid_id              uuid not null references kids(id),
  ledger_id           uuid not null references ledger(id),
  fulfillment_pending boolean not null default true,
  fulfilled_at        timestamptz,
  created_at          timestamptz not null default now()
);

alter table ledger add constraint ledger_reward_fk
  foreign key (reward_id) references rewards(id);

create or replace view kid_balances as
  select kid_id, family_id,
         sum(stars) as star_balance,
         sum(cents) as cent_balance
  from ledger group by kid_id, family_id;

-- RLS sketch (implement fully in T1):
--   parents: family_id in (their families) for all tables.
--   kid sessions (custom JWT claim kid_id): SELECT own occurrences/ledger/rewards
--     + family 'any' occurrences. NO insert/update/delete anywhere.
--   All writes via SECURITY DEFINER RPCs listed in AGENT-TASKS.md T1.

-- Generator contract (T2, Edge Function invoked by pg_cron nightly per family tz):
--   1. close_expired(): for open/claimed occurrences past due_at, apply template.missed:
--        expire -> status 'expired';
--        carry_once -> new occurrence next period (carried_from set), original 'expired';
--          a carried occurrence is never carried again (check carried_from is null);
--        carry_reduced -> like carry_once but stars/cents *= reduced_pct/100.
--   2. generate_window(): create occurrences for today .. lookahead (7 days) for active
--      templates, honoring the unique identity index (ON CONFLICT DO NOTHING).
--      rotation assignee = assigned_kids[(periods_since(rotation_anchor_date)) % len].
