/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors
        primary: '#FF3366',
        hover: '#E62E5C',
        secondary: '#2E8B57',
        secondaryHover: '#247A4B'
      },
    },
  },
  plugins: [],
}
