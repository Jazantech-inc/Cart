/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9B1111",
      },
    },
  },
  plugins: [],
  corePlugins: {
      preflight: false
  },
}

