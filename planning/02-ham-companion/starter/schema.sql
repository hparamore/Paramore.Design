-- Ham Companion — core schema (Supabase / Postgres)
-- No realtime. Everything user-owned mirrors to IndexedDB for offline; background
-- sync reconciles by updated_at (last-write-wins is fine here — single-user data).

create table stations (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  callsign    text,                  -- null until licensed
  license     text check (license in ('none','technician','general','extra'))
              not null default 'none',
  name        text,
  grid_square text,                  -- Maidenhead, computed client-side from GPS
  gear        jsonb not null default '[]',   -- [{label, model, bands, notes}]
  updated_at  timestamptz not null default now()
);

create table contacts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  callsign    text not null,
  name        text,
  location    text,
  license     text,
  notes       text,
  -- v2: linked_user_id + subscription to their self-maintained recipe
  updated_at  timestamptz not null default now()
);

-- Ranked ways to reach a contact. rank 1 = primary.
create table reach_methods (
  id          uuid primary key default gen_random_uuid(),
  contact_id  uuid not null references contacts(id) on delete cascade,
  rank        int not null,
  kind        text not null check (kind in ('repeater','simplex','winlink','other')),
  -- repeater/simplex details (manual entry or copied from repeater cache):
  freq_mhz    numeric(10,4),
  offset_mhz  numeric(6,2),          -- e.g. -0.6
  tone_hz     numeric(6,1),          -- CTCSS
  label       text,                  -- "W7ABC machine on Lake Mtn"
  sked        text,                  -- "monitors weeknights 7-8pm"
  notes       text,
  updated_at  timestamptz not null default now()
);

create table qso_log (               -- v2, but schema reserved now
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  contact_callsign text not null,
  at          timestamptz not null default now(),
  freq_mhz    numeric(10,4),
  mode        text default 'FM',
  rst_sent    text,
  rst_rcvd    text,
  note        text
);

-- Reference content: structured, versioned, cited. Bundled as JSON for offline too.
create table content_blocks (
  id          text primary key,      -- 'band_privileges.technician', 'qcodes', ...
  version     text not null,
  source      text not null,         -- citation
  effective   date,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

create table question_pool (
  id          text primary key,      -- NCVEC question id, e.g. 'T1A01'
  pool        text not null,         -- 'technician-2022' etc — VERIFY current at build
  subelement  text not null,
  question    text not null,
  answers     jsonb not null,        -- [a,b,c,d]
  correct     int not null,
  figure      text                   -- asset ref if diagram question
);

create table study_progress (
  user_id     uuid not null references auth.users(id) on delete cascade,
  question_id text not null references question_pool(id),
  ease        real not null default 2.5,    -- SM-2 fields
  interval_d  real not null default 0,
  due_at      timestamptz not null default now(),
  lapses      int not null default 0,
  primary key (user_id, question_id)
);

-- Cached repeater regions (RepeaterBook responses, politely cached for offline).
create table repeater_cache (
  user_id     uuid not null references auth.users(id) on delete cascade,
  region_key  text not null,         -- geohash prefix or state code
  fetched_at  timestamptz not null default now(),
  data        jsonb not null,
  primary key (user_id, region_key)
);

create table print_state (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  last_print_at timestamptz,
  -- staleness nag = any contacts/reach_methods/stations.updated_at > last_print_at
  variant       text default 'binder'
);

-- RLS: every table user_id-scoped, plain owner policies. content_blocks and
-- question_pool are world-readable, service-role writable.
