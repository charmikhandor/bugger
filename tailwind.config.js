/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
    colors:{
        "light-text": "#e2f0f2",
        "dark-text": "#2d2730",
        "light-orange": "#ec8f89",
        "dark-orange": "#f5776b",
        "dark-background": "#141a2a",
        "light-green": "#3abda6",
        "dark-green": "#233b44",
    },
    backgroundImage: {
      'hero-pattern': "url('background.jpg')",
  },
  plugins: [],
}
  }}

