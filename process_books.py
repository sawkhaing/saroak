import os
import json
import re

books_dir = "/Users/sawkhaing/Documents/codebase/saroak/public/books"
index_output = "/Users/sawkhaing/Documents/codebase/saroak/public/books_index.json"

# 1. First, safely rename the 11 known Zawgyi files to standard Unicode
renames = {
    "_ေျမာက္ဦးၿမိဳ႕မွသည္_တာခ်ီလိတ္ဆီသို႔_ကလ်ာဝိဇၨာ_သိပၸံ_Kalayar.azw3": "မြောက်ဦးမြို့မှသည်_တာချီလိတ်ဆီသို့_ကလျာဝိဇ္ဇာ_သိပ္ပံ_Kalayar.azw3",
    "ငါ့ဓား_ငါ့ေသြး_ငါ့ဧရာဝတီ_နႏၵ_Nanda.azw3": "ငါ့ဓား_ငါ့သွေး_ငါ့ဧရာဝတီ_နန္ဒ_Nanda.azw3",
    "ငါ့ဓား_ငါ့ေသြး_ငါ့ဧရာဝတီ_နႏၵ_Nanda-copy1.azw3": "ငါ့ဓား_ငါ့သွေး_ငါ့ဧရာဝတီ_နန္ဒ_Nanda-copy1.azw3",
    "စိတၱဇ_ေမာင္မိုးသူ_Mg_Moe_Thu.azw3": "စိတ္တဇ_မောင်မိုးသူ_Mg_Moe_Thu.azw3",
    "တီရွာ_ေမာင္ထြန္းသူ_Mg_Htun_Thu.azw3": "တီရွာ_မောင်ထွန်းသူ_Mg_Htun_Thu.azw3",
    "ပဆစ္အိမ္_ေမာင္သိန္းဆိုင္_Maung_Thein_Saing.azw3": "ပဆစ်အိမ်_မောင်သိန်းဆိုင်_Maung_Thein_Saing.azw3",
    "မသုဓမၼစာရီ_မိုးမိုး_အင္းလ်ား_Moe_Moe.azw3": "မသုဓမ္မစာရီ_မိုးမိုး_အင်းလျား_Moe_Moe.azw3",
    "သန္းေခါင္ယံလြတ္လပ္ေရး_ေမာင္ေပၚထြန္း_Maung_Paw_Htun.azw3": "သန်းခေါင်ယံလွတ်လပ်ရေး_မောင်ပေါ်ထွန်း_Maung_Paw_Htun.azw3",
    "အိပ္ဇိုးဒပ္_ေမာင္မိုးသူ_Maung_Moe_Thu.azw3": "အိပ်ဇိုးဒပ်_မောင်မိုးသူ_Maung_Moe_Thu.azw3",
    "ႏွလုံးသားႏွင့္လဲလွယ္ကာ_လမင္းမိုမို_Lamin_Mo_Mo.azw3": "နှလုံးသားနှင့်လဲလှယ်ကာ_လမင်းမိုမို_Lamin_Mo_Mo.azw3",
    "မနက္ျဖန္အတြက္_ဒီကေန႔_ဝင္းေဖဝင္း_ဘာသာျပန္_Win_Phae_Win.azw3": "မနက်ဖြန်အတွက်_ဒီကနေ့_ဝင်းဖေဝင်း_ဘာသာပြန်_Win_Phae_Win.azw3"
}

rename_count = 0
for old, new in renames.items():
    old_path = os.path.join(books_dir, old)
    new_path = os.path.join(books_dir, new)
    if os.path.exists(old_path) and not os.path.exists(new_path):
        os.rename(old_path, new_path)
        rename_count += 1
print(f"Renamed {rename_count} Zawgyi files.")

# 2. Now, generate the JSON index
book_extensions = {'.epub', '.kfx', '.azw3', '.mobi', '.pdf', '.docx'}
books = {}
copy_regex = re.compile(r'-copy\d+')

for filename in os.listdir(books_dir):
    filepath = os.path.join(books_dir, filename)
    if not os.path.isfile(filepath):
        continue
        
    name, ext = os.path.splitext(filename)
    ext = ext.lower()
    
    if ext not in book_extensions:
        continue
        
    canonical_name = copy_regex.sub('', name).strip()
    
    if canonical_name not in books:
        clean_display_title = canonical_name.replace('_', ' ').replace('-', ' ').strip()
        clean_display_title = re.sub(r'\s+', ' ', clean_display_title)
        
        books[canonical_name] = {
            "id": canonical_name,
            "display_title": clean_display_title,
            "original_names": [filename],
            "formats": {ext.replace('.', ''): filename}
        }
    else:
        books[canonical_name]["original_names"].append(filename)
        books[canonical_name]["formats"][ext.replace('.', '')] = filename

book_list = list(books.values())
book_list.sort(key=lambda x: x['display_title'])

with open(index_output, 'w', encoding='utf-8') as f:
    json.dump(book_list, f, ensure_ascii=False, indent=2)
    
print(f"Successfully generated index for {len(book_list)} unique books at {index_output}")
