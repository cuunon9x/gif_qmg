/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:        '#0057A8',
        'primary-dark': '#003F7A',
        'primary-light':'#E6F0FA',
        accent:         '#00A8E8',
        'accent-light': '#E6F7FF',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

