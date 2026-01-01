/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#4B9400',
          'primary-dark': '#3D7A00',
          accent: '#C5A367',
          'accent-light': '#D4BC7D',
          dark: '#1A1C19',
          charcoal: '#2D2D2D',
          cream: '#F9F7F2',
          white: '#FFFFFF',
          muted: '#666666',
        },
        primary: {
          DEFAULT: '#4B9400',
          light: '#00CC33',
          lighter: '#99FF00',
          dark: '#3D7A00',
        },
        black: {
          DEFAULT: '#000000',
        },
      },
      screens: {
        'xs': '576px',
        'sm': '640px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1280px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'gold': '0 4px 20px rgba(197, 163, 103, 0.3)',
      },
    },
  },
  plugins: [],
}

