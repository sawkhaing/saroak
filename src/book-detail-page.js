// book-detail-page.js — Book detail page logic
import './style.css';
import { books, categories } from './books-data.js';
import { getCurrentLang, t } from './i18n.js';
import { createBookCard, generateCoverSVG, getCategoryName, populateFooterCategories, initCommon, initScrollAnimations } from './components.js';

async function initBookDetailPage() {
  await initCommon();

  const params = new URLSearchParams(window.location.search);
  const bookId = params.get('id');

  if (!bookId) {
    window.location.href = '/books.html';
    return;
  }

  const book = books.find(b => b.id === bookId);
  if (!book) {
    window.location.href = '/books.html';
    return;
  }

  renderBookDetail(book);
  renderRelatedBooks(book);
  populateFooterCategories(categories);

  window.addEventListener('langchange', () => {
    renderBookDetail(book);
    renderRelatedBooks(book);
    populateFooterCategories(categories);
  });
}

function renderBookDetail(book) {
  const lang = getCurrentLang();
  const title = book.title[lang] || book.title.en;
  const author = book.author[lang] || book.author.en;
  const description = book.description[lang] || book.description.en;
  const categoryName = getCategoryName(book.category);

  // Update page title
  document.title = `${title} - SarOak`;

  // Breadcrumb
  const breadcrumb = document.getElementById('breadcrumbTitle');
  if (breadcrumb) breadcrumb.textContent = title;

  // Cover
  const coverContainer = document.getElementById('bookCover');
  if (coverContainer) {
    coverContainer.innerHTML = `<img src="${generateCoverSVG(book)}" alt="${title}" class="book-cover-img" />`;
  }

  // Category badge
  const categoryBadge = document.getElementById('bookCategory');
  if (categoryBadge) {
    categoryBadge.textContent = categoryName;
    categoryBadge.className = `book-category-badge category-${book.category}`;
  }

  // Title & Author
  const titleEl = document.getElementById('bookTitle');
  if (titleEl) titleEl.textContent = title;

  const authorEl = document.getElementById('bookAuthor');
  if (authorEl) authorEl.textContent = author;

  // Meta
  const pagesEl = document.getElementById('bookPages');
  if (pagesEl) {
    const text = pagesEl.querySelector('.meta-text');
    if (text) text.textContent = `${book.pages} ${t('book.pages')}`;
  }

  const formatEl = document.getElementById('bookFormat');
  if (formatEl) {
    const text = formatEl.querySelector('.meta-text');
    if (text) text.textContent = book.format;
  }

  const sizeEl = document.getElementById('bookSize');
  if (sizeEl) {
    const text = sizeEl.querySelector('.meta-text');
    if (text) text.textContent = book.fileSize;
  }

  const dateEl = document.getElementById('bookDate');
  if (dateEl) {
    const text = dateEl.querySelector('.meta-text');
    if (text) text.textContent = new Date(book.publishDate).toLocaleDateString(lang === 'mm' ? 'my-MM' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Description
  const descEl = document.getElementById('bookDescription');
  if (descEl) descEl.textContent = description;

  // Download button
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.href = book.downloadUrl;
    downloadBtn.setAttribute('download', '');
  }
}

function renderRelatedBooks(book) {
  const container = document.getElementById('relatedBooks');
  if (!container) return;
  container.innerHTML = '';

  const related = books
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  if (related.length === 0) {
    // If no same-category books, show random books
    const others = books.filter(b => b.id !== book.id).slice(0, 4);
    others.forEach(b => container.appendChild(createBookCard(b)));
  } else {
    related.forEach(b => container.appendChild(createBookCard(b)));
  }

  initScrollAnimations();
}

initBookDetailPage();
