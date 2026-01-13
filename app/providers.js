"use client";
import { ProdProvider } from "./context/ProdContext";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartContext";
import { WishListProvider } from "./context/LikeContext";
import { OrderProvider } from "./context/OrderContext";
import { AdminProvider } from "./context/AdminContext";
import { CustomerProvider } from "./context/CustomerContext";
import { UserProvider } from "./context/UsersContext";
import RouteSpinner from "./Components/RouteSpinner";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ProdProvider>
        <CartProvider>
          <WishListProvider>
            <OrderProvider>
              <AdminProvider>
                <UserProvider>
                  <CustomerProvider>
                    <RouteSpinner />
                    {children}
                  </CustomerProvider>
                </UserProvider>
              </AdminProvider>
            </OrderProvider>
          </WishListProvider>
        </CartProvider>

      </ProdProvider>
    </SessionProvider>
  );
}
