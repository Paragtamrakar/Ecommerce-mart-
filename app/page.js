import Navbar from "@/Components/Navbar";
import CategorySection from "@/Components/Category/CategorySection";
import ProductCard from "@/Components/Product/ProductCard";
import products from "@/data/products";

export default function Home() {
  return (

    <main className="min-h-screen bg-slate-50 pb-24">

      {/* NAVBAR */}
      <Navbar />

      {/* CATEGORY SECTION */}
      <section className="mt-4 px-4">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">
            Shop By Category
          </h2>
        </div>

        <CategorySection />

      </section>

      {/* PRODUCTS SECTION */}
      <section className="mt-6 px-4">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">
            Popular Products
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">

          {products.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      </section>

    </main>

  );
}