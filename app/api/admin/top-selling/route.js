

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
     try {
          // Group by productId, sum quantities
          const topSellingProducts = await prisma.orderItem.groupBy({
               by: ['productId'],
               _sum: {
                    quantity: true
               },
               orderBy: {
                    _sum: { quantity: 'desc' }  // top-selling first
               },
               take: 5  // top 5 products
          });

          return NextResponse.json(topSellingProducts, { status: 200 });

     } catch (error) {
          console.error("Error fetching top-selling products:", error);
          return NextResponse.json({ error: "Server Error" }, { status: 500 });
     }
}
