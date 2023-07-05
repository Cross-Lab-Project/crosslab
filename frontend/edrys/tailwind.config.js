const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.ts'],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      red: colors.red,
      blue: colors.blue,
      /*primary: '#f2ab55',
      secondary: {
        DEFAULT: '#7ea1c4',
        'light': '#e8eef3',
        'lighter': '#f5f8fc',
        'light-middle':'#7E9AC4',
        'middle': '#3F4F8D',
        'dark': '#1c355d',
        'darkblue':'#06152a',

        'primary-hover':'#EF9C01',
        'light-middle-hover':'#3B65A5',

        'footer-black': '#191616',
      },*/
      primary:{
        DEFAULT: '#3f5e9e',
        '900': '#1c355d',
        '100': '#c0dbf1',
        '50': '#f2f5fc'
      },
      secondary: {
        DEFAULT: '#f2ab55',
      },
    },
    fontFamily: {
      body: 'Roboto Condensed',
    }  
  },
  plugins: [],
}