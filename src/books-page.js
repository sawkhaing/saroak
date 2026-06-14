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
  renderAuthorFilters();
  renderBooks();
  populateFooterCategories(categories);
  setupEventListeners();

  window.addEventListener('langchange', () => {
    renderCategoryFilters();
    renderAuthorFilters();
    renderBooks();
    populateFooterCategories(categories);
  });
}

let currentAuthors = [];
let currentView = 'grid';
let currentPage = 1;
const itemsPerPage = 24;

function renderCategoryFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;

  container.innerHTML = `
    <button class="filter-chip ${currentCategory === 'all' ? 'active' : ''}" data-category="all" style="width: 100%; text-align: left; justify-content: flex-start; margin-bottom: var(--sp-2);">${t('filter.all')}</button>
    ${categories.map(cat => {
      const lang = getCurrentLang();
      const name = cat.name[lang] || cat.name.en;
      return `<button class="filter-chip ${currentCategory === cat.id ? 'active' : ''}" data-category="${cat.id}" style="width: 100%; text-align: left; justify-content: flex-start; margin-bottom: var(--sp-2);">${name}</button>`;
    }).join('')}
  `;

  // Add click listeners
  container.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      container.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPage = 1;
      renderBooks();
    });
  });
}

function renderAuthorFilters() {
  const container = document.getElementById('authorFilters');
  if (!container) return;

  // Extract unique authors
  const authorsSet = new Set();
  books.forEach(b => {
    if (b.author && b.author.en) {
      authorsSet.add(b.author.en);
    }
  });

  // Limit to top 10 authors to avoid massive sidebar, or just show all
  const uniqueAuthors = Array.from(authorsSet).sort();

  container.innerHTML = uniqueAuthors.map(author => `
    <label class="checkbox-label">
      <input type="checkbox" value="${author}" ${currentAuthors.includes(author) ? 'checked' : ''} /> 
      <span class="checkbox-text">${author}</span>
    </label>
  `).join('');

  // Add event listeners to the new checkboxes
  const authorCheckboxes = container.querySelectorAll('input[type="checkbox"]');
  authorCheckboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      if (e.target.checked) {
        currentAuthors.push(e.target.value);
      } else {
        currentAuthors = currentAuthors.filter(a => a !== e.target.value);
      }
      currentPage = 1;
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

  // Author filter
  if (currentAuthors.length > 0) {
    const lang = getCurrentLang();
    filtered = filtered.filter(b => {
      const authorEn = (b.author.en || '').toLowerCase();
      const authorMm = (b.author.mm || '').toLowerCase();
      return currentAuthors.some(a => authorEn.includes(a.toLowerCase()) || authorMm.includes(a.toLowerCase()));
    });
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
    renderPagination(0);
  } else {
    container.classList.remove('hidden');
    noResults?.classList.add('hidden');
    
    // Pagination slice
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBooks = filtered.slice(startIndex, startIndex + itemsPerPage);
    
    paginatedBooks.forEach(book => {
      container.appendChild(createBookCard(book));
    });
    
    initScrollAnimations();
    renderPagination(filtered.length);
  }

  if (resultsCount) {
    resultsCount.textContent = `${filtered.length} ${t('hero.stats.books')}`;
  }
}

function renderPagination(totalItems) {
  const container = document.getElementById('pagination');
  if (!container) return;
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  container.innerHTML = '';

  if (totalPages <= 1) return;

  // Prev Button
  const prevBtn = document.createElement('button');
  prevBtn.className = 'pagination-btn';
  prevBtn.innerHTML = '←';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderBooks();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  container.appendChild(prevBtn);

  // Page Numbers
  for (let i = 1; i <= totalPages; i++) {
    // Basic logic to show current, first, last, and neighbors
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      const btn = document.createElement('button');
      btn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
      btn.textContent = i;
      btn.onclick = () => {
        currentPage = i;
        renderBooks();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      container.appendChild(btn);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      ellipsis.style.padding = '0 var(--sp-2)';
      ellipsis.style.color = 'var(--clr-text-secondary)';
      container.appendChild(ellipsis);
    }
  }

  // Next Button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'pagination-btn';
  nextBtn.innerHTML = '→';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderBooks();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  container.appendChild(nextBtn);
}

function setupEventListeners() {
  // Search
  const searchInput = document.getElementById('searchInput');
  let searchTimeout;
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentSearch = e.target.value.trim();
      currentPage = 1;
      renderBooks();
    }, 300);
  });

  // Sort
  const sortSelect = document.getElementById('sortSelect');
  sortSelect?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    currentPage = 1;
    renderBooks();
  });

  // View Toggles
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');
  const mainCatalog = document.querySelector('.catalog-main');

  if (gridBtn && listBtn && mainCatalog) {
    gridBtn.addEventListener('click', () => {
      currentView = 'grid';
      mainCatalog.classList.remove('list-view');
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
      currentView = 'list';
      mainCatalog.classList.add('list-view');
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
    });
  }
}

initBooksPage();
