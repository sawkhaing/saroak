import asyncio
import os
try:
    from telethon.sync import TelegramClient
    from telethon.sessions import StringSession
except ImportError:
    print("Please install telethon first: pip install telethon")
    exit(1)

print("=========================================================")
print("          Telegram Session Generator")
print("=========================================================")
print("You need an API ID and API HASH from https://my.telegram.org")
print("These will NOT be saved anywhere on your computer.\n")

api_id_input = input("Enter your API ID: ").strip()
api_hash_input = input("Enter your API HASH: ").strip()

if not api_id_input or not api_hash_input:
    print("Error: API ID and API HASH are required.")
    exit(1)

try:
    api_id = int(api_id_input)
except ValueError:
    print("Error: API ID must be a number.")
    exit(1)

# We use an empty StringSession so it generates a new string instead of an sqlite file
client = TelegramClient(StringSession(), api_id, api_hash_input)

async def main():
    print("\nConnecting to Telegram...")
    await client.start()
    
    print("\n=========================================================")
    print("                 ✅ SUCCESS! ✅")
    print("=========================================================")
    print("\nHere is your SESSION_STRING. Keep it secret!")
    print("\n" + client.session.save() + "\n")
    print("=========================================================")
    print("1. Go to your GitHub Repository -> Settings -> Secrets and variables -> Actions")
    print("2. Click 'New repository secret'")
    print("3. Name it: TELEGRAM_SESSION")
    print("4. Paste the long string above as the value.")
    print("5. Do the same for TELEGRAM_API_ID and TELEGRAM_API_HASH.")
    print("=========================================================")

with client:
    client.loop.run_until_complete(main())
