"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import {
  MapPin,
  ShoppingCart,
  House,
  Search,
  LayoutGrid,
  User,
  X,
} from "lucide-react";

import products from "@/data/products";

export default function Navbar({
  searchTerm = "",
  setSearchTerm = () => { },
  showSearch = true,
  onOpen = ()=> { },
}) {

  // SEARCH STATE
  // const [search, setSearch] = useState("");
  // TYPEWRITER STATES
  const [placeholder, setPlaceholder] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);


  // TYPEWRITER PLACEHOLDER DATA
  const suggestions = [
    "Amul Taaza Milk",
    "Aashirvaad Atta",
    "Maggi 2-Minute Noodles",
    "Coca-Cola",
    "Fortune Sunflower Oil",
    "Lay's Magic Masala",
  ];


  // Cart count
  const [cartCount, setCartCount] =
  useState(0);
  useEffect(() => {

  const updateCartCount = () => {

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const totalItems = cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

    setCartCount(totalItems);

  };

  updateCartCount();

  window.addEventListener(
    "cartUpdated",
    updateCartCount
  );

  return () =>
    window.removeEventListener(
      "cartUpdated",
      updateCartCount
    );

}, []);

  // TYPEWRITER EFFECT
  useEffect(() => {
    const currentWord = suggestions[currentIndex];

    const timeout = setTimeout(() => {

      if (!isDeleting) {

        setPlaceholder(
          currentWord.substring(
            0,
            placeholder.length + 1
          )
        );

        if (placeholder === currentWord) {

          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);

        }

      } else {

        setPlaceholder(
          currentWord.substring(
            0,
            placeholder.length - 1
          )
        );

        if (placeholder === "") {

          setIsDeleting(false);

          setCurrentIndex(
            (prev) =>
              (prev + 1) %
              suggestions.length
          );

        }

      }

    }, isDeleting ? 40 : 90);

    return () => clearTimeout(timeout);

  }, [
    placeholder,
    isDeleting,
    currentIndex,
  ]);



  // FILTER PRODUCTS
  const filteredProducts = showSearch ? products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      product.category.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  ) : [];

  return (

    <>

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

        <div className="px-4 pt-3 pb-4">

          {/* TOP ROW */}
          <div className="flex items-center justify-between">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">

              {/* LOGO */}
              <div className="w-11 h-11 rounded-2xl bg-green-600 flex items-center justify-center shadow-md">

                <a href="/" className="text-white font-bold text-lg">
                  OG
                </a>

              </div>

              {/* LOCATION */}
              <div>

                <p className="text-xs text-gray-500 font-medium">
                  Delivering to
                </p>

                <div className="flex items-center gap-1">

                  <MapPin
                    size={14}
                    className="text-green-600"
                  />

                  <p className="text-sm font-bold text-gray-900">
                    Bus Stand Beohari
                  </p>

                </div>

              </div>

            </div>

            {/* CART BUTTON */}
            <button   onClick={onOpen} className="relative w-11 h-11 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center active:scale-95 transition">
            
              <ShoppingCart
                size={20}
                className="text-gray-800"
              />

              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">

                {cartCount}

              </span>

            </button>

          </div>





          {/* SEARCH BAR */}
          {showSearch && (<div className="mt-4 relative">

            {/* SEARCH ICON */}
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder={
                searchTerm
                  ? ""
                  : `Search ${placeholder}`
              }
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-10 text-sm outline-none focus:border-green-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(34,197,94,0.12)] transition-all duration-300"
            />

            {/* CLEAR BUTTON */}
            {searchTerm && (

              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
              >

                <X size={16} />

              </button>

            )}



            {/* SEARCH DROPDOWN */}
            {searchTerm.length > 0 && (

              <div className="absolute top-14 left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-h-80 overflow-y-auto z-50">

                {filteredProducts.length > 0 ? (

                  filteredProducts.map((product) => (

                    <div
                      key={product._id}
                      onClick={() => {
                        setSearchTerm(product.name);
                      }}
                      className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                    >

                      {/* IMAGE */}
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-contain"
                      />

                      {/* INFO */}
                      <div>

                        <h3 className="text-sm font-semibold">
                          {product.name}
                        </h3>

                        <p className="text-xs text-gray-500">
                          ₹{product.variants[0].price}
                        </p>

                      </div>

                    </div>

                  ))

                ) : (

                  <div className="p-4 text-sm text-gray-500">

                    No products found

                  </div>

                )}

              </div>

            )}

          </div>)}

        </div>

      </header>





      {/* BOTTOM NAVBAR */}
      <nav className="fixed bottom-0 left-0 w-full md:hidden z-[999] bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">

        <div className="h-16 px-6 flex items-center justify-between">

          <Link
            href="/"
            className="flex flex-col items-center gap-1"
          >

            <House
              size={22}
              className="text-green-600"
            />

            <span className="text-[11px] font-semibold text-green-600">
              Home
            </span>

          </Link>





          <button className="flex flex-col items-center gap-1">

            <Search
              size={22}
              className="text-gray-500"
            />

            <span className="text-[11px] text-gray-500">
              Search
            </span>

          </button>





          <button className="flex flex-col items-center gap-1">

            <LayoutGrid
              size={22}
              className="text-gray-500"
            />

            <span className="text-[11px] text-gray-500">
              Categories
            </span>

          </button>





          <button className="flex flex-col items-center gap-1">

            <User
              size={22}
              className="text-gray-500"
            />

            <span className="text-[11px] text-gray-500">
              Account
            </span>

          </button>

        </div>

      </nav>

    </>

  );
}