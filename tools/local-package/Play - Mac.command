#!/bin/sh
# Engineering Academy — double-click to play (macOS).
# First time only: right-click this file and choose "Open" (Gatekeeper).
DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=8377
URL="http://localhost:$PORT/"

# If the game is already running in another window, just open it.
if curl -s -o /dev/null --max-time 1 "$URL" 2>/dev/null; then
  open "$URL"
  exit 0
fi

( sleep 1; open "$URL" ) &

echo ""
echo "  ============================================="
echo "   Engineering Academy is running!"
echo "   Play at: $URL"
echo ""
echo "   Keep this window open while you play"
echo "   (minimising it is fine)."
echo "   Close this window when you are done."
echo "  ============================================="
echo ""

exec /usr/bin/perl "$DIR/launcher/serve.pl" "$DIR/app"
