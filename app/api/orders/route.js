
// app/api/orders/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req) {
     try {
          const session = await auth();

          if (!session?.user?.id) {
               return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
          }

          const orders = await prisma.order.findMany({
               where: { userId: session.user.id },
               include: {
                    orderItems: { include: { product: true } },
                    address: true,
               },
               orderBy: { createdAt: "desc" },
          });

          return NextResponse.json(orders);
     } catch (err) {
          console.error("Orders API Error:", err);
          return NextResponse.json({ error: "Server error" }, { status: 500 });
     }
}

