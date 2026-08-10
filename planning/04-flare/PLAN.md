# Flare — Plan

**One-line:** a shared control panel a group assembles from synced widgets —
"Figma-for-walkie-talkies." Rooms of people exchanging discrete, acknowledged signals
and operating shared state (counters, timers, statuses) on identical boards.

Evolved from the original convoy idea. The convoy use case still exists — as a **board
template**, not the product. Existing Flare repo already has sign-in/email scaffolding;
this plan defines the actual product.

## The core primitive (settled)

A **board** (room) contains **module instances** snapped into a phone-first grid.
A module is exactly three things:

1. **State schema** — JSON shape of its shared state.
2. **Operations** — the only way state changes. Clients emit ops; the server applies
   and broadcasts. Never direct state writes.
3. **Renderer** — component that draws state and offers op buttons.

Why ops, not last-write-wins: two door-counters tapping simultaneously must not lose a
count. `+1`/`-1` are commutative — order and latency don't matter — and the op log is a
free audit trail ("front door: +1 at 2:41pm").

**Persistence rule:** ops go **through Postgres** (durable, ordered) for anything with a
count or a record; Realtime broadcast-only for ephemera (typing, live cursors). A counter
that loses people is worse than one that lags 200ms.

**Board layout is itself synced state** — a vertical grid of full/half-width slots.
Members with edit rights drag modules; everyone's phone rearranges live.

**Per-instance config** at placement time (counter: capacity, step; timer: duration).
**Per-instance roles**: who can operate vs. view ("only Hunter presses GO").

## v1 modules (five, no more)

| Module | Notes |
|---|---|
| Counter | capacity threshold w/ green→yellow→red, per-device attribution, step size |
| Signals | colored flare deck w/ **per-member ack loop** (delivered→seen→acked), spoken announcements |
| Ready Check | everyone taps READY; last tap auto-fires GO w/ sound on all devices |
| Status Grid | each member sets own status from preset list; wall of colored tiles |
| Timer | synced countdown/stopwatch via server-timestamp offset math |

These five cover door-counting, airsoft, road trips, and field trips on day one.

**v2 module backlog:** tally board, roll call/headcount, vote, turn tracker, queue,
scoreboard, announcement banner, shared checklist, number display (nursery pager),
randomizer, signal light, location check-in/map, push-to-talk voice memos (async clips,
NOT live VoIP).

## Templates solve cold start

Ship pre-arranged boards: Road Trip, Door Count, Airsoft Match, Field Trip, Game Night,
Event Crew. A template is just saved board JSON. Users can save/share their own boards
as templates via link/code — that's the v1 extensibility story (no plugin SDK).

## Connectivity honesty (carried over from convoy thinking)

- Presence heartbeat; members shown green (live) / yellow (quiet 30s–2min) / gray
  (offline) with "last seen" ages. Never present stale as current.
- Offline ops queue locally and forward on reconnect, stamped with creation time.
  Time-sensitive signal types can declare an expiry and die rather than deliver stale.
- Show battery % in presence (distinguish "went gray" from "phone died").

## Safety note (if/when a convoy road-report signal ships)

Never imperative ("you may pass") — only observational ("clear ahead from my position,
12s ago") with live-aging timestamp and ~20s auto-expiry. Encourage passenger operation.
Fine to omit from v1 entirely.

## v1 scope

Engine (ops + realtime + presence) → boards/join codes → grid layout editor →
5 modules → 4 templates → ack loop + spoken announcements → offline queue. PWA install.

## Risks / watch-outs

- iOS PWA background limits: supported mode is screen-on (wake lock) for live use.
- Audio (announcements/GO sound) needs a user-gesture unlock at session start.
- Module contract discipline: every shortcut taken around the ops contract in v1
  multiplies cost of every future module. The contract is the product.
