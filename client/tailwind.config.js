/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'color1': '#0C134F',
      'color2': '#1D267D',
      'color3': '#11009E',
      'color4': '#4942E4',
      'color5': '#8696FE',
    }
  }
},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}