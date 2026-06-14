// about-page.js — About page logic
import './style.css';
import { categories } from './books-data.js';
import { populateFooterCategories, initCommon, initScrollAnimations } from './components.js';

async function initAboutPage() {
  await initCommon();
  populateFooterCategories(categories);

  // Re-init scroll animations for about page cards
  setTimeout(() => initScrollAnimations(), 100);

  window.addEventListener('langchange', () => {
    populateFooterCategories(categories);
  });
}

initAboutPage();
