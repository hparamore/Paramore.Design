# Work Status — Paramore.Design Portfolio

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
