// This code creates single card based upon data 
"use client";
import Link from "next/link";

export default function CategoryCard({ category, isActive = false, loading = false }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-14 h-14 rounded-full bg-neutral-100 animate-pulse" />
        <div className="w-10 h-2 rounded-full bg-neutral-100 animate-pulse" />
      </div>
    );
  }

  return (
    <Link
      href={`/category/${category.slug}`}
      className="flex flex-col items-center gap-1.5 group"
    >
      <div
        className={`
          w-14 h-14 rounded-full flex items-center justify-center
          border transition-all duration-[140ms] ease-out
          group-active:scale-[0.93]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20
          ${isActive
            ? "bg-neutral-900 border-neutral-900"
            : "bg-white border-black/[0.07] group-hover:border-black/[0.13]"
          }
        `}
      >
        <img
          src={category.image}
          alt={category.name} 
          className="w-7 h-7 object-contain"
          draggable={false}
        />
      </div>
      <span className="text-[11px] font-normal text-neutral-500 text-center max-w-[56px] truncate leading-tight">
        {category.name}
      </span>
    </Link>
  );
}