
"use client";
import React from 'react'
import { CartSummary } from '../Components/CartItemCard/CartItemCard'
import { CartItemCard } from '../Components/CartItemCard/CartItemCard'
import { useCart } from '../context/CartContext';

const page = () => {
     const { cartItems } = useCart();
     const isEmpty = cartItems.length === 0
     console.log(cartItems)

     return (
          <div className="min-h-screen py-24">
               <div className="container mx-auto px-4 md:px-6 xl:px-8">

                    <h1 className="text-4xl font-extrabold mb-10 text-center">
                         Secure Checkout
                    </h1>

                    <div className="grid lg:grid-cols-5 gap-6 xl:gap-12">

                         <div className="lg:col-span-3 order-2 lg:order-1">

                              <section className="mb-10 p-6 border rounded-lg shadow-sm">
                                   <h2 className="text-3xl font-bold mb-6">1. Shipping Information</h2>
                                   <form className="space-y-4">
                                        <div>
                                             <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                                             <input type="text" id="fullName" className="w-full p-3 border rounded-lg focus:ring-2" placeholder="Rimsha Arfeen" />
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                             <div>
                                                  <label htmlFor="street" className="block text-sm font-medium mb-1">Street Address</label>
                                                  <input type="text" id="street" className="w-full p-3 border rounded-lg focus:ring-2" placeholder="1Gulistan-e-Johar" />
                                             </div>
                                             <div>
                                                  <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                                                  <input type="text" id="city" className="w-full p-3 border rounded-lg focus:ring-2" placeholder="Karachi" />
                                             </div>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                             <div>
                                                  <label htmlFor="state" className="block text-sm font-medium mb-1">State / Province</label>
                                                  <input type="text" id="state" className="w-full p-3 border rounded-lg focus:ring-2" placeholder="Sindh" />
                                             </div>
                                             <div>
                                                  <label htmlFor="zip" className="block text-sm font-medium mb-1">ZIP / Postal Code</label>
                                                  <input type="text" id="zip" className="w-full p-3 border rounded-lg focus:ring-2" placeholder="78701" />
                                             </div>
                                        </div>
                                        <div>
                                             <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                                             <input type="tel" id="phone" className="w-full p-3 border rounded-lg focus:ring-2" placeholder="(+92) 335-593145" />
                                        </div>
                                   </form>
                              </section>

                              <section className="mb-10 p-6 border rounded-lg shadow-sm">
                                   <h2 className="text-3xl font-bold mb-6">2. Payment Method</h2>
                                   <div className="flex space-x-3 mb-4">
                                        <span aria-hidden="true" className="text-2xl">💳</span>
                                        <span aria-hidden="true" className="text-2xl">🔒</span>
                                        <span className="text-sm font-medium self-center">All payments are secure and encrypted.</span>
                                   </div>
                                   <form className="space-y-4">
                                        <div>
                                             <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                                             <input type="text" id="cardNumber" className="w-full p-3 border rounded-lg focus:ring-2" placeholder="XXXX XXXX XXXX XXXX" />
                                        </div>
                                        <div className="grid sm:grid-cols-3 gap-4">
                                             <div className="sm:col-span-2">
                                                  <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiration Date (MM/YY)</label>
                                                  <input type="text" id="expiry" className="w-full p-3 border rounded-lg focus:ring-2" placeholder="MM/YY" />
                                             </div>
                                             <div>
                                                  <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                                                  <input type="text" id="cvc" className="w-full p-3 border rounded-lg focus:ring-2" placeholder="123" />
                                             </div>
                                        </div>
                                   </form>
                              </section>

                              <section className="mb-10 p-6 border rounded-lg shadow-sm">
                                   <h2 className="text-3xl font-bold mb-6">3. Review and Complete</h2>
                                   <p className="mb-6 text-lg">
                                        By clicking "Place Order," you agree to our Terms and Conditions.
                                   </p>

                                   <button type="submit" className="btn-cta w-full py-4 text-xl font-bold uppercase rounded-lg shadow-xl transition duration-300 hover:opacity-90">
                                        Place Order Now
                                   </button>
                              </section>

                         </div>

                         <div className="lg:col-span-2 order-1 lg:order-2">
                              {/* ADDED z-10 CLASS HERE */}
                              <div className="sticky top-6 p-6 border rounded-lg shadow-lg z-10">
                                   <h2 className="text-2xl font-bold mb-4">Your Fiery Order</h2>

                                   <CartSummary item={cartItems} />

                                   <div className="mt-6 space-y-3 max-h-60 overflow-y-auto pr-2">
                                        <h3 className="text-xl font-semibold mb-3">Items Included:</h3>
                                        {Array.isArray(cartItems) ? cartItems.map(item => (
                                             <CartItemCard key={item.id} item={item} />
                                        )) : null}
                                   </div>

                                   <p className="mt-6 text-center text-sm">
                                        🔥 Your transaction is 100% secure. 🔥
                                   </p>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default page
