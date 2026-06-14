#!/bin/bash

BOOKS_DIR="/Users/sawkhaing/Documents/codebase/saroak/public/books"
LOG_FILE="/Users/sawkhaing/Documents/codebase/saroak/conversion_log.txt"

echo "Starting EPUB conversion at $(date)" > "$LOG_FILE"

cd "$BOOKS_DIR" || exit

count=0
for file in *; do
    # Skip if it's a directory
    if [ -d "$file" ]; then continue; fi

    ext="${file##*.}"
    base="${file%.*}"
    
    # We only want to process known ebook formats to convert to epub
    if [[ "$ext" != "kfx" && "$ext" != "azw3" && "$ext" != "mobi" ]]; then
        continue
    fi

    # If epub doesn't exist, generate it
    if [ ! -f "$base.epub" ]; then
        echo "Converting: $file -> $base.epub" | tee -a "$LOG_FILE"
        /Applications/calibre.app/Contents/MacOS/ebook-convert "$file" "$base.epub" >> "$LOG_FILE" 2>&1
        count=$((count+1))
    fi
done

echo "Finished converting $count files at $(date)" | tee -a "$LOG_FILE"
