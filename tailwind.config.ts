import type { Config } from "tailwindcss";

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
        gradientcolor: "var(--gradientcolor)",
        backgroundlight: "var(--backgroundlight)",
        foregroundlight: "var(--foregroundlight)",
        backgroundopacity80: "var(--backgroundopacity80)",
        foregroundopacity80: "var(--foregroundopacity80)",
        foregroundopacity20: "var(--foregroundopacity20)",
      },
    },
  },
  plugins: [],
} satisfies Config;
