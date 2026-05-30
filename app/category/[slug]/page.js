// This code create pages according to category selection using slug

import products from "@/data/products";

export default async function CategoryPage({ params }) {

  const { slug } = await params;

  // Filter products according to category slug
  const filteredProducts = products.filter(
    (product) =>
      product.category.slug === slug
  );

  return (

    <div className="p-4 min-h-screen bg-slate-50">

      {/* CATEGORY TITLE */}
      <h1 className="text-2xl font-bold mb-5 capitalize">
        {slug}
      </h1>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 gap-4">

        {filteredProducts.map((product) => {

          const variant = product.variants[0];

          return (

            <div
              key={product._id}
              className="bg-white rounded-2xl p-3 shadow-sm"
            >

              {/* PRODUCT IMAGE */}
              <div className="w-full h-32 flex items-center justify-center">

                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />

              </div>

              {/* PRODUCT NAME */}
              <h2 className="mt-3 text-sm font-semibold line-clamp-2">
                {product.name}
              </h2>

              {/* PRODUCT WEIGHT */}
              <p className="text-xs text-gray-500 mt-1">
                {variant.label}
              </p>

              {/* PRICE SECTION */}
              <div className="flex items-center gap-2 mt-2">

                <p className="font-bold">
                  ₹{variant.price}
                </p>

                <p className="text-xs text-gray-400 line-through">
                  ₹{variant.mrp}
                </p>

              </div>

              {/* ADD BUTTON */}
              <button className="w-full mt-3 border border-green-600 text-green-600 py-2 rounded-xl font-semibold">

                Add

              </button>

            </div>

          );

        })}

      </div>

    </div>

  );
}