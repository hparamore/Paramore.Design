# Claude Design ⇄ paramore.design

The working copy of the site lives in one Claude Design canvas:
**https://claude.ai/artifact/B1kpy6E6J9gUoq5d3jQ7VU** (private until shared).

Hunter edits there (copy, layout, images, blocks). When he says **"push it"**, Claude ports the
canvas into this Astro repo and ships it. The canvas is the design source; `src/` stays the
production source. Nothing on the canvas reaches paramore.design until it is ported.

## How the canvas is built

| Layer | Canvas file | What editing it does |
|---|---|---|
| Tokens + block styles | `project/site.css` | Restyles every page at once (the template layer) |
| Shared chrome | `SiteNav.dc.html`, `SiteFooter.dc.html` | Imported by every page; edit once |
| Pages | `Main.dc.html` (Home) and the other desktop artboards | Literal copy + markup; retype in place, one-off edits |
| Phone views | `*Phone.dc.html` | Live mirrors of the desktop page at 390px. **Never edit these**; they follow the desktop artboard |
| Templates | `CaseTemplate.dc.html`, `BlockLibrary.dc.html`, `StyleGuide.dc.html` | Starting point, block catalog, token specimen |

Images are uploaded assets referenced as `/_blob/<id>`. `docs/claude-design-assets.json` maps
every id back to its file in `public/`.

## Page → source map

| Canvas artboard | Astro source | Notes |
|---|---|---|
| `Main.dc.html` | `src/pages/index.astro` | Selected-work list is data in the artboard's script; on port, drive it from `src/content/projects/*.yaml` (add an `homeStats` field) |
| `Work.dc.html` | `src/pages/work.astro` + `src/components/ProjectCard.astro` | Now two sections: Case studies and Lab. Port by adding a `tier: case \| lab` field to the project yaml schema |
| `About.dc.html` | `src/pages/about.astro` | |
| `Blog.dc.html` | `src/pages/blog/index.astro` | |
| `Build.dc.html` | `src/pages/build.astro` | |
| `PostTain.dc.html` | `src/pages/blog/posts/building-tain.astro` | |
| `PostFable.dc.html` | `src/pages/blog/posts/building-with-fable-5.astro` | |
| `CaseMutual.dc.html` | `src/pages/projects/mutual.astro` | Gallery data lives in the artboard script |
| `CaseMutualDS.dc.html` | **new** `src/pages/projects/mutual-design-system-case-study.astro` (name TBD) | The live explorer stays a passthrough at `/projects/mutual-design-system.html`; this case study needs a different route so the two don't collide |
| `CaseTreeService.dc.html` | `src/pages/projects/the-tree-service.astro` | |
| `CaseTava.dc.html` | `src/pages/projects/tava.astro` | Canvas uses link cards where the live page embeds iframes; keep the live `Embed` component on port |
| `CaseSpnkr.dc.html` | `src/pages/projects/spnkr.astro` | |
| `CaseGameUI.dc.html` | `src/pages/projects/game-ui.astro` | Orphaned on the live site: no card links to it |
| `CaseRealEstate.dc.html` | `src/pages/projects/paramore-real-estate.astro` | |
| `CaseKeeper.dc.html`, `CaseKillTheFish.dc.html`, `CaseMagnet.dc.html`, `CaseTain.dc.html` | `src/pages/projects/<slug>.astro` (all use `CaseLayout`) | Magnet and Tain are `draft: true` |
| `site.css` | `public/css/styles.css` | Bump `styles.css?v=` in `Base.astro` when it changes |
| `SiteNav` / `SiteFooter` | `src/layouts/Base.astro` | |

Not on the canvas, by design: the passthrough pages (`mutual-design-system.html`, `clozd.html`,
`veras.html`, `Venture-Generator.html`, `resume.html`), the client pitches (`/lehichiropractic`),
and `/super-com` (an unlisted job application page).

## What "push it" does

1. Read the canvas (`Artifact` read on `project/canvas.json`, then each changed artboard and
   `site.css`). Diff against the last pushed version noted in `WORK_STATUS.md`.
2. Work on a branch, never `main`: `git switch -c design/<date>-<topic>`.
3. Port each changed artboard into its Astro source from the table above, keeping `Base.astro`
   as the only place nav/footer/head live. Swap `/_blob/<id>` for paths from
   `claude-design-assets.json`; download any new images into `public/assets/projects/<slug>/`
   and run `node scripts/optimize-images.mjs`.
4. Port `site.css` changes into `public/css/styles.css` and bump the `?v=` number.
5. `npm run build`, then `npm run dev` and check every changed page at desktop and phone width.
6. Commit, push the branch, open a PR, and give Hunter the preview. Merging to `main` deploys.

## The first port is a migration, not a sync

The canvas currently uses the **Modernist look from the export** (light ground, red `#ec3013`,
Archivo, square corners). The live site is dark with orange `#FF6B00`, Bebas Neue and Space
Grotesk. The first "push it" therefore replaces the site's visual system: `styles.css`,
`DESIGN.md`, and the Conventions section of `CLAUDE.md` ("Dark theme only", the fonts) must
all be updated in the same PR, or the docs will contradict the code.

## Case study spine (added 2026-10-12)
Every case study follows: hero → TL;DR (context / role / outcome) → role & boundaries →
story → key decisions (options / why / trade-off) → outcome → looking back → next project.
New blocks live in `site.css` as `.pd-tldr`, `.pd-owners`, `.pd-decision`, `.pd-lookback`, `.pd-lab`.
Text in `[brackets]` is for Hunter to supply; `[Draft: …]` is Claude's inference awaiting his
confirmation. **Neither may ship**: a push must refuse any page that still contains `[`.
