
"use client";
import React, { useState } from "react";
import { Heart, ShoppingBag, Plus, Minus, Flame, Eye } from "lucide-react";
import AddCart from "../AddCart/page";
import WishListCard from "../WishListCard/WishListCard";
import WishlistBtn from "../WishlistBtn";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/LikeContext";


/**
 * ProdCard Component
 * Senior UI/UX Design focusing on a premium, tactile ecommerce experience.
 */
export const ProdCard = ({ product = {} }) => {
  // Destructure with defaults to prevent crashes if product is undefined
  const {
    title = "Signature Hot Sauce",
    price = "0.00",
    imageUrl = "",
    isNew = true,
    category = { name: "Artisan Spice" },
    description = "A perfect blend of heat and flavor, crafted for the true spice enthusiast.",
    heat = 3
  } = product;

  const [itemQuantity, setItemQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleAddToCart = () => {
    const normalized = {
      ...product,
      _id: product._id ?? product.id ?? product.title
    };
    addToCart(normalized, itemQuantity);
  };

  const handle_wishlist = (e) => {
    addToWishlist(product);
    setIsFavorite(!isFavorite);
  };

  const handleInc = (e) => {
    setItemQuantity((prev) => prev + 1);
  };

  const handleDec = (e) => {
    setItemQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="group relative primary_bg  rounded-[2.5rem] p-3 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 max-w-sm mx-auto">
      {/* --- Image Section --- */}
      <div className="relative  w-56 h-56  rounded-[2rem] overflow-hidden ">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1589135401662-8415d860d24c?auto=format&fit=crop&q=80&w=600"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Badges Layer */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-30">
          
          {heat > 0 && (
            <div className="flex items-center  backdrop-blur-md px-2 py-1 rounded-full shadow-sm w-fit">
              {[...Array(heat)].map((_, i) => (
                <Flame key={i} size={12} className="fill-red-500 text-red-500" />
              ))}
            </div>
          )}
        </div>

        {/* Floating Wishlist Button */}
        <div className="absolute top-4 right-4 z-30">
          <WishlistBtn isFavorite={isFavorite} onClick={handle_wishlist} />
        </div>

        {/* --- Hover Description Overlay --- */}
        <div className="absolute inset-0 bg-gray-300/30 backdrop-blur-[2px] flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center">
            <div className="/20 p-2 rounded-full w-fit mx-auto mb-3">
              <Eye className="text-white" size={20} />
            </div>
            <p className="text-sm font-medium leading-relaxed line-clamp-4">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-4 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-red-600">
              {category?.name}
            </span>
            <span className="text-sm font-black ">
              Rs. {price}
            </span>
          </div>
          <h3 className="text-lg font-bold  truncate leading-tight">
            {title}
          </h3>
        </div>

        {/* Quantity and Actions Container */}
        <div className="pt-2 flex flex-col gap-3">
          {/* Enhanced Quantity Controller */}
          <div className="flex items-center justify-between  p-1.5 rounded-2xl border border-gray-100">
            <button
              onClick={handleDec}
              disabled={itemQuantity <= 1}
              className={`p-2 rounded-xl transition-all ${itemQuantity <= 1
                ? " cursor-not-allowed"
                : " hover:cursor-pointer  shadow-sm hover:bg-red-700 hover:text-white"
                }`}
            >
              <Minus size={16} strokeWidth={3} />
            </button>

            <span className="font-black  tabular-nums">
              {itemQuantity < 10 ? `0${itemQuantity}` : itemQuantity}
            </span>

            <button
              onClick={handleInc}
              className="p-2 hover:cursor-pointer   rounded-xl shadow-sm hover:bg-red-700 hover:text-white transition-all"
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          </div>

          {/* Add to Cart Trigger */}
          <AddCart onClick={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProdCard;