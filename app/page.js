
"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Homepage from "./Components/Hero/Homepage";
import Link from "next/link";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") 
    return
  (

    <div className="flex min-h-screen justify-center items-center">
      <span className="loader"></span>
      <Link href="/login" className="ml-2 mx-auto my-auto p-3 bg-blue-800 text-white">Go to Login</Link>

    </div>
  );

  if (status === "unauthenticated") {
    return <div>Private Content</div>;
  }

  return (
    <div className="flex min-h-screen justify-center px-0 py-30 md:p-24">
      <Homepage />
    </div>
  );
}
