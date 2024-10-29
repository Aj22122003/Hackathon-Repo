/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#d6f9e5',
        background: '#09190f',
        primary: '#9ad9b4',
        secondary: '#d28d38',
        accent: '#c753b7',
      },
      backgroundImage: {
        concert: "url('./src/assets/concert.jpg')",
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
