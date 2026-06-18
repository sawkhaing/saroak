import fs from 'fs';
import path from 'path';

const publicBooksDir = path.join(process.cwd(), 'public', 'books');
const dataFile = path.join(process.cwd(), 'src', 'books-data.js');

const VALID_EXTENSIONS = ['.epub', '.kfx', '.azw3', '.pdf'];

const AUTHOR_MAPPINGS = [
  { keywords: ['min lu', 'မင်းလူ', 'lu '], mm: 'မင်းလူ', en: 'Min Lu' },
  { keywords: ['ma sandar', 'မစန္ဒာ'], mm: 'မစန္ဒာ', en: 'Ma Sandar' },
  { keywords: ['juu', 'ဂျူး'], mm: 'ဂျူး', en: 'Juu' },
  { keywords: ['htun thu', 'မောင်ထွန်းသူ'], mm: 'မောင်ထွန်းသူ', en: 'Mg Htun Thu' },
  { keywords: ['daw amar', 'လူထုဒေါ်အမာ'], mm: 'လူထုဒေါ်အမာ', en: 'Ludu Daw Amar' },
  { keywords: ['nat nwe', 'နတ်နွယ်'], mm: 'နတ်နွယ်', en: 'Nat Nwe' },
  { keywords: ['ni ko ye', 'nikoye', 'ko ye', 'နီကိုရဲ'], mm: 'နီကိုရဲ', en: 'Ni Ko Ye' },
  { keywords: ['wanna', 'မောင်ဝဏ္ဏ'], mm: 'မောင်ဝဏ္ဏ', en: 'Mg Wanna' },
  { keywords: ['nyein kyaw', 'ငြိမ်းကျော်'], mm: 'ငြိမ်းကျော်', en: 'Nyein Kyaw' },
  { keywords: ['sabal', 'phyu nu', 'စံပယ်ဖြူနု'], mm: 'စံပယ်ဖြူနု', en: 'Sabal Phyu Nu' },
  { keywords: ['moe kyaw zin', 'မိုးကျော်ဇင်'], mm: 'မိုးကျော်ဇင်', en: 'Moe Kyaw Zin' },
  { keywords: ['kala', 'ဦးကုလား'], mm: 'ဦးကုလား', en: 'U Kala' },
  { keywords: ['nu nu', 'inwa', 'နုနုရည်အင်းဝ'], mm: 'နုနုရည်အင်းဝ', en: 'Nu Nu Yi Inwa' },
  { keywords: ['tin maung', 'maung myint', 'တင်မောင်မြင့်'], mm: 'တင်မောင်မြင့်', en: 'Tin Maung Myint' },
  { keywords: ['linyon', 'လင်းယုန်'], mm: 'လင်းယုန်မောင်မောင်', en: 'Linyon Mg Mg' },
  { keywords: ['kalayar', 'ကလျာ'], mm: 'ကလျာဝိဇ္ဇာ', en: 'Kalayar' },
  { keywords: ['zin thant', 'ဇင်သန့်'], mm: 'ဇင်သန့်', en: 'Zin Thant' },
  { keywords: ['phae win', 'ဝင်းဖေဝင်း'], mm: 'ဝင်းဖေဝင်း', en: 'Win Phae Win' },
  { keywords: ['htin lin', 'ထင်လင်း'], mm: 'ထင်လင်း', en: 'Htin Lin' },
  { keywords: ['lamin', 'mo mo', 'လမင်းမိုမို'], mm: 'လမင်းမိုမို', en: 'Lamin Mo Mo' },
  { keywords: ['moe moe', 'မိုးမိုး'], mm: 'မိုးမိုး အင်းလျား', en: 'Moe Moe Inya' },
  { keywords: ['moe nin', 'ပီမိုးနင်း'], mm: 'ပီမိုးနင်း', en: 'P. Moe Nin' },
  { keywords: ['myint than', 'မြင့်သန်း'], mm: 'မြင့်သန်း', en: 'Myint Than' },
  { keywords: ['nu mdy', 'ယဉ်ယဉ်နု'], mm: 'ယဉ်ယဉ်နု', en: 'Yin Yin Nu' },
  { keywords: ['paw htun', 'မောင်ပေါ်ထွန်း'], mm: 'မောင်ပေါ်ထွန်း', en: 'Mg Paw Htun' },
  { keywords: ['phae myint', 'ဖေမြင့်'], mm: 'ဖေမြင့်', en: 'Phae Myint' },
  { keywords: ['swan yay', 'မောင်စွမ်းရည်'], mm: 'မောင်စွမ်းရည်', en: 'Mg Swan Yay' },
  { keywords: ['than tint', 'မြသန်းတင့်'], mm: 'မြသန်းတင့်', en: 'Mya Than Tint' },
  { keywords: ['thar ya', 'မောင်သာရ'], mm: 'မောင်သာရ', en: 'Mg Thar Ya' },
  { keywords: ['thein kha', 'မင်းသိင်္ခ', 'min thein'], mm: 'မင်းသိင်္ခ', en: 'Min Thein Kha' },
  { keywords: ['thein saing', 'မောင်သိန်းဆိုင်'], mm: 'မောင်သိန်းဆိုင်', en: 'Mg Thein Saing' },
  { keywords: ['win oo', 'ဝင်းဦး'], mm: 'ဝင်းဦး', en: 'Win Oo' },
  { keywords: ['aung thein', 'ဆင်ဖြူကျွန်း'], mm: 'ဆင်ဖြူကျွန်းအောင်သိန်း', en: 'Aung Thein' },
  { keywords: ['ba thaung', 'သခင်ဘသောင်း'], mm: 'သခင်ဘသောင်း', en: 'Ba Thaung' },
  { keywords: ['chan wai', 'မိချမ်းဝေ'], mm: 'မိချမ်းဝေ', en: 'Mi Chan Wai' },
  { keywords: ['eu daung', 'ရွှေဥဒေါင်း'], mm: 'ရွှေဥဒေါင်း', en: 'Shwe U Daung' },
  { keywords: ['kyat khoe', 'မောင်ကျပ်ခိုး'], mm: 'မောင်ကျပ်ခိုး', en: 'Mg Kyat Khoe' },
  { keywords: ['u hla', 'ဦးလှ'], mm: 'လူထုဦးလှ', en: 'Ludu U Hla' },
  { keywords: ['ma lay', 'မမလေး'], mm: 'ဂျာနယ်ကျော်မမလေး', en: 'Journal Kyaw Ma Ma Lay' },
  { keywords: ['mg htin', 'မောင်ထင်'], mm: 'မောင်ထင်', en: 'Mg Htin' },
  { keywords: ['moe thu', 'မောင်မိုးသူ'], mm: 'မောင်မိုးသူ', en: 'Mg Moe Thu' },
  { keywords: ['sar ni', 'သစ္စာနီ'], mm: 'သစ္စာနီ', en: 'Thit Sar Ni' },
  { keywords: ['sein win', 'လူထုစိန်ဝင်း'], mm: 'လူထုစိန်ဝင်း', en: 'Ludu Sein Win' },
  { keywords: ['soe san', 'မင်းခိုက်စိုးစန်'], mm: 'မင်းခိုက်စိုးစန်', en: 'Min Khite Soe San' },
  { keywords: ['su nhat', 'ဆူးငှက်'], mm: 'ဆူးငှက်', en: 'Su Nhat' },
  { keywords: ['nanda', 'နန္ဒ'], mm: 'နန္ဒ', en: 'Nanda' },
  { keywords: ['noriko otsu'], mm: 'နိုရီကိုအိုဆု', en: 'Noriko Otsu' }
];

const CATEGORY_RULES = [
  { keywords: ['မောင်ထွန်းသူ', 'htun thu', 'ဘာသာပြန်', 'translated', 'noriko otsu', 'win phae win', 'phae win', 'လင်းယုန်မောင်မောင်'], category: 'Translated' },
  { keywords: ['မင်းလူ', 'min lu', 'နီကိုရဲ', 'nikoye', 'ko ye', 'မောင်ဝဏ္ဏ', 'wanna', 'မောင်ကျပ်ခိုး'], category: 'Humor & Satire' },
  { keywords: ['လူထုဒေါ်အမာ', 'daw amar', 'ludu', 'ဖေမြင့်', 'phae myint', 'အတ္ထုပ္ပတ္တိ', 'လူထုစိန်ဝင်း'], category: 'Non-Fiction' },
  { keywords: ['ဦးကုလား', 'မဟာရာဇဝင်', 'နတ်နွယ်', 'nat nwe', 'သမိုင်း'], category: 'History' },
  { keywords: ['ရွှေဥဒေါင်း', 'shwe u daung', 'မင်းသိင်္ခ', 'thein kha', 'စိတ္တဇ', 'ဆားပုလင်း'], category: 'Mystery & Detective' },
  { keywords: ['မစန္ဒာ', 'ma sandar', 'ဂျူး', 'juu', 'မိုမို', 'mo mo', 'စံပယ်ဖြူနု', 'phyu nu', 'မိုးမိုး', 'moe moe', 'ဝတ္ထု'], category: 'Fiction' }
];

// Map of common titles for accurate AI translation
const TITLE_MAPPINGS = {
  'အလွမ်းသစ်': 'Alwan Thit',
  'အိပ်ဇိုးဒပ်': 'Exodus',
  'စိတ္တဇ': 'Psychopath',
  'ဆားပုလင်းနှင်းမောင်': 'Sar Pu Lin Hnin Maung',
  'အလွမ်းမပါသော ပြဇာတ်': 'Drama Without Sadness',
  'ပဆစ်အိမ်': 'Pa Sit Eain',
  '၁ထောင့်၅ည': '1005 Nights',
  'မသုဓမ္မစာရီ': 'Ma Thu Da Ma Sa Ri'
};

const containsAny = (str, keywords) => {
  if (!str) return false;
  const lowerStr = str.toLowerCase();
  return keywords.some(kw => lowerStr.includes(kw.toLowerCase()));
};

const getCleanAuthor = (searchStr, defaultAuthor) => {
  const mapping = AUTHOR_MAPPINGS.find(m => containsAny(searchStr, m.keywords));
  if (mapping) {
    return { mm: mapping.mm, en: mapping.en };
  }
  return { mm: defaultAuthor, en: defaultAuthor };
};

const getCategory = (searchStr) => {
  const rule = CATEGORY_RULES.find(r => containsAny(searchStr, r.keywords));
  return rule ? rule.category : 'Fiction';
};

const translateTitle = (mmTitle) => {
  for (const [key, val] of Object.entries(TITLE_MAPPINGS)) {
    if (mmTitle.includes(key)) return val;
  }
  return mmTitle; 
};

console.log('Starting automated book sync...');

const files = fs.readdirSync(publicBooksDir);
const bookGroups = {};

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
  
  // Strict parser: Split by '-' and change underscores back to spaces
  let title = baseName.replace(/_/g, ' ');
  let author = 'Unknown Author';
  
  if (baseName.includes('-')) {
    const parts = baseName.split('-');
    title = parts[0].replace(/_/g, ' ');
    if (parts.length > 1) {
      author = parts.slice(1).join(' ').replace(/_/g, ' ');
    }
  }

  const searchStr = (title + " " + author + " " + baseName).toLowerCase();
  
  const cleanAuthorObj = getCleanAuthor(searchStr, author);
  const category = getCategory(searchStr);
  const enTitle = translateTitle(title);

  const bookFormats = formats.map(f => {
    return { type: f.ext.replace('.', '').toUpperCase(), url: `/books/${f.file}` };
  });

  const isPopular = Math.random() > 0.7;
  
  newBooks.push({
    id: `book_${idCounter++}`,
    title: { mm: title, en: enTitle },
    author: cleanAuthorObj, // Now perfectly symmetric!
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

let dataContent = fs.readFileSync(dataFile, 'utf8');
const booksRegex = /export const books = \[[\s\S]*?\];/;
const newBooksString = `export const books = ${JSON.stringify(newBooks, null, 2)};`;

dataContent = dataContent.replace(booksRegex, newBooksString);
fs.writeFileSync(dataFile, dataContent);

console.log('✅ books-data.js updated successfully with symmetric formats!');
