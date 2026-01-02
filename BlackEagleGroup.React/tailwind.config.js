/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'modal-in': {
          '0%': { opacity: '0', transform: 'translate(-50%, -48%) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        'modal-out': {
          '0%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(-50%, -48%) scale(0.95)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'modal-in': 'modal-in 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'modal-out': 'modal-out 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
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

