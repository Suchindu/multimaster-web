/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'color1': '#0C134F'
    }
  }
},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}