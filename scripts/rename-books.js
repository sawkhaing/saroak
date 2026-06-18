import fs from 'fs';
import path from 'path';

const publicBooksDir = path.join(process.cwd(), 'public', 'books');
const VALID_EXTENSIONS = ['.epub', '.kfx', '.azw3', '.pdf'];

const files = fs.readdirSync(publicBooksDir);

files.forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!VALID_EXTENSIONS.includes(ext)) return;

  let baseName = path.basename(file, ext);

  // 1. Strip trailing numbers like _1, (2), - 1, etc.
  baseName = baseName.replace(/[_\-\s]*(\(\d+\)|\d+)$/, '');

  // 2. Parse Title and Author
  let title = baseName;
  let author = 'Unknown Author';

  if (baseName.includes('_')) {
    const parts = baseName.split('_');
    if (parts.length === 2) {
      title = parts[0];
      author = parts[1];
    } else if (parts.length > 2) {
      author = parts.slice(-2).join(' ');
      title = parts.slice(0, -2).join(' ');
    }
  } else if (baseName.includes(' - ') || baseName.includes(' --- ')) {
    const divider = baseName.includes(' --- ') ? ' --- ' : ' - ';
    const parts = baseName.split(divider);
    if (parts.length >= 2) {
      title = parts[0];
      author = parts[1];
    }
  }

  // 3. Clean up Title and Author for the new format
  // Replace hyphens and spaces with underscores
  const cleanTitle = title.trim().replace(/[-\s]+/g, '_');
  const cleanAuthor = author.trim().replace(/[-\s]+/g, '_');

  // 4. Construct new filename
  const newFileName = `${cleanTitle}-${cleanAuthor}${ext}`;
  
  if (file !== newFileName) {
    const oldPath = path.join(publicBooksDir, file);
    const newPath = path.join(publicBooksDir, newFileName);
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${file} -> ${newFileName}`);
  }
});

console.log('✅ Bulk rename complete!');
