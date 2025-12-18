

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
     try {
          const grouped = await prisma.orderItem.groupBy({
               by: ["productId"],
               where: {
                    productId: { not: null }, // ✅ important
               },
               _sum: {
                    quantity: true,
               },
               orderBy: [
                    {
                         _sum: {
                              quantity: "desc",
                         },
                    },
               ],
               take: 5,
          });

          const products = await prisma.product.findMany({
               where: {
                    id: {
                         in: grouped.map(g => g.productId),
                    },
                    
               },
               select: {
                    id: true,
                    title: true,
                    price: true,
                    imageUrl: true,
               },
          });


          const result = grouped
               .map(g => {
                    const product = products.find(p => p.id === g.productId);
                    if (!product) return null;

                    return {
                         productId: g.productId,
                         totalSold: g._sum.quantity ?? 0,
                         revenue: product.price * (g._sum.quantity ?? 0), // ✅
                         product,
                    };
               })
               .filter(Boolean);

          return NextResponse.json(result);

     } catch (error) {
          console.error("Top selling error:", error);
          return NextResponse.json({ error: "Server Error" }, { status: 500 });
     }
}
