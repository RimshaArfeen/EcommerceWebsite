
// app/api/orders/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper function to get user session from cookie
async function getSession(req) {
     const sessionRes = await fetch(`${process.env.BASE_URL}/api/auth/session`, {
          headers: {
               cookie: req.headers.get("cookie") || "",
          },
     });
     if (!sessionRes.ok) return null;
     const session = await sessionRes.json();
     return session?.user || null;
}

export async function GET(request) {
     try {
          // 1. Get the logged-in user from session
          const user = await getSession(request);
          if (!user?.id) {
               return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
          }

          // 2. Fetch orders for this user
          const orders = await prisma.order.findMany({
               where: { userId: user.id }, // Prisma handles ObjectId internally
               include: {
                    orderItems: { include: { product: true } },
                    address: true,
               },
               orderBy: { createdAt: "desc" },
          });

          return NextResponse.json(orders || []);
     } catch (error) {
          console.error("Orders API Error:", error);
          return NextResponse.json({ error: "Server error" }, { status: 500 });
     }
}
