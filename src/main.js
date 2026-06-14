// main.js — Homepage logic for SarOak
import './style.css';
import { books, categories } from './books-data.js';
import { createBookCard, createCategoryCard, populateFooterCategories, initCommon } from './components.js';

async function initHomePage() {
  // Common setup (theme, lang, navbar, scroll animations)
  await initCommon();

  renderFeaturedBooks();
  renderCategories();
  renderRecentBooks();
  populateFooterCategories(categories);

  // Re-render on language change
  window.addEventListener('langchange', () => {
    renderFeaturedBooks();
    renderCategories();
    renderRecentBooks();
    populateFooterCategories(categories);
  });

  // Newsletter form
  const form = document.getElementById('newsletterForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (input?.value) {
      alert('Thank you for subscribing! 🎉');
      input.value = '';
    }
  });
}

function renderFeaturedBooks() {
  const container = document.getElementById('featuredBooks');
  if (!container) return;
  container.innerHTML = '';

  const featured = books.filter(b => b.featured).slice(0, 4);
  featured.forEach(book => {
    container.appendChild(createBookCard(book));
  });

  // Re-init scroll animations for new elements
  const { initScrollAnimations } = import('./components.js');
}

function renderCategories() {
  const container = document.getElementById('categoriesGrid');
  if (!container) return;
  container.innerHTML = '';

  categories.forEach(cat => {
    container.appendChild(createCategoryCard(cat));
  });
}

function renderRecentBooks() {
  const container = document.getElementById('recentBooks');
  if (!container) return;
  container.innerHTML = '';

  const recent = [...books]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 4);

  recent.forEach(book => {
    container.appendChild(createBookCard(book));
  });
}

// Initialize
initHomePage();
