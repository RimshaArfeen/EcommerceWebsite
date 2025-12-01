
// app/api/orders/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
     try {
          const session = await auth();

          const orders = await prisma.order.findMany({
               where: {
                    userId: session?.user?.id,
               },
               include: {
                    address: true,
                    orderItems: {
                         include: { product: true }
                    }
               }
          });
          console.log("Session user: ", session?.user);

          return NextResponse.json(orders);
     } catch (error) {
          return NextResponse.json(error.message, { status: 500 });
     }
}
