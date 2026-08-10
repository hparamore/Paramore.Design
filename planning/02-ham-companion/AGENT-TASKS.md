# Ham Companion — Parallel Agent Workstreams (v1)

Read PLAN.md first. This app is content-heavy and realtime-free, so the workstreams
split cleanly by content domain; nearly everything can run concurrently. All reference
content carries a `content_version` + source citation, and every screen must work
offline from cache.

## Wave 1

### T1 — App shell, data layer & offline core
- Scaffold per app-setup skill; auth (existing infra); apply `starter/schema.sql`.
- Aggressive PWA: precache app shell + reference content, IndexedDB mirror of user
  data (contacts, recipes, station, logs) w/ background sync when online.
- Navigation frame: Study / People / Radio (repeaters+rules) / My Station / Print.
- Acceptance: airplane-mode cold start shows full app with cached data.

### T2 — Study mode
- Ingest current NCVEC Technician pool (VERIFY which pool is effective as of build
  date — 2026 rotation) into `question_pool` table + bundled JSON for offline.
- Flashcards w/ spaced repetition (simple SM-2 is fine), practice exams (35Q, real
  distribution across subelements), weak-area dashboard, exam-session finder link-out.
- Acceptance: full practice exam offline; misses resurface sooner; score history.

### T3 — Reference content (writing-heavy — give this agent the content brief)
- Author, with citations to FCC Part 97 / ARRL sources: Technician band-privileges
  data (machine-readable, per band/mode), operating rules ("the legal beats"),
  repeater etiquette, phonetic alphabet, common Q-codes, RST guide, national calling
  frequencies, glossary (every term a beginner hits).
- Structured as data (JSON/rows), not prose pages, so T4/T5/T6 can render slices.
- Acceptance: content review checklist — every claim cited, dated, versioned;
  "reference, not legal advice" notice; zero undefined jargon.

### T4 — Repeaters & callsign lookup
- RepeaterBook API integration (check ToS/rate limits at build time), geolocated
  "repeaters near me I can use" (filtered by license class from T3's privilege data),
  detail view w/ programming info, offline cache of fetched regions, CHIRP CSV export.
- Callsign lookup via callook.info w/ HamQTH fallback; one-tap save-as-contact.
- Acceptance: lookup + nearby list work; previously fetched region works offline.

## Wave 2

### T5 — Connection Recipes & My Station
- Contact CRUD; per-contact ranked reach methods (repeater ref or manual freq entry,
  simplex, other); sked times; generated **step-by-step contact script** interleaving
  T3's legal beats with the specific frequencies/callsigns, big-type mode.
- My Station: callsign, class, gear list, Maidenhead grid from GPS (pure-math
  function, no API).
- First-contact teleprompter: script templates w/ phonetic rendering of any callsign.
- Acceptance: create contact → recipe card → script reads correctly for a repeater
  and a simplex method; grid square matches known test coordinates.

### T6 — Print system
- Print-CSS/PDF: full comms plan (recipes, cached local repeaters, privilege chart,
  phonetics, Q-codes, RST, calling freqs, station card) in binder + wallet-card
  layouts. Generated-date stamp on every page; staleness nag when source data is
  newer than last print.
- Acceptance: print preview correct in Chrome + Safari; wallet card folds to size;
  changing a recipe triggers the stale flag.

## Integration pass (single agent)
Beginner walkthrough test ("day 1: no license" → "day 30: first contact"), onboarding
flow that asks license status and adapts, empty states, repo README.

## Deferred to v2 (do not start)
Linked accounts / recipe subscriptions / sked messaging, nets directory + reminders,
QSO log + ADIF, General/Extra pools.
