# Claude Design → Astro port

Ports the canvas (https://claude.ai/artifact/B1kpy6E6J9gUoq5d3jQ7VU) into `src/pages/` using `src/layouts/BaseV2.astro`.

1. Download the canvas's `project/` files (Claude does this with the Artifact read action) into a folder.
2. `python3 scripts/claude-design/port.py <folder>/project .` ports every static page.
3. Home and Mutual have live data: extract `main-projects.json` and `mutual-shots.json` from their artboard scripts
   next to the tools (see port_dynamic.py), then `python3 scripts/claude-design/port_dynamic.py <folder>/project "$PWD"`.
4. `cp <folder>/project/site.css public/css/v2.css` (keep the "Site-only additions" block at the end) and bump `v2.css?v=` in BaseV2.
5. `npm run build`.

Canvas links (`Foo.dc.html`) become routes and `/_blob/<id>` images become `public/` paths via
`docs/claude-design-assets.json`. A new image dropped on the canvas fails the port loudly until it's added there.

`vercel.json` only sets `noindex` for the staging deployment. GitHub Pages ignores it, but **remove it
before production ever moves to Vercel.**
