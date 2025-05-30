/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#1f2937",
        gray: "#6b7280",
        danger: "#dc2626",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
