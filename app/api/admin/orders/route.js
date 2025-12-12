
// app/api/orders/route.js
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
     try {

          const orders = await prisma.order.findMany({
               orderBy: { createdAt: "desc" },
               include: {
                    user: true, // so admin can see customer info
                    orderItems: {
                         include: {
                              product: true
                         }
                    }
               }
          });

          return NextResponse.json(orders, { status: 200 });
     }
     catch (err) {
          console.error("Customers ORDER FETCH ERROR:", err);
          return NextResponse.json({ error: "Server Error" }, { status: 500 });
     }
}





