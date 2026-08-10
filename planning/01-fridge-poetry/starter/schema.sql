-- Fridge Poetry — core schema (Supabase / Postgres)
-- Reuses the Flare ops engine (ops table, submit_op RPC, presence). This file adds
-- the fridge-domain tables. See 04-flare/starter/schema.sql for the engine.

create table fridges (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  join_code      text not null unique default upper(substr(md5(random()::text), 1, 6)),
  owner_id       uuid not null references auth.users(id),
  lock_days      int not null default 3,
  reset_hour     int not null default 4,        -- local hour for the daily job
  timezone       text not null default 'America/Denver',
  require_second boolean not null default false, -- phrase confirm needs a second member
  approve_customs boolean not null default false,
  decay_after_days int not null default 7,
  created_at     timestamptz not null default now()
);

create table fridge_members (
  fridge_id uuid not null references fridges(id) on delete cascade,
  user_id   uuid not null references auth.users(id) on delete cascade,
  display   text not null,
  is_owner  boolean not null default false,
  joined_at timestamptz not null default now(),
  primary key (fridge_id, user_id)
);

-- Vocabulary (global). Packs are manifests over word_defs.
create table word_defs (
  id       uuid primary key default gen_random_uuid(),
  text     text not null,
  pos      text not null check (pos in ('noun','verb','modifier','glue')),
  pack     text not null default 'base',       -- 'base' | 'starter' | theme slugs
  custom_fridge_id uuid references fridges(id) -- non-null = custom word for one fridge
);

-- A magnet is an INSTANCE of a word on one fridge door.
create table magnets (
  id          uuid primary key default gen_random_uuid(),
  fridge_id   uuid not null references fridges(id) on delete cascade,
  word_id     uuid not null references word_defs(id),
  x           real not null,                    -- door coordinates
  y           real not null,
  rotation    real not null default 0,          -- small random tilt, cosmetic
  phrase_id   uuid,                             -- fk added below; null = loose word
  -- snap graph: which magnet this one is attached after (linked chain per row/line)
  snapped_to  uuid references magnets(id),
  snap_side   text check (snap_side in ('left','right')),
  stashed_by  uuid references auth.users(id),   -- non-null = in that member's tray
  last_touched_at timestamptz not null default now(),  -- drives decay exemption
  placed_by   uuid references auth.users(id),
  created_at  timestamptz not null default now()
);

create table phrases (
  id           uuid primary key default gen_random_uuid(),
  fridge_id    uuid not null references fridges(id) on delete cascade,
  author_id    uuid not null references auth.users(id),
  helper_ids   uuid[] not null default '{}',
  status       text not null default 'building'
               check (status in ('building','pending_second','locked','archived')),
  text_cached  text,                            -- denormalized on confirm
  lock_until   timestamptz,
  seconded_by  uuid references auth.users(id),
  created_at   timestamptz not null default now()
);
alter table magnets add constraint magnets_phrase_fk
  foreign key (phrase_id) references phrases(id) on delete set null;

-- Immutable snapshots: on confirm AND on lock expiry (auto-archive).
create table phrase_history (
  id          uuid primary key default gen_random_uuid(),
  fridge_id   uuid not null references fridges(id) on delete cascade,
  phrase_id   uuid not null references phrases(id),
  kind        text not null check (kind in ('confirmed','archived')),
  text        text not null,
  layout      jsonb not null,     -- [{word, x, y, rotation}] for image rendering
  author_id   uuid not null references auth.users(id),
  helper_ids  uuid[] not null default '{}',
  created_at  timestamptz not null default now()
);

create table reactions (
  id         uuid primary key default gen_random_uuid(),
  fridge_id  uuid not null references fridges(id) on delete cascade,
  phrase_id  uuid not null references phrases(id) on delete cascade,
  user_id    uuid not null references auth.users(id),
  emoji      text not null,
  x          real not null,       -- reaction magnets live on the door too
  y          real not null,
  unique (phrase_id, user_id, emoji)
);

-- Daily whole-door snapshot → future timelapse. One row per fridge per local date.
create table fridge_snapshots (
  fridge_id  uuid not null references fridges(id) on delete cascade,
  local_date date not null,
  layout     jsonb not null,
  primary key (fridge_id, local_date)
);

-- Daily job (pg_cron → Edge Function, per fridge at reset_hour local; idempotent
-- via fridge_snapshots primary key):
--   1. snapshot door layout.
--   2. archive phrases past lock_until (phrase_history kind='archived',
--      status='archived', phrase_id cleared from magnets → words released).
--   3. decay: delete loose magnets where last_touched_at < now() - decay_after_days
--      AND phrase_id IS NULL AND stashed_by IS NULL  (locked/tray/recent are exempt
--      by construction — phrase members have phrase_id set).
--   4. drop: insert new magnet chunk (weighted by pos ratios) at random free positions.

-- Ledger for the v1.5 economy: reuse the chores-app ledger pattern (03) scoped to
-- (fridge_id, user_id). Do not build in v1.
