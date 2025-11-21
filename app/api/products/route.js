
// //app/api/products/route.js
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const categorySlug = searchParams.get("category");

//     // 1️⃣ If category filter is applied
//     if (categorySlug) {
//       const products = await prisma.product.findMany({
//         where: { categorySlug },
//         include: { category: true },
//       });

//       return NextResponse.json(products, { status: 200 });
//     }

//     // 2️⃣ Otherwise fetch ALL products
//     const allProducts = await prisma.product.findMany({
//       include: { category: true },
//     });

//     return NextResponse.json(allProducts, { status: 200 });
//   } catch (err) {
//    console.error("API error:", err);
//    return NextResponse.json([], { status: 200 });

//   }
// }

// app/api/products/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const url = req?.url ? new URL(req.url) : null;
    const categorySlug = url?.searchParams?.get("category") || null;

    let products;

    if (categorySlug) {
      // Filter by category slug
      products = await prisma.product.findMany({
        where: { category: { slug: categorySlug } },
        include: { category: true },
      });
    } else {
      // Fetch all products
      products = await prisma.product.findMany({
        include: { category: true },
      });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(err, { status: 500 });
  }
}
