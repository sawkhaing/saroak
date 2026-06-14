import fs from 'fs';
import path from 'path';

const publicBooksDir = path.join(process.cwd(), 'public', 'books');
const dataFile = path.join(process.cwd(), 'src', 'books-data.js');

const files = fs.readdirSync(publicBooksDir);
const validExts = ['.epub', '.kfx', '.azw3', '.pdf', '.docx'];

// Group files by base name
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

const newBooks = [];
let idCounter = 100;
const categories = ['fiction', 'non-fiction', 'history', 'poetry', 'biography', 'translated'];

Object.keys(bookGroups).forEach(baseName => {
  const formats = bookGroups[baseName];
  
  // Parse Title and Author
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

  // Generate format array
  const bookFormats = formats.map(f => {
    let typeName = f.ext.replace('.', '').toUpperCase();
    return { type: typeName, url: `/books/${f.file}` };
  });

  const cat = categories[Math.floor(Math.random() * categories.length)];
  const isPopular = Math.random() > 0.7;
  
  newBooks.push({
    id: `book_${idCounter++}`,
    title: { mm: title, en: title },
    author: { mm: author, en: author },
    category: cat,
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

console.log(`Processed ${newBooks.length} grouped books from public/books.`);

// Read existing books-data.js to replace the books array
let dataContent = fs.readFileSync(dataFile, 'utf8');

const booksRegex = /export const books = \[[\s\S]*?\];/;
const newBooksString = `export const books = ${JSON.stringify(newBooks, null, 2)};`;

dataContent = dataContent.replace(booksRegex, newBooksString);

fs.writeFileSync(dataFile, dataContent);
console.log('books-data.js updated successfully with perfectly clean Unicode titles!');
