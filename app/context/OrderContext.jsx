"use client";

import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // 1. Get user session from custom endpoint
        const sessionRes = await fetch("/api/auth/session", {
          credentials: "include",
        });

        const session = await sessionRes.json();

        // If user is not logged in → no orders
        if (!session?.user?.id) {
          setOrders([]);
          setLoading(false);
          return;
        }

        // 2. Fetch orders using the userId
        const res = await fetch(
          `/api/orders?userId=${session.user.id}`,
          { credentials: "include" }
        );

        const data = await res.json();

        // Ensure data is an array before setting
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading orders:", error);
        setOrders([]);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, loading }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
