"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3 px-6 backdrop-blur-md bg-gray-900/80 border-b border-blue-900/30 shadow-lg">
      <div className="container mx-auto flex justify-start">
        <Link
          href="/"
          className={`px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-500/20 flex items-center`}
        >
          <p className="font-semibold">Home</p>
        </Link>
      </div>
    </nav>
  );
}
