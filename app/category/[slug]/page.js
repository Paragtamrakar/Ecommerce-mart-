// This code create pages according to category selection using slug

import products from "@/data/products";
import ProductCard from "@/Components/Product/ProductCard";
import Navbar from "@/Components/Navbar";
import CartWrapper from "@/Components/Cart/CartWrapper";

export default async function CategoryPage({ params }) {

  const { slug } = await params;

  // FILTER PRODUCTS BY CATEGORY
  const filteredProducts = products.filter(
    (product) =>
      product.category.slug === slug
  );

  return (

    <div className="p-4 min-h-screen bg-slate-50">
      <Navbar />

      {/* CATEGORY TITLE */}
      <h1 className="text-2xl font-bold mb-5 capitalize">
        {slug.replace("-", " ")}
      </h1>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 ? (

        <div className="bg-white rounded-2xl p-8 text-center">

          <h2 className="text-lg font-bold">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            This category is currently empty.
          </p>

        </div>

      ) : (

        /* PRODUCTS GRID */
        <div className="grid grid-cols-2 gap-4">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      )}
      <CartWrapper />
    </div>

  );

}