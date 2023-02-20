/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-200': '#F7F7F2',
        'secondary-bg': '#E4E6C3',
        'gray-700': '#899878',
        'green-500': '#222725',
        'hover:green-600': '#121113',
      },
    },
  },
  plugins: [],
}
