

"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RedirectPage() {
     const { data: session, status } = useSession()
     const router = useRouter()

     useEffect(() => {
          if (status === "loading") return

          if (session?.user.role === "admin") {
               router.replace("/admin")
          } else {
               router.replace("/")
          }
     }, [session, status])

     return <p>Redirecting...</p>
}
