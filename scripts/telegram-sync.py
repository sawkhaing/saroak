import asyncio
import os
import json
import logging
import sys
from pathlib import Path
try:
    from telethon.sync import TelegramClient
    from telethon.sessions import StringSession
    from telethon.errors import FloodWaitError
except ImportError:
    print("Please install telethon: pip install telethon")
    sys.exit(1)

# Configure Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Environment Variables
API_ID = os.environ.get('TELEGRAM_API_ID')
API_HASH = os.environ.get('TELEGRAM_API_HASH')
SESSION_STRING = os.environ.get('TELEGRAM_SESSION')
CHANNEL_ENV = os.environ.get('TELEGRAM_CHANNEL', '@myanmar_ebooks') # Replace with default channel if needed
try:
    CHANNEL_USERNAME = int(CHANNEL_ENV)
except ValueError:
    CHANNEL_USERNAME = CHANNEL_ENV

# Constants
MAX_DOWNLOADS = int(os.environ.get('MAX_DOWNLOADS', 5))
VALID_EXTENSIONS = ['.epub', '.pdf', '.azw3', '.kfx']
PUBLIC_BOOKS_DIR = Path('public/books')
STATE_FILE = Path('telegram-sync-state.json')

def load_state():
    if STATE_FILE.exists():
        with open(STATE_FILE, 'r') as f:
            data = json.load(f)
            return data.get('last_message_id', 0)
    return 0

def save_state(last_id):
    with open(STATE_FILE, 'w') as f:
        json.dump({'last_message_id': last_id}, f, indent=2)

async def main():
    if not all([API_ID, API_HASH, SESSION_STRING]):
        logging.error("Missing required environment variables. Ensure TELEGRAM_API_ID, TELEGRAM_API_HASH, and TELEGRAM_SESSION are set.")
        sys.exit(1)

    PUBLIC_BOOKS_DIR.mkdir(parents=True, exist_ok=True)
    last_message_id = load_state()
    logging.info(f"Starting sync. Resuming from message ID: {last_message_id}")

    client = TelegramClient(StringSession(SESSION_STRING), int(API_ID), API_HASH)

    async with client:
        logging.info(f"Connected to Telegram. Fetching channel: {CHANNEL_USERNAME}")
        
        highest_id_processed = last_message_id
        download_count = 0

        # Iterate over messages newer than the last checked ID, starting from oldest to newest
        async for message in client.iter_messages(CHANNEL_USERNAME, min_id=last_message_id, reverse=True):
            if download_count >= MAX_DOWNLOADS:
                logging.info(f"Reached maximum downloads for this run ({MAX_DOWNLOADS}). Will resume later.")
                break

            # Keep track of the highest ID seen so we can resume from here next time
            if message.id > highest_id_processed:
                highest_id_processed = message.id

            if not message.document:
                continue

            # Cloudflare Pages has a strict 25MB limit for static assets
            if message.document.size > 24 * 1024 * 1024:
                logging.info(f"Skipping document (too large for Cloudflare): {message.document.size / 1024 / 1024:.2f} MB")
                continue

            # Extract filename and extension safely
            filename = None
            for attr in message.document.attributes:
                if hasattr(attr, 'file_name'):
                    filename = attr.file_name
                    break

            if not filename:
                continue

            ext = Path(filename).suffix.lower()
            if ext not in VALID_EXTENSIONS:
                continue

            final_path = PUBLIC_BOOKS_DIR / filename
            temp_path = PUBLIC_BOOKS_DIR / f"{filename}.temp"

            # Skip if already exists locally
            if final_path.exists():
                logging.info(f"File already exists locally, skipping: {filename}")
                continue

            logging.info(f"Downloading: {filename} ({message.document.size} bytes)")

            try:
                # Download to a temporary file
                await client.download_media(message, file=str(temp_path))

                # Verify file size to catch incomplete downloads
                if temp_path.exists() and temp_path.stat().st_size == message.document.size:
                    temp_path.rename(final_path)
                    logging.info(f"✅ Successfully downloaded: {filename}")
                    download_count += 1
                else:
                    logging.error(f"❌ Download incomplete or failed size check: {filename}")
                    if temp_path.exists():
                        temp_path.unlink()
                    continue

                # Be a good citizen, wait before next download to avoid Rate Limits
                logging.info("Sleeping for 3 seconds...")
                await asyncio.sleep(3)

            except FloodWaitError as e:
                logging.warning(f"⚠️ Hit FloodWait limit! Sleeping for {e.seconds} seconds as requested by Telegram...")
                await asyncio.sleep(e.seconds)
                # Note: We won't retry this specific file immediately to simplify logic, 
                # but because we don't update highest_id_processed yet if we break, it's fine.
                break
            except Exception as e:
                logging.error(f"❌ Error downloading {filename}: {str(e)}")
                if temp_path.exists():
                    temp_path.unlink()
                continue

        # Save the highest ID we successfully looked at
        if highest_id_processed > last_message_id:
            save_state(highest_id_processed)
            logging.info(f"State saved. New last_message_id: {highest_id_processed}")
        else:
            logging.info("No new books found.")

if __name__ == "__main__":
    asyncio.run(main())
