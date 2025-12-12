
//app/api/admin/products/[slug]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PUT(request, { params }) {
     try {
          // Unwrap params as a promise
          const { slug: productId } = await params;

          const { price } = await request.json();

          console.log("Updating product:", productId, "with price:", price);

          // Ensure price is a number
          const updatedProduct = await prisma.product.update({
               where: { id: productId },
               data: { price: Number(price) },
          });

          console.log("Price updated successfully", updatedProduct);
          return NextResponse.json(updatedProduct, { status: 200 });
     } catch (error) {
          console.log("Error updating product:", error);
          return NextResponse.json({ error: "Server Error" }, { status: 500 });
     }
}



// export async function DELETE(request, { params }) {
//      try {
//           // Unwrap params properly
//           const { slug: productId } = await params; // <-- await is required here

//           console.log("Deleting product:", productId);

//           const updatedProduct = await prisma.product.update({
//                where: { id: productId },
//                data: { isDeleted: true },
//           });


//           console.log("Product deleted successfully", updatedProduct);
//           return NextResponse.json(updatedProduct, { status: 200 });
//      } catch (error) {
//           console.log("Error deleting product:", error);
//           return NextResponse.json({ error: "Server Error" }, { status: 500 });
//      }
// }
