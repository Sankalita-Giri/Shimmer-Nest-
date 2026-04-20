export const categories = [
  { id: "keychains", name: "Crochet Keychains", image: "/images/crochetkeychain1.jpg" },
  { id: "plushies", name: "Crochet Mini Plushies", image: "/images/miniplushies1.jpg" },
  { id: "totes", name: "Crochet Tote Bags", image: "/images/totebag1.jpg" },
  { id: "hair", name: "Hair Accessories", image: "/images/hairaccessories1.jpg" },
  { id: "bouquets", name: "Crochet Bouquets", image: "/images/bouquet1.jpg" },
];

export const subCategories = {
  keychains: [
    { id: "boy-key", name: "Boy Keychains", image: "/images/luffy_hat.jpg", desc: "Cool & fun designs" },
    { id: "girl-key", name: "Girl Keychains", image: "/images/girl1.jpg", desc: "Cute & sparkly styles" },
    { id: "couple-key", name: "Couple Keychains", image: "/images/couple1.jpg", desc: "Matching sets for two" },
    { id: "genderless-key", name: "Genderless Keychains", image: "/images/pawkeychain1.jpg", desc: "For everyone & anyone" },
  ],
  plushies: [
    { id: "animal-plush", name: "Animal Plushies", image: "/images/animal-plush.jpg", desc: "Tiny adorable animals" },
    { id: "food-plush", name: "Food Plushies", image: "/images/food-plush.jpg", desc: "Kawaii food characters" },
    { id: "character-plush", name: "Character Plushies", image: "/images/char-plush.jpg", desc: "Custom cute characters" },
  ],
  totes: [
    { id: "solid-tote", name: "Solid Colors", image: "/images/solid-tote.jpg", desc: "Clean minimal carry-alls" },
    { id: "pattern-tote", name: "Patterned Designs", image: "/images/pattern-tote.jpg", desc: "Bold & playful patterns" },
  ],
  hair: [
    { id: "scrunchies", name: "Scrunchies", image: "/images/scrunchie-cat.jpg", desc: "Soft & stretchy styles" },
    { id: "clips", name: "Hair Clips", image: "/images/clips-cat.jpg", desc: "Floral & fun clips" },
    { id: "bandanas", name: "Bandanas", image: "/images/bandana-cat.jpg", desc: "Boho-chic headwraps" },
    { id: "headbands", name: "Headbands", image: "/images/headband-cat.jpg", desc: "Cute & cozy headbands" },
  ],
  bouquets: [
    { id: "tulips", name: "Tulip Bouquets", image: "/images/tulips.jpg", desc: "Bright & cheerful blooms" },
    { id: "roses", name: "Rose Bouquets", image: "/images/roses.jpg", desc: "Timeless romantic roses" },
    { id: "sunflowers", name: "Sunflowers", image: "/images/sunflowers.jpg", desc: "Sunshine in every stitch" },
    { id: "mixed", name: "Mixed Bouquets", image: "/images/mixed-b.jpg", desc: "Best of every bloom" },
    { id: "mini-b", name: "Mini Bouquets", image: "/images/mini-b.jpg", desc: "Tiny & gifting-perfect" },
  ],
};

export const products = [

  // BOY KEYCHAINS
  {
    id: 1,
    category: "keychains", subCat: "boy-key",
    name: "Mini Jersey", price: 80,
    image: "/images/jersey1.jpg", images: ["/images/jersey1.jpg", "/images/jersey2.jpg", "/images/jersey3.jpg"],
    tag: "NEW", rating: 4.8, reviews: 5, stock: 8,
    colors: ["White jersey with Black stripes", "Blue jersey with White stripes", "Black jersey with White stripes"],
    description: "A teeny tiny crocheted jersey that hangs from your keys or bag."
  },
  {
    id: 2,
    category: "keychains", subCat: "boy-key",
    name: "Luffy Straw Hat", price: 80,
    image: "/images/luffy_hat.jpg", images: ["/images/luffy_hat.jpg", "/images/luffy_hat2.jpg"],
    tag: "POPULAR", rating: 5, reviews: 14, stock: 7,
    color: ["Original"],
    description: "The iconic straw hat, now crocheted into a keychain. For every Anime lovers."
  },
  {
    id: 3,
    category: "keychains", subCat: "boy-key",
    name: "Spiderman Head", price: 80,
    image: "/images/spiderman_head1.jpg", images: ["/images/spiderman_head1.jpg", "/images/spiderman_head2.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 21, stock: 6,
    colors: ["Scarlet Spider", "Miles Morales"],
    description: "Your friendly neighbourhood spider, crocheted in miniature. 🕷️"
  },
  {
    id: 4,
    category: "keychains", subCat: "boy-key",
    name: "Spiderman Star", price: 80,
    image: "/images/spiderman_star1.jpg", images: ["/images/spiderman_star1.jpg"],
    tag: "NEW", rating: 4.9, reviews: 8, stock: 10,
    colors: ["Red & Blue", "Black & Red", "Blue & Red"],
    description: "A star-shaped Spiderman keychain — bold, bright, and dangling. ⭐"
  },
  {
    id: 5,
    category: "keychains", subCat: "boy-key",
    name: "Batman Head", price: 80,
    image: "/images/batman_head1.jpg", images: ["/images/batman_head1.jpg"],
    tag: "POPULAR", rating: 4.8, reviews: 11, stock: 9,
    colors: ["Classic Black"],
    description: "The Dark Knight, crocheted into the tiniest bat-head. 🦇"
  },
  {
    id: 6,
    category: "keychains", subCat: "boy-key",
    name: "Captain America Shield", price: 90,
    image: "/images/captainamerica_shield1.jpg", images: ["/images/captainamerica_shield1.jpg", "/images/captainamerica_shield2.jpg"],
    tag: "Trending", rating: 5, reviews: 9, stock: 5,
    colors: ["Captain America's Red Shield", "Captain America Winter Soldier Shield"],
    description: "A perfectly round crocheted shield. Carry a little courage everywhere you go. 🛡️"
  },
  {
    id: 7,
    category: "keychains", subCat: "boy-key",
    name: "Sports Ball", price: 80,
    image: "/images/ball1.jpg", images: ["/images/ball1.jpg", "/images/ball2.jpg", "/images/ball3.jpg", "/images/basketball.jpg", "/images/football.jpg", "/images/basetennisball.jpg"],
    tag: "Bestseller", rating: 4.7, reviews: 6, stock: 12,
    colors: ["Football", "Basketball", "Volleyball", "Tennis Ball", "Baseball"],
    description: "Pick your sport! A tiny crocheted ball keychain for every game lover. ⚽🏀🎾"
  },

  // GIRL KEYCHAINS
  {
    id: 8,
    category: "keychains", subCat: "girl-key",
    name: "Strawberry Charm", price: 60,
    image: "/images/strawberry1.jpg", images: ["/images/strawberry1.jpg", "/images/strawberry2.jpg"],
    tag: "POPULAR", rating: 5, reviews: 9, stock: 6,
    colors: ["Red with white spots", "Medium Pink with yellow spots", "Pastel pink with red spots", "Mocha dipped", "Choco dipped", "Red dipped", "Pink dipped"],
    description: "A sweet little strawberry keychain. 🍓"
  },
  {
    id: 9,
    category: "keychains", subCat: "girl-key",
    name: "Cute Chick", price: 130,
    image: "/images/chick1.jpg", images: ["/images/chick1.jpg", "/images/chick2.jpg", "/images/chick3.jpg"],
    tag: "NEW", rating: 5, reviews: 7, stock: 8,
    colors: ["White chick with Pink Daisy flower", "Light Yellow with White Daisy flower", "Medium Yellow with White Daisy flower", "White chick with Pink heart"],
    description: "A squishy cute little chick for your bag. 🦋"
  },
  {
    id: 52,
    category: "keychains", subCat: "girl-key",
    name: "Tulip with Pearl charm", price: 80,
    image: "/images/tulip1.jpg", images: ["/images/tulip1.jpg", "/images/tulip2.jpg"],
    tag: "POPULAR", rating: 5, reviews: 7, stock: 8,
    colors: ["Lilac", "Pastel Pink", "Sky Blue", "Red", "Yellow", "White"],
    description: "A delicate crocheted tulip that blooms from your bag. 🦋"
  },
  {
    id: 53,
    category: "keychains", subCat: "girl-key",
    name: "Medium-Bow", price: 70,
    image: "/images/bow1.jpg", images: ["/images/bow1.jpg"],
    tag: "POPULAR", rating: 5, reviews: 7, stock: 8,
    colors: ["Lilac", "Pastel Pink", "Medium Pink", "Deep Pink", "Deep Blue", "Sky Blue", "Red", "Yellow", "White", "Green", "Orange"],
    description: "A delicate crocheted bow that blooms from your bag. 🦋"
  },
  {
    id: 10,
    category: "keychains", subCat: "girl-key",
    name: "Sunflower", price: 70,
    image: "/images/sunflower1.jpg", images: ["/images/sunflower1.jpg", "/images/sunflower2.jpg"],
    tag: "Trending", rating: 4.9, reviews: 16, stock: 14,
    colors: ["Pastel Pink", "Red", "Cream", "Lavender"],
    description: "A tiny crocheted bow that goes on everything and makes it cuter. 🎀"
  },
  {
    id: 11,
    category: "keychains", subCat: "girl-key",
    name: "Daisy", price: 70,
    image: "/images/daisy3.jpg", images: ["/images/daisy3.jpg", "/images/daisy2.jpg", "/images/daisy4.jpg"],
    tag: "Trending", rating: 5, reviews: 5, stock: 9,
    colors: ["White with yellow center", "Pastel pink with yellow center", "Red with yellow center", "Orange with yellow center", "Pastel blue with yellow center", "Lilac with yellow center"],
    description: "A string of tiny crocheted daisies. Wear it, hang it, love it. 🌼"
  },

  // COUPLE KEYCHAINS
  {
    id: 12,
    category: "keychains", subCat: "couple-key",
    name: "Heart Half-Set", price: 299,
    image: "/images/heart-k.jpg", images: ["/images/heart-k.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 18, stock: 10,
    colors: ["Original", "Pastel Pink", "Red"],
    description: "A matching half-heart keychain set — one for you, one for your person. 💕"
  },
  {
    id: 13,
    category: "keychains", subCat: "couple-key",
    name: "Sun & Moon Set", price: 320,
    image: "/images/sun-moon-k.jpg", images: ["/images/sun-moon-k.jpg"],
    tag: "ROMANTIC", rating: 5, reviews: 13, stock: 7,
    colors: ["Original", "Pastel", "Gold & Silver"],
    description: "You are my sun, I am your moon. A crocheted set made for two. 🌙☀️"
  },
  {
    id: 14,
    category: "keychains", subCat: "couple-key",
    name: "Lock & Key Set", price: 299,
    image: "/images/lock-key-set-k.jpg", images: ["/images/lock-key-set-k.jpg"],
    tag: "GIFT", rating: 4.9, reviews: 10, stock: 6,
    colors: ["Gold", "Silver", "Pastel Pink"],
    description: "You hold the key to my heart — literally. A matching lock and key pair. 🔑🔒"
  },
  {
    id: 15,
    category: "keychains", subCat: "couple-key",
    name: "Paw & Heart Set", price: 280,
    image: "/images/paw-heart-k.jpg", images: ["/images/paw-heart-k.jpg"],
    tag: "NEW", rating: 5, reviews: 4, stock: 8,
    colors: ["Original", "Terracotta", "Blush"],
    description: "For couples who love animals as much as each other. 🐾💕"
  },

  // GENDERLESS KEYCHAINS
  {
    id: 16,
    category: "keychains", subCat: "genderless-key",
    name: "Cloud Puff", price: 140,
    image: "/images/genderless-k.jpg", images: ["/images/genderless-k.jpg"],
    tag: "NEW", rating: 4.9, reviews: 4, stock: 12,
    colors: ["White", "Pastel Blue", "Lavender"],
    description: "A squishy little cloud keychain for dreamers. ☁️"
  },
  {
    id: 17,
    category: "keychains", subCat: "genderless-key",
    name: "Rainbow Bar", price: 160,
    image: "/images/rainbow-k.jpg", images: ["/images/rainbow-k.jpg"],
    tag: "POPULAR", rating: 5, reviews: 8, stock: 10,
    colors: ["Classic Rainbow", "Pastel Rainbow", "Monochrome"],
    description: "A tiny crocheted rainbow — because everyone deserves colour. 🌈"
  },
  {
    id: 18,
    category: "keychains", subCat: "genderless-key",
    name: "Mushroom Cap", price: 150,
    image: "/images/mushroom-k.jpg", images: ["/images/mushroom-k.jpg"],
    tag: "TRENDING", rating: 4.9, reviews: 12, stock: 9,
    colors: ["Red & White", "Brown", "Pastel"],
    description: "A cottagecore classic. This little mushroom goes with every vibe. 🍄"
  },

  // PLUSHIES
  {
    id: 19,
    category: "plushies", subCat: "animal-plush",
    name: "Mini Bunny", price: 349,
    image: "/images/bunny-plush.jpg", images: ["/images/bunny-plush.jpg"],
    tag: "NEW", rating: 5, reviews: 6, stock: 5,
    colors: ["White", "Cream", "Pastel Pink"],
    description: "A tiny crocheted bunny that fits in your pocket. Squishy, soft, and absolutely adorable. 🐰"
  },
  {
    id: 20,
    category: "plushies", subCat: "food-plush",
    name: "Strawberry Plushie", price: 299,
    image: "/images/strawberry-plush.jpg", images: ["/images/strawberry-plush.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 11, stock: 8,
    colors: ["Original", "Pastel"],
    description: "An impossibly cute crocheted strawberry plushie. Makes the perfect desk buddy. 🍓"
  },
  {
    id: 21,
    category: "plushies", subCat: "character-plush",
    name: "Ghost Buddy", price: 320,
    image: "/images/ghost-plush.jpg", images: ["/images/ghost-plush.jpg"],
    tag: "LIMITED", rating: 5, reviews: 3, stock: 4,
    colors: ["White", "Lavender", "Mint"],
    description: "A friendly little ghost plushie — spooky cute and very huggable. 👻"
  },

  // SCRUNCHIES
  {
    id: 22,
    category: "hair", subCat: "scrunchies",
    name: "Tulip Scrunchie", price: 150,
    image: "/images/tulip-s.jpg", images: ["/images/tulip-s.jpg"],
    tag: "POPULAR", rating: 5, reviews: 12, stock: 15,
    colors: ["Original", "Blush", "Lavender"],
    description: "A soft crochet scrunchie adorned with a tiny tulip. 🌷"
  },
  {
    id: 23,
    category: "hair", subCat: "scrunchies",
    name: "Classic Frill", price: 80,
    image: "/images/frill-s.jpg", images: ["/images/frill-s.jpg"],
    tag: "SALE", rating: 4.5, reviews: 24, stock: 20,
    colors: ["Original", "Pastel", "Midnight"],
    description: "Our most classic scrunchie — a full frill that holds your hair beautifully. 🎀"
  },

  // HAIR CLIPS
  {
    id: 24,
    category: "hair", subCat: "clips",
    name: "Sunflower Clip", price: 120,
    image: "/images/sun-clip.jpg", images: ["/images/sun-clip.jpg"],
    tag: "HANDMADE", rating: 5, reviews: 7, stock: 5,
    colors: ["Yellow", "Pastel Yellow", "White"],
    description: "A hand-crocheted sunflower hair clip. 🌻"
  },
  {
    id: 25,
    category: "hair", subCat: "clips",
    name: "Rose Petal Clip", price: 130,
    image: "/images/rose-clip.jpg", images: ["/images/rose-clip.jpg"],
    tag: "NEW", rating: 5, reviews: 6, stock: 8,
    colors: ["Red", "Blush Pink", "Cream", "Burgundy"],
    description: "A soft crocheted rose clipped right into your hair. Effortlessly pretty. 🌹"
  },
  {
    id: 26,
    category: "hair", subCat: "clips",
    name: "Butterfly Clip", price: 110,
    image: "/images/butterfly-clip.jpg", images: ["/images/butterfly-clip.jpg"],
    tag: "POPULAR", rating: 4.9, reviews: 9, stock: 11,
    colors: ["Lilac", "Coral", "Mint", "Baby Blue"],
    description: "A dainty crocheted butterfly that sits right on your bun or braid. 🦋"
  },
  {
    id: 27,
    category: "hair", subCat: "clips",
    name: "Daisy Duo Clip", price: 100,
    image: "/images/daisy-clip.jpg", images: ["/images/daisy-clip.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 14, stock: 13,
    colors: ["White & Yellow", "Pastel", "Multicolor"],
    description: "Two tiny crocheted daisies on a single clip. Double the charm. 🌼🌼"
  },
  {
    id: 28,
    category: "hair", subCat: "clips",
    name: "Star Cluster Clip", price: 115,
    image: "/images/star-clip.jpg", images: ["/images/star-clip.jpg"],
    tag: "NEW", rating: 4.8, reviews: 5, stock: 7,
    colors: ["Gold", "Silver", "Pastel Yellow"],
    description: "A cluster of tiny crocheted stars that sparkle in your hair. ✨"
  },

  // BANDANAS
  {
    id: 29,
    category: "hair", subCat: "bandanas",
    name: "Boho Bandana", price: 200,
    image: "/images/bandana-cat.jpg", images: ["/images/bandana-cat.jpg"],
    tag: "NEW", rating: 4.8, reviews: 3, stock: 7,
    colors: ["Original", "Terracotta", "Sage"],
    description: "A crocheted bandana with boho energy. 🌿"
  },
  {
    id: 30,
    category: "hair", subCat: "bandanas",
    name: "Floral Bandana", price: 220,
    image: "/images/floral-bandana.jpg", images: ["/images/floral-bandana.jpg"],
    tag: "POPULAR", rating: 5, reviews: 8, stock: 6,
    colors: ["Blush & Cream", "Lavender & White", "Peach"],
    description: "A crocheted bandana scattered with tiny raised flowers. Wear it forward or back. 🌸"
  },
  {
    id: 31,
    category: "hair", subCat: "bandanas",
    name: "Stripe Bandana", price: 180,
    image: "/images/stripe-bandana.jpg", images: ["/images/stripe-bandana.jpg"],
    tag: "HANDMADE", rating: 4.7, reviews: 5, stock: 9,
    colors: ["Cream & Brown", "Black & White", "Pastel Stripe"],
    description: "A classic striped crochet bandana — clean, minimal, cool. 🤍"
  },
  {
    id: 32,
    category: "hair", subCat: "bandanas",
    name: "Pom Pom Bandana", price: 240,
    image: "/images/pompom-bandana.jpg", images: ["/images/pompom-bandana.jpg"],
    tag: "TRENDING", rating: 5, reviews: 7, stock: 5,
    colors: ["Multicolor", "Pastel Rainbow", "Monochrome"],
    description: "A fun crocheted bandana with tiny pom poms along the edge. Playful and bold. 🎉"
  },

  // HEADBANDS
  {
    id: 33,
    category: "hair", subCat: "headbands",
    name: "Knot Headband", price: 160,
    image: "/images/knot-headband.jpg", images: ["/images/knot-headband.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 18, stock: 12,
    colors: ["Cream", "Blush", "Sage", "Midnight"],
    description: "A thick crocheted headband with a knotted bow front. Cozy and chic. 🎀"
  },
  {
    id: 34,
    category: "hair", subCat: "headbands",
    name: "Daisy Headband", price: 180,
    image: "/images/daisy-headband.jpg", images: ["/images/daisy-headband.jpg"],
    tag: "NEW", rating: 5, reviews: 9, stock: 8,
    colors: ["White & Yellow", "Pastel", "All White"],
    description: "A crocheted headband with a row of tiny daisies across the top. Pure cottage charm. 🌼"
  },
  {
    id: 35,
    category: "hair", subCat: "headbands",
    name: "Wide Petal Band", price: 190,
    image: "/images/petal-headband.jpg", images: ["/images/petal-headband.jpg"],
    tag: "HANDMADE", rating: 4.9, reviews: 6, stock: 7,
    colors: ["Blush", "Lavender", "Terracotta"],
    description: "A wide crocheted headband shaped like overlapping petals. Soft, stretchy, and beautiful. 🌸"
  },
  {
    id: 36,
    category: "hair", subCat: "headbands",
    name: "Bunny Ear Band", price: 200,
    image: "/images/bunny-headband.jpg", images: ["/images/bunny-headband.jpg"],
    tag: "POPULAR", rating: 5, reviews: 13, stock: 10,
    colors: ["White", "Pastel Pink", "Cream"],
    description: "A crocheted headband with two little bunny ears. Yes, you need it. 🐰"
  },
  {
    id: 37,
    category: "hair", subCat: "headbands",
    name: "Star Stud Band", price: 170,
    image: "/images/star-headband.jpg", images: ["/images/star-headband.jpg"],
    tag: "NEW", rating: 4.8, reviews: 4, stock: 9,
    colors: ["Gold & Cream", "Silver & White", "Pastel"],
    description: "A sleek crocheted headband dotted with little star accents. Subtle sparkle. ✨"
  },

  // TULIP BOUQUETS
  {
    id: 38,
    category: "bouquets", subCat: "tulips",
    name: "Pink Tulip Trio", price: 350,
    image: "/images/pink-tulip.jpg", images: ["/images/pink-tulip.jpg"],
    tag: "GIFT", rating: 5, reviews: 15, stock: 4,
    colors: ["Pink", "White", "Lavender"],
    description: "Three perfectly crocheted tulips — the gift that never wilts. 🌷🌷🌷"
  },
  {
    id: 39,
    category: "bouquets", subCat: "tulips",
    name: "Tulip Bunch (x5)", price: 520,
    image: "/images/tulip-bunch.jpg", images: ["/images/tulip-bunch.jpg"],
    tag: "POPULAR", rating: 5, reviews: 9, stock: 3,
    colors: ["Mixed", "All Pink", "All White", "All Purple"],
    description: "A fuller bunch of five crocheted tulips — perfect for gifting or displaying. 🌷🌷🌷🌷🌷"
  },

  // ROSE BOUQUETS
  {
    id: 40,
    category: "bouquets", subCat: "roses",
    name: "Eternal Red Rose", price: 499,
    image: "/images/rose-b.jpg", images: ["/images/rose-b.jpg"],
    tag: "ROMANTIC", rating: 5, reviews: 32, stock: 3,
    colors: ["Red", "Pink", "Cream"],
    description: "A single eternal crochet rose. 🌹"
  },
  {
    id: 41,
    category: "bouquets", subCat: "roses",
    name: "Rose Trio", price: 699,
    image: "/images/rose-trio.jpg", images: ["/images/rose-trio.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 19, stock: 4,
    colors: ["Red", "Mixed", "Pink & Cream"],
    description: "Three crocheted roses that will never wilt. The forever bouquet. 🌹🌹🌹"
  },
  {
    id: 42,
    category: "bouquets", subCat: "roses",
    name: "Pastel Rose Bunch", price: 799,
    image: "/images/pastel-roses.jpg", images: ["/images/pastel-roses.jpg"],
    tag: "NEW", rating: 5, reviews: 7, stock: 3,
    colors: ["Blush & Cream", "Lavender & White", "Peach"],
    description: "Soft pastel roses crocheted into the dreamiest little bouquet. 🌸"
  },

  // SUNFLOWER BOUQUETS
  {
    id: 43,
    category: "bouquets", subCat: "sunflowers",
    name: "Sunshine Bundle", price: 420,
    image: "/images/sunflowers.jpg", images: ["/images/sunflowers.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 11, stock: 5,
    colors: ["Yellow", "Pastel Yellow", "Orange"],
    description: "A cheerful bundle of crocheted sunflowers. 🌻"
  },
  {
    id: 44,
    category: "bouquets", subCat: "sunflowers",
    name: "Solo Sunflower", price: 220,
    image: "/images/solo-sunflower.jpg", images: ["/images/solo-sunflower.jpg"],
    tag: "NEW", rating: 4.9, reviews: 6, stock: 8,
    colors: ["Classic Yellow", "Pale Yellow", "Orange Tip"],
    description: "One perfect crocheted sunflower. Simple, bold, and full of sunshine. 🌻"
  },

  // MIXED BOUQUETS
  {
    id: 45,
    category: "bouquets", subCat: "mixed",
    name: "Garden Mix Bouquet", price: 650,
    image: "/images/garden-mix-b.jpg", images: ["/images/garden-mix-b.jpg"],
    tag: "GIFT", rating: 5, reviews: 10, stock: 4,
    colors: ["Pastel Mix", "Bold Mix", "Seasonal"],
    description: "A handpicked mix of crocheted roses, tulips, and daisies. Every bouquet is one of a kind. 🌷🌹🌼"
  },
  {
    id: 46,
    category: "bouquets", subCat: "mixed",
    name: "Rainbow Wildflower Bunch", price: 580,
    image: "/images/wildflower-b.jpg", images: ["/images/wildflower-b.jpg"],
    tag: "POPULAR", rating: 5, reviews: 8, stock: 5,
    colors: ["Original", "Pastel Rainbow", "Warm Tones"],
    description: "Wildflowers in every colour of the rainbow — crocheted with love. 🌈🌸"
  },

  // MINI BOUQUETS
  {
    id: 47,
    category: "bouquets", subCat: "mini-b",
    name: "Mini Rose Trio", price: 320,
    image: "/images/mini-rose-b.jpg", images: ["/images/mini-rose-b.jpg"],
    tag: "NEW", rating: 5, reviews: 5, stock: 6,
    colors: ["Red", "Pink", "Mixed"],
    description: "Three tiny crocheted roses, perfect for gifting or tucking in a card. 🌹🌹🌹"
  },
  {
    id: 49,
    category: "bouquets", subCat: "mini-b",
    name: "Pocket Daisy Bunch", price: 280,
    image: "/images/pocket-daisy-b.jpg", images: ["/images/pocket-daisy-b.jpg"],
    tag: "BESTSELLER", rating: 4.9, reviews: 11, stock: 7,
    colors: ["White & Yellow", "Pastel", "Multicolor"],
    description: "A tiny bundle of crocheted daisies that fits in your pocket or a small vase. 🌼"
  },

  // TOTE BAGS
  {
    id: 50,
    category: "totes", subCat: "pattern-tote",
    name: "Daisy Checkered", price: 850,
    image: "/images/daisy-tote.jpg", images: ["/images/daisy-tote.jpg"],
    tag: "LIMITED", rating: 5, reviews: 3, stock: 2,
    colors: ["Original", "Pastel", "Monochrome"],
    description: "A hand-knotted checkered tote with daisy details. 🌼"
  },
  {
    id: 51,
    category: "totes", subCat: "solid-tote",
    name: "Minimal Market Tote", price: 699,
    image: "/images/solid-tote.jpg", images: ["/images/solid-tote.jpg"],
    tag: "NEW", rating: 4.9, reviews: 2, stock: 6,
    colors: ["Cream", "Sage", "Blush", "Midnight"],
    description: "A clean, solid-color crochet tote perfect for market runs. 👜"
  },
];