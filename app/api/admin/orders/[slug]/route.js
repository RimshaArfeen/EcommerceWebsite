
//app/api/admin/orders/[slug]/route.js
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
     try {
          // Unwrap params as a promise
          const { slug: orderId } = await params;

          const { status } = await request.json();

          console.log("Updating order:", orderId, "with status:", status);

          const updatedOrder = await prisma.order.update({
               where: { id: orderId },
               data: { status },
          });

          console.log("Status updated successfully", updatedOrder);
          return NextResponse.json(updatedOrder, { status: 200 });

     } catch (error) {
          console.log("Error updating order:", error);
          return NextResponse.json({ error: "Server Error" }, { status: 500 });
     }
}
