# 💡 Plug — Idea & Product Thinking

> Originally captured 2026-06-28 as "App Discovery Swipe" (Tinder-for-apps).
> Pivoted 2026-08-29 to an **App Store-style storefront** — this folder is the
> proof of concept.

## One-liner
**An app store for the web.** A storefront where makers list the web apps /
PWAs they've built, and people browse, discover, and open them — App Store
polish, but every "download" is just a link to wherever the app lives.

## The problem (why this exists)
A huge number of people build apps and then hit a wall: **distribution.**
Reddit is full of "I built X, how do I get users?" posts. Current options are
all bad in different ways:
- Posting on Reddit/HN/Product Hunt → one-shot, buried fast, feels spammy
- Paid ads → expensive, hard for a side project
- Native app stores → gatekept, fees, review friction, and PWAs aren't welcome

The wave of vibe-coded SaaS, tools, and games has no shelf. Plug is the shelf:
a curated library of tools, services, apps, and games that run in the browser.

## How it works
**For browsers/discoverers:**
1. Browse an App Store-style storefront: Today editorial feed, category tabs,
   charts, search
2. Tap an app → full detail page (screenshots, description, ratings, reviews)
3. Tap OPEN → the app launches at its own URL. Nothing to install.

**For makers:**
1. Submit an app: name, tagline, category, icon, screenshots, URL, description
2. Human review/curation before it appears (quality + scam control)
3. Later: stats (impressions, opens), featured slots, boosts

## Business angle (later)
- Free to list; paid **featured placements** / "boost" slots
- Submission fee or maker pro tier (analytics, multiple listings)
- Editorial sponsorship ("App of the Day")

## Current status (this folder)
Working proof of concept: full storefront UI with seed catalog, detail pages,
search, and a submission form that generates catalog entries for manual review.
No backend yet — the catalog is a JS file, reviewed and edited by hand, which
is exactly right for a curated v1.

## Open questions
- Seeding supply: start with Hunter's own PWAs + invite makers from the
  Reddit threads already asking for this
- Moderation workflow once submissions are real (form → email? GitHub issue?)
- Anti-gaming for ratings once they're real
- Naming: "Plug" is the working title (alternatives considered: Swipd, Pitchr,
  AppCrush, Shipped, Decked, TestSwipe)
- Whether the original swipe-discovery mode returns later as a fun
  "Discover" tab inside the storefront
