
  //app/api/products/route.js

import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

 export async function GET(req) {
   try {
     const { searchParams } = new URL(req.url);
     const categorySlug = searchParams.get("category");

     let products;

     if (categorySlug) {
       products = await prisma.product.findMany({
         where: { categorySlug: categorySlug },

         include: { category: true },
       });
     } else {
       products = await prisma.product.findMany({
         include: { category: true }
         

       });
     }

     return NextResponse.json(products, { status: 200 });
   } catch (err) {
     console.error("API error:", err);
     return NextResponse.json(
       { error: "Server Error", details: err.message },
       { status: 500 }
     );
   }
 }
