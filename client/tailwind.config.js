/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif']
      },
      colors: {
      'color1': '#0C134F',
      'color2': '#1D267D',
      'color3': '#11009E',
      'color4': '#4942E4',
      'color5': '#8696FE',
    },
    screens: {
      'print': {'raw': 'print'},
    }
  }
},
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}




