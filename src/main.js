// main.js — Homepage logic for SarOak
import './style.css';
import { books, categories } from './books-data.js';
import { createBookCard, createCategoryCard, populateFooterCategories, initCommon, initScrollAnimations } from './components.js';

async function initHomePage() {
  // Common setup (theme, lang, navbar, scroll animations)
  await initCommon();

  renderFeaturedBooks();
  renderCategories();
  renderRecentBooks();
  populateFooterCategories(categories);

  // Trigger animations for dynamically added elements
  initScrollAnimations();

  // Re-render on language change
  window.addEventListener('langchange', () => {
    renderFeaturedBooks();
    renderCategories();
    renderRecentBooks();
    populateFooterCategories(categories);
    initScrollAnimations();
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

  // Fallback to slicing the first 4 books if none are explicitly featured
  let featured = books.filter(b => b.featured).slice(0, 4);
  if (featured.length === 0) {
    featured = books.slice(0, 4);
  }

  featured.forEach(book => {
    container.appendChild(createBookCard(book));
  });
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
