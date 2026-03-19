export const categories = [
  { id: "hair",      name: "Hair Accessories",  image: "/images/hair-main.jpg"     },
  { id: "bouquets",  name: "Crochet Bouquets",  image: "/images/bouquet-main.jpg"  },
  { id: "keychains", name: "Crochet Keychains", image: "/images/keychain-main.jpg" },
  { id: "totes",     name: "Tote Bags",         image: "/images/tote-main.jpg"     }
];

export const subCategories = {
  hair: [
    { id: "scrunchies", name: "Scrunchies", image: "/images/scrunchie-cat.jpg", desc: "Soft & stretchy styles"     },
    { id: "clips",      name: "Hair Clips", image: "/images/clips-cat.jpg",     desc: "Floral & fun clips"         },
    { id: "bandanas",   name: "Bandanas",   image: "/images/bandana-cat.jpg",   desc: "Boho-chic headwraps"        }
  ],
  bouquets: [
    { id: "tulips",     name: "Tulip Bouquets", image: "/images/tulips.jpg",     desc: "Bright & cheerful blooms"  },
    { id: "roses",      name: "Rose Bouquets",  image: "/images/roses.jpg",      desc: "Timeless romantic roses"   },
    { id: "sunflowers", name: "Sunflowers",     image: "/images/sunflowers.jpg", desc: "Sunshine in every stitch"  }
  ],
  keychains: [
    { id: "boy-key",        name: "Boy Keychains",       image: "/images/boy-k.jpg",       desc: "Cool & fun designs"       },
    { id: "girl-key",       name: "Girl Keychains",      image: "/images/girl-k.jpg",      desc: "Cute & sparkly styles"    },
    { id: "couple-key",     name: "Couple Keychains",    image: "/images/couple-k.jpg",    desc: "Matching sets for two"    },
    { id: "genderless-key", name: "Genderless Keychains",image: "/images/genderless-k.jpg",desc: "For everyone & anyone"    }
  ],
  totes: [
    { id: "solid-tote",   name: "Solid Colors",     image: "/images/solid-tote.jpg",   desc: "Clean minimal carry-alls" },
    { id: "pattern-tote", name: "Patterned Designs", image: "/images/pattern-tote.jpg", desc: "Bold & playful patterns"  }
  ]
};

export const products = [

  // --- KEYCHAINS ---
  {
    id: 1,
    category: "keychains",
    subCat: "couple-key",
    name: "Heart Half-Set",
    price: 299,
    image: "/images/heart-k.jpg",
    images: ["/images/heart-k.jpg"],
    tag: "BESTSELLER",
    rating: 5,
    reviews: 18,
    stock: 10,
    colors: ["Original", "Pastel Pink", "Red"],
    description: "A matching half-heart keychain set — one for you, one for your person. Crocheted with love and a lot of shimmer. 💕"
  },
  {
    id: 2,
    category: "keychains",
    subCat: "boy-key",
    name: "Mini Sneaker",
    price: 180,
    image: "/images/sneaker-k.jpg",
    images: ["/images/sneaker-k.jpg"],
    tag: "NEW",
    rating: 4.8,
    reviews: 5,
    stock: 8,
    colors: ["Original", "Midnight", "Olive"],
    description: "A teeny tiny crocheted sneaker that hangs from your keys or bag. Sporty, cute, and completely handmade. 👟"
  },
  {
    id: 3,
    category: "keychains",
    subCat: "girl-key",
    name: "Strawberry Charm",
    price: 160,
    image: "/images/girl-k.jpg",
    images: ["/images/girl-k.jpg"],
    tag: "POPULAR",
    rating: 5,
    reviews: 9,
    stock: 6,
    colors: ["Original", "Pastel Pink", "Cream"],
    description: "A sweet little strawberry keychain that adds a pop of cuteness to any bag or keys. 🍓"
  },
  {
    id: 4,
    category: "keychains",
    subCat: "genderless-key",
    name: "Cloud Puff",
    price: 140,
    image: "/images/genderless-k.jpg",
    images: ["/images/genderless-k.jpg"],
    tag: "NEW",
    rating: 4.9,
    reviews: 4,
    stock: 12,
    colors: ["White", "Pastel Blue", "Lavender"],
    description: "A squishy little cloud keychain for dreamers of all kinds. Soft, minimal, and magical. ☁️"
  },

  // --- HAIR ACCESSORIES ---
  {
    id: 5,
    category: "hair",
    subCat: "scrunchies",
    name: "Tulip Scrunchie",
    price: 150,
    image: "/images/tulip-s.jpg",
    images: ["/images/tulip-s.jpg"],
    tag: "POPULAR",
    rating: 5,
    reviews: 12,
    stock: 15,
    colors: ["Original", "Blush", "Lavender"],
    description: "A soft crochet scrunchie adorned with a tiny tulip. Gentle on hair and gorgeous on your wrist too. 🌷"
  },
  {
    id: 6,
    category: "hair",
    subCat: "scrunchies",
    name: "Classic Frill",
    price: 80,
    image: "/images/frill-s.jpg",
    images: ["/images/frill-s.jpg"],
    tag: "SALE",
    rating: 4.5,
    reviews: 24,
    stock: 20,
    colors: ["Original", "Pastel", "Midnight"],
    description: "Our most classic scrunchie — a full frill that holds your hair beautifully and looks even better doing it. 🎀"
  },
  {
    id: 7,
    category: "hair",
    subCat: "clips",
    name: "Sunflower Clip",
    price: 120,
    image: "/images/sun-clip.jpg",
    images: ["/images/sun-clip.jpg"],
    tag: "HANDMADE",
    rating: 5,
    reviews: 7,
    stock: 5,
    colors: ["Yellow", "Pastel Yellow", "White"],
    description: "A hand-crocheted sunflower hair clip that makes every day feel like a summer afternoon. 🌻"
  },
  {
    id: 8,
    category: "hair",
    subCat: "bandanas",
    name: "Boho Bandana",
    price: 200,
    image: "/images/bandana-cat.jpg",
    images: ["/images/bandana-cat.jpg"],
    tag: "NEW",
    rating: 4.8,
    reviews: 3,
    stock: 7,
    colors: ["Original", "Terracotta", "Sage"],
    description: "A crocheted bandana with boho energy. Tie it in your hair, around your neck, or on your bag. 🌿"
  },

  // --- BOUQUETS ---
  {
    id: 9,
    category: "bouquets",
    subCat: "tulips",
    name: "Pink Tulip Trio",
    price: 350,
    image: "/images/pink-tulip.jpg",
    images: ["/images/pink-tulip.jpg"],
    tag: "GIFT",
    rating: 5,
    reviews: 15,
    stock: 4,
    colors: ["Pink", "White", "Lavender"],
    description: "Three perfectly crocheted tulips bundled together — the gift that never wilts. 🌷🌷🌷"
  },
  {
    id: 10,
    category: "bouquets",
    subCat: "roses",
    name: "Eternal Red Rose",
    price: 499,
    image: "/images/rose-b.jpg",
    images: ["/images/rose-b.jpg"],
    tag: "ROMANTIC",
    rating: 5,
    reviews: 32,
    stock: 3,
    colors: ["Red", "Pink", "Cream"],
    description: "A single eternal crochet rose that says everything words can't. Handmade, forever-lasting, completely yours. 🌹"
  },
  {
    id: 11,
    category: "bouquets",
    subCat: "sunflowers",
    name: "Sunshine Bundle",
    price: 420,
    image: "/images/sunflowers.jpg",
    images: ["/images/sunflowers.jpg"],
    tag: "BESTSELLER",
    rating: 5,
    reviews: 11,
    stock: 5,
    colors: ["Yellow", "Pastel Yellow", "Orange"],
    description: "A cheerful bundle of crocheted sunflowers — bundle of sunshine for your desk, shelf, or loved one. 🌻"
  },

  // --- TOTE BAGS ---
  {
    id: 12,
    category: "totes",
    subCat: "pattern-tote",
    name: "Daisy Checkered",
    price: 850,
    image: "/images/daisy-tote.jpg",
    images: ["/images/daisy-tote.jpg"],
    tag: "LIMITED",
    rating: 5,
    reviews: 3,
    stock: 2,
    colors: ["Original", "Pastel", "Monochrome"],
    description: "A hand-knotted checkered tote with little daisy details. Limited run — once it's gone, it's gone! 🌼"
  },
  {
    id: 13,
    category: "totes",
    subCat: "solid-tote",
    name: "Minimal Market Tote",
    price: 699,
    image: "/images/solid-tote.jpg",
    images: ["/images/solid-tote.jpg"],
    tag: "NEW",
    rating: 4.9,
    reviews: 2,
    stock: 6,
    colors: ["Cream", "Sage", "Blush", "Midnight"],
    description: "A clean, solid-color crochet tote perfect for market runs, beach days, or just looking effortlessly aesthetic. 👜"
  }
];