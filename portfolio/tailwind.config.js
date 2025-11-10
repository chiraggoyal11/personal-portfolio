/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-bg': '#FFFFFF',
        'light-accent': '#10B981',
        'light-text': '#1F2937',
        'dark-bg': '#0A0A0A',
        'dark-accent': '#A855F7',
        'dark-text': '#F9FAFB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
