
"use client"
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
const [total_items, setTotal_items] = useState(0)

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  // Calculate total whenever cart changes
 
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setTotal_items(cartItems.length);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, total_items }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
