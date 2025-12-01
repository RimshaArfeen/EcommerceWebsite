
//components/prodCard
"use client"
import React, { useState, useEffect } from "react";
import "../../globals.css"
import { Heart, ShoppingBag } from "lucide-react";
import AddCart from "../AddCart/page"
import { useCart } from "@/app/context/CartContext";
import WishlistBtn from "../WishlistBtn";
import { useWishlist } from "@/app/context/LikeContext";

export const ProdCard = ({ product }) => {
  const [itemQuantity, setItemQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false);

  const { addToCart, cartItems } = useCart()
  const { addToWishlist, likedItems } = useWishlist()

  const { _id, title, price, imageUrl, isNew, category } = product;

  // Placeholder handler functions
  const handleAddToCart = () => {
    const normalized = {
      ...product,
      _id:
        product._id ??
        product.id ??
        product.slug ??
        product.title
    };

    addToCart(normalized, itemQuantity);
  };

  const handle_wishlist = (params) => {
    addToWishlist(product, itemQuantity)
    setIsFavorite(!isFavorite);
  }

  useEffect(() => {
    console.log("Cart Updated:", cartItems);
    console.log("WishlIst Updated ", likedItems)
  }, [cartItems]);

  const handleInc = () => {
    setItemQuantity(itemQuantity + 1)
  }
  const handleDec = () => {
    setItemQuantity(itemQuantity - 1)
  }


  return (
    // Assume the component receives a 'category' prop (string) along with existing props
    <div
      className="group relative border rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Product Image Area */}
      <div className="relative aspect-w-1 aspect-h-1 h-52 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-all hover:scale-105 duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/400x400/e2e8f0/334155?text=Spicy+Item";
          }}
          loading="lazy"
        />

        {/* New Badge (Existing) */}
        {isNew && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold uppercase text-white bg-red-600 rounded-full z-10">
            New
          </span>
        )
        }

        {/* Wishlist Icon (Existing) */}
        <WishlistBtn onClick={handle_wishlist}
          isFavorite={isFavorite} />
      </div >

      {/* Product Details */}
      < div className="p-4 flex flex-col items-start" >
        {/* NEW: Category Badge */}
        < span className="inline-block px-2 py-0.5 mb-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full transition-colors duration-200 hover:bg-gray-200" >
          {product.category?.name}
        </span >

        <h3 className="text-lg font-semibold text-gray-900 leading-tight truncate w-full mb-1" >
          {title}
        </h3 >

        <p className="text-xl font-bold text-red-600 mb-4" > Rs. {price}</p >

        {/* Quantity Buttons */}
        < div className="flex items-center justify-between w-full mb-3" >
          <button
            onClick={handleDec}
            value={itemQuantity}
            className={`
          ${itemQuantity <= 1 ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-red-600 text-white"}
          px-3 py-1 text-lg font-bold rounded-md transition hover:bg-red-700 active:scale-95"
        aria-label="Decrease quantity`}
            disabled={itemQuantity <= 1}
          >
            −
          </button>
          <span className="text-base font-semibold" > {itemQuantity}</span >
          <button
            onClick={handleInc}
            value={itemQuantity}
            className="px-3 py-1 text-lg font-bold text-white bg-red-600 rounded-md transition hover:bg-red-700 active:scale-95"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div >

        {/* Add to Cart Button */}
        < AddCart
          // onClick={() =>
          //   handleAddToCart({
          //     ...product,
          //     id: product.id || product._id || product.name,  // unique
          //   })
          // }
          onClick={handleAddToCart} />

      </div >
    </div >

  );
};
