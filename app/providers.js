"use client";
import { ProdProvider } from "./context/ProdContext";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartContext";
import { WishListProvider } from "./context/LikeContext";   


export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ProdProvider>
        <CartProvider>
          <WishListProvider>
            {children}
          </WishListProvider>
        </CartProvider>
      </ProdProvider>
    </SessionProvider>
  );
}
