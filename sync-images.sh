#!/bin/bash
# sync-images.sh
#
# Copies images from a local Case Study exports folder into the repo and pushes.
#
# Usage:
#   pnpm sync-images "<local folder name>" "<repo slug>"
#
# Examples:
#   pnpm sync-images "Support Center" ai-resolution-center
#   pnpm sync-images "AI Support" ai-support
#
# Local images are read from:
#   ~/Documents/Case Study/<local folder name>/
#
# Images are written to:
#   apps/portfolio/public/projects/<repo slug>/

set -e

# ── args ────────────────────────────────────────────────────────────────────

LOCAL_FOLDER="$1"
REPO_SLUG="$2"

if [ -z "$LOCAL_FOLDER" ] || [ -z "$REPO_SLUG" ]; then
  echo "Usage: pnpm sync-images \"<local folder name>\" \"<repo slug>\""
  echo "  e.g. pnpm sync-images \"Support Center\" ai-resolution-center"
  exit 1
fi

# ── paths ────────────────────────────────────────────────────────────────────

SRC="$HOME/Documents/Case Study/$LOCAL_FOLDER"
DEST="$(dirname "$0")/apps/portfolio/public/projects/$REPO_SLUG"

if [ ! -d "$SRC" ]; then
  echo "❌  Source folder not found: $SRC"
  exit 1
fi

# Create destination if it doesn't exist yet
mkdir -p "$DEST"

# ── copy ─────────────────────────────────────────────────────────────────────

echo "⬇  Copying images from: $SRC"
echo "   → $DEST"

COPIED=0
for FILE in "$SRC"/*.png "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.webp "$SRC"/*.gif "$SRC"/*.svg; do
  [ -f "$FILE" ] || continue
  BASENAME=$(basename "$FILE")
  DEST_FILE="$DEST/$BASENAME"

  # Skip if identical file already exists
  if [ -f "$DEST_FILE" ] && cmp -s "$FILE" "$DEST_FILE"; then
    echo "   ✓ unchanged  $BASENAME"
    continue
  fi

  cp "$FILE" "$DEST_FILE"
  echo "   + copied     $BASENAME"
  COPIED=$((COPIED + 1))
done

if [ "$COPIED" -eq 0 ]; then
  echo "✅  Nothing new to sync — all images already up to date."
  exit 0
fi

# ── commit & push ─────────────────────────────────────────────────────────────

cd "$(dirname "$0")"

git add "apps/portfolio/public/projects/$REPO_SLUG/"

git commit -m "Sync images: $REPO_SLUG ($COPIED file(s) updated)"

git push

echo ""
echo "✅  Done — $COPIED image(s) synced and pushed."
