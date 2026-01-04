import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "var(--surface)",
          hover: "var(--surface-hover)",
        },
        border: {
          DEFAULT: "var(--border)",
          hover: "var(--border-hover)",
        },
        muted: "var(--muted)",
        heading: "var(--heading)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        link: {
          DEFAULT: "var(--link)",
          hover: "var(--link-hover)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "var(--foreground)",
            a: {
              color: "var(--link)",
              textDecoration: "underline",
              textDecorationColor: "var(--link)",
              textUnderlineOffset: "3px",
              textDecorationThickness: "1.5px",
              fontWeight: "500",
              transition: "color 0.2s ease, text-decoration-color 0.2s ease",
              "&:hover": {
                color: "var(--link-hover)",
                textDecorationColor: "var(--link-hover)",
              },
            },
            h1: {
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: "500",
              letterSpacing: "-0.02em",
              color: "var(--heading)",
            },
            h2: {
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: "500",
              letterSpacing: "-0.01em",
              color: "var(--heading)",
            },
            h3: {
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: "500",
              color: "var(--heading)",
            },
            h4: {
              color: "var(--heading)",
            },
            blockquote: {
              borderLeftColor: "var(--border)",
              color: "var(--muted)",
              fontStyle: "normal",
            },
            code: {
              color: "var(--foreground)",
              backgroundColor: "var(--surface-hover)",
              borderRadius: "4px",
              padding: "2px 6px",
              fontWeight: "400",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            },
            strong: {
              color: "var(--heading)",
            },
            "ul > li::marker": {
              color: "var(--heading)",
            },
            "ol > li::marker": {
              color: "var(--heading)",
            },
          },
        },
      },
    },
  },
  plugins: [
    // https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#installation
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
