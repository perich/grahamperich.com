import Link from "next/link";

const footerLinks = [
  { href: "https://github.com/perich", label: "GitHub", external: true },
  {
    href: "https://linkedin.com/in/gpp101010",
    label: "LinkedIn",
    external: true,
  },
  { href: "https://x.com/grahamcodes", label: "X", external: true },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted order-2 sm:order-1">
            &copy; {new Date().getFullYear()} Graham Perich
          </p>

          {/* Links */}
          <nav className="flex items-center gap-6 order-1 sm:order-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-muted transition-smooth hover:text-heading"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
