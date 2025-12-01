"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { DollarSign, ShoppingCart, Users } from "lucide-react";


const AdminContext = createContext();

export function AdminProvider({ children }) {
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

      const metrics = useMemo(() => {
          const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
          const today = new Date().toDateString();
          const ordersToday = orders.filter(order => new Date(order.createdAt).toDateString() === today).length;
          const uniqueCustomers = new Set(orders.map(order => order.userId)).size;

          return [
               {
                    id: 'sales',
                    title: 'Total Sales (30d)',
                    value: `$${totalSales.toLocaleString()}`,
                    icon: DollarSign,
                    statusColor: 'text-green-600 bg-green-50',
               },
               {
                    id: 'orders',
                    title: 'Orders Today',
                    value: ordersToday.toString(),
                    icon: ShoppingCart,
                    statusColor: 'text-gray-600 bg-gray-50',
               },
               {
                    id: 'customers',
                    title: 'New Customers',
                    value: uniqueCustomers.toString(),
                    icon: Users,
                    statusColor: 'text-blue-600 bg-blue-50',
               },
          ];
     }, [orders]);

     const topSKUs = useMemo(() => {
          const revenueMap = {};
          for (const order of orders) {
               for (const item of order.orderItems) {
                    const p = item.product;

                    if (!revenueMap[p.id]) {
                         revenueMap[p.id] = { name: p.title, revenue: 0 };
                    }

                    revenueMap[p.id].revenue += p.price * item.quantity;
               }
          }

          return Object.values(revenueMap)
               .sort((a, b) => b.revenue - a.revenue)
               .map((item, index) => ({
                    rank: index + 1,
                    name: item.name,
                    revenue: `$${item.revenue}`,
               }));
     }

          , [orders])

     return (
          <AdminContext.Provider value={{ orders , metrics , topSKUs}}>
               {children}
          </AdminContext.Provider>
     );
}


export function useAdmin() {
     return useContext(AdminContext);
}

