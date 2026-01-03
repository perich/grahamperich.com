import Image from "next/image";

const socialLinks = [
  {
    href: "https://github.com/perich",
    label: "GitHub",
    icon: (
      <svg height="18" width="18" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/gpp101010/",
    label: "LinkedIn",
    icon: (
      <svg height="18" width="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/grahamcodes",
    label: "X",
    icon: (
      <svg height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function HelloWorld() {
  return (
    <section className="flex flex-col items-center text-center max-w-2xl mx-auto">
      {/* Avatar with subtle ring */}
      <div className="opacity-0 animate-scale-in mb-8">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-sm" />
          <Image
            className="relative rounded-full ring-2 ring-border"
            src="/avi.jpg"
            alt="Graham Perich"
            width={120}
            height={120}
            priority
          />
        </div>
      </div>

      {/* Name */}
      <h1 className="opacity-0 animate-fade-in-up delay-1 text-4xl sm:text-5xl lg:text-6xl font-bold text-heading tracking-tight mb-4">
        Graham Perich
      </h1>

      {/* Bio */}
      <p className="opacity-0 animate-fade-in-up delay-2 text-lg sm:text-xl text-muted max-w-md mb-8 leading-relaxed">
        Software engineer building things for the web.
      </p>

      {/* Social Links */}
      <div className="opacity-0 animate-fade-in-up delay-3 flex items-center gap-2">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted rounded-lg transition-smooth hover:text-heading hover:bg-surface"
            aria-label={link.label}
          >
            <span className="transition-smooth group-hover:text-accent">
              {link.icon}
            </span>
            <span className="hidden sm:inline">{link.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
