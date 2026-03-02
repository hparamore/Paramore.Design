# CLAUDE.md — Paramore.Design Portfolio

## What This Is
Personal portfolio and blog for Hunter Paramore / Paramore.Design. Static HTML/CSS site hosted on GitHub Pages with custom domain `paramore.design`.

## Tech Stack
- Plain HTML, CSS, vanilla JavaScript
- No build tools, no frameworks, no dependencies
- Hosted on GitHub Pages (repo: `hparamore.github.io`)
- Custom domain via CNAME: `paramore.design`
- Fonts: Google Fonts (Bebas Neue, Space Grotesk)

## Structure
```
├── index.html              # Homepage
├── work.html               # Portfolio grid
├── about.html              # About + Contact
├── css/styles.css          # Full design system + styles
├── js/main.js              # Nav scroll, mobile menu
├── projects/*.html         # Individual case study pages
├── blog/index.html         # Blog listing
├── blog/posts/*.html       # Individual blog posts
├── assets/images/          # All images
└── CNAME                   # Custom domain config
```

## Design System
All in `css/styles.css`. Uses CSS custom properties (tokens):
- Colors: `--color-bg`, `--color-accent`, `--color-text-*`, etc.
- Typography: `--font-display` (Bebas Neue), `--font-body` (Space Grotesk)
- Spacing: `--space-xs` through `--space-5xl`
- Components: `.btn--primary`, `.project-card`, `.blog-post-link`, etc.

## Adding Content

### New project page
1. Duplicate `projects/checkin.html`
2. Update title, meta, hero info, and body content
3. Add a card linking to it in `work.html` (and optionally `index.html`)
4. Add project images to `assets/images/projects/`

### New blog post
1. Duplicate `blog/posts/hello-world.html`
2. Update title, date, meta, and body content
3. Add a link entry in `blog/index.html`

## Conventions
- Dark theme only (#0A0A0A bg, #FF6B00 accent)
- Headings use Bebas Neue, uppercase, display sizes
- Body text uses Space Grotesk
- `//` separator pattern in labels (e.g., "Mobile App // iOS & Android")
- Each project page is fully standalone — customize layout per case study
- Images use placeholder divs until real content is added
- Nav, footer, and CSS are shared across all pages
