#!/bin/bash

echo "📦 Packaging FormFill Pro for distribution..."
echo ""

cd "$(dirname "$0")/.." || exit

DIST_FILE="formfill-pro.zip"

if [ -f "$DIST_FILE" ]; then
  echo "🗑️  Removing old package..."
  rm "$DIST_FILE"
fi

echo "📝 Creating package from extension/ directory..."

cd extension || exit

zip -r "../$DIST_FILE" . \
  -x "*.DS_Store" \
  -x "*/__MACOSX/*" \
  -x "*.git/*" \
  -x "*node_modules/*" \
  -x "*.env*"

cd ..

if [ -f "$DIST_FILE" ]; then
  SIZE=$(du -h "$DIST_FILE" | cut -f1)
  echo ""
  echo "✅ Package created successfully!"
  echo "📦 File: $DIST_FILE"
  echo "📊 Size: $SIZE"
  echo ""
  echo "Next steps:"
  echo "1. Test the package by loading it in Chrome (chrome://extensions)"
  echo "2. Review PUBLISHING_GUIDE.md for submission instructions"
  echo "3. Upload to Chrome Web Store and Edge Add-ons"
else
  echo ""
  echo "❌ Failed to create package"
  exit 1
fi
