#!/bin/sh
# Engineering Academy — double-click to play (macOS).
# If macOS blocks the first launch ("could not verify"), see README.txt —
# either run it once via Terminal (type: sh, then drag this file in) or use
# System Settings > Privacy & Security > "Open Anyway".
DIR="$(cd "$(dirname "$0")" && pwd)"

# Once we ARE running, clear the download-quarantine flag from the whole
# package (best effort) so every future launch is a plain double-click.
/usr/bin/xattr -dr com.apple.quarantine "$DIR" 2>/dev/null || true
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
