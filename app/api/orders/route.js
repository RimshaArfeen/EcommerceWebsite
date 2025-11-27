
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request) {

     try {

          const orders = await prisma.order.findMany({
               where: {
                    userId: (await auth())?.user?.id || null,
               },
               include: {
                    address: true,
                    orderItems: {
                         include: {
                              product: true
                         }
                    }
               }
          });
          console.log("Orders ", orders)
          return NextResponse.json(orders, { status: 200 });

     } catch (error) {
          return NextResponse.json(error.message, { status: 500 });
     }

}