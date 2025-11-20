"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../globals.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center py-10">Loading categories...</p>;

  return (
    <section className="py-24 font-sans">
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight  mb-10 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 xl:gap-10">
          {categories.length > 0 ? (
            categories.map(category => (
              <Link
                key={category.id}
                href={`/allProds/${category.slug}`}
                className="group cursor-pointer block overflow-hidden rounded-xl shadow-lg border hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
              >
                <div className="relative aspect-video h-48 sm:h-56 overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="object-cover w-full h-full transition-all duration-500 group-hover:scale-[1.05] group-hover:opacity-90"
                    onError={e => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/600x400/e2e8f0/334155?text=${category.name}`;
                    }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0  bg-opacity-10 group-hover:bg-opacity-0 transition duration-300"></div>
                </div>
                <div className="p-4 text-center ">
                  <span className="text-lg font-bold  tracking-wider uppercase transition duration-300 ">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className=" col-span-full text-center py-10">
              No categories found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
