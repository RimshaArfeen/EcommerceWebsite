
"use client"
import React, {useState} from 'react'
import { Trash2, ShoppingBag, Heart, AlertTriangle } from 'lucide-react';
import WishListCard from '../Components/WishListCard/WishListCard';

// --- Mock Data ---
const mockWishlistItems = [
  {
    id: 'w1',
    title: 'Ghost Pepper Powder XL',
    price: 18.99,
    imageUrl: 'https://placehold.co/100x100/fee2e2/374151?text=Powder',
    stockStatus: 'In Stock',
    isInStock: true,
  },
  {
    id: 'w2',
    title: 'Habanero Infused Oil Trio',
    price: 32.50,
    imageUrl: 'https://placehold.co/100x100/fca5a5/374151?text=Oil',
    stockStatus: 'Out of Stock',
    isInStock: false,
  },
  {
    id: 'w3',
    title: 'Artisan Chili Flakes Gift Set',
    price: 24.99,
    imageUrl: 'https://placehold.co/100x100/f87171/374151?text=Flakes',
    stockStatus: 'Low Stock (5)',
    isInStock: true,
  },
]

const page = () => {
  const [wishlist, setWishlist] = React.useState(mockWishlistItems);

  const handleRemove = (id) => {
    console.log(`Removing item ${id} from wishlist.`);
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const handleAddToCart = (id) => {
    console.log(`Adding item ${id} to cart and removing from wishlist.`);
    // In a real app, this would trigger a global cart update and then a wishlist update.
    handleRemove(id);
  };

  const handleMoveAllToCart = () => {
    const itemsInStock = wishlist.filter(item => item.isInStock);
    if (itemsInStock.length === 0) {
      console.log("No items in stock to move to cart.");
      return;
    }
    console.log(`Moving ${itemsInStock.length} items to cart.`);
    // Implement cart logic for all items
    setWishlist(wishlist.filter(item => !item.isInStock)); // Remove only in-stock items
  };

  const isEmpty = wishlist.length === 0;

  return (
    <section className="py-12 md:py-20  font-sans min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex justify-between items-end mb-8 md:mb-10 border-b border-gray-300 pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Your Wishlist ({wishlist.length})
          </h1>
          
          {/* Main CTA: Move All to Cart */}
          {!isEmpty && (
            <button
              onClick={handleMoveAllToCart}
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm
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
          <div className="text-center py-20 border border-dashed border-gray-300 rounded-xl bg-white shadow-inner">
            <Heart className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" />
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Your Wishlist is Empty
            </p>
            <p className="text-gray-500 mb-6">
              Start adding your favorite spicy items to save them for later!
            </p>
            <button
              onClick={() => console.log("Navigate to All Products")}
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white 0 rounded-full shadow-md
                         hover 0 transition-colors duration-300 active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Wishlist List */
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
            {wishlist.map((item) => (
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
