// books-page.js — Books listing page logic
import './style.css';
import { books, categories } from './books-data.js';
import { getCurrentLang, t } from './i18n.js';
import { createBookCard, populateFooterCategories, getCategoryName, initCommon, initScrollAnimations } from './components.js';

let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'newest';

async function initBooksPage() {
  await initCommon();

  // Check URL params for category filter
  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get('category');
  if (urlCategory) {
    currentCategory = urlCategory;
  }

  renderCategoryFilters();
  renderBooks();
  populateFooterCategories(categories);
  setupEventListeners();

  window.addEventListener('langchange', () => {
    renderCategoryFilters();
    renderBooks();
    populateFooterCategories(categories);
  });
}

function renderCategoryFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;

  container.innerHTML = `
    <button class="filter-btn ${currentCategory === 'all' ? 'active' : ''}" data-category="all">${t('filter.all')}</button>
    ${categories.map(cat => {
      const lang = getCurrentLang();
      const name = cat.name[lang] || cat.name.en;
      return `<button class="filter-btn ${currentCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">${name}</button>`;
    }).join('')}
  `;

  // Add click listeners
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderBooks();
    });
  });
}

function getFilteredBooks() {
  let filtered = [...books];

  // Category filter
  if (currentCategory !== 'all') {
    filtered = filtered.filter(b => b.category === currentCategory);
  }

  // Search filter
  if (currentSearch) {
    const lang = getCurrentLang();
    const query = currentSearch.toLowerCase();
    filtered = filtered.filter(b => {
      const title = (b.title[lang] || b.title.en).toLowerCase();
      const author = (b.author[lang] || b.author.en).toLowerCase();
      return title.includes(query) || author.includes(query);
    });
  }

  // Sort
  switch (currentSort) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      break;
    case 'popular':
      filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      break;
    case 'title':
      const lang = getCurrentLang();
      filtered.sort((a, b) => (a.title[lang] || a.title.en).localeCompare(b.title[lang] || b.title.en));
      break;
  }

  return filtered;
}

function renderBooks() {
  const container = document.getElementById('booksGrid');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');
  if (!container) return;

  const filtered = getFilteredBooks();

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.classList.add('hidden');
    noResults?.classList.remove('hidden');
  } else {
    container.classList.remove('hidden');
    noResults?.classList.add('hidden');
    filtered.forEach(book => {
      container.appendChild(createBookCard(book));
    });
    initScrollAnimations();
  }

  if (resultsCount) {
    const lang = getCurrentLang();
    resultsCount.textContent = `${filtered.length} ${t('hero.stats.books')}`;
  }
}

function setupEventListeners() {
  // Search
  const searchInput = document.getElementById('searchInput');
  let searchTimeout;
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentSearch = e.target.value.trim();
      renderBooks();
    }, 300);
  });

  // Sort
  const sortSelect = document.getElementById('sortSelect');
  sortSelect?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderBooks();
  });
}

initBooksPage();
