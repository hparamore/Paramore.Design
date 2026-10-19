#!/bin/sh
# Rebuilds the workshop handout PDFs from the HTML sources next to this script.
# Output: public/assets/handouts/uvu/*.pdf (linked from src/pages/uvu.astro).
# Needs Google Chrome installed and a network connection (Space Grotesk loads from Google Fonts).
set -e
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="../../public/assets/handouts/uvu"
mkdir -p "$OUT"
for name in pricing-worksheet contract-checklist; do
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=10000 \
    --print-to-pdf="$OUT/$name.pdf" "file://$PWD/$name.html"
done
ls -la "$OUT"
