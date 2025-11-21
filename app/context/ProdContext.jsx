// app/context/ProdContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProdContext = createContext();

export function ProdProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    load();
  }, []);

  return <ProdContext.Provider value={products}>{children}</ProdContext.Provider>;
}

export function useProducts() {
  return useContext(ProdContext);
}
