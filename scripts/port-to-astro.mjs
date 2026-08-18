// One-shot migration: hand-written HTML page -> Astro page using Base.astro.
//
//   node scripts/port-to-astro.mjs
//
// Faithfulness is the goal. The body markup, the page-scoped <style>, and the
// post-footer lightbox/scripts are carried across byte-for-byte apart from a
// small set of deliberate path rewrites (listed in REWRITES) that are required
// because the build now emits directory URLs and assets moved under public/.

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, relative, join } from 'path';

const PAGES = [
  { src: 'index.html',                          out: 'src/pages/index.astro' },
  { src: 'work.html',                           out: 'src/pages/work.astro' },
  { src: 'about.html',                          out: 'src/pages/about.astro' },
  { src: 'build.html',                          out: 'src/pages/build.astro' },
  { src: 'super-com.html',                      out: 'src/pages/super-com.astro' },
  { src: 'blog/index.html',                     out: 'src/pages/blog/index.astro' },
  { src: 'blog/posts/building-tain.html',       out: 'src/pages/blog/posts/building-tain.astro' },
  { src: 'blog/posts/building-with-fable-5.html', out: 'src/pages/blog/posts/building-with-fable-5.astro' },
  { src: 'projects/spnkr.html',                 out: 'src/pages/projects/spnkr.astro' },
  { src: 'projects/mutual.html',                out: 'src/pages/projects/mutual.astro' },
  { src: 'projects/game-ui.html',               out: 'src/pages/projects/game-ui.astro' },
  { src: 'projects/the-tree-service.html',      out: 'src/pages/projects/the-tree-service.astro' },
];

// Path fixes required by the move to public/ + directory-format URLs.
const REWRITES = [
  // Internal .html links become clean routes.
  [/(href=")\/?(work|about|build|super-com)\.html(")/g, '$1/$2$3'],
  // mutual-design-system is a public/ passthrough with no Astro route — it must
  // keep its .html extension. Everything else becomes a clean route.
  [/(href=")(?:\.\.\/)?\/?projects\/(?!mutual-design-system)([a-z0-9-]+)\.html(")/g, '$1/projects/$2$3'],
  // Bug 2: blog posts were left with .html and 404'd.
  [/(href=")\/?blog\/posts\/([a-z0-9-]+)\.html(")/g, '$1/blog/posts/$2$3'],
  // Relative asset paths must become absolute: a page at /work/ would otherwise
  // resolve "assets/x.jpg" to /work/assets/x.jpg.
  [/((?:src|href)=")(?:\.\.\/)*assets\//g, '$1/assets/'],
  // Gallery paths built at RUNTIME in JS — no static rewrite would catch these.
  [/'Mutual\/'/g, "'/assets/projects/mutual/'"],
  [/(data-folder=")GameUI\//g, '$1/assets/projects/gameui/'],
  // Gallery dirs live under /assets/projects/ (lowercase) because
  // /projects/Mutual/ collided with the /projects/mutual/ page route on
  // case-insensitive macOS, producing a local build that differed from Linux.
  [/\/projects\/SPNKr\//g, '/assets/projects/spnkr/'],
  [/\/projects\/Checkin\//g, '/assets/projects/checkin/'],
  // Static hrefs into the Mutual gallery folder (the JS-built ones are
  // handled above, but hero images are plain src attributes).
  [/\/projects\/Mutual\//g, '/assets/projects/mutual/'],
  // Bare-relative gallery hero: was src="Mutual/..." which resolved fine from
  // /projects/mutual.html but 404s from the /projects/mutual/ directory URL.
  [/((?:src|href)=")Mutual\//g, '$1/assets/projects/mutual/'],
];

const between = (s, startRe, endRe) => {
  const a = s.search(startRe);
  if (a === -1) return '';
  const from = a + s.match(startRe)[0].length;
  const rest = s.slice(from);
  const b = rest.search(endRe);
  return b === -1 ? rest : rest.slice(0, b);
};

const applyRewrites = (s) => REWRITES.reduce((acc, [re, to]) => acc.replace(re, to), s);

let report = [];

for (const { src, out } of PAGES) {
  const raw = readFileSync(src, 'utf8');

  const title = (raw.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1].trim();
  const description = (raw.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1].trim();
  const styleBlock = (raw.match(/<style>([\s\S]*?)<\/style>/) || [, ''])[1];
  const footerMargin = /<footer[^>]*style="[^"]*margin-top/.test(raw);

  // Body: everything the page owns, between the shared nav and the shared footer.
  let body = between(raw, /<\/nav>/, /<footer/).trim();

  // After the footer: lightbox markup and page-specific inline scripts.
  let tail = between(raw, /<\/footer>/, /<\/body>/);
  tail = tail.replace(/<script[^>]*src="[^"]*main\.js[^"]*"[^>]*>\s*<\/script>/g, '').trim();

  body = applyRewrites(body);
  tail = applyRewrites(tail);

  const depth = relative(dirname(out), 'src/layouts/Base.astro').replace(/\\/g, '/');

  const parts = [];
  parts.push('---');
  parts.push(`import Base from '${depth}';`);
  parts.push('---');
  parts.push('');
  const attrs = [
    `title={${JSON.stringify(title)}}`,
    description ? `description={${JSON.stringify(description)}}` : null,
    footerMargin ? 'footerMargin' : null,
  ].filter(Boolean).join('\n  ');
  parts.push(`<Base\n  ${attrs}\n>`);
  parts.push(body);
  if (tail) parts.push(`\n<Fragment slot="after-footer">\n${tail}\n</Fragment>`);
  parts.push('</Base>');
  if (styleBlock.trim()) {
    // is:global preserves the original semantics: these selectors were written
    // against a plain page-level <style> block, not Astro's scoped styles.
    parts.push(`\n<style is:global>${styleBlock}</style>`);
  }

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, parts.join('\n') + '\n');

  report.push({
    page: out.replace('src/pages/', ''),
    body: body.split('\n').length,
    style: styleBlock.trim() ? styleBlock.split('\n').length : 0,
    tail: tail ? tail.split('\n').length : 0,
    fm: footerMargin ? 'yes' : '',
  });
}

console.log('\n  page                                  body  style  tail  footerMargin');
console.log('  ' + '-'.repeat(68));
for (const r of report) {
  console.log(`  ${r.page.padEnd(36)} ${String(r.body).padStart(5)} ${String(r.style).padStart(6)} ${String(r.tail).padStart(5)}  ${r.fm}`);
}
console.log(`\n  ${report.length} pages ported.\n`);
