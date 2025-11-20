

//app/api/categories/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all categories from DB, selecting only required fields
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        slug: true, // optional if backfilled
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Can't fetch categories" },
      { status: 500 }
    );
  }
}

