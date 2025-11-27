"use client"
import React, { useState } from 'react'
import { CartItemCard, CartSummary } from '../Components/CartItemCard/CartItemCard';
import { useCart } from "@/app/context/CartContext";
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';


const page = () => {
     const { cartItems, removeFromCart, updateQty } = useCart();
     const isEmpty = cartItems.length === 0;
     console.log("Cart Items and Keys:", cartItems.map(item => ({ title: item.name, id: item._id })));
     const RemoveItemCart = (_id) => {
          removeFromCart(_id);
     }
     console.log(cartItems)


     return (
          <section className="py-12 md:py-20  font-sans min-h-screen">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8 md:mb-12">
                         Shopping Cart ({cartItems.length})
                    </h1>

                    {isEmpty ? (
                         <div className="text-center py-20 border border-dashed rounded-xl shadow-inner">
                              <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" />
                              <p className="text-xl font-semibold text-gray-700 mb-2">
                                   Your Cart is Empty
                              </p>
                              <p className="text-gray-500 mb-6">
                                   Time to spice things up! Add some heat to your cart.
                              </p>
                              <Link
                                   href="/allProds"
                                   className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-red-600 rounded-full shadow-md
                         hover:bg-red-700 transition-colors duration-300 active:scale-95"
                              >
                                   Start Shopping
                              </Link>
                         </div>
                    ) : (
                         /* Main Two-Column Layout (Cart Items on left, Summary on right) */
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                              {/* Left Column: Cart Items List */}
                              <div className="lg:col-span-2 border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                                   {cartItems.map((item, idx) => (
                                        <CartItemCard key={item._id || idx} item={item}
                                             onRemove={RemoveItemCart}
                                             onQtyChange={updateQty} />
                                   ))}
                              </div>

                              {/* Right Column: Order Summary */}
                              <div className="lg:col-span-1">
                                   <CartSummary items={[...cartItems]} />
                              </div>
                         </div>
                    )}

               </div>
          </section>
     );
}

export default page
