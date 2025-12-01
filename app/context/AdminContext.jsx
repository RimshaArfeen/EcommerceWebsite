

"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useOrders } from "./OrderContext";
import { DollarSign, ShoppingCart, Users } from "lucide-react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
     const { orders } = useOrders();

     const metrics = useMemo(() => {
          const safeOrders = Array.isArray(orders) ? orders : [];
          const totalSales = safeOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
          const today = new Date().toDateString();
          const ordersToday = safeOrders.filter(o => new Date(o.createdAt).toDateString() === today).length;
          const uniqueCustomers = new Set(safeOrders.map(o => o.userId)).size;

          return [
               { id: "sales", title: "Total Sales (30d)", value: `$${totalSales.toLocaleString()}`, icon: DollarSign, statusColor: "text-green-600 bg-green-50" },
               { id: "orders", title: "Orders Today", value: ordersToday.toString(), icon: ShoppingCart, statusColor: "text-gray-600 bg-gray-50" },
               { id: "customers", title: "New Customers", value: uniqueCustomers.toString(), icon: Users, statusColor: "text-blue-600 bg-blue-50" },
          ];
     }, [orders]);

     const topSKUs = useMemo(() => {
          const safeOrders = Array.isArray(orders) ? orders : [];
          const revenueMap = {};

          safeOrders.forEach(order => {
               (order.orderItems || []).forEach(item => {
                    const p = item.product;
                    if (!p) return;
                    if (!revenueMap[p.id]) revenueMap[p.id] = { name: p.title, revenue: 0 };
                    revenueMap[p.id].revenue += (p.price || 0) * (item.quantity || 0);
               });
          });

          return Object.values(revenueMap)
               .sort((a, b) => b.revenue - a.revenue)
               .map((item, index) => ({ rank: index + 1, name: item.name, revenue: `$${item.revenue}` }));
     }, [orders]);

     return <AdminContext.Provider value={{ orders, metrics, topSKUs }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
     return useContext(AdminContext);
}
