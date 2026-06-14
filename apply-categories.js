import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'src', 'books-data.js');

// Helper to check if a string contains any of the keywords
const containsAny = (str, keywords) => {
  const lowerStr = str.toLowerCase();
  return keywords.some(kw => lowerStr.includes(kw.toLowerCase()));
};

// 1. Read existing books-data.js
let dataContent = fs.readFileSync(dataFile, 'utf8');
const booksRegex = /export const books = (\[[\s\S]*?\]);/;
const match = dataContent.match(booksRegex);

if (!match) {
  console.error("Could not find the books array in books-data.js");
  process.exit(1);
}

// Evaluate the array so we can manipulate it
// (Using eval since the file exports a JS object, not JSON)
let books = eval(match[1]);

// 2. Apply AI rules for categorization
books.forEach(book => {
  // Combine title and author strings for easier searching
  const searchString = `${book.title.mm} ${book.title.en} ${book.author.mm} ${book.author.en} ${book.id}`;
  
  let category = 'Fiction'; // Default fallback

  // Rule 1: Translated Fiction
  if (containsAny(searchString, ['မောင်ထွန်းသူ', 'Htun Thu', 'ဘာသာပြန်', 'Translated', 'Noriko Otsu', 'Win Phae Win', 'Phae Win', 'လင်းယုန်မောင်မောင်'])) {
    category = 'Translated';
  }
  // Rule 2: Humor & Satire
  else if (containsAny(searchString, ['မင်းလူ', 'Min Lu', 'နီကိုရဲ', 'Nikoye', 'Ko Ye', 'မောင်ဝဏ္ဏ', 'Wanna', 'မောင်ကျပ်ခိုး'])) {
    category = 'Humor & Satire';
  }
  // Rule 3: Non-Fiction, Biography & Self-Help
  else if (containsAny(searchString, ['လူထုဒေါ်အမာ', 'Daw Amar', 'Ludu', 'ဖေမြင့်', 'Phae Myint', 'အတ္ထုပ္ပတ္တိ', 'လူထုစိန်ဝင်း'])) {
    category = 'Non-Fiction';
  }
  // Rule 4: History & Politics
  else if (containsAny(searchString, ['ဦးကုလား', 'မဟာရာဇဝင်', 'နတ်နွယ်', 'Nat Nwe', 'သမိုင်း'])) {
    category = 'History';
  }
  // Rule 5: Mystery & Detective
  else if (containsAny(searchString, ['ရွှေဥဒေါင်း', 'Shwe U Daung', 'မင်းသိင်္ခ', 'Thein Kha', 'စိတ္တဇ', 'ဆားပုလင်း'])) {
    category = 'Mystery & Detective';
  }
  // Rule 6: Romance & General Fiction (Explicit matches)
  else if (containsAny(searchString, ['မစန္ဒာ', 'Ma Sandar', 'ဂျူး', 'Juu', 'မိုမို', 'Mo Mo', 'စံပယ်ဖြူနု', 'Phyu Nu', 'မိုးမိုး', 'Moe Moe', 'ဝတ္ထု'])) {
    category = 'Fiction';
  }

  // Update the category!
  book.category = category;
  
  // Also, let's fix the author name if it got mangled with the title
  // Example: "ခိုးခိုးခစ်ခစ် မင်းလူ" -> Author should be "မင်းလူ"
  if (containsAny(book.author.mm, ['မင်းလူ', 'Min Lu'])) book.author.mm = 'မင်းလူ (Min Lu)';
  if (containsAny(book.author.mm, ['မစန္ဒာ', 'Ma Sandar'])) book.author.mm = 'မစန္ဒာ (Ma Sandar)';
  if (containsAny(book.author.mm, ['ဂျူး', 'Juu'])) book.author.mm = 'ဂျူး (Juu)';
  if (containsAny(book.author.mm, ['မောင်ထွန်းသူ', 'Htun Thu'])) book.author.mm = 'မောင်ထွန်းသူ (Mg Htun Thu)';
  if (containsAny(book.author.mm, ['လူထုဒေါ်အမာ', 'Daw Amar'])) book.author.mm = 'လူထုဒေါ်အမာ (Ludu Daw Amar)';
  if (containsAny(book.author.mm, ['နတ်နွယ်'])) book.author.mm = 'နတ်နွယ် (Nat Nwe)';
  if (containsAny(book.author.mm, ['နီကိုရဲ', 'Nikoye'])) book.author.mm = 'နီကိုရဲ (Ni Ko Ye)';
  if (containsAny(book.author.mm, ['မောင်ဝဏ္ဏ', 'Wanna'])) book.author.mm = 'မောင်ဝဏ္ဏ (Mg Wanna)';
});

// 3. Write back to books-data.js
const newBooksString = `export const books = ${JSON.stringify(books, null, 2)};`;
dataContent = dataContent.replace(booksRegex, newBooksString);
fs.writeFileSync(dataFile, dataContent);

// Summarize results
const stats = {};
books.forEach(b => {
  stats[b.category] = (stats[b.category] || 0) + 1;
});

console.log("Successfully mapped books to AI-generated categories!");
console.log(stats);
