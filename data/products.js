const products = [
  // ==========================================
  // ATTA & FLOURS (Category: atta)
  // ==========================================
  {
    _id: "1",
    name: "Aashirvaad Atta",
    slug: "aashirvaad-atta",
    category: { name: "Atta", slug: "atta" },
    images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "5kg", price: 289, mrp: 320, stock: 12 },
      { _id: "v2", label: "10kg", price: 540, mrp: 620, stock: 6 }
    ]
  },
  {
    _id: "2",
    name: "Fortune Chakki Fresh Atta",
    slug: "fortune-chakki-fresh-atta",
    category: { name: "Atta", slug: "atta" },
    images: ["https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "5kg", price: 265, mrp: 295, stock: 15 },
      { _id: "v2", label: "10kg", price: 510, mrp: 580, stock: 8 }
    ]
  },
  {
    _id: "3",
    name: "Pillsbury Chakki Fresh Atta",
    slug: "pillsbury-chakki-fresh-atta",
    category: { name: "Atta", slug: "atta" },
    images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "5kg", price: 275, mrp: 310, stock: 10 }
    ]
  },
  {
    _id: "4",
    name: "Rajdhani Besan",
    slug: "rajdhani-besan",
    category: { name: "Atta", slug: "atta" },
    images: ["https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "500g", price: 58, mrp: 65, stock: 40 },
      { _id: "v2", label: "1kg", price: 110, mrp: 130, stock: 25 }
    ]
  },
  {
    _id: "5",
    name: "Organic Tattva Wheat Atta",
    slug: "organic-tattva-wheat-atta",
    category: { name: "Atta", slug: "atta" },
    images: ["https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "1kg", price: 85, mrp: 95, stock: 14 },
      { _id: "v2", label: "5kg", price: 399, mrp: 440, stock: 5 }
    ]
  },
  {
    _id: "6",
    name: "Aashirvaad Select Sharbati Atta",
    slug: "aashirvaad-select-sharbati-atta",
    category: { name: "Atta", slug: "atta" },
    images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "5kg", price: 310, mrp: 345, stock: 18 }
    ]
  },
  {
    _id: "7",
    name: "24 Mantra Organic Ragi Flour",
    slug: "24-mantra-organic-ragi-flour",
    category: { name: "Atta", slug: "atta" },
    images: ["https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "500g", price: 68, mrp: 75, stock: 15 }
    ]
  },
  {
    _id: "8",
    name: "Nature Fresh Sampoorna Atta",
    slug: "nature-fresh-sampoorna-atta",
    category: { name: "Atta", slug: "atta" },
    images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "5kg", price: 250, mrp: 280, stock: 22 }
    ]
  },

  // ==========================================
  // DAIRY & EGGS (Category: dairy)
  // ==========================================
  {
    _id: "9",
    name: "Amul Taaza Milk",
    slug: "amul-taaza-milk",
    category: { name: "Dairy", slug: "dairy" },
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "500ml", price: 28, mrp: 32, stock: 20 },
      { _id: "v2", label: "1L", price: 56, mrp: 62, stock: 10 }
    ]
  },
  {
    _id: "10",
    name: "Amul Salted Butter",
    slug: "amul-salted-butter",
    category: { name: "Dairy", slug: "dairy" },
    images: ["https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "100g", price: 56, mrp: 60, stock: 45 },
      { _id: "v2", label: "500g", price: 265, mrp: 275, stock: 15 }
    ]
  },
  {
    _id: "11",
    name: "Mother Dairy Malai Paneer",
    slug: "mother-dairy-malai-paneer",
    category: { name: "Dairy", slug: "dairy" },
    images: ["https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "200g", price: 92, mrp: 100, stock: 25 },
      { _id: "v2", label: "400g", price: 180, mrp: 195, stock: 12 }
    ]
  },
  {
    _id: "12",
    name: "Amul Masti Buttermilk",
    slug: "amul-masti-buttermilk",
    category: { name: "Dairy", slug: "dairy" },
    images: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "200ml", price: 15, mrp: 15, stock: 60 }
    ]
  },
  {
    _id: "13",
    name: "Amul Pure Ghee",
    slug: "amul-pure-ghee",
    category: { name: "Dairy", slug: "dairy" },
    images: ["https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "500ml", price: 335, mrp: 360, stock: 14 },
      { _id: "v2", label: "1L", price: 660, mrp: 700, stock: 20 }
    ]
  },
  {
    _id: "14",
    name: "Epigamia Greek Yogurt",
    slug: "epigamia-greek-yogurt",
    category: { name: "Dairy", slug: "dairy" },
    images: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "90g", price: 45, mrp: 50, stock: 18 }
    ]
  },
  {
    _id: "15",
    name: "Amul Cheese Slices",
    slug: "amul-cheese-slices",
    category: { name: "Dairy", slug: "dairy" },
    images: ["https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "200g", price: 135, mrp: 150, stock: 22 }
    ]
  },
  {
    _id: "16",
    name: "Fresh Table Eggs",
    slug: "fresh-table-eggs",
    category: { name: "Dairy", slug: "dairy" },
    images: ["https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "6 pcs", price: 48, mrp: 55, stock: 30 },
      { _id: "v2", label: "30 pcs", price: 210, mrp: 250, stock: 10 }
    ]
  },

  // ==========================================
  // SNACKS & COOKIES (Category: snacks)
  // ==========================================
  {
    _id: "17",
    name: "Parle-G Biscuits",
    slug: "parle-g-biscuits",
    category: { name: "Snacks", slug: "snacks" },
    images: ["https://images.unsplash.com/photo-1558961312-50346c099887?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "100g", price: 10, mrp: 12, stock: 50 },
      { _id: "v2", label: "250g", price: 24, mrp: 28, stock: 35 }
    ]
  },
  {
    _id: "18",
    name: "Lay's Magic Masala",
    slug: "lays-magic-masala",
    category: { name: "Snacks", slug: "snacks" },
    images: ["https://images.unsplash.com/photo-1566478989037-eec170784d4b?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "52g", price: 20, mrp: 25, stock: 30 }
    ]
  },
  {
    _id: "19",
    name: "Britannia Good Day Cashew",
    slug: "britannia-good-day-cashew",
    category: { name: "Snacks", slug: "snacks" },
    images: ["https://images.unsplash.com/photo-1558961312-50346c099887?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "200g", price: 35, mrp: 40, stock: 45 }
    ]
  },
  {
    _id: "20",
    name: "Haldiram's Aloo Bhujia",
    slug: "haldirams-aloo-bhujia",
    category: { name: "Snacks", slug: "snacks" },
    images: ["https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "150g", price: 42, mrp: 50, stock: 40 },
      { _id: "v2", label: "350g", price: 95, mrp: 110, stock: 20 }
    ]
  },
  {
    _id: "21",
    name: "Kurkure Masala Munch",
    slug: "kurkure-masala-munch",
    category: { name: "Snacks", slug: "snacks" },
    images: ["https://images.unsplash.com/photo-1599490659213-e2b9527bb087?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "80g", price: 20, mrp: 20, stock: 35 }
    ]
  },
  {
    _id: "22",
    name: "Maggi 2-Minute Noodles",
    slug: "maggi-2-minute-noodles",
    category: { name: "Snacks", slug: "snacks" },
    images: ["https://images.unsplash.com/photo-1612966608997-30d411b49987?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "70g", price: 14, mrp: 14, stock: 100 },
      { _id: "v2", label: "280g", price: 54, mrp: 56, stock: 40 }
    ]
  },
  {
    _id: "23",
    name: "Cadbury Dairy Milk Silk",
    slug: "cadbury-dairy-milk-silk",
    category: { name: "Snacks", slug: "snacks" },
    images: ["https://images.unsplash.com/photo-1548907040-4d42b52115ca?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "60g", price: 75, mrp: 80, stock: 25 }
    ]
  },
  {
    _id: "24",
    name: "Hide & Seek Choco Cookies",
    slug: "hide-and-seek-choco-cookies",
    category: { name: "Snacks", slug: "snacks" },
    images: ["https://images.unsplash.com/photo-1558961312-50346c099887?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "120g", price: 38, mrp: 45, stock: 30 }
    ]
  },

  // ==========================================
  // EDIBLE OILS & GHEE (Category: oil)
  // ==========================================
  {
    _id: "25",
    name: "Fortune Sunflower Oil",
    slug: "fortune-sunflower-oil",
    category: { name: "Oil", slug: "oil" },
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "1L", price: 145, mrp: 170, stock: 18 },
      { _id: "v2", label: "5L", price: 699, mrp: 760, stock: 7 }
    ]
  },
  {
    _id: "26",
    name: "Fortune Kachi Ghani Mustard Oil",
    slug: "fortune-kachi-ghani-mustard-oil",
    category: { name: "Oil", slug: "oil" },
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "1L", price: 165, mrp: 185, stock: 24 }
    ]
  },
  {
    _id: "27",
    name: "Saffola Gold Refined Oil",
    slug: "saffola-gold-refined-oil",
    category: { name: "Oil", slug: "oil" },
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "1L", price: 180, mrp: 210, stock: 15 },
      { _id: "v2", label: "5L", price: 875, mrp: 995, stock: 5 }
    ]
  },
  {
    _id: "28",
    name: "Dhara Sunflower Refined Oil",
    slug: "dhara-sunflower-refined-oil",
    category: { name: "Oil", slug: "oil" },
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "1L", price: 150, mrp: 175, stock: 14 }
    ]
  },
  {
    _id: "29",
    name: "Figaro Pure Olive Oil",
    slug: "figaro-pure-olive-oil",
    category: { name: "Oil", slug: "oil" },
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "250ml", price: 320, mrp: 350, stock: 8 },
      { _id: "v2", label: "1L", price: 999, mrp: 1200, stock: 4 }
    ]
  },
  {
    _id: "30",
    name: "Dalda Vanaspati Ghee",
    slug: "dalda-vanaspati-ghee",
    category: { name: "Oil", slug: "oil" },
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "1L", price: 130, mrp: 150, stock: 20 }
    ]
  },
  {
    _id: "31",
    name: "Patanjali Kachi Ghani Oil",
    slug: "patanjali-kachi-ghani-oil",
    category: { name: "Oil", slug: "oil" },
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "1L", price: 160, mrp: 175, stock: 30 }
    ]
  },
  {
    _id: "32",
    name: "Fortune Rice Bran Oil",
    slug: "fortune-rice-bran-oil",
    category: { name: "Oil", slug: "oil" },
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "1L", price: 155, mrp: 180, stock: 16 }
    ]
  },

  // ==========================================
  // COLD DRINKS & BEVERAGES (Category: cold-drinks)
  // ==========================================
  {
    _id: "33",
    name: "Sprite Cold Drink",
    slug: "sprite-cold-drink",
    category: { name: "Cold Drinks", slug: "cold-drinks" },
    images: ["https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "750ml", price: 40, mrp: 45, stock: 25 },
      { _id: "v2", label: "2L", price: 95, mrp: 110, stock: 12 }
    ]
  },
  {
    _id: "34",
    name: "Coca-Cola",
    slug: "coca-cola",
    category: { name: "Cold Drinks", slug: "cold-drinks" },
    images: ["https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "250ml", price: 20, mrp: 20, stock: 40 },
      { _id: "v2", label: "750ml", price: 40, mrp: 45, stock: 30 }
    ]
  },
  {
    _id: "35",
    name: "Thums Up",
    slug: "thums-up",
    category: { name: "Cold Drinks", slug: "cold-drinks" },
    images: ["https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "750ml", price: 40, mrp: 45, stock: 35 },
      { _id: "v2", label: "2L", price: 95, mrp: 110, stock: 15 }
    ]
  },
  {
    _id: "36",
    name: "Maaza Mango Drink",
    slug: "maaza-mango-drink",
    category: { name: "Cold Drinks", slug: "cold-drinks" },
    images: ["https://images.unsplash.com/photo-1534260327109-e85929235b54?q=80&w=600&auto=format&fit=crop"],
    featured: true,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "600ml", price: 38, mrp: 42, stock: 24 },
      { _id: "v2", label: "1.2L", price: 70, mrp: 75, stock: 18 }
    ]
  },
  {
    _id: "37",
    name: "Red Bull Energy Drink",
    slug: "red-bull-energy-drink",
    category: { name: "Cold Drinks", slug: "cold-drinks" },
    images: ["https://images.unsplash.com/photo-1600318625143-690a072046fa?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "250ml", price: 120, mrp: 125, stock: 50 }
    ]
  },
  {
    _id: "38",
    name: "Bisleri Mineral Water",
    slug: "bisleri-mineral-water",
    category: { name: "Cold Drinks", slug: "cold-drinks" },
    images: ["https://images.unsplash.com/photo-1560089000-7433a4ebbd64?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "500ml", price: 10, mrp: 10, stock: 100 },
      { _id: "v2", label: "1L", price: 20, mrp: 20, stock: 80 }
    ]
  },
  {
    _id: "39",
    name: "Real Mixed Fruit Juice",
    slug: "real-mixed-fruit-juice",
    category: { name: "Cold Drinks", slug: "cold-drinks" },
    images: ["https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "1L", price: 115, mrp: 130, stock: 15 }
    ]
  },
  {
    _id: "40",
    name: "Paper Boat Aam Panna",
    slug: "paper-boat-aam-panna",
    category: { name: "Cold Drinks", slug: "cold-drinks" },
    images: ["https://images.unsplash.com/photo-1534260327109-e85929235b54?q=80&w=600&auto=format&fit=crop"],
    featured: false,
    isAvailable: true,
    variants: [
      { _id: "v1", label: "200ml", price: 32, mrp: 35, stock: 40 }
    ]
  }
];

export default products;