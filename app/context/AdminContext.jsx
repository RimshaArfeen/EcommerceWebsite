

"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { DollarSign, ShoppingCart, Users } from "lucide-react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
     const [customersOrders, setCustomersOrders] = useState([]);

     useEffect(() => {
          const fetchOrders = async () => {
               try {
                    const res = await fetch("/api/admin/orders");

                    if (!res.ok) {
                         console.error("Admin orders failed:", await res.text());
                         return;
                    }

                    const data = await res.json();
                    setCustomersOrders(Array.isArray(data) ? data : []);
               } catch (error) {
                    console.error("Failed to fetch admin orders:", error);
               }
          };

          fetchOrders();
     }, []);
     useEffect(() => {
          console.log("Updated Customers Orders:", customersOrders);
     }, [customersOrders]);

     // ────────────────────────────────────────────
     // 👉 Admin KPIs / Metrics
     // ────────────────────────────────────────────
     const metrics = useMemo(() => {
          const safeOrders = Array.isArray(customersOrders) ? customersOrders : [];

          const totalSales = safeOrders.reduce(
               (sum, o) => sum + (o.totalPrice || 0),
               0
          );

          const today = new Date().toDateString();
          const ordersToday = safeOrders.filter(
               (o) => new Date(o.createdAt).toDateString() === today
          ).length;

          const uniqueCustomers = new Set(safeOrders.map((o) => o.userId)).size;

          return [
               {
                    id: "sales",
                    title: "Total Sales (30d)",
                    value: `$${totalSales.toLocaleString()}`,
                    icon: DollarSign,
                    statusColor: "text-green-600 bg-green-50",
               },
               {
                    id: "orders",
                    title: "Orders Today",
                    value: ordersToday.toString(),
                    icon: ShoppingCart,
                    statusColor: "text-gray-600 bg-gray-50",
               },
               {
                    id: "customers",
                    title: "New Customers",
                    value: uniqueCustomers.toString(),
                    icon: Users,
                    statusColor: "text-blue-600 bg-blue-50",
               },
          ];
     }, [customersOrders]);

     // ────────────────────────────────────────────
     // 👉 Top Selling Products (SKU Ranking)
     // ────────────────────────────────────────────
     const topSKUs = useMemo(() => {
          const safeOrders = Array.isArray(customersOrders) ? customersOrders : [];
          const revenueMap = {};

          safeOrders.forEach((order) => {
               (order.orderItems || []).forEach((item) => {
                    const p = item.product;
                    if (!p) return;

                    if (!revenueMap[p.id]) {
                         revenueMap[p.id] = {
                              name: p.title,
                              revenue: 0,
                              quantity: 0,
                         };
                    }

                    revenueMap[p.id].revenue += (p.price || 0) * (item.quantity || 0);
                    revenueMap[p.id].quantity += item.quantity || 0;
               });
          });

          const skuList = Object.values(revenueMap)
               .filter((item) => item.quantity > 1)
               .sort((a, b) => b.revenue - a.revenue)
               .map((item, index) => ({
                    rank: index + 1,
                    name: item.name,
                    quantity: item.quantity,
                    revenue: `$${item.revenue}`,
               }));

          console.log("Top SKUs:", skuList);

          return skuList;
     }, [customersOrders]);

     return (
          <AdminContext.Provider value={{ customersOrders, metrics, topSKUs }}>
               {children}
          </AdminContext.Provider>
     );
}

export function useAdmin() {
     return useContext(AdminContext);
}

