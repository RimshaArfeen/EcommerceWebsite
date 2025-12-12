
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

     try {
          const pendingShipments = await prisma.order.findMany({
               where: {
                    status: "PENDING"
               },
               include: {
                    user: true,
                    orderItems: true
               }
          });


          return NextResponse.json({ pendingShipments }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ error: "Server Error" }, { status: 500 });
     }
}