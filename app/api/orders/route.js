// app/api/orders/route.js
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(request) {
//      try {
//           const { searchParams } = new URL(request.url);
//           const userId = searchParams.get("userId");

//           if (!userId) {
//                return NextResponse.json({ error: "Missing userId" }, { status: 400 });
//           }

//           const orders = await prisma.order.findMany({
//                where: { userId },
//                include: {
//                     orderItems: { include: { product: true } },
//                     address: true,
//                },
//                orderBy: { createdAt: "desc" },
//           });

//           return NextResponse.json(orders || []);
//      } catch (error) {
//           console.error("Orders API Error:", error);
//           return NextResponse.json({ error: "Server error" }, { status: 500 });
//      }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth"; // <- correct import in v5
import { authOptions } from "@/auth"; // your NextAuth config

export async function GET() {
     try {
          const session = await getServerSession(authOptions);

          if (!session?.user?.id) {
               return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
          }

          const orders = await prisma.order.findMany({
               where: { userId: session.user.id },
               include: {
                    address: true,
                    orderItems: { include: { product: true } },
               },
          });

          return NextResponse.json(Array.isArray(orders) ? orders : []);
     } catch (error) {
          console.error("Error fetching orders:", error);
          return NextResponse.json({ message: error.message }, { status: 500 });
     }
}

