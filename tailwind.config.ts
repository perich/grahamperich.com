import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
          },
        },
      },
    },
  },
  plugins: [
    // https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#installation
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".text-gradient-gold": {
          background: "linear-gradient(to right, #f59e0b, #d97706, #f59e0b)",
          "-webkit-background-clip": "text",
          "background-clip": "text",
          color: "transparent",
          display: "inline-block",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
} satisfies Config;
