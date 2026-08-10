# Fridge Poetry — Plan

**One-line:** a shared virtual fridge door where friends arrange word magnets into
phrases; daily word drops and lockable finished phrases create a check-in-every-day
social toy.

## Core loop
Check daily → see what others made, react → words shifted overnight (new pack dropped,
some unused words gone) → build/extend phrases → confirm a phrase to lock + snapshot
it → earn points → spend on packs/custom words/cosmetics.

## Settled architecture decisions

### Rendering: DOM, not <canvas>
Absolutely-positioned elements with CSS transforms inside a large pannable container.
Gets touch events, crisp text, a11y, per-magnet styling for free. Snapping is proximity
math on drop (see starter/snapping.js). A **phrase = connected chain of snapped magnets**
(graph connectivity, not a container).

### Sync: reuse the Flare ops engine
Fridges are boards; magnet moves are ops. Build Flare (04) first, port
`lib/engine.ts` + the ops/RPC pattern. Fridge-specific ops: `magnet.move`,
`magnet.snap`, `magnet.unsnap`, `phrase.confirm`, `tray.stash`, `tray.restore`.

### Contention: soft claims via presence, not DB writes
Picking up a magnet broadcasts "held by X" (Realtime presence/broadcast); others see it
ghosted and can't grab it; claim auto-expires ~10s so a dropped connection never
strands a word. Dragging streams position over broadcast; only the *drop* is a
persisted op.

### Mobile: long-press to pick up
Pannable surface + draggable items conflict on touch. Long-press (with wiggle/haptic,
iOS-edit-mode style) lifts a magnet; otherwise touches pan.

## Game rules (settled)

- **Phrase building:** words snapped in the last hour are soft-held by their builder.
  Confirming a phrase locks it for N days (fridge setting, default 3), snapshots it to
  history (image + word list + author + helpers). Optional fridge setting: confirmation
  requires one other member to "second" it.
- **Auto-archive on unlock:** when a lock expires, snapshot again before words return
  to the pool. Nothing made is ever lost.
- **Daily drop (pg_cron per fridge, owner-set reset hour):** add a word chunk; remove
  some words untouched for 7+ days — NEVER from locked phrases, private trays, or
  phrases edited in the last day.
- **Private tray:** each member stashes up to ~7 words; stashed words are exempt from
  decay and invisible to others' use.
- **Word lists:** original, frequency-balanced (~40% nouns, 25% verbs, 15% modifiers,
  20% glue). Do NOT copy Magnetic Poetry™ kit lists. Generate themed packs too.

## Economy (v1.5 — ship the toy first)
- Earn: confirm phrases, receive reactions, word-count bonuses. Server-side ledger +
  RPCs only (reuse chores-app ledger pattern).
- Spend: extra packs, custom word (profanity-filtered + optional owner approval),
  duplicate-a-word, preposition packs, cosmetics.
- **Reaction magnets** instead of likes: tiny emoji magnets placed next to a phrase —
  diegetic, part of the tableau.

## Delight list (build into v1 where cheap)
Live presence hands (see friends dragging in real time) · snap *clack* sound ·
pack-rip opening animation with scatter physics · weekly theme packs w/ banner ·
daily whole-fridge snapshot → month timelapse scrubber (shareable artifact).

## Social & safety
Fridges are private, join by code/link/invite. Owner powers: kick, delete words,
approve custom words, set lock duration + reset hour. Report button on phrases.
Custom words through a profanity filter even in private fridges (owner toggle).

## v1 scope
Fridge + members + magnets with drag/snap/phrase detection + soft claims + presence
hands + daily drop/decay + phrase confirm/lock + history page + reaction magnets +
private tray. **v1.5:** points, packs, custom words, cosmetics, timelapse, seconding.

## Cold start
New fridge seeds: starter set biased to high-connectivity words + one pre-built silly
phrase + immediate invite prompt.

## Risks
- Snap/phrase graph correctness under concurrent edits — the ops engine + soft claims
  handle it, but `magnet.snap` reducer must validate geometry server-side.
- Decay tuning: too aggressive feels punishing. Ship conservative; make rates fridge settings.
- Re-engagement is load-bearing: daily digest email ("2 new phrases on Kitchen Chaos")
  + PWA push are not optional extras — they're the loop.
