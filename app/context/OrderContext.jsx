"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
     const [orders, setOrders] = useState([]);
     const { data: session } = useSession();

      useEffect(() => {
        const fetchOrders = async () => {
          try {
            const res = await fetch('/api/orders?userId=someUserId');
            const data = await res.json();
            // Assuming data is an array of objects
            setOrders(data || []);
          } catch (err) {
            console.error("Error fetching orders:", err);
          }
        };
        fetchOrders();
      }, [session]);
      
     return (
          <OrderContext.Provider value={{ orders }}>
               {children}
          </OrderContext.Provider>
     );
}

export function useOrders() {
     return useContext(OrderContext);
}


