# Design

> The visual system, documented from `css/styles.css`. This is the source of
> truth for how the site looks. Read alongside PRODUCT.md (strategy) and
> ART-DIRECTION.md (the anti-default execution rules). Dark theme only.

## Theme

High-contrast dark. A single warm orange accent on a near-black canvas, used
sparingly for emphasis and a signature glow. Bold through contrast and space,
not density. No light mode.

## Color

Defined as CSS custom properties in `css/styles.css :root`.

### Surfaces
| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#0A0A0A` | Page canvas (near-black) |
| `--color-surface` | `#111111` | Default raised surface |
| `--color-surface-elevated` | `#1A1A1A` | Cards, elevated panels |
| `--color-surface-hover` | `#222222` | Hover state for surfaces |
| `--color-border` | `#2A2A2A` | Default border |
| `--color-border-subtle` | `#1E1E1E` | Low-emphasis dividers |

### Text
| Token | Value | Role |
|---|---|---|
| `--color-text-primary` | `#FFFFFF` | Headings, primary copy |
| `--color-text-secondary` | `#AAAAAA` | Body, supporting copy |
| `--color-text-tertiary` | `#666666` | Labels, meta |
| `--color-text-muted` | `#444444` | Lowest emphasis — verify AA before use on `#0A0A0A` |

### Accent (orange)
| Token | Value | Role |
|---|---|---|
| `--color-accent` | `#FF6B00` | Primary accent — links, CTAs, emphasis |
| `--color-accent-hover` | `#FF8533` | Accent hover |
| `--color-accent-muted` | `#CC5500` | Pressed / lower-energy accent |
| `--color-accent-subtle` | `rgba(255,107,0,0.08)` | Accent-tinted fills |
| `--color-accent-glow` | `rgba(255,107,0,0.25)` | Signature text-shadow glow |

**Contrast watch:** `--color-text-tertiary` (#666) and `--color-text-muted`
(#444) are below AA for body text on `#0A0A0A`. Reserve for large/decorative
text only; bump toward secondary for anything that must be read.

## Typography

| Token | Stack | Use |
|---|---|---|
| `--font-display` | `'Bebas Neue', 'Arial Narrow', sans-serif` | Headings — uppercase, display sizes |
| `--font-body` | `'Space Grotesk', 'Inter', system-ui, sans-serif` | Body, UI, labels |

Pairing is on a real contrast axis (condensed display caps vs. geometric body) —
not two similar sans. Base 16px. `//` separator pattern in labels
(e.g. "Mobile App // iOS & Android").

### Type scale
`--text-xs` 12 · `--text-sm` 14 · `--text-base` 16 · `--text-md` 18 ·
`--text-lg` 20 · `--text-xl` 24 · `--text-2xl` 32 · `--text-3xl` 40 ·
`--text-4xl` 56 · `--text-5xl` 72 · `--text-6xl` 96 (px).

Display heading ceiling is `--text-6xl` (96px) — bold but not shouting. Bebas
Neue runs at `letter-spacing: 0` (already condensed; no negative tracking).

## Spacing

4px base scale: `--space-xs` 4 · `sm` 8 · `md` 16 · `lg` 24 · `xl` 32 ·
`2xl` 48 · `3xl` 64 · `4xl` 96 · `5xl` 128 (px). Sections use `4xl` vertical
padding; vary spacing for rhythm rather than applying one value everywhere.

## Layout

- `--max-width` 1200px (default container), `--max-width-narrow` 800px (prose).
- `--content-padding` = `--space-xl` (32px).
- Each project/case-study page is intentionally standalone — customize layout per
  case study rather than forcing one template.

## Radius

`--radius-sm` 4 · `md` 8 · `lg` 12 · `xl` 16 (px). Use restraint; not everything
needs rounding (see ART-DIRECTION.md on avoiding the uniform-card look).

## Motion

| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` (exponential ease-out) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--duration-fast` | `150ms` |
| `--duration-normal` | `300ms` |
| `--duration-slow` | `500ms` |

Exponential ease-out is the house curve — no bounce, no elastic. Signature
visual: the accent glow (`text-shadow` using `--color-accent-glow`). Every
animation needs a `prefers-reduced-motion` fallback.

## Components

Shared across all pages via `css/styles.css`: `.btn--primary`, `.project-card`,
`.blog-post-link`, plus shared nav and footer. `js/main.js` handles nav scroll
behavior and the mobile menu.

## Section headers

Hunter's rule (2026-10-01): a section opens with **one big display line**, not a
small two-line title squeezed into the corner. **Shared classes in `css/styles.css`:**
`.section-label`, `.section-title`, `.section-sub`. Used on every section-opening h2
across the site (37 headings, 9 pages + the Lehi proposal).

| Part | Class | Spec |
|---|---|---|
| Label (optional) | `.section-label` | `--font-body`, `--text-sm`, weight 500, `--tracking-wide`, uppercase, `--color-text-secondary` (AA, unlike `.label`'s tertiary) |
| Title | `.section-title` | `--font-display`, `clamp(2.5rem, 6.5vw, 4.5rem)`, bold, uppercase, `line-height: 0.95`, `letter-spacing: 0`, `text-wrap: balance`, `max-width: none` |
| Subline (optional) | `.section-sub` | `--font-body`, `--text-md`, `--color-text-primary`, max 65ch |

- Spacing: `--space-sm` label → title → subline; a plain `<p>` after a title gets `--space-md`.
- **Write the title to fit on one line on desktop** (roughly 35 characters or fewer at full width; 30 or fewer
  inside an 800px reading column). No `<br>`s, no narrow `max-width`.
- **Phones:** 40px, wrapping to two lines is expected. Fixed rem floor because the text tokens shrink on mobile.
- `.section-title` is written as `.section-title.section-title` on purpose so it beats page-scoped
  `.something h2` sizing (`.sc-head h2`, `.closing h2`, `.ts-section-head h2`…) regardless of load order.
  New pages shouldn't add their own h2 sizing for section openers.
- Content headings inside a section stay smaller than the section title at every width.
- Not for: page heroes (h1), blog-post body headings (in-prose), card titles (h3).
- Closing CTA sections use the full `.container` (not `--narrow`) so their title fits on one line;
  their paragraphs cap their own width.

## Section rhythm

- `.section`: `--space-3xl` (64px) top and bottom on desktop, 40px on phones (was 96px, which stacked to ~192px).
  `.section--sm`: `--space-2xl` / `--space-xl` on phones.
- Closing CTA sections (`.big-cta`, `.home-closing`, `.sc-closing`, `.ts-closing`, `.closing`, `.contact-section`):
  `--space-3xl` desktop, 48px on phones.
- Phones (≤600px): bare `p` steps down to 16px; classes that set their own size keep it.
