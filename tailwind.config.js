/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./_includes/**/*.html",
      "./_layouts/**/*.html",
      "./_pages/**/*.md",
      "./index.html",
      './_posts/**/*.html',
      './*.html',
      './*.md',
      "./index.html"
    ],
    theme: {
      extend: {
        animation: {
          'fade-in': 'fadeIn 0.8s ease-out',
          'slide-up': 'slideUp 0.8s ease-out'
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          },
          slideUp: {
            '0%': { transform: 'translateY(50px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          }
        }
      }
    },
    variants: {},
    plugins: []
};
