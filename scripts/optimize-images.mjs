// Resize and re-encode site images, then rewrite every reference to match.
//
//   node scripts/optimize-images.mjs --dry     # report only
//   node scripts/optimize-images.mjs           # write
//
// Why formats change:
//   opaque      -> .jpg   (photos and screenshots; JPEG is far smaller than PNG)
//   transparent -> .webp  (keeps alpha, and unlike PNG-256 it does not band the
//                          photographic content inside the Mutual screenshots)
//
// Originals stay recoverable in git history. Source art lives outside the repo.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const ROOT = 'public/assets';

// Max edge by where the image is actually displayed. Cards never render wider
// than ~700px, covers ~1100px, so these carry 2x retina headroom.
const TARGETS = [
  [/\/projects\/mutual\/\d|\/projects\/mutual\/[A-Z]/, 900],   // gallery cards, small
  [/cover\.(png|jpg|jpeg)$/i, 1600],
  [/hero/i, 1400],
  [/\/images\/blog\//, 1400],
  [/\/projects\/spnkr\//, 1400],
  [/./, 1200],
];
const targetFor = (p) => TARGETS.find(([re]) => re.test(p))[1];

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(d, e.name);
  return e.isDirectory() ? walk(p) : [p];
});

const sh = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8' }).trim();
const kb = (p) => Math.round(fs.statSync(p).size / 1024);

// Referenced by public/Venture-Generator.html, a passthrough that must stay
// byte-identical, via an absolute og:image URL. Renaming it breaks the social
// card on a link that has already been shared. Left completely alone.
const SKIP = [/venture-generator-og\.png$/i];

const files = walk(ROOT)
  .filter((f) => /\.(png|jpe?g)$/i.test(f))
  .filter((f) => !SKIP.some((re) => re.test(f)));
let before = 0, after = 0;
const renames = [];

for (const f of files) {
  const isOpaque = sh('magick', ['identify', '-format', '%[opaque]', f]) === 'True';
  const max = targetFor(f);
  const ext = isOpaque ? '.jpg' : '.webp';
  const out = f.replace(/\.(png|jpe?g)$/i, ext);
  const b = kb(f); before += b;

  if (DRY) {
    const tmp = `/tmp/opt-probe${ext}`;
    if (isOpaque) {
      sh('magick', [f, '-resize', `${max}x${max}>`, '-background', 'white',
                    '-alpha', 'remove', '-alpha', 'off', '-quality', '85', '-strip', tmp]);
    } else {
      sh('magick', [f, '-resize', `${max}x${max}>`, '-quality', '86', '-define', 'webp:alpha-quality=100', '-strip', tmp]);
    }
    const a = kb(tmp); after += a;
    if (b - a > 40) console.log(`  ${String(b).padStart(5)} -> ${String(a).padStart(5)} KB  ${f.replace(ROOT + '/', '')}${f !== out ? '  =>  ' + path.basename(out) : ''}`);
    fs.rmSync(tmp, { force: true });
    continue;
  }

  if (isOpaque) {
    sh('magick', [f, '-resize', `${max}x${max}>`, '-background', 'white',
                  '-alpha', 'remove', '-alpha', 'off', '-quality', '85', '-strip', out]);
  } else {
    sh('magick', [f, '-resize', `${max}x${max}>`, '-quality', '86', '-define', 'webp:alpha-quality=100', '-strip', out]);
  }
  after += kb(out);
  if (out !== f) { fs.rmSync(f); renames.push([f.replace('public', ''), out.replace('public', '')]); }
}

console.log(`\n  ${DRY ? 'PROJECTED' : 'DONE'}: ${(before / 1024).toFixed(1)} MB -> ${(after / 1024).toFixed(1)} MB  (${Math.round(100 - (after / before) * 100)}% smaller)`);

if (!DRY && renames.length) {
  fs.writeFileSync('/tmp/renames.json', JSON.stringify(renames, null, 1));
  console.log(`  ${renames.length} files changed extension — reference map at /tmp/renames.json`);
}
