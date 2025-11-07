
"use client"
import React,{useState} from "react";
import "../../globals.css"
import { Heart , ShoppingBag} from "lucide-react";
export const ProdCard = ({ product }) => {
  const { id, title, price, imageUrl, isNew, isFavorite } = product;
const [itemQuantity, setItemQuantity] = useState(1)

  // Placeholder handler functions
  const handleAddToCart = () => {
    console.log(`Adding ${title} (ID: ${id}) to cart.`);
  };

  const handleToggleWishlist = () => {
    console.log(`Toggling wishlist for ${title}. Current state: ${isFavorite}`);
  };

  const handleInc = () => {
    setItemQuantity(itemQuantity+1)
  }
   const handleDec = () => {
     setItemQuantity(itemQuantity-1)
  }
  return (
   <div className="group relative border rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1">
  {/* Product Image Area */}
  <div className="relative aspect-w-1 aspect-h-1 h-48 w-full overflow-hidden">
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

    {/* New Badge */}
    {isNew && (
      <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold uppercase bg-gray-800 rounded-full">
        New
      </span>
    )}

    {/* Wishlist Icon */}
    <button
      onClick={handleToggleWishlist}
      className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-300 hover:cursor-pointer ${
        isFavorite
          ? "bg-red-500 text-white"
          : "bg-white text-gray-400 hover:text-red-500 shadow-lg"
      }`}
      aria-label="Add to wishlist"
    >
      <Heart
        className="w-5 h-5 hover:cursor-pointer"
        fill={isFavorite ? "currentColor" : "none"}
        strokeWidth={2}
      />
    </button>
  </div>

  {/* Product Details */}
  <div className="p-4 flex flex-col items-start">
    <h3 className="text-lg font-semibold text-gray-900 leading-tight truncate w-full mb-1">
      {title}
    </h3>

    <p className="text-xl font-bold text-red-600 mb-4">{price}</p>

    {/* Quantity Buttons */}
    <div className="flex items-center justify-between w-full mb-3">
      <button
      onClick={handleDec}
      value={itemQuantity}
        className={`
          ${itemQuantity <= 1 ?"bg-gray-200 to-black " : "bg-red-600 text-white"}
          px-3 py-1 text-lg font-bold rounded-md transition hover:cursor-pointer"
        aria-label="Decrease quantity`}
      >
        −
      </button>
      <span className="text-base font-semibold">{itemQuantity}</span>
      <button
      onClick={handleInc}
       value={itemQuantity}
        className="px-3 py-1 text-lg font-bold bg-red-600 rounded-md  transition hover:cursor-pointer"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>

    {/* Add to Cart Button */}
    <button
      onClick={handleAddToCart}
      className="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold bg-red-600 rounded-lg shadow-md
                 transition-all duration-300 hover:bg-red-700 active:scale-98 focus:outline-none focus:ring-4 focus:ring-red-300 hover:cursor-pointer"
      aria-label={`Add ${title} to cart`}
    >
      <ShoppingBag className="w-4 h-4 mr-2" />
      Add to Cart
    </button>
  </div>
</div>

  );
};
