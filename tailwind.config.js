/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    "text-black",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },

          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        slideIn: {
          '0%': { 
            transform: 'translateY(-10px) scale(0.95)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateY(0) scale(1)', 
            opacity: '1' 
          },
        },
        scaleIn: {
          '0%': { 
            transform: 'scale(0.95)',
            opacity: '0' 
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '1' 
          },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out forwards',
        fadeOut: 'fadeOut 0.2s ease-in-out forwards',
        slideIn: 'slideIn 0.2s ease-out forwards',
        scaleIn: 'scaleIn 0.2s ease-out forwards',
        slideUp: 'slideUp 0.3s ease-out forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};