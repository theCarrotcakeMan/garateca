/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      "maroon": "#f5f2ef",
      "white": "#F2F2F2",
      "action": "#602C0A",
      "completed": "#2C4B33",
      "current": "#A46F4E",
      "disabled": "#8B8B8B",
      "ddisabled": "#909090",
      "copper": "#884B23",
      "mustard": "rgba(173, 110, 68, 0.4)",
    },
    extend: {
      backgroundImage: {
        'sand-pattern': "url('/media/Pattern25.png')",
      }
    },
  },
  plugins: [],
}
