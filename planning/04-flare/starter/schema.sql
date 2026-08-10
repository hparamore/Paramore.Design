-- Flare — ops-based sync engine schema (Supabase / Postgres)
-- Pairs with module-contract.ts. Clients NEVER write module_state directly;
-- they call submit_op(). See PLAN.md for the reasoning.

create type board_role as enum ('owner', 'editor', 'member');

create table boards (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  join_code   text not null unique default upper(substr(md5(random()::text), 1, 6)),
  owner_id    uuid not null references auth.users(id),
  -- layout is synced state managed via layout.* ops, snapshotted here:
  layout      jsonb not null default '[]',  -- [{instance_id, slot, width: 'full'|'half'}]
  template_of text,                          -- non-null if published as a template
  created_at  timestamptz not null default now()
);

create table board_members (
  board_id   uuid not null references boards(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       board_role not null default 'member',
  display    text not null,
  joined_at  timestamptz not null default now(),
  primary key (board_id, user_id)
);

-- One row per placed module. state is a SNAPSHOT maintained only by the reducer.
create table module_instances (
  id          uuid primary key default gen_random_uuid(),
  board_id    uuid not null references boards(id) on delete cascade,
  module_type text not null,          -- 'counter' | 'signals' | 'ready_check' | ...
  config      jsonb not null default '{}',
  -- role gate: user ids allowed to operate; empty array = all members may operate
  operators   uuid[] not null default '{}',
  state       jsonb not null default '{}',
  state_seq   bigint not null default 0,   -- last applied op seq, for client reconcile
  created_at  timestamptz not null default now()
);

-- Append-only op log. Audit trail + replay + attribution, all for free.
create table ops (
  id          bigint generated always as identity primary key,
  board_id    uuid not null references boards(id) on delete cascade,
  instance_id uuid not null references module_instances(id) on delete cascade,
  seq         bigint not null,              -- per-instance sequence, assigned server-side
  op_type     text not null,               -- e.g. 'counter.increment'
  payload     jsonb not null default '{}',
  sender_id   uuid not null references auth.users(id),
  client_id   text not null,               -- device identity for attribution/dedup
  client_op_id text not null,              -- uuid minted client-side; dedup key for
                                           -- offline replay (at-least-once delivery)
  created_at_client timestamptz not null,  -- when the human acted (offline honesty)
  created_at  timestamptz not null default now(),
  unique (instance_id, client_op_id)
);
create index ops_instance_seq on ops (instance_id, seq);

-- Ack tracking for modules that need per-member delivery state (Signals).
create table op_acks (
  op_id      bigint not null references ops(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  stage      text not null check (stage in ('delivered', 'seen', 'acked')),
  at         timestamptz not null default now(),
  primary key (op_id, user_id, stage)
);

-- Templates are just board JSON: layout + [{module_type, config, operators_mode}].
create table board_templates (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  author_id   uuid references auth.users(id),
  builtin     boolean not null default false,
  share_code  text unique,
  definition  jsonb not null,
  created_at  timestamptz not null default now()
);

-- submit_op(instance_id, op_type, payload, client_id, client_op_id, created_at_client)
--   SECURITY DEFINER. Steps:
--   1. auth: sender is a board member; if instance.operators is non-empty, sender ∈ operators
--      (some op_types are exempt, e.g. ready_check.set_ready is always self-service —
--      the reducer declares per-op permissions, see module-contract.ts).
--   2. dedup: ON CONFLICT (instance_id, client_op_id) DO NOTHING → return current state.
--   3. reduce: new_state = reducer(module_type, state, op_type, payload, sender);
--      reducers are pure and validate payloads (reject, don't clamp silently).
--   4. persist: insert op with seq = state_seq + 1; update instance state + state_seq.
--   5. broadcast {instance_id, seq, op, state} on channel board:{board_id}.
--   Expiry: ops whose module declares an expiry (signals) are dropped at step 3 when
--   now() - created_at_client > expiry, and the sender is notified it died stale.

-- RLS sketch: members SELECT their boards' rows; all writes via RPCs
--   (submit_op, join_board(code), create_board, instantiate_template, ack_op, presence
--   is Supabase Realtime presence — not stored).
