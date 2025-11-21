// context/ProdContext.js (or wherever it is)

"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ProdContext = createContext([]);

export function ProdProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setItems(data || []);
      } catch (err) {
        console.error("Product Fetch Error:", err);
        setItems([]);
      }
    }

    loadProducts();
  }, []);

  return (
    <ProdContext.Provider value={items}>
      {children}
    </ProdContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProdContext);
}

// Renamed for clarity, but your original function name is fine.
export function useProducts() {
  return useContext(ProdContext);
}

// Export your original function name for compatibility:
export const fetch_food_items = useProducts;