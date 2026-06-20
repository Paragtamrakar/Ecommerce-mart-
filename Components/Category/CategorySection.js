// This code creates multiple cards and make a section using loops
"use client";
import categories from "@/data/categories";
import CategoryCard from "./CategoryCard";

export default function CategorySection({ activeSlug, isLoading = false }) {
  const items = isLoading ? Array(7).fill(null) : categories;

  return (
    <section aria-label="Browse categories">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
        {items.map((category, i) =>
          isLoading ? (
            <CategoryCard key={i} loading />
          ) : (
            <CategoryCard
              key={category.slug}
              category={category}
              isActive={category.slug === activeSlug}
            />
          )
        )}
      </div>
    </section>
  );
}