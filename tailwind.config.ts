import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        paper: {
          50: "#faf8f5",
          100: "#f5f0e8",
          200: "#ede4d3",
        },
        ink: {
          light: "#6b6560",
          DEFAULT: "#3d3530",
          dark: "#1a1614",
        },
        accent: {
          DEFAULT: "#8b7355",
          light: "#b8967a",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#3d3530",
            maxWidth: "68ch",
            lineHeight: "1.85",
            "h1, h2, h3": { color: "#1a1614", fontWeight: "600" },
            a: { color: "#8b7355", textDecoration: "underline" },
            blockquote: {
              borderLeftColor: "#b8967a",
              color: "#6b6560",
              fontStyle: "italic",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
