"use client";

import React, { Suspense } from "react";
import { useProducts } from "../context/ProdContext";
import { useSearchParams } from "next/navigation";
import { ProdCard } from "../Components/ProdCard/ProdCard";

export const dynamic = "force-dynamic";

function AllProdsContent() {
  const items = useProducts();
  const searchParams = useSearchParams();
  const category = searchParams.get("categorySlug");

  const filtered = category
    ? items.filter(
        p =>
          p.category &&
          p.category.toLowerCase() === category.toLowerCase()
      )
    : items;

  return (
    <section className="py-12 md:py-20 px-6 lg:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Our Full Collection
          </h2>
          <p className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900">
            All Items
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filtered?.length ? (
            filtered.map((product) => (
              <ProdCard key={product.id} product={product} />
            ))
          ) : (
            <p className="mt-2 text-xl font-bold text-gray-900">
              No Products found
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <AllProdsContent />
    </Suspense>
  );
}
