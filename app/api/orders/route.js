
// app/api/orders/route.js
export const dynamic = "force-dynamic";

export async function GET(req) {
     try {
          const session = await auth();
          console.log("PROD /api/orders session:", session);

          // fallback to query param if auth() fails in prod
          const url = new URL(req.url);
          const userIdFromQuery = url.searchParams.get("userId");

          const userId = session?.user?.id || userIdFromQuery;
          if (!userId) {
               console.warn("No userId found (session missing and no query param)");
               return NextResponse.json([], { status: 200 });
          }

          // optional: validate userId length/format quickly
          if (typeof userId !== "string" || userId.length < 10) {
               console.warn("Suspicious userId:", userId);
               return NextResponse.json([], { status: 200 });
          }

          const orders = await prisma.order.findMany({
               where: { userId },
               include: { orderItems: { include: { product: true } }, address: true },
               orderBy: { createdAt: "desc" },
          });

          return NextResponse.json(orders);
     } catch (err) {
          console.error("Orders API Error (production):", err);
          return NextResponse.json({ error: "Server error" }, { status: 500 });
     }
}
