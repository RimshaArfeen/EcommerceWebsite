
//app/Components/CartItemCard/CartItemCard.jsx
"use client";
import React, {useState , useEffect} from 'react'
import { Minus, Plus , Trash2, ArrowRight , } from 'lucide-react';
import Link from 'next/link';
import "../../globals.css";

//CartItemCard
export const CartItemCard = ({ item, onRemove, onQtyChange }) => {
  const { _id, title, price, imageUrl, qty } = item;

  const handleUpdateQuantity = (newQty) => {
    if (newQty < 1) return;
    onQtyChange(_id, newQty);
  };

  const itemSubtotal = (price * qty).toFixed(2);

  return (
   <div className="flex items-start py-4 border-b last:border-b-0 transition-colors duration-200 hover:shadow-sm px-4">
  
  {/* 1. Image Area */}
  <img 
    src={imageUrl} 
    alt={title}
    className="w-24 h-24 object-cover rounded-lg border mr-4" 
  />

  {/* 2. Content & Quantity (Flexible Grow Area) */}
  <div className="flex-grow min-w-0 pr-4"> 
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <h5 className="text-md  mb-2">Rs {price} each</h5>
    {/* Quantity Controls */}
    <div className="flex items-center space-x-3"> 
      <button 
        onClick={() => handleUpdateQuantity(qty - 1)}
        className="px-2 py-1  border rounded-md  hover:bg-gray-600/10 hover:cursor-pointer transition" 
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-6 text-center font-medium">{qty}</span>
      <button 
        onClick={() => handleUpdateQuantity(qty + 1)}
        className="px-2 py-1 border rounded-md  hover:bg-gray-600/10 hover:cursor-pointer transition" 
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  </div>

  {/* 3. Price & Remove Button (Aligned Right/End) */}
  <div className="flex flex-col items-end justify-between h-24">
    <p className="text-xl font-bold text-red-600">Total: Rs {itemSubtotal}</p>
    
    <button 
      className='p-2 rounded-full text-gray-400 hover:text-red-600 transition-colors'
      onClick={() => onRemove(_id)}
      aria-label={`Remove ${title} from cart`}
    >
      {/* Changed styling on Trash2 to ensure the icon itself is not the background color */}
      <Trash2 className="w-5 h-5" /> 
    </button>
  </div>
</div>
  );
};

//CartSummary
export const CartSummary = ({ items, onTotalChange }) => {
  const subtotal = Array.isArray(items)
    ? items.reduce((sum, item) => sum + item.price * item.qty, 0)
    : 0;

  const shipping = subtotal > 999 ? 0 : 200;
  const total = subtotal + shipping;

  // Send total to parent (but avoid infinite loops)
  useEffect(() => {
    if (onTotalChange) onTotalChange(total);
  }, [total]);

  return (
    <div className="primary_bg  sticky top-20  p-6 rounded-xl shadow-lg  ">
      <h2 className="text-2xl font-bold   mb-4 border-b pb-3">Order Summary</h2>

      {/* Price Details */}
      <div className="space-y-3  ">
        <div className="flex justify-between text-lg">
          <span>Subtotal ({Array.isArray(items) ? items.length : 0} items)</span>
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



