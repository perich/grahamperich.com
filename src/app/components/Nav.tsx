"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#writing", label: "Writing" },
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
        <div className="bg-background border-b border-border">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo / Name */}
              <Link
                href="/"
                className="font-serif text-xl tracking-tight text-heading transition-smooth hover:text-muted"
              >
                Graham Perich
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm tracking-wide transition-smooth ${
                      pathname === link.href
                        ? "text-heading"
                        : "text-muted hover:text-heading"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center transition-smooth"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-px w-full bg-heading transform transition-smooth origin-center ${
                      isOpen ? "rotate-45 translate-y-[7.5px]" : ""
                    }`}
                  />
                  <span
                    className={`block h-px w-full bg-heading transition-smooth ${
                      isOpen ? "opacity-0 scale-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-px w-full bg-heading transform transition-smooth origin-center ${
                      isOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
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
        className={`fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-surface border-l border-border shadow-xl transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          <nav className="flex-1 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 text-base tracking-wide transition-smooth ${
                  pathname === link.href
                    ? "text-heading"
                    : "text-muted hover:text-heading"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu footer */}
          <div className="pt-6 border-t border-border">
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} Graham Perich
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
