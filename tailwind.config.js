/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#d9e7ff',
          200: '#bcd4ff',
          300: '#8cb8ff',
          400: '#5992ff',
          500: '#3366ff',
          600: '#1940f5',
          700: '#1230e0',
          800: '#152ab5',
          900: '#17298f',
        },
        secondary: {
          50: '#edfffe',
          100: '#d4fffe',
          200: '#aef9fd',
          300: '#76f0f9',
          400: '#39ddef',
          500: '#13bfd3',
          600: '#0597b3',
          700: '#087791',
          800: '#0c6076',
          900: '#104f63',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
    },
  },
  plugins: [],
};