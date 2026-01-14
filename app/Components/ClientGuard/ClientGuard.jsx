"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function ClientGuard({ children }) {
     const { status } = useSession();
     const router = useRouter();

     useEffect(() => {
          if (status === "unauthenticated") {
               router.push("/login");
          }
     }, [status]);

     if (status === "loading") return (
          <div className="flex min-h-screen justify-center items-center">
               <Link href="/login" className="p-4 rounded-lg bg-blue-500 text-white">Login First</Link>
          </div>
     );

     return children;
}
