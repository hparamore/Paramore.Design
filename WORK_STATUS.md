# Work Status — Paramore.Design Portfolio

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
