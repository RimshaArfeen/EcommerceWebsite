
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Normalize product so each one ALWAYS has _id
  // const normalizeProduct = (product) => ({
  //   ...product,
  //   _id:
  //     product._id ??
  //     product.id ??
  //     product.slug ??
  //     product.title // fallback to name/title if needed
  // });
  const normalizeProduct = (product) => {
  if (!product._id) {
    throw new Error(
      "Product _id is missing. Cannot add to cart without a valid ObjectId."
    );
  }
  return { ...product, _id: product._id };
};


  // Add to cart
  const addToCart = (product, qty = 1) => {
    const normalized = normalizeProduct(product);

    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === normalized._id);

      if (exists) {
        return prev.map((item) =>
          item._id === normalized._id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      return [...prev, { ...normalized, qty }];
    });
  };

  const removeFromCart = (_id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  const updateQty = (_id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, qty: newQty } : item
      )
    );
  };
const clearCart = () => setCartItems([]);

  // Load cart
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty , clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);