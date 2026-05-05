#!/usr/bin/env bash
# Regenerate assets/Hunter-Paramore-Resume.pdf from resume.html
# Usage: ./build-resume.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
HTML="$ROOT/resume.html"
PDF="$ROOT/assets/Hunter-Paramore-Resume.pdf"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [[ ! -f "$HTML" ]]; then
  echo "❌ resume.html not found at $HTML"
  exit 1
fi

if [[ ! -x "$CHROME" ]]; then
  echo "❌ Google Chrome not found at $CHROME"
  exit 1
fi

mkdir -p "$ROOT/assets"

echo "📄 Building resume PDF..."
"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$PDF" \
  --print-to-pdf-no-header \
  "file://$HTML" 2>&1 | tail -1

if [[ -f "$PDF" ]]; then
  SIZE=$(du -h "$PDF" | cut -f1)
  echo "✅ Done — $PDF ($SIZE)"
  echo ""
  echo "Next: commit and push"
  echo "  git add resume.html assets/Hunter-Paramore-Resume.pdf"
  echo "  git commit -m \"chore: update resume content\""
  echo "  git push origin main"
else
  echo "❌ PDF build failed"
  exit 1
fi
