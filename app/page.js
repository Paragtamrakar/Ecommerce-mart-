"use client";

import { useState } from "react";
import Navbar from "@/Components/Navbar";
import CategorySection from "@/Components/Category/CategorySection";
import ProductCard from "@/Components/Product/ProductCard";
import products from "@/data/products";
import CartModal from "@/Components/Cart/CartModal";
import FloatingCartBar from "@/Components/Cart/FloatingCartBar";

export default function Home() {

  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      product.category.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-24">

      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <section className="mt-4 px-4">
        <h2 className="text-xl font-bold mb-3">
          Shop By Category
        </h2>

        <CategorySection />
      </section>

      <section className="mt-6 px-4">

        <div className="flex items-center justify-between mb-3">

          <h2 className="text-xl font-bold">
            {searchTerm
              ? `Search Results (${filteredProducts.length})`
              : "Popular Products"}
          </h2>

        </div>

        {filteredProducts.length > 0 ? (

          <div className="grid grid-cols-2 gap-4">

            {filteredProducts.map((product) => (

              <ProductCard
                key={product._id}
                product={product}
              />

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-2xl p-8 text-center">

            <h3 className="font-bold text-lg">
              No products found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another keyword
            </p>

          </div>

        )}

      </section>
      {/* FLOATING CART BAR */}
      <FloatingCartBar
        onOpen={() => setShowCart(true)}
      />

      {/* CART MODAL */}
      <CartModal
        show={showCart}
        onClose={() => setShowCart(false)}
      />
    </main>
  );
}