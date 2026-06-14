// ============================================================
// SarOak — Shared UI Components
// components.js · Reusable component generators with BEM naming
// ============================================================

import { getCurrentLang, t, setLang, toggleLang, applyTranslations } from './i18n.js';

// ── Category colour palette ──────────────────────────────────
const CATEGORY_COLORS = {
  'novel':       ['#6366f1', '#818cf8'],
  'short-story': ['#8b5cf6', '#a78bfa'],
  'poetry':      ['#ec4899', '#f472b6'],
  'history':     ['#f59e0b', '#fbbf24'],
  'self-help':   ['#10b981', '#34d399'],
  'technology':  ['#06b6d4', '#22d3ee'],
};

// ── 1. generateCoverSVG ──────────────────────────────────────
/**
 * Generates a data:image/svg+xml book cover with decorative elements,
 * title / author text and SarOak branding.
 * @param {Object} book
 * @returns {string} data URI
 */
export function generateCoverSVG(book) {
  const [c1, c2] = CATEGORY_COLORS[book.category] || ['#6366f1', '#818cf8'];
  const lang = getCurrentLang();
  const title  = book.title[lang]  || book.title.en;
  const author = book.author[lang] || book.author.en;

  // Truncate long titles for SVG display
  const maxTitleLen = 20;
  const displayTitle =
    title.length > maxTitleLen ? title.substring(0, maxTitleLen) + '…' : title;

  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="280" height="400" viewBox="0 0 280 400">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${c1}"/>
          <stop offset="100%" style="stop-color:${c2}"/>
        </linearGradient>
        <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0)"/>
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.4)"/>
        </linearGradient>
      </defs>
      <rect width="280" height="400" rx="8" fill="url(#bg)"/>
      <rect width="280" height="400" rx="8" fill="url(#overlay)"/>
      <circle cx="220" cy="60" r="40" fill="rgba(255,255,255,0.1)"/>
      <circle cx="240" cy="40" r="20" fill="rgba(255,255,255,0.08)"/>
      <circle cx="40" cy="340" r="50" fill="rgba(255,255,255,0.06)"/>
      <line x1="30" y1="160" x2="250" y2="160" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <line x1="30" y1="170" x2="180" y2="170" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
      <text x="140" y="220" text-anchor="middle" fill="white" font-family="Inter, sans-serif" font-size="18" font-weight="700">${displayTitle}</text>
      <text x="140" y="260" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Inter, sans-serif" font-size="13" font-weight="400">${author}</text>
      <text x="140" y="370" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="Inter, sans-serif" font-size="11" font-weight="500">SarOak</text>
    </svg>`)}`;
}

// ── 2. createBookCard ────────────────────────────────────────
/**
 * Creates a book-card DOM element using BEM class names.
 * @param {Object} book
 * @returns {HTMLElement}
 */
export function createBookCard(book) {
  const lang     = getCurrentLang();
  const title    = book.title[lang]  || book.title.en;
  const author   = book.author[lang] || book.author.en;
  const coverSrc = generateCoverSVG(book);

  const card = document.createElement('div');
  card.className = 'book-card animate-on-scroll';
  card.dataset.category = book.category;
  card.dataset.bookId   = book.id;

  card.innerHTML = `
    <a href="/book-detail.html?id=${book.id}" class="book-card-link" style="text-decoration:none;color:inherit;display:block;height:100%">
      <div class="book-card__cover">
        <img src="${coverSrc}" alt="${title}" loading="lazy" />
        <div class="book-card__overlay">
          <h3 class="book-card__title">${title}</h3>
          <p class="book-card__author">${author}</p>
          <span class="btn-view-details" data-i18n="book.viewDetails">View Details</span>
        </div>
      </div>
    </a>
  `;

  return card;
}

// ── 3. getCategoryName ───────────────────────────────────────
/**
 * Returns a localised display name for a category ID.
 * @param {string} categoryId
 * @returns {string}
 */
export function getCategoryName(categoryId) {
  const lang = getCurrentLang();
  const categoryNames = {
    'novel':       { en: 'Novel',     mm: 'ဝတ္ထု' },
    'short-story': { en: 'Short Story', mm: 'ဝတ္ထုတို' },
    'poetry':      { en: 'Poetry',    mm: 'ကဗျာ' },
    'history':     { en: 'History',   mm: 'သမိုင်း' },
    'self-help':   { en: 'Self-Help', mm: 'ကိုယ်တိုင်ဖွံ့ဖြိုးရေး' },
    'technology':  { en: 'Technology', mm: 'နည်းပညာ' },
  };
  return categoryNames[categoryId]?.[lang] || categoryId;
}

// ── 4. createCategoryCard ────────────────────────────────────
/**
 * Creates a category-card DOM element (link).
 * @param {Object} category
 * @returns {HTMLElement}
 */
export function createCategoryCard(category) {
  const lang = getCurrentLang();
  const name = category.name[lang] || category.name.en;

  const card = document.createElement('a');
  card.href      = `/books.html?category=${category.id}`;
  card.className = 'category-card glass-card animate-on-scroll';

  card.innerHTML = `
    <span class="category-icon">${category.icon}</span>
    <h3 class="category-name">${name}</h3>
    <span class="category-count">${category.count} ${t('hero.stats.books')}</span>
  `;

  return card;
}

// ── 5. populateFooterCategories ──────────────────────────────
/**
 * Populates the #footerCategories list with category links.
 * @param {Array} categories
 */
export function populateFooterCategories(categories) {
  const container = document.getElementById('footerCategories');
  if (!container) return;

  const lang = getCurrentLang();
  container.innerHTML = categories
    .map((cat) => {
      const name = cat.name[lang] || cat.name.en;
      return `<li><a href="/books.html?category=${cat.id}" class="footer__link">${name}</a></li>`;
    })
    .join('');
}

// ── 6. initScrollAnimations ──────────────────────────────────
/**
 * Uses IntersectionObserver to reveal `.animate-on-scroll` elements
 * by adding the `.visible` class when they enter the viewport.
 */
export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document
    .querySelectorAll('.animate-on-scroll:not(.visible)')
    .forEach((el) => observer.observe(el));
}

// ── 7. initNavbar ────────────────────────────────────────────
/**
 * Adds a scroll-based `.scrolled` class to `.navbar` and wires up
 * the hamburger menu toggle.
 */
export function initNavbar() {
  const navbar = document.querySelector('.navbar');

  // Scroll effect — add .scrolled when scrolled past 50 px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }
}

// ── 8. initThemeToggle ───────────────────────────────────────
/**
 * Loads the saved theme from localStorage ('saroak-theme') and
 * toggles `data-theme` on the body element.  Default is 'dark'.
 */
export function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const body   = document.body;
  const icon   = toggle?.querySelector('.theme-icon');

  // Load saved theme (default: dark)
  const savedTheme = localStorage.getItem('saroak-theme') || 'dark';
  body.dataset.theme = savedTheme;
  if (icon) icon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  toggle?.addEventListener('click', () => {
    const current = body.dataset.theme;
    const next    = current === 'dark' ? 'light' : 'dark';
    body.dataset.theme = next;
    localStorage.setItem('saroak-theme', next);
    if (icon) icon.textContent = next === 'dark' ? '🌙' : '☀️';
  });
}

// ── 9. initCommon ────────────────────────────────────────────
/**
 * Shared bootstrap for every page:
 *  • theme toggle
 *  • i18n translations
 *  • navbar scroll / hamburger
 *  • language toggle buttons
 *  • scroll animations
 */
export async function initCommon() {
  // 1. Theme
  initThemeToggle();

  // 2. Translations
  // Ensure the <html> lang attribute is set immediately on load
  const currentLang = getCurrentLang();
  setLang(currentLang);
  applyTranslations();

  // 3. Navbar
  initNavbar();

  // 4. Language toggle — individual button handlers
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    const buttons = langToggle.querySelectorAll('.lang-toggle__btn');

    // Set initial active state
    const currentLang = getCurrentLang();
    buttons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    // Click handler for each button
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const chosenLang = btn.dataset.lang;
        setLang(chosenLang);

        // Update active states
        buttons.forEach((b) => {
          b.classList.toggle('active', b.dataset.lang === chosenLang);
        });

        applyTranslations();

        // Dispatch langchange for page-specific listeners
        window.dispatchEvent(
          new CustomEvent('langchange', { detail: { lang: chosenLang } })
        );
      });
    });
  }

  // 5. Scroll animations
  initScrollAnimations();

  // 6. Latest GitHub Commit
  fetchLatestCommit();
}

/**
 * Fetches the latest commit from the GitHub repository and injects it into the footer.
 */
async function fetchLatestCommit() {
  const containers = document.querySelectorAll('.footer__commit');
  if (containers.length === 0) return;

  try {
    const response = await fetch('https://api.github.com/repos/sawkhaing/saroak/commits/master');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    const sha = data.sha.substring(0, 7);
    const date = new Date(data.commit.committer.date).toLocaleDateString();
    const message = data.commit.message.split('\n')[0]; // get only the first line of the commit message
    
    const html = `
      <p style="font-size: var(--fs-xs); color: var(--clr-text-secondary); margin-top: var(--sp-2);">
        Latest update: <a href="${data.html_url}" target="_blank" rel="noopener noreferrer" style="color: var(--clr-accent-cyan); text-decoration: none;">[${sha}] ${message}</a> (${date})
      </p>
    `;

    containers.forEach(c => {
      c.innerHTML = html;
    });
  } catch (error) {
    console.error('Failed to fetch latest commit:', error);
  }
}
