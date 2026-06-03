// This code creates multiple cards and make a section using loops
"use client"
import categories from "@/data/categories";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.slug}
          category={category}
        />
      ))}
    </div>
  );
}