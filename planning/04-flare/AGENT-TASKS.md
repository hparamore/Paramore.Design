# Flare — Parallel Agent Workstreams (v1)

Read PLAN.md first. `starter/schema.sql` and `starter/module-contract.ts` are the
architectural source of truth. The module contract is deliberately frozen before module
work begins — that's what lets five module agents run concurrently in Wave 2 without
coordinating with each other.

## Wave 1

### T1 — Sync engine (database + RPC + realtime)
- Apply `starter/schema.sql`. Implement `submit_op` RPC exactly per the contract:
  validate sender/role → apply reducer server-side (Postgres function per module type,
  or a single dispatching Edge Function) → append to `ops` → update `module_state`
  snapshot → broadcast on the board channel.
- Client SDK (`lib/engine.ts`): subscribe to board channel, optimistic local reduce,
  reconcile on authoritative broadcast, **offline op queue** (IndexedDB) with
  created-at stamping and per-op-type expiry, presence heartbeat w/ battery level.
- Acceptance: two simulated clients hammer a counter concurrently offline/online;
  final count is exact; op log complete; presence transitions green/yellow/gray.

### T2 — Boards, membership, layout
- Board CRUD, join via code/link, member roles (owner/editor/member).
- Layout as synced state (it uses the same ops engine: `layout.move`, `layout.add`,
  `layout.remove`, `layout.configure` ops) — vertical grid, full/half slots, drag with
  snap on phone.
- Template system: instantiate board from template JSON; "save board as template";
  share template by code. Ship Road Trip, Door Count, Airsoft, Field Trip templates
  (they only reference Wave-2 modules by type id + config, so JSON can be written now).
- Acceptance: create → invite → both phones show identical board; drag on one
  rearranges the other live.

### T3 — App shell & PWA
- Scaffold per app-setup skill (or graft onto existing Flare repo — decide at kickoff
  by inspecting what's there; keep its auth/email wiring if sound).
- PWA install, wake-lock toggle ("keep screen on"), audio-unlock gesture on board
  entry, spoken-announcement service (SpeechSynthesis wrapper w/ queue), sound effects.
- Board screen frame that mounts module renderers into layout slots (renderer registry
  keyed by module type id).
- Acceptance: installable; TTS speaks a test phrase after unlock; renderer registry
  mounts a dummy module.

## Wave 2 — one agent per module (all depend only on the frozen contract)

Each module task = reducer (server), renderer + op buttons (client), config panel,
role enforcement, and a self-test page. Acceptance for all: correct under concurrent
ops from 2+ clients, offline queue replay, config respected, roles enforced.

### T4 — Counter
Capacity + thresholds (green→yellow→red), step size, allow-negative, per-device
attribution in op log view, big +/- buttons.

### T5 — Signals
Configurable deck (color, label, icon, spoken phrase, optional expiry). Firing
broadcasts + TTS announce on all devices. **Per-member ack state** rendered as filling
checkmarks (delivered → seen → acked). History strip of recent signals.

### T6 — Ready Check
Roster from board members; per-member READY toggle; when all ready → GO event with
sound + big flash on every device; armer role can reset. Optional countdown-to-GO.

### T7 — Status Grid
Preset status list (config), each member sets own only; tile wall w/ member name,
color, age of last change. Integrates presence (gray overlay when offline).

### T8 — Timer
Countdown + stopwatch modes. Sync = server start timestamp + client offset
(NTP-style estimate from RPC round-trip); no tick broadcasting. Operator role controls
start/pause/reset; finish fires sound on all devices.

## Integration pass (single agent, after waves)
Assemble the four shipped templates from real modules, run a two-phone walkthrough of
each, empty/error states, onboarding screen ("create or join"), repo README.
