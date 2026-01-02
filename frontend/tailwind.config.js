/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          blue: '#0066CC',
          green: '#00A652',
          gray: '#6B7280',
        }
      }
    },
  },
  plugins: [],
}