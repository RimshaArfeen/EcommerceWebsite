

// app/allProds/[slug]/page.js
export const dynamic = "force-dynamic";

import React from "react";
import { ProdCard } from "../../Components/ProdCard/ProdCard";

export default async function Page({ params }) {
  const resolved = await params;     // ← FIX
  const categorySlug = resolved.slug;
  
  if (!categorySlug) {
    return (
      <section className="py-12 min-h-screen">
        <p>No category selected.</p>
      </section>
    );
  }

  // Use absolute URL for server-side fetch
  const baseUrl = process.env.NEXT_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products?category=${categorySlug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p>Failed to fetch products</p>;
  }

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

        {!data?.length && <p>No products found.</p>}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <ProdCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
