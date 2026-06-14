import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'src', 'books-data.js');
let dataContent = fs.readFileSync(dataFile, 'utf8');

const booksRegex = /export const books = (\[[\s\S]*?\]);/;
const match = dataContent.match(booksRegex);

if (!match) {
  console.error("Could not find books array");
  process.exit(1);
}

let books = eval(match[1]);

// Comprehensive Author Mapping
books.forEach(book => {
  let authorStr = book.author.mm + " " + book.author.en + " " + book.id;
  authorStr = authorStr.toLowerCase();

  let cleanAuthor = book.author.mm; // Fallback

  if (authorStr.includes('min lu') || authorStr.includes('မင်းလူ') || authorStr.includes('lu ')) cleanAuthor = 'မင်းလူ (Min Lu)';
  else if (authorStr.includes('ma sandar') || authorStr.includes('မစန္ဒာ')) cleanAuthor = 'မစန္ဒာ (Ma Sandar)';
  else if (authorStr.includes('juu') || authorStr.includes('ဂျူး')) cleanAuthor = 'ဂျူး (Juu)';
  else if (authorStr.includes('htun thu') || authorStr.includes('မောင်ထွန်းသူ')) cleanAuthor = 'မောင်ထွန်းသူ (Mg Htun Thu)';
  else if (authorStr.includes('daw amar') || authorStr.includes('လူထုဒေါ်အမာ')) cleanAuthor = 'လူထုဒေါ်အမာ (Ludu Daw Amar)';
  else if (authorStr.includes('nat nwe') || authorStr.includes('နတ်နွယ်')) cleanAuthor = 'နတ်နွယ် (Nat Nwe)';
  else if (authorStr.includes('ni ko ye') || authorStr.includes('nikoye') || authorStr.includes('ko ye') || authorStr.includes('နီကိုရဲ')) cleanAuthor = 'နီကိုရဲ (Ni Ko Ye)';
  else if (authorStr.includes('wanna') || authorStr.includes('မောင်ဝဏ္ဏ')) cleanAuthor = 'မောင်ဝဏ္ဏ (Mg Wanna)';
  else if (authorStr.includes('nyein kyaw') || authorStr.includes('ငြိမ်းကျော်')) cleanAuthor = 'ငြိမ်းကျော် (Nyein Kyaw)';
  else if (authorStr.includes('sabal') || authorStr.includes('phyu nu') || authorStr.includes('စံပယ်ဖြူနု')) cleanAuthor = 'စံပယ်ဖြူနု (Sabal Phyu Nu)';
  else if (authorStr.includes('moe kyaw zin') || authorStr.includes('မိုးကျော်ဇင်')) cleanAuthor = 'မိုးကျော်ဇင် (Moe Kyaw Zin)';
  else if (authorStr.includes('kala') || authorStr.includes('ဦးကုလား')) cleanAuthor = 'ဦးကုလား (U Kala)';
  else if (authorStr.includes('nu nu') || authorStr.includes('inwa') || authorStr.includes('နုနုရည်အင်းဝ')) cleanAuthor = 'နုနုရည်အင်းဝ (Nu Nu Yi Inwa)';
  else if (authorStr.includes('tin maung') || authorStr.includes('maung myint') || authorStr.includes('တင်မောင်မြင့်')) cleanAuthor = 'တင်မောင်မြင့် (Tin Maung Myint)';
  else if (authorStr.includes('linyon') || authorStr.includes('လင်းယုန်')) cleanAuthor = 'လင်းယုန်မောင်မောင် (Linyon Mg Mg)';
  else if (authorStr.includes('kalayar') || authorStr.includes('ကလျာ')) cleanAuthor = 'ကလျာဝိဇ္ဇာ (Kalayar)';
  else if (authorStr.includes('zin thant') || authorStr.includes('ဇင်သန့်')) cleanAuthor = 'ဇင်သန့် (Zin Thant)';
  else if (authorStr.includes('phae win') || authorStr.includes('ဝင်းဖေဝင်း')) cleanAuthor = 'ဝင်းဖေဝင်း (Win Phae Win)';
  else if (authorStr.includes('htin lin') || authorStr.includes('ထင်လင်း')) cleanAuthor = 'ထင်လင်း (Htin Lin)';
  else if (authorStr.includes('lamin') || authorStr.includes('mo mo') || authorStr.includes('လမင်းမိုမို')) cleanAuthor = 'လမင်းမိုမို (Lamin Mo Mo)';
  else if (authorStr.includes('moe moe') || authorStr.includes('မိုးမိုး')) cleanAuthor = 'မိုးမိုး အင်းလျား (Moe Moe Inya)';
  else if (authorStr.includes('moe nin') || authorStr.includes('ပီမိုးနင်း')) cleanAuthor = 'ပီမိုးနင်း (P. Moe Nin)';
  else if (authorStr.includes('myint than') || authorStr.includes('မြင့်သန်း')) cleanAuthor = 'မြင့်သန်း (Myint Than)';
  else if (authorStr.includes('nu mdy') || authorStr.includes('ယဉ်ယဉ်နု')) cleanAuthor = 'ယဉ်ယဉ်နု (Yin Yin Nu)';
  else if (authorStr.includes('paw htun') || authorStr.includes('မောင်ပေါ်ထွန်း')) cleanAuthor = 'မောင်ပေါ်ထွန်း (Mg Paw Htun)';
  else if (authorStr.includes('phae myint') || authorStr.includes('ဖေမြင့်')) cleanAuthor = 'ဖေမြင့် (Phae Myint)';
  else if (authorStr.includes('swan yay') || authorStr.includes('မောင်စွမ်းရည်')) cleanAuthor = 'မောင်စွမ်းရည် (Mg Swan Yay)';
  else if (authorStr.includes('than tint') || authorStr.includes('မြသန်းတင့်')) cleanAuthor = 'မြသန်းတင့် (Mya Than Tint)';
  else if (authorStr.includes('thar ya') || authorStr.includes('မောင်သာရ')) cleanAuthor = 'မောင်သာရ (Mg Thar Ya)';
  else if (authorStr.includes('thein kha') || authorStr.includes('မင်းသိင်္ခ') || authorStr.includes('min thein')) cleanAuthor = 'မင်းသိင်္ခ (Min Thein Kha)';
  else if (authorStr.includes('thein saing') || authorStr.includes('မောင်သိန်းဆိုင်')) cleanAuthor = 'မောင်သိန်းဆိုင် (Mg Thein Saing)';
  else if (authorStr.includes('win oo') || authorStr.includes('ဝင်းဦး')) cleanAuthor = 'ဝင်းဦး (Win Oo)';
  else if (authorStr.includes('aung thein') || authorStr.includes('ဆင်ဖြူကျွန်း')) cleanAuthor = 'ဆင်ဖြူကျွန်းအောင်သိန်း (Aung Thein)';
  else if (authorStr.includes('ba thaung') || authorStr.includes('သခင်ဘသောင်း')) cleanAuthor = 'သခင်ဘသောင်း (Ba Thaung)';
  else if (authorStr.includes('chan wai') || authorStr.includes('မိချမ်းဝေ')) cleanAuthor = 'မိချမ်းဝေ (Mi Chan Wai)';
  else if (authorStr.includes('eu daung') || authorStr.includes('ရွှေဥဒေါင်း')) cleanAuthor = 'ရွှေဥဒေါင်း (Shwe U Daung)';
  else if (authorStr.includes('kyat khoe') || authorStr.includes('မောင်ကျပ်ခိုး')) cleanAuthor = 'မောင်ကျပ်ခိုး (Mg Kyat Khoe)';
  else if (authorStr.includes('u hla') || authorStr.includes('ဦးလှ')) cleanAuthor = 'လူထုဦးလှ (Ludu U Hla)';
  else if (authorStr.includes('ma lay') || authorStr.includes('မမလေး')) cleanAuthor = 'ဂျာနယ်ကျော်မမလေး (Journal Kyaw Ma Ma Lay)';
  else if (authorStr.includes('mg htin') || authorStr.includes('မောင်ထင်')) cleanAuthor = 'မောင်ထင် (Mg Htin)';
  else if (authorStr.includes('moe thu') || authorStr.includes('မောင်မိုးသူ')) cleanAuthor = 'မောင်မိုးသူ (Mg Moe Thu)';
  else if (authorStr.includes('sar ni') || authorStr.includes('သစ္စာနီ')) cleanAuthor = 'သစ္စာနီ (Thit Sar Ni)';
  else if (authorStr.includes('sein win') || authorStr.includes('လူထုစိန်ဝင်း')) cleanAuthor = 'လူထုစိန်ဝင်း (Ludu Sein Win)';
  else if (authorStr.includes('soe san') || authorStr.includes('မင်းခိုက်စိုးစန်')) cleanAuthor = 'မင်းခိုက်စိုးစန် (Min Khite Soe San)';
  else if (authorStr.includes('su nhat') || authorStr.includes('ဆူးငှက်')) cleanAuthor = 'ဆူးငှက် (Su Nhat)';
  else if (authorStr.includes('nanda') || authorStr.includes('နန္ဒ')) cleanAuthor = 'နန္ဒ (Nanda)';
  else if (authorStr.includes('noriko otsu')) cleanAuthor = 'Noriko Otsu';

  // SET BOTH en AND mm TO BE THE IDENTICAL CLEAN STRING!
  book.author.en = cleanAuthor;
  book.author.mm = cleanAuthor;
});

const newBooksString = `export const books = ${JSON.stringify(books, null, 2)};`;
dataContent = dataContent.replace(booksRegex, newBooksString);

fs.writeFileSync(dataFile, dataContent);
console.log("Author metadata unified and thoroughly cleaned!");
