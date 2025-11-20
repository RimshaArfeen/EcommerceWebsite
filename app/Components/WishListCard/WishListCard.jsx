
"use client"
import React from 'react';
import { Trash2, ShoppingBag, Heart, AlertTriangle } from 'lucide-react';



const WishListCard = ({ item, onRemove, onAddToCart }) => {
  const { id, title, price, imageUrl, stockStatus, isInStock } = item;

  return (
    <div className="flex items-center p-4 sm:p-6  transition-colors duration-200">
      
      {/* 1. Item Image (Fixed Size) */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-20 h-20 object-cover rounded-lg border "
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/e2e8f0/334155?text=Item"; }}
          loading="lazy"
        />
      </div>

      {/* 2. Item Details (Title, Price, Stock) */}
      <div className="flex-grow min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
          {title}
        </h3>
        
        <p className="text-xl font-bold text-red-600 mb-2">
          ${price.toFixed(2)}
        </p>

        {/* Stock Status Indicator (Crucial UX) */}
        <div className={`flex items-center text-sm font-medium ${
          isInStock ? 'text-green-600' : 'text-yellow-600'
        }`}>
          {!isInStock && <AlertTriangle className="w-4 h-4 mr-1" />}
          {stockStatus}
        </div>
      </div>
      
      {/* 3. Actions (Desktop: Side-by-Side) */}
      <div className="ml-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 items-center flex-shrink-0">
        
        {/* Primary Action: Add to Cart Button (Cart Icon/Button) */}
        <button
          onClick={() => onAddToCart(id)}
          disabled={!isInStock}
          className={`flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-all duration-300 w-full sm:w-auto ${
            isInStock
              ? 'text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 active:scale-98'
              : 'text-gray-500 bg-gray-200 cursor-not-allowed'
          }`}
          aria-label={`Add ${title} to cart`}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </button>

        {/* Secondary Action: Remove Button (Delete Icon) */}
        <button
          onClick={() => onRemove(id)}
          className="p-3 text-gray-400 rounded-full hover:bg-gray-100 hover:text-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label={`Remove ${title} from wishlist`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WishListCard
