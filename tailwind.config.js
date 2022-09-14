const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './resources/views/**/*.edge',
    './resources/assets/**/*.js',
    './resources/assets/**/*.ts',
    './resources/assets/**/*.css',
    './resources/**/*.vue',
  ],
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
      colors: {
        'orange': colors.orange,
        'gray': colors.gray,
        'white': 'white',
        'transparent': 'transparent',
        'digital-blue': '#99A9FF',
        'bone': '#F3F1EE',
        // New colors after rebdranding "end of 2020":
        'black': '#282828',
        'autumn': '#C66D29',
        'violet': '#836C7E',
        'terracota': '#875A4E',
        'forest': {
          100: '#96967E',
          200: '#757663',
        },
        'nude': {
          100: '#F0ECE3',
          200: '#DDD6C4',
          300: '#B49D8C',
        },
        // 'primary': colors.green,
        'primary': {
          50: '#F3F9E0',
          100: '#EBF1D7',
          200: '#DCE4CB',
          300: '#C4CFAD',
          400: '#A6B18F',
          500: '#8F9778',
          600: '#797F5F',
          700: '#5F6646',
          800: '#3B4222',
          900: '#272E0E',
        },
      },
      fontFamily: {
        // Defaults of the whole website:
        serif: ['Gascogne', ...defaultTheme.fontFamily.serif],
        sans: ['Favorit', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
