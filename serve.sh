#!/usr/bin/env bash
#
# Serve the portfolio locally until you stop it with Ctrl+C.
#
#   ./serve.sh          # http://localhost:4321
#   ./serve.sh 8000     # pick a different port
#
# Safe to re-run: if something is already holding the port, it's cleared first.

set -euo pipefail

PORT="${1:-4321}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$ROOT"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 not found. Install it, or run:  npx serve -l $PORT" >&2
  exit 1
fi

# Reclaim the port if a previous run (or another tool) is still on it.
if lsof -ti :"$PORT" >/dev/null 2>&1; then
  echo "  Port $PORT is in use — stopping the old process."
  lsof -ti :"$PORT" | xargs kill 2>/dev/null || true
  sleep 1
fi

# LAN address, so you can open the page on a phone on the same wifi.
LAN_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"

cleanup() {
  echo ""
  echo "  Server stopped."
  exit 0
}
trap cleanup INT TERM

cat <<BANNER

  Paramore.Design — local preview
  serving: $ROOT

    Site       http://localhost:$PORT
    SPNKr page http://localhost:$PORT/projects/spnkr.html
    Work grid  http://localhost:$PORT/work.html
BANNER

if [ -n "$LAN_IP" ]; then
  echo "    On your phone  http://$LAN_IP:$PORT/projects/spnkr.html"
fi

cat <<'BANNER'

  Edits to HTML/CSS show up on refresh — no restart needed.
  Press Ctrl+C to stop.

BANNER

# Foreground, so Ctrl+C ends it and closing the terminal ends it too.
exec python3 -m http.server "$PORT" --bind 0.0.0.0
