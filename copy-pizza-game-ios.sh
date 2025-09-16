#!/bin/bash

SRC="/Users/charleswhetstone/Documents/DataProjects/portfolio-website"
DEST="/Users/charleswhetstone/Documents/DataProjects/pizza-game-ios"

mkdir -p "$DEST/assets"

cp "$SRC/pizza-game.html" "$DEST/"
cp "$SRC/assets/pizza-game-scores.json" "$DEST/assets/"
cp -R "$SRC/assets/" "$DEST/assets/"

echo "✅ Pizza Game files copied to $DEST"
chmod +x /Users/charleswhetstone/Documents/DataProjects/portfolio-website
#!/bin/bash

SRC="/Users/charleswhetstone/Documents/DataProjects/portfolio-website"
DEST="/Users/charleswhetstone/Documents/DataProjects/pizza-game-ios"

mkdir -p "$DEST/assets"

cp "$SRC/pizza-game.html" "$DEST/"
cp "$SRC/assets/pizza-game-scores.json" "$DEST/assets/"
cp -R "$SRC/assets/" "$DEST/assets/"

echo "✅ Pizza Game files copied to $DEST"

