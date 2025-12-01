app/api/orders/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
     try {
          const { searchParams } = new URL(request.url);
          const userId = searchParams.get("userId");

          if (!userId) {
               return NextResponse.json({ error: "Missing userId" }, { status: 400 });
          }

          const orders = await prisma.order.findMany({
               where: { userId },
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


