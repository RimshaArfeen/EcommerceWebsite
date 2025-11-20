// context/ProdContext.js (or wherever it is)

"use client";
import { createContext, useContext } from "react";

// Initialize with a meaningful default value (e.g., null)
// so consumers know the difference between uninitialized and empty data,
// but keep it [] for your current structure.
const ProdContext = createContext([]); 

export function FetchProducts({ items, children }) {
  // 💡 FIX: Initialize the context value directly with the 'items' prop.
  // This ensures the value is set correctly on the server render 
  // and retained during client hydration.
  return (
    <ProdContext.Provider value={items}> 
      {children}
    </ProdContext.Provider>
  );
}

// Renamed for clarity, but your original function name is fine.
export function useProducts() {
  return useContext(ProdContext);
}

// Export your original function name for compatibility:
export const fetch_food_items = useProducts;