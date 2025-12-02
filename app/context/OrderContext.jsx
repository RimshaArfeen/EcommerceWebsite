"use client";

import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", { credentials: "include" });

        if (!res.ok) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const data = await res.json();

        // API returns array directly
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
