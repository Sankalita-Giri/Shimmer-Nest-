export const categories = [
  { id: "keychains", name: "Crochet Keychains", image: "/images/Keychains/crochetkeychain1.jpg" },
  { id: "plushies", name: "Crochet Plushies", image: "/images/Plushies/miniplushies1.jpg" },
  { id: "hair", name: "Hair Accessories", image: "/images/Hairaccessories/hairaccessories1.jpeg" },
  { id: "bouquets", name: "Crochet Bouquets", image: "/images/Bouquets/bouquet1.jpeg" },
];

export const subCategories = {
  keychains: [
    { id: "boy-key", name: "Boy Keychains", image: "/images/Keychains/luffy_hat.jpg", desc: "Cool, bold & adventure-ready designs ⚓" },
    { id: "girl-key", name: "Girl Keychains", image: "/images/Keychains/girl1.jpg", desc: "Cute, sparkly & aesthetic styles ✨" },
    { id: "couple-key", name: "Couple Keychains", image: "/images/Keychains/couple1.jpg", desc: "Matching sets for you & your person 💕" },
    { id: "genderless-key", name: "Genderless Keychains", image: "/images/Keychains/pawkeychain1.jpg", desc: "Artistic designs for everyone & anyone." },
  ],
  plushies: [
    { id: "bunny-plush", name: "Bunny Plushies with Strawberry", image: "/images/Plushies/Bunny_withpinkstrawberry.jpg", desc: "Tiny, squishy & adorable creatures 🐰" },
    { id: "bunnyoutfits-plush", name: "Bunny Plushies with Outfits", image: "/images/Plushies/Bunny_withblueoutfit.jpg", desc: "Kawaii treats that never fade 🍓" },
    { id: "bear-plush", name: "Bear Plushies", image: "/images/Plushies/bearwith_pinkoutfit.jpg", desc: "Custom made Bear plushie, this oversized bear plushie is the perfect desk buddy or a sweet gift for someone special.🧸" },
    { id: "cat-plush", name: " Cat Plushies", image: "/images/Plushies/cat_with_strawberryoutfit.jpg", desc: "Squishy bundle of joy in form of cat 🐈" },
    { id: "cow-plush", name: " Cow Plushies", image: "/images/Plushies/cow_withpeachoutfit.jpg", desc: "Custom-made Cow plushies 🐮 " },
  ],
  hair: [
    { id: "scrunchies", name: "Scrunchies", image: "/images/Hairaccessories/hairaccessories1.jpeg", desc: "Soft, handmade & hair-loving styles 🌷" },
    { id: "clips", name: "Hair Clips", image: "/images/Hairaccessories/hairaccessories1.jpeg", desc: "Floral, fun & dainty accents 🦋" },
    { id: "bandanas", name: "Bandanas", image: "/images/Hairaccessories/hairaccessories1.jpeg", desc: "Boho-chic & effortless headwraps 🌿" },
    { id: "headbands", name: "Headbands", image: "/images/Hairaccessories/hairaccessories1.jpeg", desc: "Cute, cozy & crown-like bands 👑" },
    { id: "gajra", name: "Gajra", image: "/images/Hairaccessories/hairaccessories1.jpeg", desc: "Floral garlands for festive hair magic 🌸" },
  ],
  bouquets: [
    { id: "tulips", name: "Tulip Bouquets", image: "/images/Bouquets/tulips.jpg", desc: "Bright, cheerful & eternal blooms 🌷" },
    { id: "roses", name: "Rose Bouquets", image: "/images/Bouquets/roses.jpg", desc: "Timeless, romantic & forever roses 🌹" },
    { id: "sunflowers", name: "Sunflowers", image: "/images/Bouquets/sunflowers.jpg", desc: "Handcrafted golden sunshine in every loop 🌻✨" },
    { id: "mini-b", name: "Mini Bouquets", image: "/images/Bouquets/mini-b.jpg", desc: "Tiny, gifting-perfect floral bundles 🎀" },
  ],
};

export const products = [

  // BOY KEYCHAINS
  {
    id: 1,
    category: "keychains", subCat: "boy-key",
    name: "Mini Jersey", price: 80,
    image: "/images/Keychains/jersey1.jpg", images: ["/images/Keychains/jersey1.jpg", "/images/Keychains/jersey2.jpg", "/images/Keychains/jersey3.jpg"],
    tag: "Bestseller", rating: 4.8, reviews: 5, stock: 8,
    colors: ["White jersey with Black stripes", "Blue jersey with White stripes", "Black jersey with White stripes"],
    description: "Show your team spirit with this adorable, handcrafted mini jersey! The perfect tiny companion for your keys or backpack. ⚽👕"
  },
  {
    id: 2,
    category: "keychains", subCat: "boy-key",
    name: "Luffy Straw Hat", price: 80,
    image: "/images/Keychains/luffy_hat.jpg", images: ["/images/Keychains/luffy_hat.jpg", "/images/Keychains/luffy_hat2.jpg"],
    tag: "New", rating: 5, reviews: 14, stock: 4,
    color: ["Original"],
    description: "Set sail for adventure with this iconic Luffy Straw Hat! A must-have for every nakama, meticulously crocheted with love. 👒⚓"
  },
  {
    id: 3,
    category: "keychains", subCat: "boy-key",
    name: "Spiderman Head", price: 80,
    image: "/images/Keychains/spiderman_head1.jpg", images: ["/images/Keychains/spiderman_head1.jpg", "/images/Keychains/spiderman_head2.jpg"],
    tag: "Trending", rating: 5, reviews: 21, stock: 6,
    colors: ["Scarlet Spider", "Miles Morales"],
    description: "Swing into action with our friendly neighborhood Spiderman! Artfully woven in miniature to guard your keys with superhero style. 🕷️🕸️"
  },
  {
    id: 4,
    category: "keychains", subCat: "boy-key",
    name: "Spiderman Star", price: 80,
    image: "/images/Keychains/spiderman_star1.jpg", images: ["/images/Keychains/spiderman_star1.jpg"],
    tag: "Trending", rating: 4.9, reviews: 8, stock: 10,
    colors: ["Red & Blue", "Black & Red", "Blue & Red"],
    description: "Reach for the stars with this unique Spiderman Star charm! A bold and bright twist on a classic hero. ⭐🕸️"
  },
  {
    id: 5,
    category: "keychains", subCat: "boy-key",
    name: "Batman Head", price: 80,
    image: "/images/Keychains/batman_head1.jpg", images: ["/images/Keychains/batman_head1.jpg"],
    tag: "POPULAR", rating: 4.8, reviews: 11, stock: 9,
    colors: ["Classic Black"],
    description: "The hero Gotham deserves! Carry the Dark Knight everywhere with this meticulously detailed, pocket-sized Batman head. 🦇🌃"
  },
  {
    id: 6,
    category: "keychains", subCat: "boy-key",
    name: "Captain America Shield", price: 90,
    image: "/images/Keychains/captainamerica_shield1.jpg", images: ["/images/Keychains/captainamerica_shield1.jpg", "/images/Keychains/captainamerica_shield2.jpg"],
    tag: "Trending", rating: 5, reviews: 9, stock: 5,
    colors: ["Captain America's Red Shield", "Captain America Winter Soldier Shield"],
    description: "Carry a shield of courage! This perfectly round Captain America shield is crocheted with precision for every Marvel fan. 🛡️⭐"
  },
  {
    id: 7,
    category: "keychains", subCat: "boy-key",
    name: "Sports Ball", price: 80,
    image: "/images/Keychains/ball1.jpg", images: ["/images/Keychains/ball1.jpg", "/images/Keychains/ball2.jpg", "/images/Keychains/ball3.jpg", "/images/Keychains/basketball.jpg", "/images/Keychains/football.jpg", "/images/Keychains/basetennisball.jpg"],
    tag: "Bestseller", rating: 4.7, reviews: 6, stock: 12,
    colors: ["Football", "Basketball", "Volleyball", "Tennis Ball", "Baseball"],
    description: "Score big with our mini sports ball collection! Whether it's football or basketball, carry your passion on every journey. ⚽🏀🎾"
  },

  // GIRL KEYCHAINS
  {
    id: 8,
    category: "keychains", subCat: "girl-key",
    name: "Strawberry Charm", price: 60,
    image: "/images/Keychains/strawberry1.jpg", images: ["/images/Keychains/strawberry1.jpg", "/images/Keychains/strawberry2.jpg"],
    tag: "POPULAR", rating: 5, reviews: 9, stock: 6,
    colors: ["Red with white spots", "Medium Pink with yellow spots", "Pastel pink with red spots", "Mocha dipped", "Choco dipped", "Red dipped", "Pink dipped"],
    description: "A sweet treat that lasts forever! This juicy little strawberry charm adds a pop of color and cuteness to any bag. 🍓💖"
  },
  {
    id: 9,
    category: "keychains", subCat: "girl-key",
    name: "Cute Chick", price: 130,
    image: "/images/Keychains/chick1.jpg", images: ["/images/Keychains/chick1.jpg", "/images/Keychains/chick2.jpg", "/images/Keychains/chick3.jpg"],
    tag: "NEW", rating: 5, reviews: 7, stock: 8,
    colors: ["White chick with Pink Daisy flower", "Light Yellow with White Daisy flower", "Medium Yellow with White Daisy flower", "White chick with Pink heart"],
    description: "The ultimate squishy companion! This adorable little chick with a daisy is here to brighten your day with handmade magic. 🐣🌼"
  },
  {
    id: 52,
    category: "keychains", subCat: "girl-key",
    name: "Tulip with Pearl charm", price: 80,
    image: "/images/Keychains/tulip1.jpg", images: ["/images/Keychains/tulip1.jpg", "/images/Keychains/tulip2.jpg"],
    tag: "POPULAR", rating: 5, reviews: 7, stock: 8,
    colors: ["Lilac", "Pastel Pink", "Sky Blue", "Red", "Yellow", "White"],
    description: "Artisanal elegance meticulously woven. This delicate tulip with a pearl accent is the perfect sophisticated charm for your favorite purse. 🌷✨"
  },
  {
    id: 53,
    category: "keychains", subCat: "girl-key",
    name: "Medium-Bow", price: 70,
    image: "/images/Keychains/bow1.jpg", images: ["/images/Keychains/bow1.jpg"],
    tag: "POPULAR", rating: 5, reviews: 7, stock: 8,
    colors: ["Lilac", "Pastel Pink", "Medium Pink", "Deep Pink", "Deep Blue", "Sky Blue", "Red", "Yellow", "White", "Green", "Orange"],
    description: "Cozy vibes only! This soft, handcrafted bow is a timeless accessory that brings a touch of handmade magic to your style. 🎀✨"
  },
  {
    id: 10,
    category: "keychains", subCat: "girl-key",
    name: "Sunflower", price: 70,
    image: "/images/Keychains/sunflower1.jpg", images: ["/images/Keychains/sunflower1.jpg", "/images/Keychains/sunflower2.jpg"],
    tag: "NEW", rating: 4.9, reviews: 16, stock: 14,
    colors: ["Pastel Pink", "Red", "Cream", "Lavender"],
    description: "Keep the sunshine with you! This bright and cheerful mini sunflower is a little bundle of joy for your keys or bag. 🌻☀️"
  },
  {
    id: 11,
    category: "keychains", subCat: "girl-key",
    name: "Daisy", price: 70,
    image: "/images/Keychains/daisy3.jpg", images: ["/images/Keychains/daisy3.jpg", "/images/Keychains/daisy2.jpg", "/images/Keychains/daisy4.jpg"],
    tag: "Trending", rating: 5, reviews: 5, stock: 9,
    colors: ["White with yellow center", "Pastel pink with yellow center", "Red with yellow center", "Orange with yellow center", "Pastel blue with yellow center", "Lilac with yellow center"],
    description: "A trail of handmade happiness! This string of daisies is perfect for adding a boho-chic touch to your everyday look. 🌼🌿"
  },

  // COUPLE KEYCHAINS
  {
    id: 12,
    category: "keychains", subCat: "couple-key",
    name: "Heart Half-Set", price: 299,
    image: "/images/Keychains/couple1.jpg", images: ["/images/Keychains/couple1.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 18, stock: 10,
    colors: ["Original", "Pastel Pink", "Red"],
    description: "Two halves of one heart. A beautiful set designed for you and your person to carry, keeping you connected wherever you go. 💕🔐"
  },
  {
    id: 13,
    category: "keychains", subCat: "couple-key",
    name: "Sun & Moon Set", price: 320,
    image: "/images/Keychains/couple1.jpg", images: ["/images/Keychains/couple1.jpg"],
    tag: "ROMANTIC", rating: 5, reviews: 13, stock: 7,
    colors: ["Original", "Pastel", "Gold & Silver"],
    description: "The perfect celestial pair! You're my sun, I'm your moon—a cosmic connection crocheted into a matching set for two. 🌙☀️"
  },
  {
    id: 14,
    category: "keychains", subCat: "couple-key",
    name: "Lock & Key Set", price: 299,
    image: "/images/Keychains/lock-key-set-k.jpg", images: ["/images/Keychains/lock-key-set-k.jpg"],
    tag: "GIFT", rating: 4.9, reviews: 10, stock: 6,
    colors: ["Gold", "Silver", "Pastel Pink"],
    description: "Hold the key to each other's hearts! This charming lock and key set is a symbolic and sweet gift for your favorite person. 🔑🔒"
  },
  {
    id: 15,
    category: "keychains", subCat: "couple-key",
    name: "Paw & Heart Set", price: 280,
    image: "/images/Keychains/paw-heart-k.jpg", images: ["/images/Keychains/paw-heart-k.jpg"],
    tag: "NEW", rating: 5, reviews: 4, stock: 8,
    colors: ["Original", "Terracotta", "Blush"],
    description: "Paws-itively perfect for animal lovers! A matching paw and heart set to celebrate your shared love for your furry friends. 🐾💕"
  },

  // GENDERLESS KEYCHAINS
  {
    id: 16,
    category: "keychains", subCat: "genderless-key",
    name: "Cloud Puff", price: 140,
    image: "/images/Keychains/pawkeychain1.jpg", images: ["/images/Keychains/pawkeychain1.jpg"],
    tag: "NEW", rating: 4.9, reviews: 4, stock: 12,
    colors: ["White", "Pastel Blue", "Lavender"],
    description: "Dream big with this squishy Cloud Puff! A soft, ethereal companion for dreamers and sky-gazers alike. ☁️✨"
  },
  {
    id: 17,
    category: "keychains", subCat: "genderless-key",
    name: "Rainbow Bar", price: 160,
    image: "/images/Keychains/rainbow-k.jpg", images: ["/images/Keychains/rainbow-k.jpg"],
    tag: "POPULAR", rating: 5, reviews: 8, stock: 10,
    colors: ["Classic Rainbow", "Pastel Rainbow", "Monochrome"],
    description: "Carry a pocketful of sunshine and color! This vibrant rainbow bar is a celebration of joy and handmade artistry. 🌈✨"
  },
  {
    id: 18,
    category: "keychains", subCat: "genderless-key",
    name: "Mushroom Cap", price: 150,
    image: "/images/Keychains/mushroom-k.jpg", images: ["/images/Keychains/mushroom-k.jpg"],
    tag: "TRENDING", rating: 4.9, reviews: 12, stock: 9,
    colors: ["Red & White", "Brown", "Pastel"],
    description: "Step into a fairytale with this cottagecore mushroom! A whimsical little charm that brings a touch of forest magic to your day. 🍄🌿"
  },

  // PLUSHIES
  {
    id: 19,
    category: "plushies", subCat: "bunny-plush",
    name: "Bunny Plushie with Strawberry", price: 800,
    image: "/images/Plushies/Bunny_withpinkstrawberry.jpg", images: ["/images/Plushies/Bunny_withpinkstrawberry.jpg", "/images/Plushies/Bunny_withstrawberryhat.jpg"],
    tag: "Trending", rating: 5, reviews: 6, stock: 5,
    variants: [
      { name: "Bunny with Pink Strawberry", price: 800, imageIndex: 0 },
      { name: "Bunny with Strawberry Hat", price: 960, imageIndex: 1 }
    ],
    description: "The softest little bunny you'll ever meet! This cuddle friend is ready for endless cuddles and adventures. 🐰💖"
  },
  {
    id: 54,
    category: "plushies", subCat: "bunnyoutfits-plush",
    name: "Bunny Plushie with Outfits", price: 900,
    image: "/images/Plushies/Bunny_withblueoutfit.jpg", images: ["/images/Plushies/Bunny_withblackkittyhoodiee.jpg", "/images/Plushies/Bunny_withblueoutfit.jpg", "/images/Plushies/Bunny_withduckoutfit.jpg", "/images/Plushies/Bunny_withwhiteoutfit.jpg",],
    tag: "NEW", rating: 5, reviews: 6, stock: 5,
    colors: ["Bunny with Black Kitty Outfit", "Bunny with Blue Outfit", "Bunny with Duck Outfit", "Bunny with White Outfit"],
    description: "These bunnies are dressed up in their finest outfits! Choose your favorite adorable look for your new fluffy friend. 🐰👗"
  },
  {
    id: 20,
    category: "plushies", subCat: "bear-plush",
    name: "Bear Plushie", price: 299,
    image: "/images/Plushies/Bearwith_headphone.jpg", images: ["/images/Plushies/bear.jpg", "/images/Plushies/Bearwith_headphone.jpg", "/images/Plushies/bearwith_pinkoutfit.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 11, stock: 8,
    colors: ["Bear", "Bear with Headphones", "Bear with pink outfit"],
    description: "Custom made Bear plushie, this oversized bear plushie is the perfect desk buddy or a sweet gift for someone special.🧸"
  },
  {
    id: 21,
    category: "plushies", subCat: "cat-plush",
    name: "Cat Plushie", price: 960,
    image: "/images/Plushies/cat_with_strawberryoutfit.jpg", images: ["/images/Plushies/cat_with_strawberryoutfit.jpg", "/images/Plushies/Cat_withstrawberryslingbag.jpg"],
    tag: "LIMITED", rating: 5, reviews: 3, stock: 4,
    colors: ["Cat with Strawberry Outfit", "Cat with Strawberry Sling Bag"],
    description: "A sweet little cuddly cat for your cuddles.🐈"
  },
  {
    id: 55,
    category: "plushies", subCat: "cow-plush",
    name: "Cow Plushie", price: 960,
    image: "/images/Plushies/cow_withpeachoutfit.jpg", images: ["/images/Plushies/cow_withpeachoutfit.jpg", "/images/Plushies/Coe_withstrawberryslingbag.jpg", "/images/Plushies/cow_withstrawberryoutfit.jpg"],
    tag: "New", rating: 5, reviews: 3, stock: 4,
    colors: ["Cow with Peach Outfit", "Cow with Strawberry Sling Bag", "Cow with Strawberry Outfit"],
    description: "A sweet little cuddly cow for your cuddles. 🐄"
  },
  // SCRUNCHIES
  {
    id: 22,
    category: "hair", subCat: "scrunchies",
    name: "Tulip Scrunchie", price: 150,
    image: "/images/Hairaccessories/hairaccessories1.jpeg", images: ["/images/Hairaccessories/hairaccessories1.jpeg"],
    tag: "POPULAR", rating: 5, reviews: 12, stock: 15,
    colors: ["Original", "Blush", "Lavender"],
    description: "Blooming beauty for your hair! This soft scrunchie with a tiny tulip is the perfect blend of style and comfort. 🌷🎀"
  },
  {
    id: 23,
    category: "hair", subCat: "scrunchies",
    name: "Classic Frill", price: 80,
    image: "/images/Hairaccessories/hairaccessories1.jpeg", images: ["/images/Hairaccessories/hairaccessories1.jpeg"],
    tag: "SALE", rating: 4.5, reviews: 24, stock: 20,
    colors: ["Original", "Pastel", "Midnight"],
    description: "Volume and style in every loop! Our classic frill scrunchie holds your hair with a gentle, handmade touch. 🎀✨"
  },

  // HAIR CLIPS
  {
    id: 24,
    category: "hair", subCat: "clips",
    name: "Sunflower Clip", price: 120,
    image: "/images/Hairaccessories/hairaccessories1.jpeg", images: ["/images/Hairaccessories/hairaccessories1.jpeg"],
    tag: "HANDMADE", rating: 5, reviews: 7, stock: 5,
    colors: ["Yellow", "Pastel Yellow", "White"],
    description: "Let your style bloom! This hand-crocheted sunflower clip is a bright and cheerful way to accent any hairstyle. 🌻✨"
  },
  {
    id: 25,
    category: "hair", subCat: "clips",
    name: "Rose Petal Clip", price: 130,
    image: "/images/Hairaccessories/rose-clip.jpg", images: ["/images/Hairaccessories/rose-clip.jpg"],
    tag: "NEW", rating: 5, reviews: 6, stock: 8,
    colors: ["Red", "Blush Pink", "Cream", "Burgundy"],
    description: "Timeless romance for your tresses. This soft rose petal clip adds an effortless touch of elegance to your look. 🌹✨"
  },
  {
    id: 26,
    category: "hair", subCat: "clips",
    name: "Butterfly Clip", price: 110,
    image: "/images/Hairaccessories/butterfly-clip.jpg", images: ["/images/Hairaccessories/butterfly-clip.jpg"],
    tag: "POPULAR", rating: 4.9, reviews: 9, stock: 11,
    colors: ["Lilac", "Coral", "Mint", "Baby Blue"],
    description: "Flutter into fashion! This dainty butterfly clip is a whimsical and beautiful addition to braids or buns. 🦋✨"
  },
  {
    id: 27,
    category: "hair", subCat: "clips",
    name: "Daisy Duo Clip", price: 100,
    image: "/images/Hairaccessories/daisy-clip.jpg", images: ["/images/Hairaccessories/daisy-clip.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 14, stock: 13,
    colors: ["White & Yellow", "Pastel", "Multicolor"],
    description: "Double the daisies, double the charm! A sweet duo of flowers to brighten up your hair and your day. 🌼🌼✨"
  },
  {
    id: 28,
    category: "hair", subCat: "clips",
    name: "Star Cluster Clip", price: 115,
    image: "/images/Hairaccessories/star-clip.jpg", images: ["/images/Hairaccessories/star-clip.jpg"],
    tag: "NEW", rating: 4.8, reviews: 5, stock: 7,
    colors: ["Gold", "Silver", "Pastel Yellow"],
    description: "Sparkle like the night sky! A cluster of tiny stars to add a touch of celestial magic to your hairstyle. ✨⭐"
  },

  // BANDANAS
  {
    id: 29,
    category: "hair", subCat: "bandanas",
    name: "Boho Bandana", price: 200,
    image: "/images/Hairaccessories/bandana-cat.jpg", images: ["/images/Hairaccessories/bandana-cat.jpg"],
    tag: "NEW", rating: 4.8, reviews: 3, stock: 7,
    colors: ["Original", "Terracotta", "Sage"],
    description: "Unleash your inner free spirit! This boho-inspired bandana is handcrafted for effortless style and cozy vibes. 🌿🧶"
  },
  {
    id: 30,
    category: "hair", subCat: "bandanas",
    name: "Floral Bandana", price: 220,
    image: "/images/Hairaccessories/floral-bandana.jpg", images: ["/images/Hairaccessories/floral-bandana.jpg"],
    tag: "POPULAR", rating: 5, reviews: 8, stock: 6,
    colors: ["Blush & Cream", "Lavender & White", "Peach"],
    description: "A field of flowers on your head! This floral-detailed bandana is the ultimate accessory for a soft, aesthetic look. 🌸✨"
  },
  {
    id: 31,
    category: "hair", subCat: "bandanas",
    name: "Stripe Bandana", price: 180,
    image: "/images/Hairaccessories/stripe-bandana.jpg", images: ["/images/Hairaccessories/stripe-bandana.jpg"],
    tag: "HANDMADE", rating: 4.7, reviews: 5, stock: 9,
    colors: ["Cream & Brown", "Black & White", "Pastel Stripe"],
    description: "Minimalist cool meets handmade warmth. This striped bandana is a versatile piece that complements any outfit. 🤍🧶"
  },
  {
    id: 32,
    category: "hair", subCat: "bandanas",
    name: "Pom Pom Bandana", price: 240,
    image: "/images/Hairaccessories/pompom-bandana.jpg", images: ["/images/Hairaccessories/pompom-bandana.jpg"],
    tag: "TRENDING", rating: 5, reviews: 7, stock: 5,
    colors: ["Multicolor", "Pastel Rainbow", "Monochrome"],
    description: "Fun, bold, and full of life! This pom-pom detailed bandana is for those who love to stand out with handmade flair. 🎉🧶"
  },

  // HEADBANDS
  {
    id: 33,
    category: "hair", subCat: "headbands",
    name: "Knot Headband", price: 160,
    image: "/images/Hairaccessories/knot-headband.jpg", images: ["/images/Hairaccessories/knot-headband.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 18, stock: 12,
    colors: ["Cream", "Blush", "Sage", "Midnight"],
    description: "Cozy chic at its best! This knotted headband is the perfect soft accessory to keep your hair stylish and in place. 🎀✨"
  },
  {
    id: 34,
    category: "hair", subCat: "headbands",
    name: "Daisy Headband", price: 180,
    image: "/images/Hairaccessories/daisy-headband.jpg", images: ["/images/Hairaccessories/daisy-headband.jpg"],
    tag: "NEW", rating: 5, reviews: 9, stock: 8,
    colors: ["White & Yellow", "Pastel", "All White"],
    description: "Cottagecore dreams come true! A row of delicate daisies to crown your look with pure, handmade charm. 🌼✨"
  },
  {
    id: 35,
    category: "hair", subCat: "headbands",
    name: "Wide Petal Band", price: 190,
    image: "/images/Hairaccessories/petal-headband.jpg", images: ["/images/Hairaccessories/petal-headband.jpg"],
    tag: "HANDMADE", rating: 4.9, reviews: 6, stock: 7,
    colors: ["Blush", "Lavender", "Terracotta"],
    description: "Inspired by nature's beauty. This wide petal headband is soft, stretchy, and elegantly handcrafted for you. 🌸✨"
  },
  {
    id: 36,
    category: "hair", subCat: "headbands",
    name: "Bunny Ear Band", price: 200,
    image: "/images/Hairaccessories/bunny-headband.jpg", images: ["/images/Hairaccessories/bunny-headband.jpg"],
    tag: "POPULAR", rating: 5, reviews: 13, stock: 10,
    colors: ["White", "Pastel Pink", "Cream"],
    description: "Hop into cuteness! These adorable bunny ears on a headband are the ultimate fun accessory for kids and kids at heart. 🐰✨"
  },
  {
    id: 37,
    category: "hair", subCat: "headbands",
    name: "Star Stud Band", price: 170,
    image: "/images/Hairaccessories/star-headband.jpg", images: ["/images/Hairaccessories/star-headband.jpg"],
    tag: "NEW", rating: 4.8, reviews: 4, stock: 9,
    colors: ["Gold & Cream", "Silver & White", "Pastel"],
    description: "Subtle sparkle for every day. This star-studded headband adds a touch of magic without overwhelming your look. ✨⭐"
  },

  // GAJRA
  {
    id: 56,
    category: "hair", subCat: "gajra",
    name: "Classic Gajra", price: 220,
    image: "/images/Hairaccessories/hairaccessories1.jpeg", images: ["/images/Hairaccessories/hairaccessories1.jpeg"],
    tag: "NEW", rating: 4.9, reviews: 3, stock: 8,
    colors: ["Jasmine White", "Rose Pink", "Marigold Yellow"],
    description: "A timeless floral gajra to elevate every braid and bun. Soft, fragrant-inspired charm for festive looks. 🌸✨"
  },

  // TULIP BOUQUETS
  {
    id: 38,
    category: "bouquets", subCat: "tulips",
    name: "Pink Tulip Trio", price: 350,
    image: "/images/Bouquets/pink-tulip.jpg", images: ["/images/Bouquets/pink-tulip.jpg"],
    tag: "GIFT", rating: 5, reviews: 15, stock: 4,
    colors: ["Pink", "White", "Lavender"],
    description: "A gift of eternal spring! Three perfectly crocheted tulips that will stay bright and beautiful forever. 🌷🌷🌷"
  },
  {
    id: 39,
    category: "bouquets", subCat: "tulips",
    name: "Tulip Bunch (x5)", price: 520,
    image: "/images/Bouquets/tulip-bunch.jpg", images: ["/images/Bouquets/tulip-bunch.jpg"],
    tag: "POPULAR", rating: 5, reviews: 9, stock: 3,
    colors: ["Mixed", "All Pink", "All White", "All Purple"],
    description: "A burst of floral joy! Five vibrant tulips bundled together to bring a touch of handmade nature into your home. 🌷🌷🌷🌷🌷"
  },

  // ROSE BOUQUETS
  {
    id: 40,
    category: "bouquets", subCat: "roses",
    name: "Eternal Red Rose", price: 499,
    image: "/images/Bouquets/rose-b.jpg", images: ["/images/Bouquets/rose-b.jpg"],
    tag: "ROMANTIC", rating: 5, reviews: 32, stock: 3,
    colors: ["Red", "Pink", "Cream"],
    description: "The ultimate symbol of love, made to last. This single eternal rose is handcrafted for someone truly special. 🌹✨"
  },
  {
    id: 41,
    category: "bouquets", subCat: "roses",
    name: "Rose Trio", price: 699,
    image: "/images/Bouquets/rose-trio.jpg", images: ["/images/Bouquets/rose-trio.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 19, stock: 4,
    colors: ["Red", "Mixed", "Pink & Cream"],
    description: "A trio of romantic roses that never fade. The perfect forever bouquet to celebrate love and beauty. 🌹🌹🌹"
  },
  {
    id: 42,
    category: "bouquets", subCat: "roses",
    name: "Pastel Rose Bunch", price: 799,
    image: "/images/Bouquets/pastel-roses.jpg", images: ["/images/Bouquets/pastel-roses.jpg"],
    tag: "NEW", rating: 5, reviews: 7, stock: 3,
    colors: ["Blush & Cream", "Lavender & White", "Peach"],
    description: "Pastel perfection! A dreamy bunch of soft-hued roses that bring a calm and beautiful aesthetic to any space. 🌸✨"
  },

  // SUNFLOWER BOUQUETS
  {
    id: 43,
    category: "bouquets", subCat: "sunflowers",
    name: "Sunshine Bundle", price: 420,
    image: "/images/Bouquets/sunflowers.jpg", images: ["/images/Bouquets/sunflowers.jpg"],
    tag: "BESTSELLER", rating: 5, reviews: 11, stock: 5,
    colors: ["Yellow", "Pastel Yellow", "Orange"],
    description: "A bundle of pure sunshine! These cheerful sunflowers are handcrafted to keep your home bright and happy. 🌻✨"
  },
  {
    id: 44,
    category: "bouquets", subCat: "sunflowers",
    name: "Solo Sunflower", price: 220,
    image: "/images/Bouquets/solo-sunflower.jpg", images: ["/images/Bouquets/solo-sunflower.jpg"],
    tag: "NEW", rating: 4.9, reviews: 6, stock: 8,
    colors: ["Classic Yellow", "Pale Yellow", "Orange Tip"],
    description: "Bold, bright, and beautiful. A single sunflower that stands tall and brings a ray of light wherever it goes. 🌻☀️"
  },

  // MIXED BOUQUETS
  {
    id: 45,
    category: "bouquets", subCat: "mixed",
    name: "Garden Mix Bouquet", price: 650,
    image: "/images/Bouquets/garden-mix-b.jpg", images: ["/images/Bouquets/garden-mix-b.jpg"],
    tag: "GIFT", rating: 5, reviews: 10, stock: 4,
    colors: ["Pastel Mix", "Bold Mix", "Seasonal"],
    description: "Nature's best, hand-picked for you. A whimsical mix of roses, tulips, and daisies in one unique, handmade bouquet. 🌷🌹🌼"
  },
  {
    id: 46,
    category: "bouquets", subCat: "mixed",
    name: "Rainbow Wildflower Bunch", price: 580,
    image: "/images/Bouquets/wildflower-b.jpg", images: ["/images/Bouquets/wildflower-b.jpg"],
    tag: "POPULAR", rating: 5, reviews: 8, stock: 5,
    colors: ["Original", "Pastel Rainbow", "Warm Tones"],
    description: "A vibrant explosion of color! These rainbow wildflowers are a celebration of nature's diversity and handmade art. 🌈🌸"
  },

  // MINI BOUQUETS
  {
    id: 47,
    category: "bouquets", subCat: "mini-b",
    name: "Mini Rose Trio", price: 320,
    image: "/images/Bouquets/mini-rose-b.jpg", images: ["/images/Bouquets/mini-rose-b.jpg"],
    tag: "NEW", rating: 5, reviews: 5, stock: 6,
    colors: ["Red", "Pink", "Mixed"],
    description: "Tiny but mighty! A trio of mini roses that are the perfect thoughtful gift or a sweet addition to your desk. 🌹🌹🌹"
  },
  {
    id: 49,
    category: "bouquets", subCat: "mini-b",
    name: "Pocket Daisy Bunch", price: 280,
    image: "/images/Bouquets/pocket-daisy-b.jpg", images: ["/images/Bouquets/pocket-daisy-b.jpg"],
    tag: "BESTSELLER", rating: 4.9, reviews: 11, stock: 7,
    colors: ["White & Yellow", "Pastel", "Multicolor"],
    description: "Pocket-sized happiness! This bundle of daisies is perfect for gifting or adding a touch of cottagecore charm to a small vase. 🌼✨"
  },

];
