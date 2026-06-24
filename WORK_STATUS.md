# Work Status — Paramore.Design Portfolio

> **Related log:** the Mutual design-system explorer here is built *from* the React package at
> `~/Documents/Mutual/Dev & Exports/Design System/Mutual Design System Files/Design System - Web (React)/`,
> which has its own `WORK_STATUS.md` (covers the `/design-sync` to Claude Design + this explorer).

## 2026-06-24 — Hero rag fix + em dashes removed from homepage

### Summary
Hunter found the hero subtitle's ragged right edge hard to read (jagged + an orphaned
"the room." line) and asked to remove all em dashes. Fixed both on `index.html`.

### What changed (`index.html`)
- **Rag/readability:** widened subtitle measure (60ch → 64ch) and added
  `text-wrap: pretty` to `.home-hero .hero__subtitle` (smooths line breaks / avoids
  orphans). Tightened the subtitle copy slightly.
- **Em dashes removed sitewide-on-homepage:** every `—`/`&mdash;` on `index.html`
  replaced *in context* — asides → commas, list intros → colons, label separators →
  `·` (e.g. "iOS · Swift / SwiftUI"). Verified 0 em dashes remain.
- Gotcha for future: `perl -CSD -i -pe` with a literal `·`/`—` in the program double-
  encodes (writes `Â·` mojibake / fails to match the UTF-8 `—`). Use **byte-mode**
  `perl -i -pe` (no `-CSD`) for literal multibyte chars. Cleaned up one such mojibake.

### DONE — em dashes removed from all portfolio pages (blog left intentionally)
Hunter chose: strip portfolio pages, leave the blog (his writing voice). Swept
`work.html`, `about.html`, `build.html`, `super-com.html`, and all `projects/*.html`
(incl. the 82 in the interactive `mutual-design-system.html`) to **0 em dashes**.
Rules: tech-stack lists → `·`, list intros / subhead labels → `:`, asides → `,`,
title separators → `·`. Verified 0 em dashes on all 9 portfolio pages, no mojibake,
and the interactive design-system page still runs with no console errors.
**Left untouched (by choice):** `blog/index.html` (4) and
`blog/posts/building-with-fable-5.html` (24) — em dashes are Hunter's intentional prose
voice there.

---

## 2026-06-24 — Hero headline finalized: "I learn things by rebuilding them."

### Summary
Iterated the homepage hero headline with Hunter to land on something memorable and
true to him. Rejected "I love making things…" (generic — every designer says it) and
"figuring out how they work" (forgettable). Final: **"I learn things by REBUILDING
them."** ("rebuilding" accented). It's backed by the work directly below it — the Game
UI kits and Mutual design system literally ARE him rebuilding things to understand them.

### What changed (`index.html` hero)
- Headline → "I learn things by `<span accent>`rebuilding`</span>` them."
- Subtitle rewritten to frame rebuilding as his full iterative loop and fold in the
  research/testing/analytics use-cases Hunter wanted: "…ship it, watch how people
  really use it, read the feedback and the analytics, then rebuild the parts that need
  it — until I know *why* they had to change. Usually as the only designer in the room."
- Verified desktop + mobile (375px): no overflow.

---

## 2026-06-24 — Game UI Kits card: real cover art on Work + Home

### Summary
Hunter supplied a real cover graphic for the game UI work
(`assets/images/projects/GameDesignSystem.png`, 1252×1102 — Zelda BotW, Satisfactory/
FICSIT, Raid Rush). Wired it into the existing Game UI card on `work.html` (replacing
the missing `GameUIHero.jpg` placeholder + its onerror fallback) and added the same
card to the homepage Selected Work grid (now 5 cards: Mutual featured, Mutual Design
System, Tree Service, Checkin, Game UI Kits).

### Notes
- Card retitled "Game UI Kits" (label "Personal Work // Game UI Kits"); description now
  surfaces the credibility line: "The Zelda kit was featured on the Figma community
  homepage." Aspect ratio set to 1252/1102 to match the asset. Image verified loading.

---

## 2026-06-24 — Removed design.html; folded key pieces into homepage

### Summary
Deleted the standalone `design.html` capabilities page and moved its three strongest
blocks onto the homepage instead (Hunter's call — cleaner than a separate page that
repeated the same themes). Reverted the site nav back to **Home / Work / About / Blog**.

### What changed
- **Deleted `design.html`.** No dangling references remain (verified).
- **Nav reverted** — removed the `Design` item from every page: `index.html`,
  `work.html`, `about.html`, `blog/index.html`, `build.html`, `super-com.html`, and
  `projects/{game-ui,mutual,the-tree-service}.html`. Back to 4 items. (`For Business`
  footer link stays.)
- **`index.html` gained three sections** (CSS ported from the old `pf-` blocks,
  renamed `home-`): a **How I Lead** callout (`.home-callout`), a **pull-quote /
  testimonial** (`.home-pullquote`), and the **Toolkit** (`.home-toolkit`, 3 cols:
  Design / Build / Lead). The callout copy was softened toward Hunter's voice
  ("…the best part is watching the work get better because someone else ran with it").
- **Homepage section order now:** Hero → Selected Work → How I Work (4-up) → How I
  Lead + pull-quote → Toolkit → Worked With → About → Get In Touch.
- **Rewired links:** hero "How I work" button and the old deep-dive link now point to
  the on-page `#how-i-work` anchor (added to the How I Work section) instead of the
  deleted page.

### Open items for Hunter (carried over — now live on the homepage)
- [ ] Fill the `[…]` placeholders in the How I Lead callout (a real mentoring example)
      and the pull-quote (a real testimonial + Name/Role/Company).
- [ ] Email still inconsistent: homepage `hparamore@gmail.com` vs `about.html`
      `hello@paramore.design`.

---

## 2026-06-24 — Homepage hero: voice + layout rework

### Summary
Reworked the new homepage hero twice based on Hunter's feedback. (1) **Voice** — the
original "I design the whole product and the system it runs on" read as boastful;
rewrote it in a curious-maker, learning-and-sharing tone. (2) **Layout** — it felt
"centered but stacked." Root cause: the global `.hero` is `display:flex`, which made
its inner `.container` shrink-wrap and center (only 782px wide, pushed right) while
every other section is full-width left-aligned. Fixed to a hard-left single-column
hero with momentum (Hunter chose this over a split/image or a "Currently" panel).

### What changed (`index.html`)
- **Headline** now: "I love making things — and figuring out how they **work**."
  Subtitle reframes the Mutual stat as delight ("…which still amazes me") instead of
  a brag, and ends on "sharing what I learn as I go."
- **Hero layout (scoped `.home-hero`):** added `.home-hero .container { width:100% }`
  to cancel the flex shrink-wrap so the hero left-aligns like every other section;
  un-capped the headline (`max-width:none` + `font-size: clamp(text-4xl, 6.6vw,
  text-6xl)`) so it runs wide across 2 lines instead of stacking to 4; explicit
  `<br>` after "and" for the line break; reduced hero top/bottom padding and added
  `.home-hero + .section { padding-top: var(--space-xl) }` to pull Selected Work up
  so the first card peeks into the hero (momentum).
- Verified desktop (1280) and mobile (390): left-aligned, 2-line headline, work
  peeking, no horizontal overflow.

### Open / next
- Hunter flagged the confident tone may need softening sitewide too — esp.
  `design.html` ("I own the whole surface", "most of a design team in a single hire").
  Offered to apply the same voice pass there.
- Still pending: hero image (optional now that Option C needs none), testimonials,
  Mutual PAR case study.

---

## 2026-06-24 — Site reframe: portfolio-first, business pitch demoted

### Summary
Reframed the whole site from a "for hire / AI tools for small businesses" sales
funnel into a **personal design portfolio**. The homepage was the main culprit —
it was 100% a business pitch. We moved that pitch to its own page and rebuilt the
homepage as a portfolio front door about Hunter.

### What changed
- **NEW page `build.html`** — the old `index.html` business pitch, moved intact
  (hero, problem strip, recent builds, solution cards, industries, process, trust,
  big CTA). Nothing lost. Title now "For Business — AI Tools, Custom-Built". Nav and
  footer aligned to the new site-canonical set. Internal anchors (#services,
  #contact) still resolve within the page.
- **`index.html` fully rewritten** as a portfolio home (first-person, portfolio
  voice, not sales). Sections: personal hero ("I design the whole product — and the
  system it runs on"), Selected Work (4 cards: Mutual featured, Mutual Design System,
  Tree Service, Checkin), a "How I Work" capabilities glimpse (4-up: Systems / Craft /
  Mentoring / 0→1) linking to `design.html`, a "Worked With" brands strip, an About
  teaser, and a soft "Get In Touch" closing (no "book a call" sales CTA).
  - NEW page-scoped `home-` style block (self-contained, same convention as `pf-`/
    `sc-`/`ts-`): `.home-caps`, `.home-cap`, `.home-brands`, `.home-about`,
    `.home-closing`. Reuses global `.hero*`, `.project-card`, `.btn`, `.label`.
- **Site-canonical nav** is now **Home / Work / Design / About / Blog** — applied to
  `index.html`, `work.html`, `design.html`, `about.html`, `blog/index.html`
  (added the new **Design** item; reordered it on `design.html`).
- **Site-canonical footer** now leads with a **For Business** link to `build.html`,
  then LinkedIn / Dribbble / GitHub — applied to the same five pages plus `build.html`.

### Decisions
- **Business pitch demoted, not deleted** (Hunter's call) — preserved on `build.html`,
  reachable from every footer, so the client/lead-gen angle survives without making
  the site read as a sales page.
- **Home = portfolio front door; `design.html` = the deep capabilities dive.** Two
  layers, minimal duplication — the homepage's "How I Work" strip is a teaser that
  links into the fuller page.
- **"For Business" lives in the footer, not the primary nav**, to keep the top-level
  experience portfolio-forward. Easy to promote to nav later if desired.
- No new tokens; everything drawn from existing `:root`. Verified the new homepage
  renders (nav, 4-up caps grid, brands, footer, closing all correct) via preview.

### Open items for Hunter
- [x] DONE — Swept canonical nav (+ Design) and footer (+ For Business) onto
      `projects/game-ui.html`, `projects/mutual.html`, `projects/the-tree-service.html`,
      and `super-com.html`. `projects/mutual-design-system.html` intentionally left
      alone (it's a self-contained interactive token explorer with its own chrome).
- [x] DONE — Mobile verified at 390px on `index.html` and `design.html`: no
      horizontal overflow; grids collapse correctly (caps/toolkit → 1 col, stats/pillars
      as designed).
- [ ] `about.html` contact still uses `hello@paramore.design`; homepage/closing uses
      `hparamore@gmail.com`. Pick one canonical contact email site-wide.
- [ ] Still worth doing: fill the `[…]` placeholders on `design.html` (mentoring
      story, testimonial, mentored count) and rebuild the **Mutual** case study into
      the anchor senior-grade story.

---

## 2026-06-17 — Mutual Design System live token explorer (`projects/mutual-design-system.html`)

### Summary
Built a standalone, interactive showcase of the **Mutual design system** (sourced from
`~/Documents/Mutual/Dev & Exports/.../Mutual Design System Files/Design System - Web (React)`).
The thesis it's designed to prove: *this design system was authored to be machine-readable,
so an AI agent can assemble correct, on-brand, accessible UI from it without a human.* The
whole page re-themes live across **3 brands (Mutual / Ark / ToNite) × 2 modes (light/dark)**
= 6 themes, all from one ported token layer.

### What changed
- **NEW page `projects/mutual-design-system.html`** — single self-contained file (inline
  CSS + JS, no build, GitHub-Pages-safe). Sticky control bar (brand pills, light/dark, and
  an **"AI view"** toggle). Sections: 01 Color, 02 Typography, 03 Spacing/radius/icon sizes,
  04 **live WCAG contrast validation** (computed in-browser per theme, AA/AAA/FAIL badges —
  honestly flags Mutual-dark destructive button at 2.52:1), 05 Components (buttons, chips,
  banners, dialog — all token-driven), 06 "Why this is built for AI" with three tabs:
  resolved-token JSON (regenerates per theme), an agent system-prompt contract, and the same
  tokens in React/Swift.
- **Ported tokens verbatim** into the page's JS from `tokens/colors.ts`, `semantic.ts`,
  `typography.ts`, `spacing.ts` and the `ThemeProvider` semantic-derivation logic. Source
  files were NOT modified — this is a read-only consumer of them.
- **NEW fonts** copied to `assets/fonts/mutual-ds/` (Goldman Sans weights, Gramatika Black,
  DM Sans, DM Serif Display). Inter loaded from Google Fonts. `@font-face` declared so the
  page renders in each brand's real typeface.
- **NEW dev-only** `.claude/launch.json` + `.claude/static-server.mjs` (tiny Node static
  server on :4321) for local preview — Xcode's python3 http.server is sandbox-blocked.

### Decisions
- **Self-contained single file** (vs. wiring React/Vite) so it deploys on the existing
  static GitHub Pages site with zero tooling and reviews instantly.
- **Whole page follows the active theme** (bg/text/surfaces) rather than a neutral chrome —
  switching brand/mode transforms everything at once, which is the most visceral proof the
  semantic layer works.
- **Live contrast left honest** — failing pairings show FAIL rather than being hidden;
  reads as real engineering, not a marketing mock.

### Linked from portfolio
- **Added a project card in `work.html`** (after the Mutual featured card): label
  "Design System // Built for AI", links to `/projects/mutual-design-system.html`.
- **NEW card image** `assets/images/projects/mutual-design-system.svg` — a hand-built SVG
  poster (Mutual-dark palette, sample button/chip shapes, a token-JSON line) rather than a
  raster screenshot, so it stays crisp and lightweight. Uses the same `onerror` surface
  fallback as the Game UI card.

### Open questions / next steps
- Not added to `index.html` homepage grid yet (only `work.html`). Add if it should be
  front-and-center.
- Could grow a proper case-study intro wrapper if it becomes a featured piece.
- Verified locally via preview: explorer (all 3 brands, both modes, AI tabs, no console
  errors), work.html card (correct link + image loads), SVG poster render.

---

## 2026-06-17 — DS explorer: copy reframe, light poster, icon library tool

### What changed
- **Copy reframe** across explorer + card + poster: dropped "built to be read by machines"
  (too on-the-nose) for framing that names both audiences — "engineers & AI agents build
  from it / build from one source." Touched hero eyebrow, hero body, section 06 title +
  desc, AI-panel heading, `work.html` card label + description, SVG eyebrow.
- **Card poster `mutual-design-system.svg` → Mutual LIGHT theme** (was dark): white surface,
  navy eyebrow, light-mode brand colors, pink CTA, token line shows `#F60063` / `4.12`.
- **NEW: Icon library section (07)** in the explorer. Searchable grid, size seg (16/20/24/32),
  "Tint to theme" toggle (rewrites hardcoded fills/strokes → `currentColor` so icons take the
  active theme's text color), click-any-icon-to-copy-SVG. Search re-renders only the grid so
  the input keeps focus. Section **auto-hides** when no manifest is present.
- Icons load from `assets/icons/mutual.icons.json` (`{count, icons:[{name,svg}]}`), fetched
  at runtime; 404 is caught silently.
- **NEW generator** `.claude/gen-icon-manifest.mjs` — scans `assets/icons/mutual-src/` for
  SVGs (one per file, filename = name, strips `ic-`/`ic_`), minifies, writes the manifest.
  `assets/icons/mutual-src/README.md` documents the drop-and-generate flow.

### Verified
- Light poster render; icon gallery end-to-end with 6 temp sample icons (tint in light AND
  dark, live search filter `2/6`, untint restores original fills, copy works) — then temp
  icons + manifest removed so the section ships hidden until real icons land. No console errors.

### Icons — LANDED (real Mutual set)
- Source: `…/Mutual Design System Files/Icons/` (nested `Small/Large/Large` = 172 large 30×30,
  `Small/Small` = 174 small 20×20, + 1 lone Attendance Large). Copied into the repo at
  `assets/icons/mutual-src/{large,small}/` so the page is self-contained (no dependency on
  Hunter's local Mutual path).
- **Generator rewritten** (`.claude/gen-icon-manifest.mjs`): scans both folders, **normalizes
  every color to `currentColor`** (fill + stroke, attribute + inline `style`, including the
  `color(display-p3 …)` decls that were overriding fills — that was the recolor gotcha) so the
  whole set tints uniformly; derives a clean base name (drops `_L`/`_S`, trailing export dups
  like " 30"), and **groups large+small under one entry**. Output schema:
  `{count, icons:[{name, token:"icon/Name", large:<svg>|null, small:<svg>|null}]}`.
  Result: **199 icons** (143 both sizes, 27 large-only, 29 small-only). Manifest ~571 KB.
- **Explorer icon section upgraded:**
  - Large 30 / Small 20 size toggle; per-tile dots show which sizes exist (falls back to the
    other variant when the selected size is missing).
  - **Tint**: 7 theme-aware preset swatches (Ink/Brand/CTA/Success/Error/White/Black) + a
    native color picker. Tinting just sets the grid container's CSS `color` (icons are
    `currentColor`) — instant, no tile rebuild.
  - **Click copies the token** (`icon/Bell`) — PascalCase to match asset names, the reference
    a dev or AI agent uses to pull the icon.
  - Grid tiles cached by size+query so theme switches don't rebuild 199 SVGs.
- Verified via DOM: 199 tiles, 9-col grid, presets + custom picker recolor live, size toggle
  swaps viewBox (30→20), search filters (`1/199` for "bell"), tint+filter persist across
  theme switch, click-copy fires the token. No console errors. (Preview screenshot tool was
  resetting scroll, so verification was geometry/computed-style based.)

### Icon toggle fix (follow-up)
Hunter reported the Large/Small toggle felt broken: some icons scaled, some didn't, some
vanished. Root causes + fixes:
- **`sizeSvg()` stripped width/height from EVERY element**, including inner `<rect>` — collapsed
  the ~10 rect-built icons (Bookmark, Premium, Cost, UnArchive, DistanceGlobal, …). Fixed to
  rewrite only the root `<svg>` tag.
- **Wrong control model:** Large/Small swapped the *master artwork* but rendered both at one
  fixed px, so the toggle just swapped drawings with different built-in padding (looked like
  random scaling / no-change). **Replaced with a uniform display-size scaler (20/24/32/48px,
  default 32).** Auto-picks the sharper native master for the chosen size (`pickVariant`:
  <25px → small master, else large), falls back when one is missing → **nothing disappears**,
  everything scales uniformly. L/S dots remain as availability info.
- **Parser cleanup** in the generator: strip Figma dup suffixes (`-1`, `_2`), PascalCase across
  separators. Fixed mangled names (`GIFL-`→`GIF`, `HometownS-`→`Hometown`, `Music-note`→
  `MusicNote`). Now **198 icons**, no malformed names, GIF/Gift kept distinct.
- Verified: rect icons render real geometry; glyphs measure 20/48px at those settings; tile
  count constant (198) across all sizes; tint flows to fixed icons (Bookmark → solid CTA pink
  via currentColor); no console errors.

### Icon rendering fixes (round 2)
Two reported glitches, both in the source SVGs, fixed in the generator's `normalize()`:
- **WardHop rendered as a plain circle.** It's a transparent-disc-with-knockout icon: a
  `white` circle backing + an `evenodd` path that carves the glyph out of the disc.
  Normalizing white → currentColor made disc and backing the same color, erasing the
  knockout. Fix: **white (fill & stroke) → `transparent`** so the cut-out reads. This also
  improves the other knockout icons (Bookmark, Premium, Cost, EditField, UnArchive,
  DistanceGlobal, InstagramOutline, BookmarkCheck/X) — now proper negative-space, still
  single-color.
- **Undo broke at larger sizes.** `Undo_L` path data contained corrupt `L-nan -nan`
  segments from the Figma export (`Undo_S` was clean — that's why only large sizes broke).
  Fix: **strip `L-nan -nan` line-to segments** (each is followed by a valid command, so safe).
  Same corruption silently affected `PhotoStack_L` and `Ethnicity_L` — fixed too.
- Verified: all four render with finite, sane bounding boxes at 48px; WardHop circle is
  `transparent` + path `currentColor`; 198 icons, no console errors.

### Icon rendering fix (round 3) — white "paper"
- **Verify lost its checkmark at small sizes.** `Verify_S` is a filled disc with the check
  drawn as a `stroke="white"` on top (foreground), whereas WardHop etc. use white as a
  knockout *backing*. The round-2 rule (white → transparent) erased Verify's check.
- Fix: map white (fill + stroke) → **`var(--icon-paper)`**, a CSS var set on the icon grid to
  the tile background (`surfaces.elevated`). Backings blend into the tile (read as cut-out);
  foreground marks read as paper-colored on the tinted shape. Adapts to theme + tint
  (verified light: ink disc / white check; dark: near-white disc / dark check). 11 icons use
  the paper var; no leftover literal white.

### "AI view" reworked into a live inspector (the wow moment)
The old toggle only revealed a low-contrast token chip on color swatches (dark-on-dark,
same-hue = unreadable). Hunter wanted it to be a "woah, that's awesome" feature. Replaced it
with a **live inspector overlay**:
- Flip on **AI view** → the whole page becomes hoverable. Mousing over ANY element pops a
  floating card showing its **token name, resolved value (with color chip), WCAG contrast
  badge where relevant, and a one-line "what an agent does with it"** note. The hovered
  element gets a brand-colored highlight ring.
- Makes the thesis literal: every pixel is wired to a named token, and here's the
  machine-readable record. **265 elements tagged** with `data-ai` across colors, type ramp,
  spacing/radius/icon-size, components (buttons + chips, incl. live contrast), and all icons.
- Inspector card uses `surfaces.elevated` bg + brand border/text → always legible on every
  theme (fixes the dark-on-dark complaint). Follows cursor, clamps to viewport, rebuilds
  content only when the hovered element changes (cheap on mousemove).
- Implementation: `ai(obj)` helper emits `data-ai='<json>'`; one delegated `mousemove`
  listener drives `showInspector`/`hideInspector`; toggle also flashes a hint pill
  ("Hover anything — see the token an agent reads"). Hero tip updated to point at it.
- Verified via DOM: swatch→`brandPrimary`(+chip), CTA→`semantic.buttonPrimary`+`4.12:1`
  badge, type row→`type.h1`, icon→`icon/…`; hides over untagged elements; toggle-off clears
  highlight; legible in dark (bg `rgb(37,37,41)`, brand-blue text). No console errors.
  (Preview screenshot tool still won't capture this page — verification was DOM-based.)

### Rows / list components ported (new section 06)
Investigated whether the form-ish components (fields, toggles, pickers, selectors) exist.
Finding: React export has none; Swift export has a comprehensive `GroupedRow` (533 lines) that
IS most of them — they're row variants, not separate components.
- **Ported `GroupedRow` + `SectionHeader` + `RowDivider`/`FullWidthDivider`** from the SwiftUI
  source into the web showcase as new section **06 — Components / "Rows, toggles, steppers &
  lists."** Covers: single-line (40px) navigation rows, two-line (50px) detail rows w/
  `fieldText`, and trailing variants — text, button, **toggle (primary/accent, live)**,
  **stepper (0–10, live)**, violator, badge count, badge dot, chevron; leading icons; section
  headers (small/medium/large) and indented/full dividers. All token-driven (verified: Ark
  switch re-themes toggle to `#394C9B`).
- Layout constants match Swift (heights 40/50, 20px pad, 16 icon-gap, 12 trailing-gap, divider
  `grey100` indent 54). Toggles/steppers wired via delegation; inspector tags rows `GroupedRow`.
- Sections renumbered: 06 Components(rows) · 07 The point · 08 Icon library. 17 rows render,
  no console errors.
- **Gap noted:** row `fieldText` is a display value/subtitle, NOT an editable text input. True
  text-entry fields are specced in Hunter's Figma but not in code → net-new if wanted later.

### AI handoff prompt — BUILT
Top-of-page panel (`#handoff`) that's hidden until **AI view** is on, then reveals at the very
top and pushes the page down (per Hunter's ask) via a `max-height` expand animation. So the AI
toggle now does two things: reveal this panel + enable the hover inspector.
- Contents: eyebrow + title + sub, a scope tab row (**Full system** / **Tokens only**), the
  generated prompt in a scrollable `pre.code`, **Copy prompt** + **Download .md** actions, a
  3-step strip, and a `~N tokens · React` counter.
- `buildHandoffPrompt(scope)` generates a **self-contained React seed prompt** from the live
  data: file structure, all 6 themes' colors (full `THEMES` JSON), type scale, spacing/radius/
  iconSize, the semantic-derivation rules in pseudocode, a ThemeProvider spec, (full scope
  only) component specs incl. GroupedRow, then non-negotiable rules + "build a catalog, confirm
  6 themes, then build what I ask using only this." ~3.1k tokens full / less for tokens-only.
- Copy → clipboard + friendly toast ("Prompt copied — paste into your AI"); Download → `.md`
  blob (`mutual-design-system.prompt.md`). `copy()` now truncates long text in the toast.
- React-only v1 (truthful — source exists). SwiftUI = future tab; Compose = skip.
- Verified: hidden by default, shows on toggle, prompt has colors JSON + GroupedRow, tokens-
  only scope drops components, copy toast correct, no console errors.

### Deploy + cleanup (2026-06-18)
- Pushed everything live to `paramore.design` (merged remote blog work cleanly). Mutual DS
  explorer + work card confirmed 200.
- Removed the unused `projects/TreeService Assets/` folder from tracking (it's raw source —
  live pages use `assets/images/projects/`); it had a 95MB `.psd`. Added `.gitignore` rules
  (`*.psd`, folder, `*.zip/.url/.webloc`, `.claude/`). Kept files locally.
- **NOTE:** the 95MB `.psd` is removed from the working tree but STILL in git history
  (commit d33732a). Fully purging it from GitHub needs a history rewrite + force-push —
  not done (awaiting Hunter's ok).
- Fixed: row dividers in dark mode showed the darker page bg through the 54px left indent —
  gave `.rows-group` the elevated surface color so the gap matches the rows.

### Open / notes
- Token format is `icon/Bell`. Easy to switch to `Bell`, `icon.bell`, `MutualIcon.bell`, etc.
- Icon color model: main shape = `currentColor` (the tint); "paper" areas (knockouts +
  contrasting marks) = `--icon-paper` (tile bg). Two-channel, but both controllable.
- AI view is hover-driven (desktop). On touch it does nothing special — fine for this
  showcase; could add tap-to-inspect later if wanted.

---

## 2026-06-17 — Hiring-focused design portfolio page (`design.html`)

### Summary
Added a new public, hiring-focused capabilities page that reframes Hunter as a
**senior/staff product designer** — not the "I'll build your business a thing"
service pitch the homepage leads with. Goal: a recruiter or design leader scanning
for 2–5 minutes should immediately read Hunter's *level* (systems, craft, mentoring,
0→1 solo) and leave feeling they'd be missing out. Decision was to keep the business
homepage as-is and build a **separate dedicated page** (chosen over reworking the
homepage or a "two-door" chooser).

### What changed
- **NEW page `design.html`** at repo root. Public (no `noindex`). Structure follows
  the research-backed senior-portfolio skeleton:
  1. Hero — positioning line ("I own the whole surface — system, craft, and the team")
     + meta row (Discipline / Experience / Range / Status) + lede grounded in the
     Mutual story.
  2. Stat strip — 12 yrs · 40K+ marriages · #1 app · [N mentored placeholder].
  3. Capability pillars (2×2) — Design Systems, Craft, Mentoring & Leadership, 0→1 Solo.
  4. Selected work — reuses global `.project-card`/`.project-grid` (Mutual featured,
     Tree Service, Game UI) so cards match `work.html` exactly.
  5. Mentoring/leadership callout + pull-quote/testimonial block (the strongest staff
     signal, currently invisible elsewhere on the site).
  6. Toolkit — Design / Build / Lead columns.
  7. Closing CTA → email + work.
- **NEW page-scoped styles (`pf-` prefix)** in an inline `<style>` block, same
  convention as `sc-` (super-com) and `ts-` (Tree Service). Components: `.pf-lede`,
  `.pf-head`, `.pf-stats/.pf-stat`, `.pf-pillars/.pf-pillar`, `.pf-callout`,
  `.pf-pullquote`, `.pf-toolkit`, `.pf-closing`. **None promoted to `styles.css`** —
  page-local for now; several (`.pf-stats`, `.pf-pullquote`) are good promotion
  candidates if reused on case-study pages.
- **Nav**: `design.html`'s own nav adds a "Design" item between Home and Work. The
  OTHER pages' navs were left untouched — so the page is currently only reachable by
  direct URL. See open items.

### Decisions
- **Separate page, not a homepage rewrite** — keeps the business front door intact
  while giving job applications a clean, single shareable URL.
- **No fabricated metrics** (per global rules + precedent set by `super-com.html`).
  Only facts already live on the site are stated as fact (Mutual: co-founder/sole
  designer, 10 yrs, #1 LDS dating app, 40K+ marriages; Tree Service: 4 SaaS tools
  replaced, solo in 3 weeks; 12 yrs; Angel Studios brand/systems). Everything
  unverified is a bracketed `[…]` placeholder.
- Drew entirely from existing `:root` tokens — no new colors/type/spacing.

### Open items for Hunter
- [ ] Fill the `[…]` placeholders: mentoring example (pillar 03 + callout), the
      `[N]` mentored stat, a real pull-quote/testimonial + attribution, and the
      hero "Status" line (or delete it).
- [ ] Decide whether to add the "Design" nav link to the *other* pages
      (`index.html`, `work.html`, `about.html`, `blog/index.html`) so it's
      discoverable, or keep it URL-only for sharing with recruiters. One-line edit
      per page if yes.
- [ ] Next strongest move: rebuild the **Mutual** case study into the anchor
      senior-grade story (business problem + metric → role/team → hard-decision
      narrative → craft evidence → quantified outcome → reflection).
- [ ] Consider promoting `.pf-stats` / `.pf-pullquote` into `styles.css` and reusing
      on case-study pages.

---

## 2026-06-17 — Super.com application page (`super-com.html`)

### Summary
Added a private, role-specific positioning page for Hunter's application to the
**Staff Product Designer, Design Systems** role at Super.com (owns their "Atlas"
design system). Built to match the site design system exactly. Companion to a
cover-letter outline kept in the session outputs (not committed to the repo).

### What changed
- **NEW page `super-com.html`** at repo root. `noindex` meta so it stays out of
  search; not linked from nav/work (Hunter can share the direct URL with his
  contact / recruiter).
- Reuses existing components: `.nav`, `.project-hero` (+ meta items), `.label`,
  `.section`, `.container`, `.btn`, `.footer`, and `js/main.js`.
- **NEW page-scoped styles (`sc-` prefix)** in an inline `<style>` block,
  following the same convention as the `ts-` block on `the-tree-service.html`.
  Components: `.sc-lede`, `.sc-head`, `.sc-pillars/.sc-pillar` (3-up cards,
  one `--edge` accent variant), `.sc-callout` (AI differentiator), `.sc-evidence`,
  `.sc-toolkit`, `.sc-closing`. **None promoted to `styles.css` yet** — left
  page-local since they're application-specific. Promote if reused.

### Decisions
- **Lead angle:** design-systems depth, with AI fluency (Anthropic/OpenAI APIs,
  Claude Code, agents) as the differentiator — the role's headline ask is making
  Atlas "AI-ready," a combo most DS candidates can't speak to.
- **No fabricated metrics.** Bracketed `[…]` placeholders mark where Hunter must
  insert real numbers/stories (Angel Studios outcome, an AI-workflow proof point,
  Figma MCP/Cursor confirmation).
- Tokens/typography untouched — page draws entirely from existing `:root` tokens.

### Open items for Hunter
- [ ] Fill the `[…]` placeholders (one concrete metric + one AI-workflow story).
- [ ] Confirm Figma MCP / Cursor claim before publishing.
- [ ] Gaps to address in the letter: WCAG specifics, a named 0→1/version-change
      story, doc tooling (Storybook/ZeroHeight/Supernova).
- [ ] Decide whether to link the page anywhere or keep it URL-only.

---

## 2026-06-16 — Blog index: featured card layout + remove Hello World

### Summary
Upgraded the blog index from text-only links to a featured horizontal card
layout (hero image + title + subtitle + excerpt). Added the first article's
cover image. Removed the Hello World placeholder post entirely.

### What changed
- **NEW component `.blog-card`** (+ `.blog-cards` wrapper) in `css/styles.css`,
  added after the `.blog-post__body` rules. Horizontal layout: image (~38%, 4:5
  aspect, object-fit cover) beside body (category label, date, Bebas title,
  subtitle, 3-line clamped excerpt, accent "Read article →"). Hover: lift +
  image zoom + accent border. Built ENTIRELY from existing tokens — no new
  colors/spacing/fonts. Mobile (<=768px): image stacks on top, title drops to
  --text-2xl. Old `.blog-post-link` / `.blog-list` left intact for future use.
- **`blog/index.html`** — replaced `.blog-list` with `.blog-cards` containing
  one `.blog-card` for the Fable post. Includes a comment block explaining how
  to duplicate the card for future posts. Bumped CSS cache to `?v=7`.
- **`assets/images/blog/`** — NEW folder. Added `building-with-fable-5.jpg`
  (1080×1350, 4:5) — Hunter's designed cover graphic.
- **Removed** `blog/posts/hello-world.html` and its index link.

### Decisions / notes
- Layout = horizontal (Hunter chose) because the cover image is 4:5 portrait;
  fits beside text with no crop. For future STACKED/top-image cards, a landscape
  (~16:9) export would be needed.
- Card image aspect is locked to 4:5 (object-fit cover) for consistency, so
  future covers can be any ratio and still align.
- OPEN ITEM for Hunter: the cover graphic has the article title baked in, so the
  title shows twice (in the image + as card text), and the image's own subtitle
  ("The Hidden Debt Behind a One-Shot Game Prototype") differs from the card's
  text subtitle. Looks editorial/magazine-style as-is; can dedupe if preferred.
- Image graphic bg is near-black (#1A1A-ish) so it blends with the card surface;
  consider a textless cover or a subtle image border if more separation wanted.

### Git / publishing
- Published via GitHub web uploader (sandbox still can't run local git) as 4
  commits to `main`: (1) hero image, (2) styles.css, (3) blog/index.html,
  (4) delete hello-world.html. GitHub Pages auto-deployed; verified live.
- Stale `.git/index.lock` from the earlier session may still exist locally —
  `rm -f .git/index.lock` before next local commit.
- Local `blog/posts/hello-world.html` could NOT be deleted from the sandbox
  (mount blocks unlink); it's deleted on the remote, so a local `git pull` will
  remove it. This WORK_STATUS update is local/uncommitted.

## 2026-06-16 — Blog Post: "It's Easy to Have AI Build Things That Look Finished"

### Summary
Added Hunter's second blog post — a first-person piece about building a card game
prototype with Claude Fable 5, and the lesson that AI builds things that *look*
finished while skipping foundational engine/tooling work ("debt work").

### What changed
- **`blog/posts/building-with-fable-5.html`** — New post. Duplicated the
  `hello-world.html` template exactly; no new components or styles. Reused
  `.blog-post__header`, `.blog-post__body`, `.container--narrow`, nav, and footer.
  Added five `<h2>` subheads to break up the long-form body for web readability.
- **`blog/index.html`** — Added a `.blog-post-link` entry at the top of the list
  (newest-first), above "Hello World".

### Decisions
- **Title** = the thesis line, "It's Easy to Have AI Build Things That Look
  Finished" (chosen from 5 options as the strongest hook). Easy to swap — it's the
  `<title>`, the `<h1>`, and the index link text.
- **Date**: June 16, 2026. **Slug**: `building-with-fable-5.html`.
- **Voice preserved** — kept Hunter's trailing "...", em-dashes, asides, and
  "like crack" line; edits were grammar, paragraph breaks, and de-duplicating the
  Figma section only.
- **No new design-system components** — fully reused existing tokens/classes.
- A trimmed LinkedIn version also exists (in the chat / outputs), not on the site.

### Git / publishing
- Sandbox couldn't run local git (mount blocks deleting `.git` lock/temp files),
  so published via GitHub's web uploader in two commits directly to `main`:
  (1) `building-with-fable-5.html`, (2) `index.html`. GitHub Pages auto-deployed.
- A stale empty `.git/index.lock` was left in the local repo by the failed git
  attempt — delete it with `rm -f .git/index.lock` before next local commit.
- Left ALL pre-existing uncommitted local work untouched (`work.html`,
  `WORK_STATUS.md` Game UI entry, untracked `projects/game-ui.html`, Venture
  Generator files, `TreeService Assets/`). This WORK_STATUS.md update is also
  local/uncommitted — commit it whenever you next push.

## 2026-05-20 — Game UI Page

### Summary
Added a new portfolio page showcasing three game UI studies (Zelda: Breath of the
Wild, Satisfactory, Raid Rush) from Hunter's Figma community profile.

### What changed
- **`projects/game-ui.html`** — New case study page. One page, three sections
  (one per game), each with its own gallery grid driven by a filename array
  (same pattern as `mutual.html`). Shared lightbox at the bottom. Closing CTA
  links out to `figma.com/@hparamore`.
- **`work.html`** — Added a fourth project card linking to `game-ui.html`.
  Card uses `onerror` fallback so it gracefully renders an empty grey tile
  until `GameUI/GameUIHero.jpg` is added.
- **`projects/GameUI/`** — Created with three subfolders: `Zelda/`,
  `Satisfactory/`, `RaidRush/`. Drop exported PNGs into the matching folder.

### How to populate
1. Export PNGs from Figma into the corresponding `projects/GameUI/<Game>/` folder.
2. Open `projects/game-ui.html` and edit the three arrays near the bottom
   (`zeldaCards`, `satisfactoryCards`, `raidrushCards`) — just add the filenames.
3. Filenames are auto-converted into hover titles (CamelCase and dashes become spaces).
4. Drop a hero image at `projects/GameUI/GameUIHero.jpg` for the work.html card.

### Decisions
- **One page, three sections** instead of three separate case studies — these
  are UI studies, not shipped products, and grouping them tells the bigger
  "game UI as a discipline" story.
- **Landscape grid for Zelda + Satisfactory, portrait grid for Raid Rush**
  (mobile). Each section's `<div class="game-grid">` carries the
  `--portrait` modifier where needed.
- **Placeholder empty tiles** render when arrays are empty so the page
  doesn't look broken before images arrive.
- **Scoped CSS in the page** (same convention as Mutual) — move to
  `css/styles.css` once locked.
- **Next-project link** points back to Mutual to close the loop.

### Open questions / next steps
- Drop in the actual PNG exports and populate the three arrays.
- Add `projects/GameUI/GameUIHero.jpg` for the work.html thumbnail.
- Decide whether Game UI deserves a slot on the homepage `index.html`
  (currently only highlights Brandon's Tree Co., Utah Bridal, Checkin).
- If filenames have a consistent numbered prefix, the existing
  `titleFromFile()` helper strips them automatically — same as Mutual.

---

## 2026-05-03 — Homepage Repositioning: AI for Small Businesses

### Summary
Rewrote `index.html` to reposition the site from a general design portfolio to a focused
small-business AI consultancy pitch. Portfolio remains accessible at `/work.html`.

### What changed
- **`index.html`** — Full rewrite. New sections:
  1. Hero — "AI Tools, Built For The Way Your Business Actually Runs" with "Now booking" pill
  2. Problem strip — subscription bloat, spreadsheet sprawl, built-for-someone-else
  3. What I Do — 4 cards (Replace The Stack, AI That Earns Its Keep, Designed Not Just Built, You Own It)
  4. Built For — 6 industry tiles (trades, yard/property, real estate, events/magazines, restaurants, founders)
  5. Recent Builds — Brandon's Tree Co., Utah Bridal magazine workflow, Checkin
  6. Process — Talk → Map → Build → Ship
  7. Trust strip — text logos for Paramore Real Estate, Mutual, Ark, Nu Skin, Stotion, Angel Studios, Tech9
  8. Big CTA — "Tell me what's eating your week"
- Hero headline forced onto 3 lines on wide screens (≥1100px) via `white-space: nowrap`, falls back to natural wrap below.
- Brandon's Tree Co. and Utah Bridal cards use grey-box placeholders (`.project-card__image--blank`) until real screenshots are ready.

### Decisions
- **Scoped CSS in a `<style>` block in `index.html`** rather than `css/styles.css` — keeps iteration cheap while the new sections are still being tuned. Move into the main stylesheet once the layout is locked.
- **Kept `/work.html`, `/about.html`, `/blog/` untouched** — portfolio takes a back seat in nav messaging but full content is still live.
- **Industry tiles use emoji icons** as cheap placeholders. Replace with proper SVG icons when the visual direction is set.

### Open questions / next steps
- Replace placeholder grey boxes on Brandon's Tree Co. and Utah Bridal cards with real screenshots/mockups.
- Wire up actual booking link (Cal.com / Calendly) — currently `mailto:hunter@paramore.design`.
- Decide whether to keep the existing `craft-flicker` C/K easter egg somewhere on the new site.
- Move scoped homepage CSS into `css/styles.css` once layout is approved.
- Consider building a dedicated `/services` or `/ai` page if homepage gets too long.

---

## 2026-03-02 — Initial Scaffold

### Summary
Set up the complete portfolio site structure for paramore.design, hosted on GitHub Pages.

### What was created
- **CSS Design System** (`css/styles.css`) — Full token-based system with:
  - Color palette: dark backgrounds (#0A0A0A), orange accent (#FF6B00), grey scale
  - Typography: Bebas Neue (display/headings), Space Grotesk (body) via Google Fonts
  - Spacing scale, border tokens, transition easings
  - Component styles: nav, buttons, project cards, blog post layout, about page, footer
  - Responsive breakpoints at 1024px, 768px, and 480px
  - Mobile nav with hamburger menu

- **Homepage** (`index.html`) — Hero with tagline, featured project cards, footer
- **Work page** (`work.html`) — Grid of 8 project card slots (1 featured + 7 standard)
- **About page** (`about.html`) — Bio section with photo placeholder, skills grid (3 columns), contact section with CTA
- **Blog listing** (`blog/index.html`) — Simple chronological post list
- **Sample blog post** (`blog/posts/hello-world.html`) — Template with instructions for adding new posts
- **Checkin project page** (`projects/checkin.html`) — Full case study template demonstrating:
  - Project hero with metadata (role, platform, timeline, stack)
  - Full-width images
  - Side-by-side image+text splits (with reverse layout)
  - Section-based narrative flow
  - "Next project" navigation at bottom

- **JavaScript** (`js/main.js`) — Nav scroll effect (blur background), mobile hamburger toggle
- **CNAME** — Points to `paramore.design`
- **`.gitignore`** — Standard exclusions

### Design decisions
- **Plain HTML/CSS over Jekyll** — Full per-page control for curated portfolio pieces, no build dependencies, matches existing GitHub Pages workflow from Checkin website
- **Bebas Neue + Space Grotesk** — Geometric, bold display font paired with clean modern body font. Matches the industrial/structured aesthetic from inspiration images
- **Orange accent (#FF6B00)** — Warm, high-contrast against dark backgrounds. Sits between the orange and amber from the inspiration images
- **Blog is manual** — Create HTML file, add link to listing page, push. No templating. Two steps per post, full control
- **BEM-ish class naming** — `.project-card__image`, `.nav__link`, etc. Readable and design-tool-friendly
- **Project pages are standalone** — Each one is a full HTML file that can be completely customized per case study

### File structure
```
ParamoreDesign/
├── index.html              # Homepage
├── work.html               # Portfolio grid
├── about.html              # About + Contact
├── CNAME                   # Custom domain
├── css/styles.css          # Design system + all styles
├── js/main.js              # Nav behavior, mobile menu
├── assets/images/projects/ # Project images (empty, ready for content)
├── projects/
│   └── checkin.html        # Checkin case study (template for others)
└── blog/
    ├── index.html          # Blog listing
    └── posts/
        └── hello-world.html # Sample blog post
```

### Open questions / Next steps
- [ ] Initialize git repo and push to `hparamore.github.io` on GitHub
- [ ] Configure DNS on GoDaddy to point `paramore.design` at GitHub Pages
- [ ] Replace placeholder images with real project screenshots
- [ ] Fill in actual project content for all 6-8 case studies
- [ ] Update social links (LinkedIn, Dribbble) with real URLs
- [ ] Update `hello@paramore.design` email or replace with real contact
- [ ] Add headshot photo to About page
- [ ] Customize hero copy and tagline to personal voice
- [ ] Consider: favicon/logo beyond the emoji placeholder
