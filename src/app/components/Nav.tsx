"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center gap-6 text-sm">
      <Link
        href="/"
        className={`hover:underline hover:underline-offset-4 ${
          pathname === "/" ? "font-semibold" : ""
        }`}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={`hover:underline hover:underline-offset-4 ${
          pathname === "/about" ? "font-semibold" : ""
        }`}
      >
        About
      </Link>
    </nav>
  );
}
