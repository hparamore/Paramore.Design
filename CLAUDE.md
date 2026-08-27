# CLAUDE.md — Paramore.Design Portfolio

## What This Is
Personal portfolio and blog for Hunter Paramore / Paramore.Design. Static HTML/CSS site hosted on GitHub Pages with custom domain `paramore.design`.

## Tech Stack
- **Astro** (static output), CSS custom properties, vanilla JavaScript
- No UI framework — pages are plain HTML inside Astro components
- Custom domain: `paramore.design`
- Fonts: Google Fonts (Bebas Neue, Space Grotesk)

Run `npm run dev` (not a bare file server — content collections need the Astro dev
server). If you add or change `src/content.config.ts`, **restart** the dev server;
its HMR cannot pick up a new collection config and pages will render empty.

## Structure
```
├── src/
│   ├── layouts/Base.astro        # THE shared nav + footer + head. Edit chrome here, once.
│   ├── components/ProjectCard.astro
│   ├── content.config.ts         # Collection schemas
│   ├── content/projects/*.yaml   # One file per project card
│   └── pages/                    # Routes (index, work, about, blog/, projects/)
├── public/                       # Copied verbatim to the site root
│   ├── css/styles.css            # Full design system
│   ├── js/main.js                # Nav scroll, mobile menu
│   ├── assets/                   # All images, incl. assets/projects/<name>/
│   └── *.html                    # PASSTHROUGH pages — see below
├── scripts/port-to-astro.mjs     # Spent one-shot migration tool; documents path rewrites
└── astro.config.mjs              # Redirects keeping old .html URLs alive
```

## Passthrough pages — do not restructure
These are standalone one-off artifacts, not portfolio pages. They live in `public/`
and are served byte-identical. They have no shared nav, use different fonts, and
must NOT be converted to components or content collections:
`projects/mutual-design-system.html`, `clozd.html`, `veras.html`,
`Venture-Generator.html`, `resume.html`.

## Design System
All in `css/styles.css`. Uses CSS custom properties (tokens):
- Colors: `--color-bg`, `--color-accent`, `--color-text-*`, etc.
- Typography: `--font-display` (Bebas Neue), `--font-body` (Space Grotesk)
- Spacing: `--space-xs` through `--space-5xl`
- Components: `.btn--primary`, `.project-card`, `.blog-post-link`, etc.

## Adding Content

### New project
Add one file: `src/content/projects/<slug>.yaml`. It drives the card on BOTH the
work grid and the homepage — there is no second place to edit.

```yaml
title: Project Name
label: "Client Work // iOS & Android"     # the // separator convention
description: One or two sentences.
href: /projects/<slug>                    # or https://... for work hosted elsewhere
order: 3                                  # ascending, controls grid position
onHome: true                              # also show in homepage selected work
featured: false                           # renders large/wide
image: /assets/projects/<slug>/hero.jpg
imageAlt: Describe the image
aspect: "16 / 9"                          # optional CSS aspect-ratio
draft: false
```

`href` starting with `http` is treated as external automatically and gets
`target="_blank" rel="noopener"`. Linking straight out to a live app, Figma, or a
GitHub repo is a deliberate, supported convention — not every project needs a
local case study page.

**Optimise images before committing them.** Run `node scripts/optimize-images.mjs`
(add `--dry` to preview). It resizes to display size and re-encodes: opaque images
become `.jpg`, images with real transparency become `.webp` (not PNG-256, which
bands the photographic content inside UI screenshots). It rewrites references in
`src/` automatically, but **verify covers afterwards** — several projects share the
generic filename `cover.png`, so a bare-filename rewrite can cross-contaminate.
`public/assets/venture-generator-og.png` is deliberately excluded: a passthrough
page references it as an absolute `og:image` URL.

Project images go in `public/assets/projects/<slug>/`. **Never** put them under
`public/projects/` — that is the route namespace, and on case-insensitive macOS a
folder there silently merges with the page route of the same name, producing a
local build that differs from Linux.

For a full case study page, also add `src/pages/projects/<slug>.astro` using
`Base.astro` and point `href` at it.

### New blog post
1. Duplicate an existing post in `src/pages/blog/posts/`
2. Update title, date, meta, and body content
3. Add a card entry in `src/pages/blog/index.astro`
(Blog posts are not yet a content collection — that is the next migration step.)

## Conventions
- Dark theme only (#0A0A0A bg, #FF6B00 accent)
- Headings use Bebas Neue, uppercase, display sizes
- Body text uses Space Grotesk
- `//` separator pattern in labels (e.g., "Mobile App // iOS & Android")
- Case study pages stay bespoke — customize layout per project
- Page-scoped CSS uses `<style is:global>` with a page prefix (`home-`, `pf-`, `sc-`, `ts-`)
- Images use placeholder divs until real content is added
- Nav, footer, and head live ONLY in `Base.astro` — never copy them into a page
- Old `.html` URLs are kept alive by redirects in `astro.config.mjs`; they exist in the wild
