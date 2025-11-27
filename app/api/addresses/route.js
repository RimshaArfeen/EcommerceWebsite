
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request) {
     try {

          const addresses = await prisma.address.findMany({
               where: {
                    userId: (await auth())?.user?.id || null,
               },
               include: {
                    user: true,
               }
          });
          // console.log("Addresses ", addresses)
          return NextResponse.json(addresses, { status: 200 });

     } catch (error) {
          return NextResponse.json(error.message, { status: 500 });
     }

}

export async function DELETE(request) {
     try {
          const session = await auth();
          if (!session?.user) {
               return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
          }
          const { searchParams } = new URL(request.url);
          const addressId = searchParams.get("id");

          if (!addressId) {
               return NextResponse.json({ message: "Address ID is required" }, { status: 400 });
          }

          await prisma.address.deleteMany({
               where: {
                    id: addressId,
                    userId: session.user.id,
               },
          });
          return NextResponse.json({ message: "Address deleted successfully" }, { status: 200 });
     } catch (error) {
          return NextResponse.json(error.message, { status: 500 });
     }

}