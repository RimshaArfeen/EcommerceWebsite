
//app/checkout/page.js
"use client";

import React, { useState } from "react";
import { CartSummary } from "../Components/CartItemCard/CartItemCard";
import { CartItemCard } from "../Components/CartItemCard/CartItemCard";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { createInvoice } from "../checkout/actions";


const Page = () => {
  const { cartItems, updateQty, removeFromCart, clearCart } = useCart();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const isEmpty = cartItems.length === 0;

  const handleClick = async (e) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    alert("Order Placed Successfully!");
    clearCart();
  };

  if (isEmpty) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-24  text-center">
        < h1 className="text-4xl font-extrabold mb-6" > Your Cart is Empty</h1 >
        <Link href="/allProds/desi-tarka" className="btn-cta w-full sm:w-2/3 lg:w-1/3 py-4 text-xl font-bold uppercase rounded-lg shadow-xl">Go Shopping</Link>
      </div >
    );
  }

  return (
    <div className="min-h-screen py-24">
      < div className="container mx-auto px-4 md:px-6 xl:px-8" >
        <h1 className="text-4xl font-extrabold mb-10 text-center" >
          Secure Checkout
        </h1 >

        <div className="grid lg:grid-cols-5 gap-6 xl:gap-12" >
          {/* LEFT SIDE */}
          < div className="lg:col-span-3 order-2 lg:order-1" >
            {/* Shipping Info */}
            < section className="mb-10 p-6 border rounded-lg shadow-sm" >
              <h2 className="text-3xl font-bold mb-6" > 1. Shipping Information</h2 >

              {/* FORM START */}
              < form action={createInvoice} className="space-y-4" >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="w-full p-3 border rounded-lg focus:ring-2"
                    placeholder="Rimsha Arfeen"
                    required
                  />
                </div >

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 border rounded-lg focus:ring-2"
                    placeholder="you@example.com"
                    required
                  />
                </div >

                <div className="grid sm:grid-cols-2 gap-4" >
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="line1"
                      className="w-full p-3 border rounded-lg focus:ring-2"
                      placeholder="Gulistan-e-Johar block-20"
                      required
                    />
                  </div >
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      className="w-full p-3 border rounded-lg focus:ring-2"
                      placeholder="Karachi"
                      required
                    />
                  </div >
                </div >

                <div className="grid sm:grid-cols-2 gap-4" >
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="w-full p-3 border rounded-lg focus:ring-2"
                      placeholder="Sindh"
                      required
                    />
                  </div >
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      className="w-full p-3 border rounded-lg focus:ring-2"
                      placeholder="78701"
                      required
                    />
                  </div >
                </div >

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-3 border rounded-lg focus:ring-2"
                    placeholder="(+92) 335-593145"
                    required
                  />
                </div >
                <input type="hidden" name="cartItems" value={JSON.stringify(cartItems)} />
                <input type="hidden" name="total" value={total} />

                {/* Payment */}
                <section className="mt-10 p-6 border rounded-lg shadow-sm">
                  <h2 className="text-3xl font-bold mb-6">2. Payment Method</h2 >

                  <div className="primary_bg  p-4 rounded-lg flex items-start space-x-4" >
                    <input
                      type="radio"
                      name="payment-method"
                      value="cod"
                      defaultChecked
                      className="mt-1 h-5 w-5"
                    />
                    <div className="flex-1" >
                      <label className="text-lg font-semibold" >
                        Cash On Delivery(COD)
                      </label >
                      <p className="text-sm text-gray-600 mt-1" >
                        Pay when the delivery agent arrives.
                      </p >
                    </div >
                    <span className="text-3xl self-center" >💵</span >
                  </div >
                </section >

                {/* Review */}
                < section className="p-6 border rounded-lg shadow-sm" >
                  <h2 className="text-3xl font-bold mb-6" > 3. Review & Complete</h2 >
                  <p className="mb-6 text-lg" >
                    By clicking{" "}
                    <span className="font-semibold">Place Order</span >, you agree
                    to our{" "}
                    <Link
                      href="/terms_conditions"
                      className="hover:underline"
                    >
                      Terms and Conditions
                    </Link>
                  </p >

                  {/* SUBMIT BUTTON – MUST BE INSIDE FORM */}
                  < button
                    type="submit"
                    className="btn-cta w-full py-4 text-xl font-bold uppercase rounded-lg shadow-xl hover:opacity-90 flex items-center justify-center"
                    disabled={loading}
                  >
                    {
                      loading ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                      ) : null}
                    {loading ? "Processing..." : "Place Order Now"}
                  </button >
                </section >
              </form >
              {/* FORM END */}
            </section >
          </div >

          {/* RIGHT SIDE */}
          < div className="lg:col-span-2 order-1 lg:order-2" >
            <div className="sticky top-6 p-6 border rounded-lg shadow-lg" >
              <h2 className="text-2xl font-bold mb-4" > Your Fiery Order</h2 >

              <CartSummary items={cartItems} onTotalChange={setTotal} />

              <div className="mt-6 space-y-3 max-h-60 overflow-y-auto pr-2" >
                <h3 className="text-xl font-semibold mb-3" > Items Included:</h3 >

                {
                  cartItems.map((item) => (
                    <CartItemCard
                      key={item._id}
                      item={item}
                      onRemove={removeFromCart}
                      onQtyChange={updateQty}
                    />
                  ))
                }
              </div >

              <p className="mt-6 text-center text-sm" >
                🔥 Your transaction is 100 % secure. 🔥
              </p >
            </div >
          </div >
        </div >
      </div >
    </div >
  );
};

export default Page;
