// ============================================================
// SarOak — Internationalization (i18n)
// i18n.js · Bilingual translation system (English ↔ Myanmar)
// ============================================================

const STORAGE_KEY = 'saroak-lang';
const DEFAULT_LANG = 'en';

// ── Translation dictionary ───────────────────────────────────
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.books': 'Books',
    'nav.about': 'About',
    'nav.language': 'မြန်မာ',

    // Hero
    'hero.title': 'The Myanmar Ebook Archive',
    'hero.subtitle':
      'A cozy corner of the internet dedicated to Myanmar literature. We\'ve saved these stories just for you—read, download, and enjoy.',
    'hero.cta': 'Browse Books',
    'hero.learnMore': 'Learn More',
    'hero.stats.books': 'Books',
    'hero.stats.authors': 'Authors',
    'hero.stats.updates.value': 'Daily',
    'hero.stats.updates.label': 'Updates',

    // Sections
    'section.featured': 'Featured Books',
    'section.categories': 'Browse by Category',
    'section.recent': 'Recently Added',
    'section.popular': 'Popular Books',
    'section.newsletter': 'Stay Updated',
    'section.newsletter.desc':
      'Subscribe to get notified about new books and updates.',

    // Book Card
    'book.download': 'Download',
    'book.readMore': 'Read More',
    'book.pages': 'pages',
    'book.relatedBooks': 'Related Books',

    // Filters
    'filter.all': 'All',
    'filter.search': 'Search books...',
    'filter.sortBy': 'Sort by',
    'filter.newest': 'Newest',
    'filter.popular': 'Popular',
    'filter.title': 'Title',

    // About
    'about.title': 'About SarOak',
    'about.mission': 'Our Mission',
    'about.mission.text':
      'SarOak is dedicated to preserving and promoting Myanmar literature in the digital age. We believe every reader deserves access to great books.',
    'about.contact': 'Contact Us',
    'about.vision': 'Our Vision',
    'about.vision.text': 'To become Myanmar\'s largest free digital library, connecting readers with literature that inspires, educates, and entertains.',
    'about.offer': 'What We Offer',
    'about.offer.text': 'Free access to a curated collection of Myanmar ebooks across all genres — novels, poetry, history, self-help, and more.',
    'about.opensource': 'Open Source',
    'about.opensource.text': 'SarOak is an open-source project. Contribute, suggest improvements, or submit books through our GitHub repository.',
    'about.contribute': 'How to Contribute',
    'about.step1.title': 'Submit a Book',
    'about.step1.text': 'Have a Myanmar ebook you\'d like to share? Contact us to add it to our collection.',
    'about.step2.title': 'Report Issues',
    'about.step2.text': 'Found a broken link or incorrect information? Let us know so we can fix it.',
    'about.step3.title': 'Spread the Word',
    'about.step3.text': 'Share SarOak with friends and fellow readers to help grow our community.',

    // Footer
    'footer.description': 'Your digital library for Myanmar literature.',
    'footer.disclaimer': 'We built SarOak to share the joy of Myanmar literature. If you are an author and see your book here but prefer it not to be shared for free, please let us know. We will promptly remove it. Please support our local authors by buying their physical books!',
    'footer.quickLinks': 'Quick Links',
    'footer.categories': 'Categories',
    'footer.connect': 'Connect',
    'footer.rights': '© 2024 SarOak. All rights reserved.',
    'footer.madeWith': 'Made with ❤️ by SarOak',

    // Common
    'common.viewAll': 'View All',
    'common.backToHome': 'Back to Home',
    'common.loading': 'Loading...'
  },

  mm: {
    // Navigation
    'nav.home': 'ပင်မ',
    'nav.books': 'စာအုပ်များ',
    'nav.about': 'အကြောင်း',
    'nav.language': 'English',

    // Hero
    'hero.title': 'မြန်မာအီးဘွတ် မော်ကွန်းတိုက်',
    'hero.subtitle':
      'မြန်မာစာပေအတွက် သီးသန့်ရည်ရွယ်ထားတဲ့ အင်တာနက်ပေါ်က နွေးထွေးတဲ့နေရာလေးပါ။ ဒီဇာတ်လမ်းလေးတွေကို သင့်အတွက် သိမ်းဆည်းပေးထားပါတယ် — ဖတ်ရှု၊ ဒေါင်းလုဒ်လုပ်ပြီး ခံစားလိုက်ပါ။',
    'hero.cta': 'စာအုပ်များ ကြည့်ရန်',
    'hero.learnMore': 'ပိုမိုလေ့လာရန်',
    'hero.stats.books': 'စာအုပ်',
    'hero.stats.authors': 'စာရေးဆရာ',
    'hero.stats.updates.value': 'နေ့စဉ်',
    'hero.stats.updates.label': 'အသစ်တင်ခြင်း',

    // Sections
    'section.featured': 'အသားပေးစာအုပ်များ',
    'section.categories': 'အမျိုးအစားအလိုက် ကြည့်ရန်',
    'section.recent': 'အသစ်တင်ထားသော စာအုပ်များ',
    'section.popular': 'လူကြိုက်များစာအုပ်များ',
    'section.newsletter': 'သတင်းအချက်အလက် ရယူပါ',
    'section.newsletter.desc':
      'စာအုပ်အသစ်များနှင့် သတင်းများအတွက် စာရင်းသွင်းပါ။',

    // Book Card
    'book.download': 'ဒေါင်းလုဒ်',
    'book.readMore': 'ဆက်ဖတ်ရန်',
    'book.pages': 'စာမျက်နှာ',
    'book.relatedBooks': 'ဆက်စပ်စာအုပ်များ',

    // Filters
    'filter.all': 'အားလုံး',
    'filter.search': 'စာအုပ်ရှာရန်...',
    'filter.sortBy': 'စီရန်',
    'filter.newest': 'အသစ်ဆုံး',
    'filter.popular': 'လူကြိုက်များ',
    'filter.title': 'ခေါင်းစဉ်',

    // About
    'about.title': 'SarOak အကြောင်း',
    'about.mission': 'ကျွန်ုပ်တို့၏ ရည်မှန်းချက်',
    'about.mission.text':
      'SarOak သည် ဒစ်ဂျစ်တယ်ခေတ်တွင် မြန်မာစာပေကို ထိန်းသိမ်းပြီး မြှင့်တင်ရန် အသင့်ရှိပါသည်။ စာဖတ်သူတိုင်း ကောင်းမွန်သော စာအုပ်များကို ဖတ်ရှုခွင့်ရှိသင့်သည်ဟု ကျွန်ုပ်တို့ ယုံကြည်ပါသည်။',
    'about.contact': 'ဆက်သွယ်ရန်',
    'about.vision': 'ကျွန်ုပ်တို့၏ အမြင်',
    'about.vision.text': 'စာဖတ်သူများကို ပညာပေး၊ ဖျော်ဖြေ၊ လှုံ့ဆော်ပေးသော စာပေနှင့် ချိတ်ဆက်ပေးသည့် မြန်မာ့အကြီးဆုံး အခမဲ့ ဒစ်ဂျစ်တယ်စာကြည့်တိုက် ဖြစ်လာရန်။',
    'about.offer': 'ကျွန်ုပ်တို့ ပေးဆောင်သည်',
    'about.offer.text': 'ဝတ္ထု၊ ကဗျာ၊ သမိုင်း၊ ကိုယ်တိုင်ဖွံ့ဖြိုးရေးနှင့် အခြားအမျိုးအစားများ အားလုံးပါဝင်သော မြန်မာ eBook စုစည်းမှုကို အခမဲ့ ဝင်ရောက်ကြည့်ရှုနိုင်ပါသည်။',
    'about.opensource': 'Open Source',
    'about.opensource.text': 'SarOak သည် open-source ပရောဂျက်တစ်ခုဖြစ်သည်။ GitHub repository မှတဆင့် ပံ့ပိုးကူညီခြင်း၊ တိုးတက်မှုများ အကြံပြုခြင်း သို့မဟုတ် စာအုပ်များ တင်သွင်းခြင်းတို့ ပြုလုပ်နိုင်ပါသည်။',
    'about.contribute': 'ပံ့ပိုးကူညီနည်း',
    'about.step1.title': 'စာအုပ်တင်သွင်းရန်',
    'about.step1.text': 'မျှဝေလိုသော မြန်မာ eBook ရှိပါသလား။ ကျွန်ုပ်တို့၏ စုစည်းမှုတွင် ထည့်သွင်းရန် ဆက်သွယ်ပါ။',
    'about.step2.title': 'ပြဿနာများ တင်ပြရန်',
    'about.step2.text': 'ပျက်စီးနေသော လင့်ခ် သို့မဟုတ် မှားယွင်းသော အချက်အလက် တွေ့ရှိပါသလား။ ပြင်ဆင်နိုင်ရန် အကြောင်းကြားပါ။',
    'about.step3.title': 'သတင်းဖြန့်ဝေရန်',
    'about.step3.text': 'ကျွန်ုပ်တို့၏ အသိုင်းအဝိုင်း ကြီးထွားလာစေရန် SarOak ကို သူငယ်ချင်းများနှင့် စာဖတ်သူများထံ မျှဝေပါ။',

    // Footer
    'footer.description':
      'မြန်မာစာပေအတွက် သင်၏ ဒစ်ဂျစ်တယ် စာကြည့်တိုက်။',
    'footer.disclaimer': 'မြန်မာစာပေဖတ်ရှုခြင်းရဲ့ အနှစ်သာရကို မျှဝေရန်အတွက် SarOak ကို ဖန်တီးခဲ့ခြင်းဖြစ်ပါတယ်။ အကယ်၍ သင်သည် စာရေးဆရာတစ်ဦးဖြစ်ပြီး သင့်စာအုပ်ကို ဤနေရာတွင် အခမဲ့မမျှဝေလိုပါက ကျေးဇူးပြု၍ ကျွန်ုပ်တို့ထံ အကြောင်းကြားပေးပါ။ ကျွန်ုပ်တို့အနေဖြင့် ချက်ချင်း ဖယ်ရှားပေးသွားမည်ဖြစ်ပါသည်။ ကျွန်ုပ်တို့၏ ပြည်တွင်းစာရေးဆရာများကို ၎င်းတို့၏ စာအုပ်များအား ဝယ်ယူခြင်းဖြင့် ကူညီပံ့ပိုးပေးကြပါ။',
    'footer.quickLinks': 'အမြန်လင့်များ',
    'footer.categories': 'အမျိုးအစားများ',
    'footer.connect': 'ချိတ်ဆက်ရန်',
    'footer.rights': '© ၂၀၂၄ SarOak။ မူပိုင်ခွင့် အားလုံးရယူထားသည်။',
    'footer.madeWith': 'SarOak မှ ❤️ ဖြင့် ဖန်တီးသည်',

    // Common
    'common.viewAll': 'အားလုံးကြည့်ရန်',
    'common.backToHome': 'ပင်မသို့ ပြန်သွားရန်',
    'common.loading': 'ဖွင့်နေသည်...'
  }
};

// ── Public API ────────────────────────────────────────────────

/**
 * Returns the current language code stored in localStorage.
 * Falls back to the default language ('en') when no preference is saved.
 * @returns {'en' | 'mm'}
 */
export function getCurrentLang() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  } catch {
    // localStorage may be unavailable (e.g. SSR or privacy mode)
    return DEFAULT_LANG;
  }
}

/**
 * Persists a language preference and broadcasts a `langchange` event
 * so every part of the UI can react synchronously.
 * @param {'en' | 'mm'} lang
 */
export function setLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // silently ignore storage errors
  }

  // Set the `lang` attribute on <html> for CSS selectors / screen readers
  document.documentElement.setAttribute('lang', lang === 'mm' ? 'my' : 'en');

  // Dispatch a custom event that any component can listen for
  window.dispatchEvent(
    new CustomEvent('langchange', { detail: { lang } })
  );
}

/**
 * Looks up a translation key for the current language.
 * Returns the key itself when no translation is found (handy for debugging).
 * @param {string} key  — dot-separated translation key, e.g. 'hero.title'
 * @returns {string}
 */
export function t(key) {
  const lang = getCurrentLang();
  const dict = translations[lang];
  return (dict && dict[key]) || key;
}

/**
 * Convenience helper — toggles between English and Myanmar.
 */
export function toggleLang() {
  const next = getCurrentLang() === 'en' ? 'mm' : 'en';
  setLang(next);
  applyTranslations();
}

/**
 * Walks the DOM and applies translations to every element that carries a
 * `data-i18n` or `data-i18n-placeholder` attribute.
 *
 * Usage in HTML:
 *   <h1 data-i18n="hero.title"></h1>
 *   <input data-i18n-placeholder="filter.search" />
 */
export function applyTranslations() {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  // Placeholder attributes (inputs, textareas)
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.setAttribute('placeholder', t(key));
    }
  });
}
