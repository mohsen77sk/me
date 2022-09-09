/** @type {import('tailwindcss').Config} */

/**
 * Tailwind configuration
 */
const config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,scss,ts}', './projects/**/*.{html,scss,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};

module.exports = config;
