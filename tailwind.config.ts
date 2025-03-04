import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)"],
        luckiest: ["var(--font-luckiest)"],
      },
      colors: {
        foreground: "var(--foreground)",
        orange_primary: "#f36805",
        orange_secondary: "#fa900f",
        dark_brown: "#471a08",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "custom-pattern": `
          linear-gradient(135deg, #faab5c 25%, transparent 25%), 
          linear-gradient(225deg, #faab5c 25%, transparent 25%), 
          linear-gradient(45deg, #faab5c 25%, transparent 25%), 
          linear-gradient(315deg, #faab5c 25%, #f6d6aa 25%)
        `,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
