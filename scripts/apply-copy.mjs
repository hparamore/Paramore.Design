// Write edited copy from a copy deck back into its page.
//
//   node scripts/apply-copy.mjs projects/spnkr-copy.md projects/spnkr.html
//
// The deck is generated from the page, and every editable block carries a
// `data-copy="NN"` attribute. This matches on those IDs, so blocks can be
// reordered or reworded in the deck without anything landing in the wrong slot.
//
// Zero dependencies. Prints a diff summary and refuses to write if an ID in the
// deck has no home in the page.

import { readFileSync, writeFileSync, copyFileSync } from 'fs';

const [, , deckPath, pagePath] = process.argv;
if (!deckPath || !pagePath) {
  console.error('usage: node scripts/apply-copy.mjs <copy-deck.md> <page.html>');
  process.exit(1);
}

const deck = readFileSync(deckPath, 'utf8');
let page = readFileSync(pagePath, 'utf8');

// Parse: **[NN]** · _label_  <blank>  ...text...  <blank>  ---
const entries = new Map();
const blockRe = /\*\*\[(\d+)\]\*\*[^\n]*\n\n([\s\S]*?)\n\n---/g;
let m;
while ((m = blockRe.exec(deck)) !== null) {
  entries.set(m[1], m[2].trim());
}

if (!entries.size) {
  console.error('No blocks found. Is this a copy deck? Expected "**[01]** ... ---" sections.');
  process.exit(1);
}

const changed = [];
const missing = [];

for (const [id, text] of entries) {
  // Match the element carrying this id, capturing its inner content.
  const re = new RegExp(`(<(\\w+)[^>]*?data-copy="${id}"[^>]*>)([\\s\\S]*?)(</\\2>)`);
  const hit = page.match(re);
  if (!hit) { missing.push(id); continue; }

  const current = hit[3].trim();
  if (current === text) continue;

  page = page.replace(re, (_, open, tag, __, close) => `${open}${text}${close}`);
  changed.push({ id, from: current, to: text });
}

if (missing.length) {
  console.error(`\n  These IDs are in the deck but not in the page: ${missing.join(', ')}`);
  console.error('  Nothing was written. Regenerate the deck from the current page first.\n');
  process.exit(1);
}

if (!changed.length) {
  console.log('\n  No changes — the page already matches the deck.\n');
  process.exit(0);
}

const backup = pagePath.replace(/\.html$/, '.backup.html');
copyFileSync(pagePath, backup);
writeFileSync(pagePath, page);

const short = (s) => {
  const t = s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return t.length > 68 ? t.slice(0, 68) + '…' : t;
};

console.log(`\n  Updated ${changed.length} block${changed.length === 1 ? '' : 's'} in ${pagePath}`);
console.log(`  Previous version saved to ${backup}\n`);
for (const c of changed) {
  console.log(`  [${c.id}]`);
  console.log(`    was: ${short(c.from)}`);
  console.log(`    now: ${short(c.to)}\n`);
}
