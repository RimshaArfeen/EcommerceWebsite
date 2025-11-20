import React from "react";
import { ProdCard } from "../../Components/ProdCard/ProdCard";

export default async function Page({ params }) {
  // unwrap params
  const { slug: categorySlug } = await params; // ✅

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/products?category=${categorySlug}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return (
    <section className="py-12 md:py-24 px-6 lg:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Our Full Collection
          </h2>
          <p className="mt-2 text-4xl sm:text-5xl font-extrabold uppercase text-gray-900">
            {categorySlug}
          </p>
        </div>

        {data.length === 0 && <p>No products found.</p>}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map(product => (
            <ProdCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
