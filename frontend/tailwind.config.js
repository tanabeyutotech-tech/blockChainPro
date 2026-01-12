/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f1a",
        card: "#121826",
        border: "rgba(255,255,255,0.08)",
        primary: "#4f7cff",
        primaryHover: "#3b63f0",
        muted: "#9aa4bf",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(79,124,255,0.15), 0 20px 40px rgba(0,0,0,0.6)",
        card: "0 20px 40px rgba(0,0,0,0.55)",
      },
      backgroundImage: {
        header:
          "radial-gradient(80% 80% at 50% -20%, rgba(79,124,255,0.25), transparent)",
        card:
          "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
      },
    },
  },
  plugins: [],
};