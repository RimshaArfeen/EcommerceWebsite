import Image from "next/image";
import "./globals.css";
import Homepage from "./Components/Hero/Homepage";
export default function Home() {
  return (
    <div className="flex min-h-screen justify-center px-0 py-30 md:p-24 ">
      < Homepage />

    </div >
  );
}
