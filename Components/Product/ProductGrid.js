import ProductCard from "./ProductCard";
import products from "@/data/products";

export default function ProductGrid() {

  return (

    <section className="mt-8 px-4">

      {/* HEADING */}
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-lg font-bold text-gray-900">
          Popular Products
        </h2>

        <button className="text-sm font-semibold text-green-600">
          See All
        </button>

      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 gap-4">

        {products.map((product) => (

          <ProductCard
            key={`${product._id}-${product.name}`}
            product={product}
          />

        ))}

      </div>

    </section>

  );
}