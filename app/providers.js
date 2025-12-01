"use client";
import { ProdProvider } from "./context/ProdContext";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartContext";
import { WishListProvider } from "./context/LikeContext";   
import { OrderProvider } from "./context/OrderContext";
import { AdminProvider } from "./context/AdminContext";
export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ProdProvider>
        <CartProvider>
          <WishListProvider>
            <OrderProvider>
              <AdminProvider>
                {children}
              </AdminProvider>
            </OrderProvider>
          </WishListProvider>
        </CartProvider>
      </ProdProvider>
    </SessionProvider>
  );
}
