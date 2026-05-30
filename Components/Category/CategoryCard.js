// This code creates single card based upon data 

"use client";

import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <img
          src={category.image}
          alt={category.name}
          className="w-20 h-20 object-contain"
        />

        <h3 className="mt-2 font-semibold">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}