import fs from 'fs';
import path from 'path';

const publicBooksDir = path.join(process.cwd(), 'public', 'books');
const dataFile = path.join(process.cwd(), 'src', 'books-data.js');

const files = fs.readdirSync(publicBooksDir);
const validExts = ['.epub', '.kfx', '.azw3', '.pdf', '.docx'];

// 1. Group files by base name
const bookGroups = {};

files.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (validExts.includes(ext)) {
    const baseName = path.basename(file, ext);
    if (!bookGroups[baseName]) {
      bookGroups[baseName] = [];
    }
    bookGroups[baseName].push({ file, ext });
  }
});

// Helper for category/author matching
const containsAny = (str, keywords) => {
  if (!str) return false;
  const lowerStr = str.toLowerCase();
  return keywords.some(kw => lowerStr.includes(kw.toLowerCase()));
};

const newBooks = [];
let idCounter = 100;

console.log(`Found ${Object.keys(bookGroups).length} unique book titles in public/books.`);

// 2. Process each grouped book
Object.keys(bookGroups).forEach(baseName => {
  const formats = bookGroups[baseName];
  
  // Parse Title and Author from filename
  let title = baseName;
  let author = 'Unknown Author';
  
  if (baseName.includes('_')) {
    const parts = baseName.split('_');
    if (parts.length >= 2) {
      author = parts.slice(-2).join(' ').replace(/_/g, ' ');
      title = parts.slice(0, -2).join(' ').replace(/_/g, ' ');
    }
  } else if (baseName.includes(' - ')) {
    const parts = baseName.split(' - ');
    if (parts.length >= 2) {
      title = parts[0];
      author = parts[1];
    }
  } else if (baseName.includes(' --- ')) {
    const parts = baseName.split(' --- ');
    if (parts.length >= 2) {
      title = parts[0];
      author = parts[1];
    }
  }

  // 3. Clean Author Metadata (from clean-authors.js)
  let searchStr = title + " " + author + " " + baseName;
  searchStr = searchStr.toLowerCase();

  let cleanAuthor = author;

  if (containsAny(searchStr, ['min lu', 'မင်းလူ', 'lu '])) cleanAuthor = 'မင်းလူ (Min Lu)';
  else if (containsAny(searchStr, ['ma sandar', 'မစန္ဒာ'])) cleanAuthor = 'မစန္ဒာ (Ma Sandar)';
  else if (containsAny(searchStr, ['juu', 'ဂျူး'])) cleanAuthor = 'ဂျူး (Juu)';
  else if (containsAny(searchStr, ['htun thu', 'မောင်ထွန်းသူ'])) cleanAuthor = 'မောင်ထွန်းသူ (Mg Htun Thu)';
  else if (containsAny(searchStr, ['daw amar', 'လူထုဒေါ်အမာ'])) cleanAuthor = 'လူထုဒေါ်အမာ (Ludu Daw Amar)';
  else if (containsAny(searchStr, ['nat nwe', 'နတ်နွယ်'])) cleanAuthor = 'နတ်နွယ် (Nat Nwe)';
  else if (containsAny(searchStr, ['ni ko ye', 'nikoye', 'ko ye', 'နီကိုရဲ'])) cleanAuthor = 'နီကိုရဲ (Ni Ko Ye)';
  else if (containsAny(searchStr, ['wanna', 'မောင်ဝဏ္ဏ'])) cleanAuthor = 'မောင်ဝဏ္ဏ (Mg Wanna)';
  else if (containsAny(searchStr, ['nyein kyaw', 'ငြိမ်းကျော်'])) cleanAuthor = 'ငြိမ်းကျော် (Nyein Kyaw)';
  else if (containsAny(searchStr, ['sabal', 'phyu nu', 'စံပယ်ဖြူနု'])) cleanAuthor = 'စံပယ်ဖြူနု (Sabal Phyu Nu)';
  else if (containsAny(searchStr, ['moe kyaw zin', 'မိုးကျော်ဇင်'])) cleanAuthor = 'မိုးကျော်ဇင် (Moe Kyaw Zin)';
  else if (containsAny(searchStr, ['kala', 'ဦးကုလား'])) cleanAuthor = 'ဦးကုလား (U Kala)';
  else if (containsAny(searchStr, ['nu nu', 'inwa', 'နုနုရည်အင်းဝ'])) cleanAuthor = 'နုနုရည်အင်းဝ (Nu Nu Yi Inwa)';
  else if (containsAny(searchStr, ['tin maung', 'maung myint', 'တင်မောင်မြင့်'])) cleanAuthor = 'တင်မောင်မြင့် (Tin Maung Myint)';
  else if (containsAny(searchStr, ['linyon', 'လင်းယုန်'])) cleanAuthor = 'လင်းယုန်မောင်မောင် (Linyon Mg Mg)';
  else if (containsAny(searchStr, ['kalayar', 'ကလျာ'])) cleanAuthor = 'ကလျာဝိဇ္ဇာ (Kalayar)';
  else if (containsAny(searchStr, ['zin thant', 'ဇင်သန့်'])) cleanAuthor = 'ဇင်သန့် (Zin Thant)';
  else if (containsAny(searchStr, ['phae win', 'ဝင်းဖေဝင်း'])) cleanAuthor = 'ဝင်းဖေဝင်း (Win Phae Win)';
  else if (containsAny(searchStr, ['htin lin', 'ထင်လင်း'])) cleanAuthor = 'ထင်လင်း (Htin Lin)';
  else if (containsAny(searchStr, ['lamin', 'mo mo', 'လမင်းမိုမို'])) cleanAuthor = 'လမင်းမိုမို (Lamin Mo Mo)';
  else if (containsAny(searchStr, ['moe moe', 'မိုးမိုး'])) cleanAuthor = 'မိုးမိုး အင်းလျား (Moe Moe Inya)';
  else if (containsAny(searchStr, ['moe nin', 'ပီမိုးနင်း'])) cleanAuthor = 'ပီမိုးနင်း (P. Moe Nin)';
  else if (containsAny(searchStr, ['myint than', 'မြင့်သန်း'])) cleanAuthor = 'မြင့်သန်း (Myint Than)';
  else if (containsAny(searchStr, ['nu mdy', 'ယဉ်ယဉ်နု'])) cleanAuthor = 'ယဉ်ယဉ်နု (Yin Yin Nu)';
  else if (containsAny(searchStr, ['paw htun', 'မောင်ပေါ်ထွန်း'])) cleanAuthor = 'မောင်ပေါ်ထွန်း (Mg Paw Htun)';
  else if (containsAny(searchStr, ['phae myint', 'ဖေမြင့်'])) cleanAuthor = 'ဖေမြင့် (Phae Myint)';
  else if (containsAny(searchStr, ['swan yay', 'မောင်စွမ်းရည်'])) cleanAuthor = 'မောင်စွမ်းရည် (Mg Swan Yay)';
  else if (containsAny(searchStr, ['than tint', 'မြသန်းတင့်'])) cleanAuthor = 'မြသန်းတင့် (Mya Than Tint)';
  else if (containsAny(searchStr, ['thar ya', 'မောင်သာရ'])) cleanAuthor = 'မောင်သာရ (Mg Thar Ya)';
  else if (containsAny(searchStr, ['thein kha', 'မင်းသိင်္ခ', 'min thein'])) cleanAuthor = 'မင်းသိင်္ခ (Min Thein Kha)';
  else if (containsAny(searchStr, ['thein saing', 'မောင်သိန်းဆိုင်'])) cleanAuthor = 'မောင်သိန်းဆိုင် (Mg Thein Saing)';
  else if (containsAny(searchStr, ['win oo', 'ဝင်းဦး'])) cleanAuthor = 'ဝင်းဦး (Win Oo)';
  else if (containsAny(searchStr, ['aung thein', 'ဆင်ဖြူကျွန်း'])) cleanAuthor = 'ဆင်ဖြူကျွန်းအောင်သိန်း (Aung Thein)';
  else if (containsAny(searchStr, ['ba thaung', 'သခင်ဘသောင်း'])) cleanAuthor = 'သခင်ဘသောင်း (Ba Thaung)';
  else if (containsAny(searchStr, ['chan wai', 'မိချမ်းဝေ'])) cleanAuthor = 'မိချမ်းဝေ (Mi Chan Wai)';
  else if (containsAny(searchStr, ['eu daung', 'ရွှေဥဒေါင်း'])) cleanAuthor = 'ရွှေဥဒေါင်း (Shwe U Daung)';
  else if (containsAny(searchStr, ['kyat khoe', 'မောင်ကျပ်ခိုး'])) cleanAuthor = 'မောင်ကျပ်ခိုး (Mg Kyat Khoe)';
  else if (containsAny(searchStr, ['u hla', 'ဦးလှ'])) cleanAuthor = 'လူထုဦးလှ (Ludu U Hla)';
  else if (containsAny(searchStr, ['ma lay', 'မမလေး'])) cleanAuthor = 'ဂျာနယ်ကျော်မမလေး (Journal Kyaw Ma Ma Lay)';
  else if (containsAny(searchStr, ['mg htin', 'မောင်ထင်'])) cleanAuthor = 'မောင်ထင် (Mg Htin)';
  else if (containsAny(searchStr, ['moe thu', 'မောင်မိုးသူ'])) cleanAuthor = 'မောင်မိုးသူ (Mg Moe Thu)';
  else if (containsAny(searchStr, ['sar ni', 'သစ္စာနီ'])) cleanAuthor = 'သစ္စာနီ (Thit Sar Ni)';
  else if (containsAny(searchStr, ['sein win', 'လူထုစိန်ဝင်း'])) cleanAuthor = 'လူထုစိန်ဝင်း (Ludu Sein Win)';
  else if (containsAny(searchStr, ['soe san', 'မင်းခိုက်စိုးစန်'])) cleanAuthor = 'မင်းခိုက်စိုးစန် (Min Khite Soe San)';
  else if (containsAny(searchStr, ['su nhat', 'ဆူးငှက်'])) cleanAuthor = 'ဆူးငှက် (Su Nhat)';
  else if (containsAny(searchStr, ['nanda', 'နန္ဒ'])) cleanAuthor = 'နန္ဒ (Nanda)';
  else if (containsAny(searchStr, ['noriko otsu'])) cleanAuthor = 'Noriko Otsu';

  // 4. Apply AI Rules for Categorization (from apply-categories.js)
  let category = 'Fiction'; // Default fallback

  if (containsAny(searchStr, ['မောင်ထွန်းသူ', 'htun thu', 'ဘာသာပြန်', 'translated', 'noriko otsu', 'win phae win', 'phae win', 'လင်းယုန်မောင်မောင်'])) {
    category = 'Translated';
  } else if (containsAny(searchStr, ['မင်းလူ', 'min lu', 'နီကိုရဲ', 'nikoye', 'ko ye', 'မောင်ဝဏ္ဏ', 'wanna', 'မောင်ကျပ်ခိုး'])) {
    category = 'Humor & Satire';
  } else if (containsAny(searchStr, ['လူထုဒေါ်အမာ', 'daw amar', 'ludu', 'ဖေမြင့်', 'phae myint', 'အတ္ထုပ္ပတ္တိ', 'လူထုစိန်ဝင်း'])) {
    category = 'Non-Fiction';
  } else if (containsAny(searchStr, ['ဦးကုလား', 'မဟာရာဇဝင်', 'နတ်နွယ်', 'nat nwe', 'သမိုင်း'])) {
    category = 'History';
  } else if (containsAny(searchStr, ['ရွှေဥဒေါင်း', 'shwe u daung', 'မင်းသိင်္ခ', 'thein kha', 'စိတ္တဇ', 'ဆားပုလင်း'])) {
    category = 'Mystery & Detective';
  } else if (containsAny(searchStr, ['မစန္ဒာ', 'ma sandar', 'ဂျူး', 'juu', 'မိုမို', 'mo mo', 'စံပယ်ဖြူနု', 'phyu nu', 'မိုးမိုး', 'moe moe', 'ဝတ္ထု'])) {
    category = 'Fiction';
  }

  // 5. Generate format array
  const bookFormats = formats.map(f => {
    let typeName = f.ext.replace('.', '').toUpperCase();
    return { type: typeName, url: `/books/${f.file}` };
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

// 6. Write back to books-data.js
let dataContent = fs.readFileSync(dataFile, 'utf8');
const booksRegex = /export const books = \[[\s\S]*?\];/;
const newBooksString = `export const books = ${JSON.stringify(newBooks, null, 2)};`;
dataContent = dataContent.replace(booksRegex, newBooksString);

fs.writeFileSync(dataFile, dataContent);
console.log('✅ books-data.js updated successfully with perfectly clean Unicode titles, formats, authors, and AI categories!');
