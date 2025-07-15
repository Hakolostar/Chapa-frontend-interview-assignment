/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9e8',
          100: '#dcf1c4',
          200: '#c6e99d',
          300: '#aee075',
          400: '#9bd856',
          500: '#8dc63f', // Main Chapa green
          600: '#7db836',
          700: '#6ba82c',
          800: '#5a9723',
          900: '#4a7e15',
        },
        secondary: {
          50: '#f2f9e8',
          100: '#e0f2ca',
          200: '#cdea9f',
          300: '#b8e070',
          400: '#a5d648',
          500: '#7dc400', // Darker Chapa green
          600: '#6fb000',
          700: '#5f9a00',
          800: '#4f8300',
          900: '#3f6b00',
        },
        success: {
          50: '#f0f9e8',
          100: '#dcf1c4',
          200: '#c6e99d',
          300: '#aee075',
          400: '#9bd856',
          500: '#8dc63f',
          600: '#7db836',
          700: '#6ba82c',
          800: '#5a9723',
          900: '#4a7e15',
        }
      }
    },
  },
  plugins: [],
};
