"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 animate-fade-in-down">
        <div className="bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo / Name */}
              <Link
                href="/"
                className="text-heading font-semibold tracking-tight transition-smooth hover:text-accent"
              >
                GP
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
                      pathname === link.href
                        ? "text-heading bg-surface"
                        : "text-muted hover:text-heading hover:bg-surface/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg transition-smooth hover:bg-surface"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-full bg-current transform transition-smooth origin-center ${
                      isOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current transition-smooth ${
                      isOpen ? "opacity-0 scale-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current transform transition-smooth origin-center ${
                      isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-surface border-l border-border shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-4">
          <nav className="flex-1 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-smooth ${
                  pathname === link.href
                    ? "text-heading bg-background"
                    : "text-muted hover:text-heading hover:bg-background/50"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu footer */}
          <div className="pt-6 border-t border-border">
            <p className="px-4 text-xs text-muted">
              &copy; {new Date().getFullYear()} Graham Perich
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
