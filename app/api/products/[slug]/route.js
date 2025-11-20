

// app/api/allBlogs/[slug]/route.js
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(request, { params }) {
  const { categorySlug } = await params;

  try {
    const products = await prisma.product.findFirst({
      where: { categorySlug },
      include: { category : true },
    });

    if (!products) {
      return NextResponse.json({ error: "products not found" }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

