"use client";

import { usePathname } from "next/navigation";
import Spinner from "../Components/Spinner/Spinner";

export default function RouteSpinner() {
     const pathname = usePathname();

     // key = pathname forces remount → spinner runs again every route change
     return <Spinner key={pathname} />;
}
