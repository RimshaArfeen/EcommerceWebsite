
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(params) {
     try {
          const admin_users = await prisma.user.findMany({
               where: { role : "admin" }, // fields in Modal
               include: {                 // relations in Modal
                    addresses: true
               }
          })
          console.log("Admin users", admin_users)
          return NextResponse.json(admin_users, { status: 200 })

     }
     catch (error) {
          console.log("Error fetching for USers", error)
          return NextResponse.json(error, { status: 500 })

     }
}