
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
     try {
          const customers = await prisma.user.findMany({
               include: {
                    orders: {
                         include: {
                              orderItems: {
                                   include: {
                                        product: true
                                   }
                              }
                         }
                    },
                    addresses: true,
                    wishlist: true,
                  
               }
          });

          return NextResponse.json(customers, { status: 200 });
     } catch (error) {
          console.log("Error Fetching Users:", error);
          return NextResponse.json(error.message, { status: 500 });
     }
}
