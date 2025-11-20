
"use client"
import React, { useState } from 'react'
import { Trash2, ShoppingBag, Heart, AlertTriangle } from 'lucide-react';
import WishListCard from '../Components/WishListCard/WishListCard';
import { useWishlist } from '../context/LikeContext';


const page = () => {
  const { likedItems } = useWishlist()
  const handleRemove = (id) => {
    console.log(`Removing item ${id} from wishlist.`);
  };

  const handleAddToCart = (id) => {
    console.log(`Adding item ${id} to cart and removing from wishlist.`);
    // In a real app, this would trigger a global cart update and then a wishlist update.
    handleRemove(id);
  };

  // const handleMoveAllToCart = () => {
  //   const itemsInStock = wishlist.filter(item => item.isInStock);
  //   if (itemsInStock.length === 0) {
  //     console.log("No items in stock to move to cart.");
  //     return;
  //   }
  //   console.log(`Moving ${itemsInStock.length} items to cart.`);
  //   // Implement cart logic for all items
  //   setWishlist(wishlist.filter(item => !item.isInStock)); // Remove only in-stock items
  // };

  const isEmpty = likedItems.length === 0;

  return (
    <section className="py-12 md:py-20  font-sans min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="flex justify-between items-end mb-8 md:mb-10 border-b  pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Your Wishlist ({likedItems && likedItems.length > 0 ? likedItems.length : 0})          </h1>

          {/* Main CTA: Move All to Cart */}
          {!isEmpty && (
            <button
              onClick={handleMoveAllToCart}
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700  border  rounded-lg shadow-sm
                         transition-colors duration-300 hover 0 active:scale-98 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Move all in-stock items to cart"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Move All to Cart
            </button>
          )}
        </div>

        {/* --- Content Area --- */}

        {isEmpty ? (
          /* Empty State */
          <div className="text-center py-20 border border-dashed  rounded-xl  shadow-inner">
            <Heart className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" />
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Your Wishlist is Empty
            </p>
            <p className="text-gray-500 mb-6">
              Start adding your favorite spicy items to save them for later!
            </p>
            <button
              className="inline-flex items-center px-6 py-3 text-sm font-semibold bg-[#FFB300] text-red-700 rounded-full shadow-md
                         hover 0 transition-colors duration-300 active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Wishlist List */
          <div className="border  rounded-xl overflow-hidden shadow-lg">
            {likedItems.map((item) => (
              <WishListCard
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};


export default page
