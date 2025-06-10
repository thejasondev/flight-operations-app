/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6",
          dark: "#2563eb",
        },
        secondary: {
          DEFAULT: "#6b7280",
          dark: "#4b5563",
        },
      },
    },
  },
  plugins: [],
};
