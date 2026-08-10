# Ham Companion — Plan

**One-line:** flight-checklist + address book + field manual for amateur radio —
"I want to talk to Dave, walk me through it" — with one-tap printable paper backup.

**Framing (settled):** the app never transmits or receives RF. It tells you exactly
what to dial, what to say, and what's legal; you do it on the radio. That's the market
gap — RepeaterBook/QRZ/HamStudy are databases; nobody built the guidance layer.
Scope v1 to **US/FCC only**, labeled as such.

## The killer feature: Connection Recipes
A saved contact card = callsign, name, location, license class, plus **ranked ways to
reach them**: primary ("W7ABC repeater, 146.940, offset −0.6, tone 100.0 → key up →
'K7XYZ for W7DAV' → wait"), backups (simplex, another machine, Winlink), agreed sked
times. The card generates a big-type step-by-step script for that exact contact,
including the legal beats (ID with your callsign, re-ID every 10 min and at end, plain
language, no encryption, no business traffic).

**Linked accounts:** if the contact also has an account, they maintain their own
"how to reach me" recipe and you *subscribe* to it. When they change it, your card —
and your printed copy — is flagged stale. In-app messaging exists in one narrow role:
**sked coordination** ("146.52 at 19:00 Sat?" accept/decline), never as a comms channel.

## Paper backup — lean in hard
One tap: **"Print my comms plan"** → PDF with contact recipes, local repeater list,
band-privileges chart for your class, phonetic alphabet, Q-codes, RST guide, national
simplex/calling frequencies. Client-side generation (print CSS + browser print-to-PDF);
no server involved — thematically correct. Two variants: wallet card + full binder page.
Stale-print detection: plan pages carry a generated date; app nags when source data
changed since last print.

## Offline-first is the identity
The most aggressively offline app of the four: full PWA, all reference content +
user data cached, works 100% with zero signal. An emergency-comms companion that
needs connectivity is a self-refuting joke.

## Feature set

1. **Path-to-license mode.** NCVEC Technician question pool (freely usable) →
   flashcards + practice exams + weak-area tracking + exam-session finder link-out.
   Day-one value before he can transmit. On passing, enter callsign → app recalibrates
   to license class (and later General/Extra).
2. **Context-aware rules.** "About to transmit on 146.94 FM" → show only what applies:
   privileges on that band for your class, ID requirements, repeater etiquette
   (courtesy tone, gaps for breakers). Glanceable, in-the-moment.
3. **Repeater directory.** RepeaterBook API, location-based: "repeaters near me I can
   use", programming details, CHIRP export. Cache results for offline.
4. **Callsign lookup.** callook.info / HamQTH (free) → one-tap save-as-contact.
5. **QSO log.** who/when/freq/signal report/note ("runs an FT-60, knows antennas").
   ADIF export. The notes field is the relationship-builder.
6. **Nets directory + reminders.** Local net calendar, push reminder with check-in
   script — how you find people you don't know.
7. **First-contact teleprompter.** Literal scripts with phonetics ("kilo seven…"),
   phonetic-alphabet trainer. The friend in the passenger seat for mic fright.
8. **My station card.** Maidenhead grid square from GPS, gear list; feeds the printed
   plan and the shareable reach-me recipe.

## v1 / v2
**v1:** study mode, contact recipes (local-only), repeater lookup + cache, rules
content for Technician, printable comms plan, my-station card, teleprompter scripts.
**v2:** linked accounts + recipe subscription + sked coordination, nets, QSO log/ADIF,
CHIRP export, General/Extra content.

## Risks / watch-outs
- Content accuracy: band privileges and Part 97 rules must be sourced carefully and
  carry a "reference, not legal advice" note + content version/date.
- RepeaterBook API terms: check rate limits/attribution at build time; cache politely.
- Question pools rotate every 4 years (Technician pool current: 2022–2026, new pool
  effective July 2026 — VERIFY at build time and load the current one).
- No jargon walls: he's a beginner; every screen defines its terms on first use.
