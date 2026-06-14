// ============================================================
// SarOak — Myanmar Ebook Catalog
// books-data.js · Sample book data with bilingual metadata
// ============================================================

export const books = [
  // ── Novels ─────────────────────────────────────────────────
  {
    id: 'book-1',
    title: {
      en: 'The River of Lost Time',
      mm: 'ပျောက်ဆုံးသွားသော အချိန်မြစ်'
    },
    author: {
      en: 'Mya Thandar Win',
      mm: 'မြသန္တာဝင်း'
    },
    description: {
      en: 'A sweeping novel that follows three generations of a family living along the banks of the Irrawaddy, weaving together love, loss, and the relentless flow of change.',
      mm: 'ဧရာဝတီမြစ်ကမ်းတွင် နေထိုင်သော မိသားစုသုံးမျိုးဆက်၏ ဘဝကို အချစ်၊ ဆုံးရှုံးမှုနှင့် မရပ်မနား ပြောင်းလဲမှုများဖြင့် ရေးသားထားသော ဝတ္ထုရှည်တစ်ပုဒ်ဖြစ်သည်။'
    },
    category: 'novel',
    cover: '/placeholder-covers/book-1.svg',
    fileSize: '3.1 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2024-01-15',
    pages: 384,
    featured: true,
    popular: true
  },
  {
    id: 'book-2',
    title: {
      en: 'Whispers of the Pagoda',
      mm: 'စေတီတော်၏ တိုးတိတ်သံများ'
    },
    author: {
      en: 'Kyaw Zin Htet',
      mm: 'ကျော်ဇင်ထက်'
    },
    description: {
      en: 'Set in colonial-era Mandalay, this literary novel explores the tension between tradition and modernity through the eyes of a young monk questioning his faith.',
      mm: 'ကိုလိုနီခေတ် မန္တလေးတွင် အခြေပြုပြီး ယုံကြည်မှုကို မေးခွန်းထုတ်နေသော ရဟန်းလူငယ်တစ်ပါး၏ အမြင်ဖြင့် ရိုးရာနှင့် ခေတ်သစ်ကြား ပဋိပက္ခကို စူးစမ်းလေ့လာထားသည်။'
    },
    category: 'novel',
    cover: '/placeholder-covers/book-2.svg',
    fileSize: '2.8 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2024-03-22',
    pages: 296,
    featured: true,
    popular: false
  },
  {
    id: 'book-3',
    title: {
      en: 'Golden Smoke',
      mm: 'ရွှေရောင်မီးခိုး'
    },
    author: {
      en: 'Hnin Si Thu',
      mm: 'နှင်းစီသူ'
    },
    description: {
      en: "A gripping modern thriller about a journalist uncovering a conspiracy in Yangon's booming real-estate market. Fast-paced and unforgettable.",
      mm: 'ရန်ကုန်အိမ်ခြံမြေဈေးကွက်ရှိ ပူးပေါင်းကြံစည်မှုကို ဖော်ထုတ်သော သတင်းထောက်တစ်ဦး၏ စွဲမက်ဖွယ်ကောင်းသော ခေတ်သစ်စိတ်လှုပ်ရှားဖွယ်ဝတ္ထု။'
    },
    category: 'novel',
    cover: '/placeholder-covers/book-3.svg',
    fileSize: '2.4 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2024-06-10',
    pages: 320,
    featured: false,
    popular: true
  },

  // ── Short Stories ──────────────────────────────────────────
  {
    id: 'book-4',
    title: {
      en: 'Lanterns at Dusk',
      mm: 'ညနေခင်းမီးအိမ်များ'
    },
    author: {
      en: 'Thuzar Myint',
      mm: 'သူဇာမြင့်'
    },
    description: {
      en: 'A luminous collection of twelve short stories set in small towns across Myanmar, capturing fleeting moments of joy, sorrow, and quiet resilience.',
      mm: 'မြန်မာနိုင်ငံရှိ မြို့ငယ်များတွင် အခြေပြုထားသော ဝတ္ထုတိုတစ်ဆယ့်နှစ်ပုဒ်ပါ စုစည်းမှုဖြစ်ပြီး ဝမ်းသာမှု၊ ဝမ်းနည်းမှုနှင့် တိတ်ဆိတ်သော ခံနိုင်ရည်ရှိမှု အခိုက်အတန့်များကို ဖမ်းယူထားသည်။'
    },
    category: 'short-story',
    cover: '/placeholder-covers/book-4.svg',
    fileSize: '1.6 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2024-02-28',
    pages: 198,
    featured: true,
    popular: true
  },
  {
    id: 'book-5',
    title: {
      en: 'Voices from the Teashop',
      mm: 'လက်ဖက်ရည်ဆိုင်မှ အသံများ'
    },
    author: {
      en: 'Aung Kyaw Moe',
      mm: 'အောင်ကျော်မိုး'
    },
    description: {
      en: 'Humorous and poignant tales overheard at a Yangon teashop. Each story is a snapshot of everyday life, told with warmth and razor-sharp wit.',
      mm: 'ရန်ကုန်လက်ဖက်ရည်ဆိုင်တွင် ကြားရသော ရယ်စရာကောင်းပြီး နှလုံးသားထိမိသော ပုံပြင်များ။ ပုံပြင်တစ်ပုဒ်စီသည် နေ့စဉ်ဘဝ၏ ရုပ်ပုံဖြစ်သည်။'
    },
    category: 'short-story',
    cover: '/placeholder-covers/book-5.svg',
    fileSize: '1.2 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2024-05-14',
    pages: 164,
    featured: false,
    popular: true
  },

  // ── Poetry ─────────────────────────────────────────────────
  {
    id: 'book-6',
    title: {
      en: 'Monsoon Verses',
      mm: 'မိုးရာသီ ကဗျာများ'
    },
    author: {
      en: 'Wai Yan Phyo',
      mm: 'ဝေယံဖြိုး'
    },
    description: {
      en: 'A contemporary poetry collection that captures the rhythms of monsoon season — rain-soaked streets, longing, and renewal — in vivid, lyrical Myanmar.',
      mm: 'မိုးရာသီ၏ သံစဉ်များဖြစ်သော မိုးရေစိုလမ်းများ၊ လွမ်းဆွတ်မှုနှင့် ပြန်လည်အသစ်ဖြစ်ခြင်းကို သက်ဝင်လှုပ်ရှားသော ကဗျာများဖြင့် ဖမ်းယူထားသည်။'
    },
    category: 'poetry',
    cover: '/placeholder-covers/book-6.svg',
    fileSize: '0.9 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2024-07-01',
    pages: 112,
    featured: true,
    popular: false
  },
  {
    id: 'book-7',
    title: {
      en: 'Ink and Jasmine',
      mm: 'မှင်နှင့် စံပယ်'
    },
    author: {
      en: 'Su Mon Kyaw',
      mm: 'စုမွန်ကျော်'
    },
    description: {
      en: 'Romantic and meditative poems inspired by classical Burmese literary traditions, reimagined for the modern reader with a fresh, intimate voice.',
      mm: 'ရှေးရိုးစွဲ မြန်မာစာပေ အစဉ်အလာများမှ လှုံ့ဆော်ထားသော အချစ်ဆန်ပြီး ဆင်ခြင်နှလုံးသွင်းဖွယ် ကဗျာများကို ခေတ်သစ်စာဖတ်သူအတွက် ပြန်လည်ဖန်တီးထားသည်။'
    },
    category: 'poetry',
    cover: '/placeholder-covers/book-7.svg',
    fileSize: '0.7 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2024-04-18',
    pages: 96,
    featured: false,
    popular: false
  },

  // ── History ────────────────────────────────────────────────
  {
    id: 'book-8',
    title: {
      en: 'Kingdoms of the Ayeyarwady',
      mm: 'ဧရာဝတီ ပြည့်ရှင်များ'
    },
    author: {
      en: 'Dr. Tin Maung Oo',
      mm: 'ဒေါက်တာ တင်မောင်ဦး'
    },
    description: {
      en: 'A comprehensive look at the ancient kingdoms that flourished along Myanmar\'s great river, from Bagan to Ava, enriched with maps and rare illustrations.',
      mm: 'ပုဂံမှ အင်းဝအထိ မြန်မာ့မြစ်ကြီးတစ်လျှောက် ထွန်းကားခဲ့သော ရှေးဟောင်းပြည်ထောင်များကို မြေပုံများနှင့် ရှားပါးပုံများဖြင့် အကျယ်တဝင့် လေ့လာထားသည်။'
    },
    category: 'history',
    cover: '/placeholder-covers/book-8.svg',
    fileSize: '5.2 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2023-11-20',
    pages: 480,
    featured: true,
    popular: true
  },
  {
    id: 'book-9',
    title: {
      en: 'The Independence Road',
      mm: 'လွတ်လပ်ရေး လမ်းကြောင်း'
    },
    author: {
      en: 'Khin Myo Chit',
      mm: 'ခင်မျိုးချစ်'
    },
    description: {
      en: 'A meticulously researched account of Myanmar\'s independence movement, telling the stories of unsung heroes who shaped the nation\'s destiny.',
      mm: 'မြန်မာ့လွတ်လပ်ရေးလှုပ်ရှားမှုကို စေ့စေ့စပ်စပ်သုတေသနပြုထားပြီး နိုင်ငံ့ကံကြမ္မာကို ပုံဖော်ခဲ့သော အမည်မတွင်သော သူရဲကောင်းများ၏ ဇာတ်လမ်းများကို ပြောပြထားသည်။'
    },
    category: 'history',
    cover: '/placeholder-covers/book-9.svg',
    fileSize: '3.8 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2024-01-04',
    pages: 352,
    featured: false,
    popular: false
  },

  // ── Self-Help ──────────────────────────────────────────────
  {
    id: 'book-10',
    title: {
      en: 'Mindful Morning',
      mm: 'သတိထားသော မနက်ခင်း'
    },
    author: {
      en: 'Phyo Thiha',
      mm: 'ဖြိုးသီဟ'
    },
    description: {
      en: 'Practical mindfulness techniques rooted in Myanmar\'s meditation traditions, adapted for busy modern lives. Start each day with clarity and calm.',
      mm: 'မြန်မာ့တရားအားထုတ်မှု အစဉ်အလာများမှ ဆင်းသက်လာသော လက်တွေ့ကျသော သတိပဌာန်နည်းစနစ်များကို ခေတ်သစ်အလုပ်များသော ဘဝအတွက် လိုက်လျောညီထွေဖြစ်အောင် ပြင်ဆင်ထားသည်။'
    },
    category: 'self-help',
    cover: '/placeholder-covers/book-10.svg',
    fileSize: '1.8 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2024-08-05',
    pages: 224,
    featured: true,
    popular: true
  },
  {
    id: 'book-11',
    title: {
      en: 'The Art of Starting Over',
      mm: 'ပြန်လည်စတင်ခြင်း အနုပညာ'
    },
    author: {
      en: 'Ei Thandar Phyo',
      mm: 'အိသန္တာဖြိုး'
    },
    description: {
      en: 'An empowering guide for anyone facing a crossroad in life. Filled with real stories from Myanmar professionals who reinvented themselves.',
      mm: 'ဘဝ၌ လမ်းခွလမ်းဆုံ ရင်ဆိုင်နေရသူတိုင်းအတွက် စွမ်းအားဖြည့်ပေးသော လမ်းညွှန်။ မိမိကိုယ်ကိုယ် ပြန်လည်ဖန်တီးခဲ့သော မြန်မာပညာရှင်များ၏ အမှန်တကယ်ဇာတ်လမ်းများ ပါဝင်သည်။'
    },
    category: 'self-help',
    cover: '/placeholder-covers/book-11.svg',
    fileSize: '2.0 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2024-09-12',
    pages: 256,
    featured: false,
    popular: false
  },

  // ── Technology ─────────────────────────────────────────────
  {
    id: 'book-12',
    title: {
      en: 'Code Yangon',
      mm: 'ကုဒ်ရန်ကုန်'
    },
    author: {
      en: 'Hein Htet Aung',
      mm: 'ဟိန်းထက်အောင်'
    },
    description: {
      en: 'An introduction to web development written in Myanmar, covering HTML, CSS, and JavaScript with examples drawn from Myanmar\'s growing tech scene.',
      mm: 'HTML, CSS နှင့် JavaScript တို့ကို မြန်မာနိုင်ငံ၏ ကြီးထွားနေသော နည်းပညာနယ်ပယ်မှ ဥပမာများဖြင့် မြန်မာလိုရေးသားထားသော ဝဘ်ဖွံ့ဖြိုးရေး မိတ်ဆက်စာအုပ်။'
    },
    category: 'technology',
    cover: '/placeholder-covers/book-12.svg',
    fileSize: '4.5 MB',
    format: 'PDF',
    downloadUrl: '/books/sample.pdf',
    publishDate: '2024-10-01',
    pages: 410,
    featured: false,
    popular: true
  }
];

// Multiply the books to showcase multiple rows dynamically
const originalCount = books.length;
for (let i = 0; i < 4; i++) {
  const copies = books.slice(0, originalCount).map(b => ({
    ...b,
    id: b.id + '-copy-' + i
  }));
  books.push(...copies);
}
// ── Category metadata ────────────────────────────────────────
// Counts are derived from the books array above.
export const categories = [
  {
    id: 'novel',
    name: { en: 'Novel', mm: 'ဝတ္ထု' },
    icon: '📖',
    count: books.filter((b) => b.category === 'novel').length
  },
  {
    id: 'short-story',
    name: { en: 'Short Story', mm: 'ဝတ္ထုတို' },
    icon: '📝',
    count: books.filter((b) => b.category === 'short-story').length
  },
  {
    id: 'poetry',
    name: { en: 'Poetry', mm: 'ကဗျာ' },
    icon: '✨',
    count: books.filter((b) => b.category === 'poetry').length
  },
  {
    id: 'history',
    name: { en: 'History', mm: 'သမိုင်း' },
    icon: '🏛️',
    count: books.filter((b) => b.category === 'history').length
  },
  {
    id: 'self-help',
    name: { en: 'Self-Help', mm: 'ကိုယ်တိုင်ဖွံ့ဖြိုးရေး' },
    icon: '🌱',
    count: books.filter((b) => b.category === 'self-help').length
  },
  {
    id: 'technology',
    name: { en: 'Technology', mm: 'နည်းပညာ' },
    icon: '💻',
    count: books.filter((b) => b.category === 'technology').length
  }
];
