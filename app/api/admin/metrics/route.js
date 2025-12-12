
// app/api/admin/metrics/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
     try {
          const now = new Date();

          // Today at 00:00
          const startOfToday = new Date(
               now.getFullYear(),
               now.getMonth(),
               now.getDate()
          );

          // 30 days ago
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

          // --- METRICS ---

          // Total Orders
          const totalOrders = await prisma.order.count();

          // Total Sales (last 30 days)
          const salesLast30Days = await prisma.order.aggregate({
               _sum: { totalPrice: true },
               where: {
                    createdAt: { gte: thirtyDaysAgo },
                    status: "DELIVERED"
               }
          });

          // Orders Today
          const ordersToday = await prisma.order.count({
               where: { createdAt: { gte: startOfToday } }
          });

          // New Customers (last 30 days)
          const newCustomers = await prisma.user.count({
               where: { createdAt: { gte: thirtyDaysAgo } }
          });

          // Pending Shipments
          const pendingShipments = await prisma.order.count({
               where: {
                    status: "PENDING"
               }
          });

          // Total Products
          const totalProducts = await prisma.product.count();

          // Low Stock Products (stock <= 5)
          const lowStockCount = await prisma.product.count({
               where: {
                    stock: { lte: 5 },
                    isDeleted: false
               }
          });

          // --- BUILD RESPONSE ---
          const metrics = {
               totalOrders,
               totalSalesLast30Days: salesLast30Days._sum.totalPrice || 0,
               ordersToday,
               newCustomersLast30Days: newCustomers,
               pendingShipments,
               totalProducts,
               lowStockCount
          };

          return NextResponse.json(metrics, { status: 200 });

     } catch (error) {
          console.log("Error while fetching Metrics:", error);
          return NextResponse.json({ error: "Server Error" }, { status: 500 });
     }
}
