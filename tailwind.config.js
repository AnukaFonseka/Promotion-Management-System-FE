/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prm: "#74b49b",
        scn: "#f4f9f4",
      },
    },
  },
  plugins: [],
}

