<div align="center">
  <img src="public/logo.png" alt="SarOak Logo" width="180" />
</div>

# SarOak — Myanmar Digital Library 📚

[![Live Demo](https://img.shields.io/badge/Live_Demo-saroak.pages.dev-success?style=for-the-badge)](https://saroak.pages.dev/)

SarOak is a fast, beautiful, and open-source digital library built to preserve and distribute Myanmar literature in the digital age. 

🌐 **Live Website:** [https://saroak.pages.dev/](https://saroak.pages.dev/)

## ✨ Features

- **Automated Telegram Pipeline**: Connect a Telegram channel to SarOak, and GitHub Actions will automatically download, categorize, and deploy new ebooks every day! No servers required.
- **Bilingual Interface**: Seamlessly switch between English and Myanmar languages with custom typography settings to ensure perfect Burmese font rendering.
- **Smart Book Parsing**: A custom Node script parses file names and automatically groups multiple ebook formats (EPUB, AZW3, PDF) for the same title into a unified catalog entry!
- **Beautiful UI/UX**: Built with a sleek, responsive CSS Grid layout, a modern flat aesthetic, and full Light/Dark mode support.
- **Instant Client-Side Filtering**: Search, sort, and filter through the entire book collection instantly. Pagination ensures the UI stays snappy even with 1,000+ books.
- **Zero Server Overhead**: The entire frontend is static. Hosted for free on Cloudflare Pages.

## 🚀 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

## 📖 Automated Book Syncing
SarOak uses a powerful, zero-cost pipeline to automatically update your book catalog.
1. Forward an ebook (`.epub`, `.azw3`, `.pdf`) into your connected Telegram Channel.
2. Every midnight (or whenever you manually trigger it), a GitHub Action (`telegram-sync.yml`) wakes up and runs `scripts/telegram-sync.py`.
3. The script downloads the new books into `/public/books/`.
4. The build script (`sync-books.js`) cleans author names, intelligently categorizes the books, and updates `src/books-data.js`.
5. Cloudflare Pages automatically detects the new commits and redeploys the site in seconds!

*To set this up, add `TELEGRAM_API_ID`, `TELEGRAM_API_HASH`, and `TELEGRAM_SESSION` to your GitHub Repository Secrets.*

## 🤝 Contributing
Contributions are welcome! Feel free to open issues, submit pull requests, or share more open-source Myanmar literature to add to the library.

---
*Made with ❤️ for Myanmar readers.*
