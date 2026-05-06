/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: '#F8F6F1',
        ink:    '#1A1A18',
        accent: '#8C6A4E',
      },
      transitionProperty: {
        height:  'height',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [],
};
