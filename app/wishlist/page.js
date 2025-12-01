"use client";
import React, { useEffect } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import WishListCard from "../Components/WishListCard/WishListCard";
import { useWishlist } from "../context/LikeContext";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

const Page = () => {
  const { likedItems, removeFromWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart()

  const handleAddToCart = (item) => {
    addToCart(item, 1);

    removeFromWishlist(item.id);

  };

  useEffect(() => {
    console.log("Cart Updated:", cartItems);
    console.log("WishlIst Updated ", likedItems)
  }, [cartItems]);


  const isEmpty = likedItems.length === 0;

  return (
    <section className="py-12 md:py-20 min-h-screen font-sans">
      < div className="max-w-4xl mx-auto px-6" >

        <div className="flex justify-between items-end mb-10 border-b pb-4" >
          <h1 className="text-3xl font-extrabold" >
            Your Wishlist({likedItems.length})
          </h1 >
        </div >

        {
          isEmpty ? (
            <div className="text-center py-20 border border-dashed rounded-xl shadow-inner" >
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <p className="text-xl font-semibold mb-2" >
                Your Wishlist is Empty
              </p >
              <p className="mb-6" > Start adding items!</p >

              <Link
                href="/"
                className="inline-flex px-6 py-3 rounded-full shadow-md"
              >
                Start Shopping
              </Link>
            </div >
          ) : (
            <div className="border rounded-xl shadow-lg overflow-hidden">
              {
                likedItems.map((item) => (
                  <WishListCard
                    key={item.id}
                    item={item}
                    onRemove={() => removeFromWishlist(item.id)}
                    onAddToCart={() => handleAddToCart(item)}
                  />
                ))
              }
            </div >
          )}
      </div >
    </section >
  );
};

export default Page;
