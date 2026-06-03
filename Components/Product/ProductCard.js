"use client"
import Image from "next/image";
import { addToCart } from "@/lib/cart";
export default function ProductCard({ product }) {

  const variant = product.variants[0];

  const discount =
    Math.round(
      ((variant.mrp - variant.price) / variant.mrp) * 100
    );

  // Handle add to cart 
  const handleAddToCart = () => {
addToCart(product,variant);

  };

  return (

    <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-sm">

      {/* DISCOUNT BADGE */}
      <div className="inline-block bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full mb-2">

        {discount}% OFF

      </div>

      {/* PRODUCT IMAGE */}
      <div className="relative w-full h-32 mb-3">

        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain"
        />

      </div>

      {/* PRODUCT NAME */}
      <h3 className="text-sm font-bold text-gray-900 line-clamp-2">

        {product.name}

      </h3>

      {/* VARIANT */}
      <p className="text-xs text-gray-500 mt-1">

        {variant.label}

      </p>

      {/* PRICE + BUTTON */}
      <div className="flex items-center justify-between mt-4">

        {/* PRICE */}
        <div>

          <p className="text-sm font-bold text-gray-900">

            ₹{variant.price}

          </p>

          <p className="text-xs text-gray-400 line-through">

            ₹{variant.mrp}

          </p>

        </div>

        {/* ADD BUTTON */}
        <button onClick={handleAddToCart} className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl active:scale-95 transition">

          Add

        </button>

      </div>

    </div>

  );
}