
//app/api/checkout/route.js
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function POST(request) {

     try {
          const body = await request.json();
          const { user, line1, line2, city, state, postalCode, country, createdAt } = body;

          const address = await prisma.address.create(
               {
                    data: {
                      user, line1, line2,city, state, postalCode, country, createdAt
                    }
               }
          )
          console.log("Checkout Route Data: ", address);
          return NextResponse.json({ message: "Checkout route is working!" }, { status: 200 });
     } catch (error) {
          console.log("Error encountering : ", error)
          return NextResponse.json(error.message, { status: 500 });
     }
}
