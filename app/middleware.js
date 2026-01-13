
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
     const token = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
     })
     const { pathname } = req.nextUrl

     // Allow login page
     // Allow login & redirect pages
     if (
          pathname.startsWith("/login") ||
          pathname.startsWith("/redirect")
     ) {
          return NextResponse.next()
     }


     // Block all pages if not logged in
     if (!token) {
          return NextResponse.redirect(new URL("/login", req.url))
     }

     // Admin-only pages
     if (pathname.startsWith("/admin") && token.role !== "admin") {
          return NextResponse.redirect(new URL("/", req.url))
     }

     return NextResponse.next()
}
