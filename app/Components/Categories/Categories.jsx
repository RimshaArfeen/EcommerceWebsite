"use client";

import React, { useEffect, useState } from "react";
import "../../globals.css";
import { Flame, Zap, Sparkles, Utensils, IceCream } from 'lucide-react';

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

  if (loading) return <p className="text-center py-10">Loading categories...</p >;

  // 1. Layout Configuration: Maps index to Tailwind classes
  const layoutConfig = [
    { container: "md:col-span-2 md:row-span-2", iconSize: 32 }, // Item 0: Large
    { container: "md:col-span-2 md:row-span-1", iconSize: 24 }, // Item 1: Medium
    { container: "md:col-span-1 md:row-span-1", iconSize: 24 }, // Item 2: Small
    { container: "md:col-span-1 md:row-span-1", iconSize: 24 }, // Item 3: Small
  ];

  // 2. Icon Mapping: Matches API slugs to Lucide Icons
  const getIcon = (slug, size) => {
    const icons = {
      "fastfood": <Flame size={size} />,
      "desi-tarka": <Utensils size={size} />,
      "starter": <Sparkles size={size} />,
      "dessertshakes": <IceCream size={size} />,
    };
    return icons[slug] || <Zap size={size} />;
  };

  return (
    <section className="relative max-w-7xl mx-auto py-20 -mt-24 z-30 px-6">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8">
        <div className="group cursor-default">
          <span className="text-xs font-black uppercase tracking-[0.3em] opacity-50 group-hover:text-red-500 transition-colors">
            Pick Your Poison
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
            Browse by <span className="text-transparent  stroke-1 ">Intensity</span>
          </h2>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        {categories.map((cat, index) => (
          <CategoryCard
            key={cat.id}
            name={cat.name}
            slug={cat.slug}
            subText="Explore Collection" // Or add a subtext field to your API
            img={cat.imageUrl}
            className={layoutConfig[index]?.container || ""}
            icon={getIcon(cat.slug, layoutConfig[index]?.iconSize || 24)}
          />
        ))}
      </div>
    </section>
  );
};

const CategoryCard = ({ name, subText, icon, img, className, slug }) => {
  return (
    <a href={`/allProds/${slug}`}
      className={`group relative overflow-hidden rounded-3xl cursor-pointer min-h-[250px] md:min-h-full ${className}`}>
      <img
        src={img}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="flex items-center space-x-3 my-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white group-hover:text-red-500 transition-colors">
            {icon}
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-white/70">
            {subText} 
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">
          {name}
        </h3>
        <div className="w-0 h-1 bg-red-600 mt-4 transition-all duration-500 group-hover:w-full" />
      </div>

      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <Zap size={18} className="text-white" />
        </div>
      </div>
    </a>
  );
};


export default Categories;
