const products = [
  {
    _id: "1",

    name: "Aashirvaad Atta",

    category: "Atta",

    images: [
      "/products/atta.png"
    ],

    featured: true,

    isAvailable: true,

    variants: [
      {
        _id: "v1",
        label: "5kg",
        price: 289,
        mrp: 320,
        stock: 12,
      },

      {
        _id: "v2",
        label: "10kg",
        price: 540,
        mrp: 620,
        stock: 6,
      },
    ],
  },

  {
    _id: "2",

    name: "Amul Taaza Milk",

    category: "Dairy",

    images: [
      "/products/milk.png"
    ],

    featured: true,

    isAvailable: true,

    variants: [
      {
        _id: "v1",
        label: "500ml",
        price: 28,
        mrp: 32,
        stock: 20,
      },

      {
        _id: "v2",
        label: "1L",
        price: 56,
        mrp: 62,
        stock: 10,
      },
    ],
  },

  {
    _id: "3",

    name: "Parle-G Biscuits",

    category: "Snacks",

    images: [
      "/products/parle.png"
    ],

    featured: false,

    isAvailable: true,

    variants: [
      {
        _id: "v1",
        label: "100g",
        price: 10,
        mrp: 12,
        stock: 50,
      },

      {
        _id: "v2",
        label: "250g",
        price: 24,
        mrp: 28,
        stock: 35,
      },
    ],
  },

  {
    _id: "4",

    name: "Fortune Sunflower Oil",

    category: "Oil",

    images: [
      "/products/oil.png"
    ],

    featured: true,

    isAvailable: true,

    variants: [
      {
        _id: "v1",
        label: "1L",
        price: 145,
        mrp: 170,
        stock: 18,
      },

      {
        _id: "v2",
        label: "5L",
        price: 699,
        mrp: 760,
        stock: 7,
      },
    ],
  },

  {
    _id: "5",

    name: "Lay's Magic Masala",

    category: "Snacks",

    images: [
      "/products/lays.png"
    ],

    featured: true,

    isAvailable: true,

    variants: [
      {
        _id: "v1",
        label: "52g",
        price: 20,
        mrp: 25,
        stock: 30,
      },
    ],
  },

  {
    _id: "6",

    name: "Sprite Cold Drink",

    category: "Cold Drinks",

    images: [
      "/products/sprite.png"
    ],

    featured: false,

    isAvailable: true,

    variants: [
      {
        _id: "v1",
        label: "750ml",
        price: 40,
        mrp: 45,
        stock: 25,
      },

      {
        _id: "v2",
        label: "2L",
        price: 95,
        mrp: 110,
        stock: 12,
      },
    ],
  },
];

export default products;
