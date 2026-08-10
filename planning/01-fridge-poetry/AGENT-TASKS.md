# Fridge Poetry — Parallel Agent Workstreams (v1)

Read PLAN.md first. Prereq: the Flare (04) ops engine exists — port `lib/engine.ts`
and the submit_op RPC pattern; do not build a second sync engine. `starter/schema.sql`
and `starter/snapping.js` are the source of truth for data shapes and snap/phrase math.

## Wave 1

### T1 — Database, ops reducers & RPCs
- Apply `starter/schema.sql`. Port Flare's ops tables/RPC; implement fridge reducers:
  `magnet.move/snap/unsnap`, `phrase.confirm`, `tray.stash/restore`, `reaction.place/remove`.
- `magnet.snap` validates server-side: target adjacency geometry (from snapping.js
  constants), word not locked/stashed/held-stale, phrase graph update (union), no cycles.
- `phrase.confirm`: walk connected chain, snapshot to `phrase_history`, set lock_until.
- RLS: members-only per fridge; writes via RPC only.
- Acceptance: SQL tests — concurrent snaps to same word (one wins cleanly), confirm
  locks the whole chain, unsnap splits phrase graph correctly.

### T2 — The fridge surface (client)
- Pannable/zoomable fridge door; magnets as DOM nodes; long-press pickup w/ wiggle +
  haptic; drag streams position via broadcast; drop emits ops through the engine.
- Snapping preview + magnetic pull using `starter/snapping.js`; snap *clack* sound.
- Soft-claim ghosting from presence ("held by Sarah"), live presence hands, locked
  phrases rendered distinctly with countdown tooltip.
- Acceptance: two phones — dragging on A is visible live on B; claims ghost; snap
  feels magnetic; locked words refuse pickup.

### T3 — Word system & daily job
- Word list generation: base list (frequency-balanced per PLAN ratios), starter seed
  set, 3 themed packs. Store as `word_defs` + pack manifests.
- Daily pg_cron per fridge (owner-set hour): drop new chunk, decay untouched words
  honoring ALL exemptions (locked, trays, recently-edited phrases), fridge-wide
  snapshot row for future timelapse.
- Cold-start seeding on fridge creation (starter set + one pre-built phrase).
- Acceptance: decay never touches an exempt word across a seeded matrix of cases;
  job idempotent per (fridge, date).

### T4 — App shell, fridges & membership
- Scaffold per app-setup skill; create/join fridge (code + invite link), member list,
  owner settings (lock days, reset hour, seconding toggle, custom-word approval),
  kick/report. PWA install + service worker.
- Acceptance: full create→invite→join→settings flow on two accounts.

## Wave 2

### T5 — Phrases, history & reactions
- Confirm flow (+ optional seconding), phrase lock UI, history page: snapshot cards
  (rendered image of the phrase), author + helpers, date, reactions received.
- Reaction magnets: pick from small emoji set, place near a phrase (position-clamped),
  remove own.
- Auto-archive on lock expiry (extends T3 job).
- Acceptance: confirm → appears in history with correct image + attribution; expiry
  archives then releases words.

### T6 — Private tray
- Slide-up tray, stash/restore ≤7 words, exempt from decay, hidden from others
  (their view shows the word gone from the door).
- Acceptance: stashed word invisible to member B; survives daily job; restore places
  near tray owner's viewport.

### T7 — Re-engagement
- Daily digest email (existing infra): new phrases, reactions on yours, "words expiring
  soon". PWA push opt-in: phrase confirmed on your fridge, your phrase got a reaction.
  Per-user quiet hours + frequency cap.
- Acceptance: digest renders phrase snapshots; no more than 1 push per event type per day.

## Integration pass (single agent)
Two-phone end-to-end script, onboarding polish, empty states, sound/haptic toggle,
repo README. Defer all economy work (points/packs/customs/cosmetics) to v1.5 — do not
start it in this build.
