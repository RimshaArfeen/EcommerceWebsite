
// app/api/orders/route.js
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { sendOrderConfirmedEmail } from "@/lib/sendOrderEmail";


export async function GET() {
     try {
          const session = await auth();

          if (!session || !session.user?.id) {
               return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }

          const orders = await prisma.order.findMany({
               // where: {
               //      userId: session.user.id
               // },
               // orderBy: {
               //      createdAt: "desc"
               // },
               // include: {
               //      orderItems: {
               //           include: {
               //                product: true
               //           }
               //      }
               // }

               where: { userId: session.user.id },
               orderBy: { createdAt: "desc" },
               include: {
                    orderItems: {
                         include: {
                              product: true,
                              bestDeal: true, // <-- include BestDeal
                         },
                    },
               },
          });

          return NextResponse.json(orders);
     } catch (err) {
          console.error("ORDER FETCH ERROR:", err);
          return NextResponse.json({ error: "Server Error" }, { status: 500 });
     }
}

export async function POST(req) {
     try {
          const { cartItems, userId, fullName, email, phone, totalPrice } =
               await req.json();

          const order = await prisma.order.create({
               data: {
                    userId,
                    fullName,
                    email,
                    phone,
                    totalPrice,
                    orderItems: {
                         create: cartItems.map((item) => ({
                              quantity: item.qty,
                              productId: item.productId ?? undefined,
                              bestDealId: item.bestDealId ?? undefined,
                         })),
                    },
               },
          });

          console.log("📧 Sending email to:", email);

          await sendOrderConfirmedEmail({
               email,
               orderId: order.id,
               total: totalPrice,
          });

          console.log("✅ Email sent");

          return NextResponse.json(order, { status: 200 });
     } catch (err) {
          console.error("ORDER ERROR:", err);
          return NextResponse.json({ error: "Order failed" }, { status: 500 });
     }
}


// export async function POST(req) {
//      const { cartItems, userId, fullName, email, phone, totalPrice } =
//           await req.json();

//      const order = await prisma.order.create({
//           data: {
//                userId,
//                fullName,
//                email,
//                phone,
//                totalPrice,
//                orderItems: {
//                     create: cartItems.map((item) => ({
//                          quantity: item.qty,
//                          productId: item.productId ?? undefined,
//                          bestDealId: item.bestDealId ?? undefined,
//                     })),
//                },
//           },
//      });

//      try {
//           await sendOrderConfirmedEmail({
//                email,
//                orderId: order.id,
//                total: totalPrice,
//           });
//      } catch (e) {
//           console.error("EMAIL FAILED:", e);
//      }

//      return NextResponse.json(order, { status: 200 });
// }



