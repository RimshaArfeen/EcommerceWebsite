import Image from "next/image";
import "./globals.css";
import Homepage from "./Components/Hero/Homepage";
export default function Home() {
  return (
    <div className="flex min-h-screen justify-center p-24 ">
      <Homepage />

    </div>
  );
}
