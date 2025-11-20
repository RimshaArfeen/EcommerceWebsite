

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(req) {
//   try {
//     const products = await prisma.product.findMany(
//       {include : {category : true}}
//     );
//     return NextResponse.json(products , {status : 200});

    
//   } catch (error) {
//     console.log("Error while fetching products", error);
//     return NextResponse.json(
//       { error: "Cant fetch products" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");

    // 1️⃣ If category filter is applied
    if (categorySlug) {
      const products = await prisma.product.findMany({
        where: { categorySlug },
        include: { category: true },
      });

      return NextResponse.json(products, { status: 200 });
    }

    // 2️⃣ Otherwise fetch ALL products
    const allProducts = await prisma.product.findMany({
      include: { category: true },
    });

    return NextResponse.json(allProducts, { status: 200 });
  } catch (err) {
    console.error("Product fetch error:", err);
    return NextResponse.json(
      { error: "Cannot fetch products" },
      { status: 500 }
    );
  }
}
