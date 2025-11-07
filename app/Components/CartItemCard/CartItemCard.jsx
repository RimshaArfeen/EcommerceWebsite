
import React from 'react'
import { Minus, Plus , Trash2, ArrowRight , } from 'lucide-react';
import Link from 'next/link';


//CartItemCard
export const CartItemCard = ({ item }) => {
  const { id, title, price, imageUrl, quantity } = item;
  const itemSubtotal = (price * quantity).toFixed(2);

  // Placeholder actions for UI interaction (no real function logic)
  const handleUpdateQuantity = (newQty) => console.log(`Updating ${title} to ${newQty}`);
  const handleRemove = () => console.log(`Removing ${title}`);

  return (
    <div className="flex items-start p-4 border-b transition-colors duration-200">
      
      {/* 1. Image */}
      <div className=" mr-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-24 h-24 object-cover rounded-lg border "
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/e2e8f0/334155?text=Item"; }}
          loading="lazy"
        />
      </div>

      {/* 2. Details and Quantity */}
      <div className="flex-grow min-w-0 pr-4">
        <h3 className="text-lg font-semibold   mb-1 leading-snug">
          {title}
        </h3>
        
        <p className="text-sm   mb-2">
          Unit Price: <span className="font-medium  ">${price.toFixed(2)}</span>
        </p>

        {/* Quantity Selector UI */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleUpdateQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className="p-1 border  rounded-md    transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium  ">
            {quantity}
          </span>
          <button
            onClick={() => handleUpdateQuantity(quantity + 1)}
            className="p-1 border  rounded-md    transition-colors hover:cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* 3. Subtotal and Remove Action */}
      <div className="flex flex-col items-end justify-between h-24">
        <p className="text-xl font-bold text-red-600">
          ${itemSubtotal}
        </p>

        {/* Delete Icon */}
        <button
          onClick={handleRemove}
          className="p-2   rounded-full hover:opacity-90 hover:text-red-600 transition-colors duration-300 hover:cursor-pointer"
          aria-label={`Remove ${title} from cart`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

//CartSummary
export const CartSummary = ({ items }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0.00 : 7.99; // Mock free shipping logic for UI display
  const total = subtotal + shipping;

  return (
    <div className="sticky top-20  p-6 rounded-xl shadow-lg border ">
      <h2 className="text-2xl font-bold   mb-4 border-b pb-3">Order Summary</h2>

      {/* Price Details */}
      <div className="space-y-3  ">
        <div className="flex justify-between text-lg">
          <span>Subtotal ({items.length} items)</span>
          <span className="font-medium  ">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping Estimate</span>
          <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ' '}`}>
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between pt-4 border-t ">
          <span className="text-xl font-bold">Order Total</span>
          <span className="text-2xl font-extrabold text-red-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
      href="/checkout"
        onClick={() => console.log("Proceeding to Checkout UI")}
        className="mt-6 w-full flex items-center justify-center px-6 py-3 text-lg font-bold text-white bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md
                   transition-all duration-300  focus:outline-none focus:ring-4 focus:ring-gray-300 active:scale-98 hover:cursor-pointer "
        aria-label="Proceed to Checkout"
      >
        Proceed to Checkout
        <ArrowRight className="w-5 h-5 ml-2" />
      </Link>
      
      <p className="text-center text-xs   mt-4">
        Shipping calculated at checkout.
      </p>
    </div>
  );
};



