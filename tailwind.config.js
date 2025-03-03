/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'main':'#0aad0a',
        'light':'#f0f3f2',
      }
    },
    container:{
      center:true,
      padding:'1rem',
    }
  },
  darkMode: "class",
  plugins: [heroui()]
}