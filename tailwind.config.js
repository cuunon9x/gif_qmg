/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:        '#C5A059',
        'primary-dark': '#a07a30',
        'primary-light':'#fdf5e6',
        accent:         '#8B1A1A',
        'accent-light': '#fff0f0',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

