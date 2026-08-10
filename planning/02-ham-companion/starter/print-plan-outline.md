# Printable Comms Plan — Page Spec (T6)

Generated client-side (print CSS → browser print-to-PDF). Every page footer:
`Generated 2026-08-10 · paramore.design/ham · content vX.Y — verify before relying`.

## Binder variant (US Letter, portrait)

1. **Cover / My Station** — name, callsign (or "UNLICENSED — LISTEN ONLY" banner),
   license class, grid square, gear list, home repeater(s).
2. **Connection Recipes** — one card per contact (2-up): callsign, name, ranked reach
   methods with full programming info (freq / offset / tone), sked times, and the
   numbered contact script in large type. Order by user-set priority.
3. **Local Repeaters** — cached "near me" table: freq, offset, tone, callsign,
   location, notes. Include cache date prominently.
4. **My Privileges** — band/mode chart for the user's class only, rendered as a
   simple table (not the full ARRL chart — just what THEY can use).
5. **Operating Card** — the legal beats (ID rules, 10-minute rule, prohibited
   traffic), repeater etiquette bullets, RST reporting guide.
6. **Quick Reference** — phonetic alphabet (full table), common Q-codes (top ~15),
   national simplex/calling frequencies (146.520 etc.), emergency frequencies.
7. **Fallback Plan** (user-editable free text) — "if no contact by X, try Y; regroup
   plan Z". Blank ruled space if unset — paper plans get pencil edits.

## Wallet card variant (fold-to-CR80-ish, duplex)

- Front: own callsign + top-2 recipes (freq/offset/tone + one-line script each).
- Back: phonetic alphabet compact grid + calling freqs + ID-rule one-liner.

## Print CSS notes

- `@page` margins 0.5in; avoid page-break inside recipe cards
  (`break-inside: avoid`); repeat table headers (`thead { display: table-header-group }`).
- Pure black on white, no dark theme, min 11pt body, recipe scripts 14pt+.
- Test targets: Chrome + iOS Safari share-sheet print.

## Staleness

Store `last_print_at`. If any recipe/station/repeater-cache row is newer, show a
persistent "your paper plan is out of date" chip on the Print tab (and in the v2
digest email).
