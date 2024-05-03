/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./src/Components/*.jsx",
    "./src/*.jsx",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        darkBlue1: "hsl(209, 23%, 22%)",
        darkblue2: "hsl(207, 26%, 17%)",
        darkblue3: "hsl(200, 15%, 8%)",
        darkGray: "hsl(0, 0%, 52%)",
        lightGray: "hsl(0, 0%, 98%)",
        cta: "#ff9b55"
      },
      fontFamily: {
        'sans': '"Nunito sans", sans-serif'
      }
    },
  },
  plugins: [],
}

