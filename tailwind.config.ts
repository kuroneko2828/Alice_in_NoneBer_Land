import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "modal-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "modal-in": "modal-in 0.4s ease-out forwards",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        lobster: ['"Lobster Two"', "cursive"],
        yusei: ['"Yusei Magic"', "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
