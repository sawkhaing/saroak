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
  renderFormatFilters();
  renderBooks();
  populateFooterCategories(categories);
  setupEventListeners();

  window.addEventListener('langchange', () => {
    renderCategoryFilters();
    renderAuthorFilters();
    renderFormatFilters();
    renderBooks();
    populateFooterCategories(categories);
  });
}

let currentAuthors = [];
let currentFormats = [];
let currentView = 'grid';
let currentPage = 1;
const itemsPerPage = 24;

function renderCategoryFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;

  container.innerHTML = `
    <button class="filter-chip ${currentCategory === 'all' ? 'active' : ''}" data-category="all">${t('filter.all')}</button>
    ${categories.map(cat => {
      const lang = getCurrentLang();
      const name = cat.name[lang] || cat.name.en;
      return `<button class="filter-chip ${currentCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">${name}</button>`;
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
  const select = document.getElementById('authorFilterSelect');
  if (!select) return;

  // Extract unique authors
  const authorsSet = new Set();
  books.forEach(b => {
    if (b.author && b.author.en) {
      authorsSet.add(b.author.en);
    }
  });

  const uniqueAuthors = Array.from(authorsSet).sort();

  select.innerHTML = '<option value="">All Authors</option>' + uniqueAuthors.map(author => `
    <option value="${author}" ${currentAuthors.includes(author) ? 'selected' : ''}>${author}</option>
  `).join('');

  select.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val) {
      currentAuthors = [val]; // Single author select for simplicity in dropdown
    } else {
      currentAuthors = [];
    }
    currentPage = 1;
    renderBooks();
  });
}

function renderFormatFilters() {
  const select = document.getElementById('formatFilterSelect');
  if (!select) return;

  // Extract unique formats
  const formatsSet = new Set();
  books.forEach(b => {
    if (b.formats && Array.isArray(b.formats)) {
      b.formats.forEach(f => {
        if (f.type) formatsSet.add(f.type.toUpperCase());
      });
    }
  });

  const uniqueFormats = Array.from(formatsSet).sort();

  select.innerHTML = '<option value="">All Formats</option>' + uniqueFormats.map(format => `
    <option value="${format}" ${currentFormats.includes(format) ? 'selected' : ''}>${format}</option>
  `).join('');

  select.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val) {
      currentFormats = [val];
    } else {
      currentFormats = [];
    }
    currentPage = 1;
    renderBooks();
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

  // Format filter
  if (currentFormats.length > 0) {
    filtered = filtered.filter(b => {
      if (!b.formats || !Array.isArray(b.formats)) return false;
      const bookFormats = b.formats.map(f => f.type ? f.type.toUpperCase() : '');
      return currentFormats.some(f => bookFormats.includes(f));
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

  renderActiveFilters();
}

function renderActiveFilters() {
  const container = document.getElementById('activeFilters');
  if (!container) return;

  let pillsHtml = '';
  let filterCount = 0;

  // Search pill
  if (currentSearch) {
    pillsHtml += `
      <div class="filter-pill">
        <span>Search: ${currentSearch}</span>
        <button class="filter-pill-remove" data-type="search">&times;</button>
      </div>`;
    filterCount++;
  }

  // Category pill
  if (currentCategory !== 'all') {
    const lang = getCurrentLang();
    const cat = categories.find(c => c.id === currentCategory);
    const catName = cat ? (cat.name[lang] || cat.name.en) : currentCategory;
    pillsHtml += `
      <div class="filter-pill">
        <span>Category: ${catName}</span>
        <button class="filter-pill-remove" data-type="category">&times;</button>
      </div>`;
    filterCount++;
  }

  // Author pills
  currentAuthors.forEach(author => {
    pillsHtml += `
      <div class="filter-pill">
        <span>Author: ${author}</span>
        <button class="filter-pill-remove" data-type="author" data-value="${author}">&times;</button>
      </div>`;
    filterCount++;
  });

  // Format pills
  currentFormats.forEach(format => {
    pillsHtml += `
      <div class="filter-pill">
        <span>Format: ${format}</span>
        <button class="filter-pill-remove" data-type="format" data-value="${format}">&times;</button>
      </div>`;
    filterCount++;
  });

  // Clear All button
  if (filterCount > 1) {
    pillsHtml += `<button class="btn-clear-filters" id="clearAllFilters">Clear All</button>`;
  }

  container.innerHTML = pillsHtml;

  // Event Listeners for pills
  container.querySelectorAll('.filter-pill-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.currentTarget.dataset.type;
      const value = e.currentTarget.dataset.value;

      if (type === 'search') {
        currentSearch = '';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
      } else if (type === 'category') {
        currentCategory = 'all';
        renderCategoryFilters();
      } else if (type === 'author') {
        currentAuthors = currentAuthors.filter(a => a !== value);
        renderAuthorFilters();
      } else if (type === 'format') {
        currentFormats = currentFormats.filter(f => f !== value);
        renderFormatFilters();
      }

      currentPage = 1;
      renderBooks();
    });
  });

  // Event Listener for Clear All
  const clearAllBtn = document.getElementById('clearAllFilters');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      currentSearch = '';
      currentCategory = 'all';
      currentAuthors = [];
      currentFormats = [];
      
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.value = '';
      
      renderCategoryFilters();
      renderAuthorFilters();
      renderFormatFilters();
      currentPage = 1;
      renderBooks();
    });
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
