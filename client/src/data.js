export const categories = [
  { id: "keychains", name: "Crochet Keychains",     image: "/images/keychain-main.jpg" },
  { id: "plushies",  name: "Crochet Mini Plushies", image: "/images/plushie-main.jpg"  },
  { id: "totes",     name: "Crochet Tote Bags",     image: "/images/tote-main.jpg"     },
  { id: "hair",      name: "Hair Accessories",       image: "/images/hair-main.jpg"     },
  { id: "bouquets",  name: "Crochet Bouquets",       image: "/images/bouquet-main.jpg"  },
];

export const subCategories = {
  keychains: [
    { id: "boy-key",        name: "Boy Keychains",        image: "/images/boy-k.jpg",        desc: "Cool & fun designs"     },
    { id: "girl-key",       name: "Girl Keychains",       image: "/images/girl-k.jpg",       desc: "Cute & sparkly styles"  },
    { id: "couple-key",     name: "Couple Keychains",     image: "/images/couple-k.jpg",     desc: "Matching sets for two"  },
    { id: "genderless-key", name: "Genderless Keychains", image: "/images/genderless-k.jpg", desc: "For everyone & anyone"  },
  ],
  plushies: [
    { id: "animal-plush",   name: "Animal Plushies",      image: "/images/animal-plush.jpg", desc: "Tiny adorable animals"  },
    { id: "food-plush",     name: "Food Plushies",        image: "/images/food-plush.jpg",   desc: "Kawaii food characters" },
    { id: "character-plush",name: "Character Plushies",   image: "/images/char-plush.jpg",   desc: "Custom cute characters" },
  ],
  totes: [
    { id: "solid-tote",     name: "Solid Colors",         image: "/images/solid-tote.jpg",   desc: "Clean minimal carry-alls" },
    { id: "pattern-tote",   name: "Patterned Designs",    image: "/images/pattern-tote.jpg", desc: "Bold & playful patterns"  },
  ],
  hair: [
    { id: "scrunchies",     name: "Scrunchies",           image: "/images/scrunchie-cat.jpg",desc: "Soft & stretchy styles"  },
    { id: "clips",          name: "Hair Clips",           image: "/images/clips-cat.jpg",    desc: "Floral & fun clips"      },
    { id: "bandanas",       name: "Bandanas",             image: "/images/bandana-cat.jpg",  desc: "Boho-chic headwraps"     },
    { id: "gajra",          name: "Gajra",                image: "/images/gajra.jpg",        desc: "Traditional headwear"  },
  ],
  bouquets: [
    { id: "tulips",         name: "Tulip Bouquets",       image: "/images/tulips.jpg",       desc: "Bright & cheerful blooms" },
    { id: "roses",          name: "Rose Bouquets",        image: "/images/roses.jpg",        desc: "Timeless romantic roses"  },
    { id: "sunflowers",     name: "Sunflowers",           image: "/images/sunflowers.jpg",   desc: "Sunshine in every stitch" },
  ],
};

export const products = [

  // ── KEYCHAINS ──────────────────────────────────────────────
  {
    id: 1,
    category: "keychains", subCat: "couple-key",
    name: "Heart Half-Set", price: 299,
    image: "/images/heart-k.jpg", images: ["/images/heart-k.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 18, stock: 10,
    colors: ["Original", "Pastel Pink", "Red"],
    description: "A matching half-heart keychain set — one for you, one for your person. 💕"
  },
  {
    id: 2,
    category: "keychains", subCat: "boy-key",
    name: "Mini Sneaker", price: 180,
    image: "/images/sneaker-k.jpg", images: ["/images/sneaker-k.jpg"],
    tag: "NEW", rating: 4.8, reviews: 5, stock: 8,
    colors: ["Original", "Midnight", "Olive"],
    description: "A teeny tiny crocheted sneaker that hangs from your keys or bag. 👟"
  },
  {
    id: 3,
    category: "keychains", subCat: "girl-key",
    name: "Strawberry Charm", price: 160,
    image: "/images/girl-k.jpg", images: ["/images/girl-k.jpg"],
    tag: "POPULAR", rating: 5, reviews: 9, stock: 6,
    colors: ["Original", "Pastel Pink", "Cream"],
    description: "A sweet little strawberry keychain. 🍓"
  },
  {
    id: 4,
    category: "keychains", subCat: "genderless-key",
    name: "Cloud Puff", price: 140,
    image: "/images/genderless-k.jpg", images: ["/images/genderless-k.jpg"],
    tag: "NEW", rating: 4.9, reviews: 4, stock: 12,
    colors: ["White", "Pastel Blue", "Lavender"],
    description: "A squishy little cloud keychain for dreamers. ☁️"
  },

  // ── PLUSHIES ───────────────────────────────────────────────
  {
    id: 14,
    category: "plushies", subCat: "animal-plush",
    name: "Mini Bunny", price: 349,
    image: "/images/bunny-plush.jpg", images: ["/images/bunny-plush.jpg"],
    tag: "NEW", rating: 5, reviews: 6, stock: 5,
    colors: ["White", "Cream", "Pastel Pink"],
    description: "A tiny crocheted bunny that fits in your pocket. Squishy, soft, and absolutely adorable. 🐰"
  },
  {
    id: 15,
    category: "plushies", subCat: "food-plush",
    name: "Strawberry Plushie", price: 299,
    image: "/images/strawberry-plush.jpg", images: ["/images/strawberry-plush.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 11, stock: 8,
    colors: ["Original", "Pastel"],
    description: "An impossibly cute crocheted strawberry plushie. Makes the perfect desk buddy. 🍓"
  },
  {
    id: 16,
    category: "plushies", subCat: "character-plush",
    name: "Ghost Buddy", price: 320,
    image: "/images/ghost-plush.jpg", images: ["/images/ghost-plush.jpg"],
    tag: "LIMITED", rating: 5, reviews: 3, stock: 4,
    colors: ["White", "Lavender", "Mint"],
    description: "A friendly little ghost plushie — spooky cute and very huggable. 👻"
  },

  // ── HAIR ACCESSORIES ───────────────────────────────────────
  {
    id: 5,
    category: "hair", subCat: "scrunchies",
    name: "Tulip Scrunchie", price: 150,
    image: "/images/tulip-s.jpg", images: ["/images/tulip-s.jpg"],
    tag: "POPULAR", rating: 5, reviews: 12, stock: 15,
    colors: ["Original", "Blush", "Lavender"],
    description: "A soft crochet scrunchie adorned with a tiny tulip. 🌷"
  },
  {
    id: 6,
    category: "hair", subCat: "scrunchies",
    name: "Classic Frill", price: 80,
    image: "/images/frill-s.jpg", images: ["/images/frill-s.jpg"],
    tag: "SALE", rating: 4.5, reviews: 24, stock: 20,
    colors: ["Original", "Pastel", "Midnight"],
    description: "Our most classic scrunchie — a full frill that holds your hair beautifully. 🎀"
  },
  {
    id: 7,
    category: "hair", subCat: "clips",
    name: "Sunflower Clip", price: 120,
    image: "/images/sun-clip.jpg", images: ["/images/sun-clip.jpg"],
    tag: "HANDMADE", rating: 5, reviews: 7, stock: 5,
    colors: ["Yellow", "Pastel Yellow", "White"],
    description: "A hand-crocheted sunflower hair clip. 🌻"
  },
  {
    id: 8,
    category: "hair", subCat: "bandanas",
    name: "Boho Bandana", price: 200,
    image: "/images/bandana-cat.jpg", images: ["/images/bandana-cat.jpg"],
    tag: "NEW", rating: 4.8, reviews: 3, stock: 7,
    colors: ["Original", "Terracotta", "Sage"],
    description: "A crocheted bandana with boho energy. 🌿"
  },

  // ── BOUQUETS ───────────────────────────────────────────────
  {
    id: 9,
    category: "bouquets", subCat: "tulips",
    name: "Pink Tulip Trio", price: 350,
    image: "/images/pink-tulip.jpg", images: ["/images/pink-tulip.jpg"],
    tag: "GIFT", rating: 5, reviews: 15, stock: 4,
    colors: ["Pink", "White", "Lavender"],
    description: "Three perfectly crocheted tulips — the gift that never wilts. 🌷🌷🌷"
  },
  {
    id: 10,
    category: "bouquets", subCat: "roses",
    name: "Eternal Red Rose", price: 499,
    image: "/images/rose-b.jpg", images: ["/images/rose-b.jpg"],
    tag: "ROMANTIC", rating: 5, reviews: 32, stock: 3,
    colors: ["Red", "Pink", "Cream"],
    description: "A single eternal crochet rose. 🌹"
  },
  {
    id: 11,
    category: "bouquets", subCat: "sunflowers",
    name: "Sunshine Bundle", price: 420,
    image: "/images/sunflowers.jpg", images: ["/images/sunflowers.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 11, stock: 5,
    colors: ["Yellow", "Pastel Yellow", "Orange"],
    description: "A cheerful bundle of crocheted sunflowers. 🌻"
  },

  // ── TOTE BAGS ─────────────────────────────────────────────
  {
    id: 12,
    category: "totes", subCat: "pattern-tote",
    name: "Daisy Checkered", price: 850,
    image: "/images/daisy-tote.jpg", images: ["/images/daisy-tote.jpg"],
    tag: "LIMITED", rating: 5, reviews: 3, stock: 2,
    colors: ["Original", "Pastel", "Monochrome"],
    description: "A hand-knotted checkered tote with daisy details. 🌼"
  },
  {
    id: 13,
    category: "totes", subCat: "solid-tote",
    name: "Minimal Market Tote", price: 699,
    image: "/images/solid-tote.jpg", images: ["/images/solid-tote.jpg"],
    tag: "NEW", rating: 4.9, reviews: 2, stock: 6,
    colors: ["Cream", "Sage", "Blush", "Midnight"],
    description: "A clean, solid-color crochet tote perfect for market runs. 👜"
  },
];