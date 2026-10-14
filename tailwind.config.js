/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f9f3',
          100: '#e1f2e5',
          200: '#c5e6cd',
          300: '#99d2a6',
          400: '#64b678',
          500: '#3e9b55',
          600: '#2d7c42',
          700: '#256336',
          800: '#1f4f2d',
          900: '#1a4127',
          950: '#0c2314',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
