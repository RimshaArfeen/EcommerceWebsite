
// app/api/orders/route.js
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET() {
     try {
          const session = await auth();

          if (!session || !session.user?.id) {
               return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }

          const orders = await prisma.order.findMany({
               where: {
                    userId: session.user.id
               },
               orderBy: {
                    createdAt: "desc"
               },
               include: {
                    orderItems: {
                         include: {
                              product: true
                         }
                    }
               }
          });

          return NextResponse.json(orders);
     } catch (err) {
          console.error("ORDER FETCH ERROR:", err);
          return NextResponse.json({ error: "Server Error" }, { status: 500 });
     }
}
