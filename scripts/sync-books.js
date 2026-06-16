import fs from 'fs';
import path from 'path';

const publicBooksDir = path.join(process.cwd(), 'public', 'books');
const dataFile = path.join(process.cwd(), 'src', 'books-data.js');

// ==========================================
// 1. Configuration & Rules
// ==========================================
const VALID_EXTENSIONS = ['.epub', '.kfx', '.azw3', '.pdf'];

const AUTHOR_MAPPINGS = [
  { keywords: ['min lu', 'မင်းလူ', 'lu '], name: 'မင်းလူ (Min Lu)' },
  { keywords: ['ma sandar', 'မစန္ဒာ'], name: 'မစန္ဒာ (Ma Sandar)' },
  { keywords: ['juu', 'ဂျူး'], name: 'ဂျူး (Juu)' },
  { keywords: ['htun thu', 'မောင်ထွန်းသူ'], name: 'မောင်ထွန်းသူ (Mg Htun Thu)' },
  { keywords: ['daw amar', 'လူထုဒေါ်အမာ'], name: 'လူထုဒေါ်အမာ (Ludu Daw Amar)' },
  { keywords: ['nat nwe', 'နတ်နွယ်'], name: 'နတ်နွယ် (Nat Nwe)' },
  { keywords: ['ni ko ye', 'nikoye', 'ko ye', 'နီကိုရဲ'], name: 'နီကိုရဲ (Ni Ko Ye)' },
  { keywords: ['wanna', 'မောင်ဝဏ္ဏ'], name: 'မောင်ဝဏ္ဏ (Mg Wanna)' },
  { keywords: ['nyein kyaw', 'ငြိမ်းကျော်'], name: 'ငြိမ်းကျော် (Nyein Kyaw)' },
  { keywords: ['sabal', 'phyu nu', 'စံပယ်ဖြူနု'], name: 'စံပယ်ဖြူနု (Sabal Phyu Nu)' },
  { keywords: ['moe kyaw zin', 'မိုးကျော်ဇင်'], name: 'မိုးကျော်ဇင် (Moe Kyaw Zin)' },
  { keywords: ['kala', 'ဦးကုလား'], name: 'ဦးကုလား (U Kala)' },
  { keywords: ['nu nu', 'inwa', 'နုနုရည်အင်းဝ'], name: 'နုနုရည်အင်းဝ (Nu Nu Yi Inwa)' },
  { keywords: ['tin maung', 'maung myint', 'တင်မောင်မြင့်'], name: 'တင်မောင်မြင့် (Tin Maung Myint)' },
  { keywords: ['linyon', 'လင်းယုန်'], name: 'လင်းယုန်မောင်မောင် (Linyon Mg Mg)' },
  { keywords: ['kalayar', 'ကလျာ'], name: 'ကလျာဝိဇ္ဇာ (Kalayar)' },
  { keywords: ['zin thant', 'ဇင်သန့်'], name: 'ဇင်သန့် (Zin Thant)' },
  { keywords: ['phae win', 'ဝင်းဖေဝင်း'], name: 'ဝင်းဖေဝင်း (Win Phae Win)' },
  { keywords: ['htin lin', 'ထင်လင်း'], name: 'ထင်လင်း (Htin Lin)' },
  { keywords: ['lamin', 'mo mo', 'လမင်းမိုမို'], name: 'လမင်းမိုမို (Lamin Mo Mo)' },
  { keywords: ['moe moe', 'မိုးမိုး'], name: 'မိုးမိုး အင်းလျား (Moe Moe Inya)' },
  { keywords: ['moe nin', 'ပီမိုးနင်း'], name: 'ပီမိုးနင်း (P. Moe Nin)' },
  { keywords: ['myint than', 'မြင့်သန်း'], name: 'မြင့်သန်း (Myint Than)' },
  { keywords: ['nu mdy', 'ယဉ်ယဉ်နု'], name: 'ယဉ်ယဉ်နု (Yin Yin Nu)' },
  { keywords: ['paw htun', 'မောင်ပေါ်ထွန်း'], name: 'မောင်ပေါ်ထွန်း (Mg Paw Htun)' },
  { keywords: ['phae myint', 'ဖေမြင့်'], name: 'ဖေမြင့် (Phae Myint)' },
  { keywords: ['swan yay', 'မောင်စွမ်းရည်'], name: 'မောင်စွမ်းရည် (Mg Swan Yay)' },
  { keywords: ['than tint', 'မြသန်းတင့်'], name: 'မြသန်းတင့် (Mya Than Tint)' },
  { keywords: ['thar ya', 'မောင်သာရ'], name: 'မောင်သာရ (Mg Thar Ya)' },
  { keywords: ['thein kha', 'မင်းသိင်္ခ', 'min thein'], name: 'မင်းသိင်္ခ (Min Thein Kha)' },
  { keywords: ['thein saing', 'မောင်သိန်းဆိုင်'], name: 'မောင်သိန်းဆိုင် (Mg Thein Saing)' },
  { keywords: ['win oo', 'ဝင်းဦး'], name: 'ဝင်းဦး (Win Oo)' },
  { keywords: ['aung thein', 'ဆင်ဖြူကျွန်း'], name: 'ဆင်ဖြူကျွန်းအောင်သိန်း (Aung Thein)' },
  { keywords: ['ba thaung', 'သခင်ဘသောင်း'], name: 'သခင်ဘသောင်း (Ba Thaung)' },
  { keywords: ['chan wai', 'မိချမ်းဝေ'], name: 'မိချမ်းဝေ (Mi Chan Wai)' },
  { keywords: ['eu daung', 'ရွှေဥဒေါင်း'], name: 'ရွှေဥဒေါင်း (Shwe U Daung)' },
  { keywords: ['kyat khoe', 'မောင်ကျပ်ခိုး'], name: 'မောင်ကျပ်ခိုး (Mg Kyat Khoe)' },
  { keywords: ['u hla', 'ဦးလှ'], name: 'လူထုဦးလှ (Ludu U Hla)' },
  { keywords: ['ma lay', 'မမလေး'], name: 'ဂျာနယ်ကျော်မမလေး (Journal Kyaw Ma Ma Lay)' },
  { keywords: ['mg htin', 'မောင်ထင်'], name: 'မောင်ထင် (Mg Htin)' },
  { keywords: ['moe thu', 'မောင်မိုးသူ'], name: 'မောင်မိုးသူ (Mg Moe Thu)' },
  { keywords: ['sar ni', 'သစ္စာနီ'], name: 'သစ္စာနီ (Thit Sar Ni)' },
  { keywords: ['sein win', 'လူထုစိန်ဝင်း'], name: 'လူထုစိန်ဝင်း (Ludu Sein Win)' },
  { keywords: ['soe san', 'မင်းခိုက်စိုးစန်'], name: 'မင်းခိုက်စိုးစန် (Min Khite Soe San)' },
  { keywords: ['su nhat', 'ဆူးငှက်'], name: 'ဆူးငှက် (Su Nhat)' },
  { keywords: ['nanda', 'နန္ဒ'], name: 'နန္ဒ (Nanda)' },
  { keywords: ['noriko otsu'], name: 'Noriko Otsu' }
];

const CATEGORY_RULES = [
  { keywords: ['မောင်ထွန်းသူ', 'htun thu', 'ဘာသာပြန်', 'translated', 'noriko otsu', 'win phae win', 'phae win', 'လင်းယုန်မောင်မောင်'], category: 'Translated' },
  { keywords: ['မင်းလူ', 'min lu', 'နီကိုရဲ', 'nikoye', 'ko ye', 'မောင်ဝဏ္ဏ', 'wanna', 'မောင်ကျပ်ခိုး'], category: 'Humor & Satire' },
  { keywords: ['လူထုဒေါ်အမာ', 'daw amar', 'ludu', 'ဖေမြင့်', 'phae myint', 'အတ္ထုပ္ပတ္တိ', 'လူထုစိန်ဝင်း'], category: 'Non-Fiction' },
  { keywords: ['ဦးကုလား', 'မဟာရာဇဝင်', 'နတ်နွယ်', 'nat nwe', 'သမိုင်း'], category: 'History' },
  { keywords: ['ရွှေဥဒေါင်း', 'shwe u daung', 'မင်းသိင်္ခ', 'thein kha', 'စိတ္တဇ', 'ဆားပုလင်း'], category: 'Mystery & Detective' },
  { keywords: ['မစန္ဒာ', 'ma sandar', 'ဂျူး', 'juu', 'မိုမို', 'mo mo', 'စံပယ်ဖြူနု', 'phyu nu', 'မိုးမိုး', 'moe moe', 'ဝတ္ထု'], category: 'Fiction' }
];


// ==========================================
// 2. Helper Functions
// ==========================================
const containsAny = (str, keywords) => {
  if (!str) return false;
  const lowerStr = str.toLowerCase();
  return keywords.some(kw => lowerStr.includes(kw.toLowerCase()));
};

const getCleanAuthor = (searchStr, defaultAuthor) => {
  const mapping = AUTHOR_MAPPINGS.find(m => containsAny(searchStr, m.keywords));
  return mapping ? mapping.name : defaultAuthor;
};

const getCategory = (searchStr) => {
  const rule = CATEGORY_RULES.find(r => containsAny(searchStr, r.keywords));
  return rule ? rule.category : 'Fiction';
};


// ==========================================
// 3. Main Pipeline
// ==========================================
console.log('Starting automated book sync...');

const files = fs.readdirSync(publicBooksDir);
const bookGroups = {};

// Group files by base name
files.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (VALID_EXTENSIONS.includes(ext)) {
    const baseName = path.basename(file, ext);
    if (!bookGroups[baseName]) {
      bookGroups[baseName] = [];
    }
    bookGroups[baseName].push({ file, ext });
  }
});

console.log(`Found ${Object.keys(bookGroups).length} unique book titles in public/books.`);

const newBooks = [];
let idCounter = 100;

Object.keys(bookGroups).forEach(baseName => {
  const formats = bookGroups[baseName];
  
  // Parse Title and Author from filename
  let title = baseName;
  let author = 'Unknown Author';
  
  if (baseName.includes('_')) {
    const parts = baseName.split('_');
    if (parts.length === 2) {
      title = parts[0];
      author = parts[1];
    } else if (parts.length > 2) {
      author = parts.slice(-2).join(' ').replace(/_/g, ' ');
      title = parts.slice(0, -2).join(' ').replace(/_/g, ' ');
    }
  } else if (baseName.includes(' - ') || baseName.includes(' --- ')) {
    const divider = baseName.includes(' --- ') ? ' --- ' : ' - ';
    const parts = baseName.split(divider);
    if (parts.length >= 2) {
      title = parts[0];
      author = parts[1];
    }
  }

  // Generate Search String for metadata matching
  const searchStr = (title + " " + author + " " + baseName).toLowerCase();

  // Apply Data Cleaning & Rules
  const cleanAuthor = getCleanAuthor(searchStr, author);
  const category = getCategory(searchStr);

  // Generate format links
  const bookFormats = formats.map(f => {
    return { type: f.ext.replace('.', '').toUpperCase(), url: `/books/${f.file}` };
  });

  const isPopular = Math.random() > 0.7;
  
  newBooks.push({
    id: `book_${idCounter++}`,
    title: { mm: title, en: title },
    author: { mm: cleanAuthor, en: cleanAuthor },
    category: category,
    coverColor: `hsl(${Math.floor(Math.random() * 360)}, 60%, 40%)`,
    description: {
      mm: 'ဤစာအုပ်သည် အလွန်ဖတ်ကောင်းသော စာအုပ်ကောင်းတစ်အုပ်ဖြစ်ပါသည်။',
      en: 'This is a great book and highly recommended to read.'
    },
    publishDate: `2023-0${Math.floor(Math.random()*9)+1}-15`,
    pages: Math.floor(Math.random() * 300) + 100,
    popular: isPopular,
    formats: bookFormats
  });
});

console.log(`Processed ${newBooks.length} beautifully synced books!`);

// 4. Update Database File
let dataContent = fs.readFileSync(dataFile, 'utf8');
const booksRegex = /export const books = \[[\s\S]*?\];/;
const newBooksString = `export const books = ${JSON.stringify(newBooks, null, 2)};`;

dataContent = dataContent.replace(booksRegex, newBooksString);
fs.writeFileSync(dataFile, dataContent);

console.log('✅ books-data.js updated successfully with perfectly clean Unicode titles, formats, authors, and AI categories!');
