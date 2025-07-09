/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#28c76f',
        'secondary': '#7367f0',
        'accent': '#f72585',
        'light-blue': '#4cc9f0',
      },
      animation: {
        'gradient-background': 'gradient-background 15s ease infinite',
        'fadeInDown': 'fadeInDown 1s ease-out forwards',
        'fadeInUp': 'fadeInUp 1s ease-out forwards',
        'ken-burns': 'ken-burns 20s ease-out infinite',
      },
      keyframes: {
        'gradient-background': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInDown: {
          'from': { opacity: '0', transform: 'translateY(-30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'ken-burns': {
            '0%': { transform: 'scale(1.1) translate(0, 0)' },
            '50%': { transform: 'scale(1.2) translate(-10px, 10px)' },
            '100%': { transform: 'scale(1.1) translate(0, 0)' },
        }
      }
    },
  },
  plugins: [],
}