#!/bin/sh
# Engineering Academy — run this to play (Linux).
# If double-clicking opens it in a text editor, run it from a terminal:
#   sh "Play - Linux.sh"
DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=8377
URL="http://localhost:$PORT/"

open_browser() {
  if command -v xdg-open >/dev/null 2>&1; then xdg-open "$1"
  elif command -v sensible-browser >/dev/null 2>&1; then sensible-browser "$1"
  else echo "  Open this address in your browser: $1"
  fi
}

# If the game is already running in another window, just open it.
if command -v curl >/dev/null 2>&1 && curl -s -o /dev/null --max-time 1 "$URL" 2>/dev/null; then
  open_browser "$URL"
  exit 0
fi

( sleep 1; open_browser "$URL" ) &

echo ""
echo "  ============================================="
echo "   Engineering Academy is running!"
echo "   Play at: $URL"
echo ""
echo "   Keep this window open while you play."
echo "   Press Ctrl+C or close this window when done."
echo "  ============================================="
echo ""

exec perl "$DIR/launcher/serve.pl" "$DIR/app"
