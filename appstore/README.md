# Plug — The Web App Store

An iOS App Store-style storefront for **web apps**. Instead of downloads, every
listing links out to a live PWA/web app wherever it's hosted. Think: a curated
library of tools, games, and vibe-coded SaaS — with an App Store-quality
browsing experience.

**Status: proof of concept.** All apps except Venture Generator are placeholder
seed data; ratings and reviews are placeholders throughout.

## Run it

No build step, no dependencies. Either:

```bash
cd appstore
python3 -m http.server 8000
# → open http://localhost:8000 (best viewed at phone width / device mode)
```

…or just open `index.html` in a browser. Everything works from `file://` too.

This folder is fully self-contained — you can copy `appstore/` into its own
repo or drop it on any static host (GitHub Pages, Netlify, Vercel) unchanged.

## What's inside

| File | Purpose |
|---|---|
| `index.html` | Shell page (header, view container, tab bar) |
| `css/store.css` | Full design system — iOS-style, auto light/dark |
| `js/data.js` | **The curated catalog.** Apps, categories, editorial cards, rows |
| `js/store.js` | SPA router + renderers (Today, Apps, Games, Search, Submit, detail pages) |
| `js/firebase-config.js` | Backend switch — paste your Firebase config here |
| `js/backend.js` | Firebase glue: submissions, approved-app fetch, sanitization |
| `admin.html` | Moderation dashboard: sign in, approve/reject/delete submissions |
| `firestore.rules` | Server-side validation + access control for the queue |
| `firebase.json` / `.firebaserc` | Firebase Hosting + rules deploy config |
| `FIREBASE.md` | **10-minute guide to go live** |
| `manifest.webmanifest` | Makes the store itself installable as a PWA |
| `IDEA.md` | Original concept capture / product thinking |

## Pages

- **Today** — editorial feed: App of the Day, collections, featured stories
- **Apps / Games** — banner carousels, horizontally-paged rows (3 per page,
  App Store style), ranked Top Charts with ratings
- **Search** — live search + trending terms + category tiles
- **App detail** — icon, OPEN/GET, stats strip, screenshot gallery (procedural
  mockups), description, ratings & reviews, information, related apps
- **Submit** — maker submission form with live preview; generates a ready-to-
  paste catalog entry (no backend yet, by design)

## Adding an app

1. Open `js/data.js`
2. Copy any entry in `STORE.apps`, edit the fields:
   - `url` — where the app lives (`"#"` shows GET/“SOON” instead of OPEN)
   - `icon` — an emoji + a CSS gradient (placeholder until real icons)
   - `theme` — two colors used to draw its placeholder screenshots
   - `shots` — pick 3 mock variants: `feed dashboard chat list game profile editor cards grid stats`
   - `screenshots` — optional array of real image paths (e.g.
     `["assets/shots/myapp-1.jpg", ...]`); when present these are shown
     instead of the procedural mocks. Capture at ~390×830 phone size.
     (Venture Generator uses real captures — see it for reference.)
3. Add its `id` to any rows/collections/charts you want it to appear in
   (`appsTab`, `gamesTab`, `today`)

The Submit page generates exactly this JSON shape, so user submissions can be
reviewed and pasted straight in.

## Submission backend (Firebase)

The store has a full submission pipeline, off by default:

- **Not configured** (now): Submit generates a catalog-entry JSON for manual review
- **Configured** (see `FIREBASE.md`): Submit writes a `pending` doc to Firestore,
  you approve/reject in `admin.html`, and approved apps appear in the store
  automatically under "From the Community" — publishing requires no redeploy

Community entries are validated server-side by `firestore.rules` and
sanitized client-side (`sanitizeApp` in `js/backend.js`) before rendering.

## Deliberately not built yet

- Real ratings & reviews (all placeholder data; community apps start at a
  single placeholder rating)
- Accounts, payments/boosted listings, analytics for makers
- Screenshot upload for community apps (they get procedural placeholders)
- Spam throttling (add Firebase App Check before promoting widely — see FIREBASE.md)
