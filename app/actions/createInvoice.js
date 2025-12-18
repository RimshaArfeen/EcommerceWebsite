

"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
 
//For Creating Product
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

//For deleting Product Admin
export async function deleteProduct(prodId) {
     const session = await auth();

     if (session?.user?.role !== "admin") {
          throw new Error("Not authenticated as Admin");
     }

     await prisma.product.delete({
          where: { id: prodId },
     });

     return true;
}

//For adding User Admin
export async function handleAddUser(formData) {
     const session = await auth();

     if (session?.user?.role !== "admin") {
          throw new Error("Not authenticated as Admin");
     }

     const data = {
          name: formData.get("name"),
          email: formData.get("email"),
          role: formData.get("role"),
         
     };

     console.log("New User Data:", data);

     const newUser = await prisma.user.create({
          data
     });

     return newUser;
}

//For deleting User Admin
export async function deleteUserAction(userId) {
     const session = await auth();

     if (session?.user?.role !== "admin") {
          throw new Error("Not authenticated as Admin");
     }

     await prisma.user.delete({
          where: { id: userId },
     });

     return true;
}