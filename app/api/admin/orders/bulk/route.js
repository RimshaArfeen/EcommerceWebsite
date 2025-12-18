

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req) {
     const { orderIds, status } = await req.json();

     await prisma.order.updateMany({
          where: { id: { in: orderIds } },
          data: { status }
     });

     return NextResponse.json({ success: true });
}
