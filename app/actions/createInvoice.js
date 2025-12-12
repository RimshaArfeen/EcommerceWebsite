
"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function createInvoice(formData) {
     const session = await auth();

     if (session?.user?.role !== "admin") {
          throw new Error("Not authenticated as Admin");
     }

     const data = {
          title: formData.get("title"),
          description: formData.get("desc"),
          price: Number(formData.get("price")),
          imageUrl: formData.get("imageUrl"),
          categoryId: formData.get("categoryId") || null,
          stock: Number(formData.get("stock") || 0),
          isDeleted: formData.get("isDeleted") === "on" ? true : false
     };

     console.log("Product Data:", data);

     const prod = await prisma.product.create({
          data
     });

     return prod;
}
