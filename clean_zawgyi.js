import fs from 'fs';
import path from 'path';

const booksDir = path.join(process.cwd(), 'public', 'books');

const files = fs.readdirSync(booksDir);

// 1. Delete duplicates
files.forEach(file => {
  if (file.includes('-copy')) {
    fs.unlinkSync(path.join(booksDir, file));
    console.log(`Deleted duplicate: ${file}`);
  }
});

// 2. Rename Zawgyi to Unicode
const mappings = {
  'ေျမာက္ဦးၿမိဳ႕မွသည္_တာခ်ီလိတ္ဆီသို႔_ကလ်ာဝိဇၨာ_သိပၸံ_Kalayar.azw3': 'မြောက်ဦးမြို့မှသည်_တာချီလိတ်ဆီသို့_ကလျာဝိဇ္ဇာ_သိပ္ပံ_Kalayar.azw3',
  'ငါ့ဓား_ငါ့ေသြး_ငါ့ဧရာဝတီ_နႏၵ_Nanda.azw3': 'ငါ့ဓား_ငါ့သွေး_ငါ့ဧရာဝတီ_နန္ဒ_Nanda.azw3',
  'စိတၱဇ_ေမာင္မိုးသူ_Mg_Moe_Thu.azw3': 'စိတ္တဇ_မောင်မိုးသူ_Mg_Moe_Thu.azw3',
  'တီရွာ_ေမာင္ထြန္းသူ_Mg_Htun_Thu.azw3': 'တီရှာ_မောင်ထွန်းသူ_Mg_Htun_Thu.azw3',
  'ပဆစ္အိမ္_ေမာင္သိန္းဆိုင္_Maung_Thein_Saing.azw3': 'ပဆစ်အိမ်_မောင်သိန်းဆိုင်_Maung_Thein_Saing.azw3',
  'မနက္ျဖန္အတြက္_ဒီကေန႔_ဝင္းေဖဝင္း_ဘာသာျပန္_Win_Phae_Win.azw3': 'မနက်ဖြန်အတွက်_ဒီကနေ့_ဝင်းဖေဝင်း_ဘာသာပြန်_Win_Phae_Win.azw3',
  'မသုဓမၼစာရီ_မိုးမိုး_အင္းလ်ား_Moe_Moe.azw3': 'မသုဓမ္မစာရီ_မိုးမိုး_အင်းလျား_Moe_Moe.azw3',
  'သန္းေခါင္ယံလြတ္လပ္ေရး_ေမာင္ေပၚထြန္း_Maung_Paw_Htun.azw3': 'သန်းခေါင်ယံလွတ်လပ်ရေး_မောင်ပေါ်ထွန်း_Maung_Paw_Htun.azw3',
  'အိပ္ဇိုးဒပ္_ေမာင္မိုးသူ_Maung_Moe_Thu.azw3': 'အိပ်ဇိုးဒပ်_မောင်မိုးသူ_Maung_Moe_Thu.azw3',
  'ႏွလုံးသားႏွင့္လဲလွယ္ကာ_လမင္းမိုမို_Lamin_Mo_Mo.azw3': 'နှလုံးသားနှင့်လဲလှယ်ကာ_လမင်းမိုမို_Lamin_Mo_Mo.azw3'
};

const updatedFiles = fs.readdirSync(booksDir);
updatedFiles.forEach(file => {
  if (mappings[file]) {
    const oldPath = path.join(booksDir, file);
    const newPath = path.join(booksDir, mappings[file]);
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${file} -> ${mappings[file]}`);
  }
});

console.log('Cleanup complete!');
