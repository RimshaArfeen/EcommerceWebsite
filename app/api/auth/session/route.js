import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
     const session = await auth(); // Auth.js v5 server-side session fetch
     return NextResponse.json(session);
}
