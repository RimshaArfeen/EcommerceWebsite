
//app/checkout/actions.js
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmedEmail } from "@/lib/sendOrderEmail";

export async function createInvoice(formData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("User not authenticated");

  const userId = session.user.id;

  // Shipping info
  const data = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    line1: formData.get("line1"),
    city: formData.get("city"),
    state: formData.get("state"),
    postalCode: formData.get("postalCode"),
  };

  // FIX: Read hidden inputs
  const items = JSON.parse(formData.get("cartItems") || "[]");
  const total = parseFloat(formData.get("total") || "0");

  console.log("Items:", items);
  console.log("Total:", total);

  // CREATE ADDRESS
  const address = await prisma.address.create({
    data: {
      user: { connect: { id: userId } },
      line1: data.line1,
      line2: null,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: "Pakistan",
    },
  });

  // CREATE ORDER
  const order = await prisma.order.create({
    data: {
      user: { connect: { id: userId } },
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: { connect: { id: address.id } },
      totalPrice: total,
      createdAt: new Date(),
      orderItems: {
        create: items.map((item) => ({
          productId: item._id,
          quantity: item.qty,
        })),
      },
    },
  });
  
  await sendOrderConfirmedEmail({
    email: data.email,
    orderId: order.id,
    total: total,
  });

  return { success: true, orderId: order.id };
}

