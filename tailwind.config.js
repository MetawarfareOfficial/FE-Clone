module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        sidebar: '0px 0px 48px rgba(0, 0, 0, 0.06)',
      },
      spacing: {
        '30px': '30px',
      },
    },
    fontSize: {
      '5px': '5px',
    },
    colors: {
      // blue: '#1fb6ff',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      grayDark: '#273444',
      // gray: '#8492a6',
      grayLight: '#d3dce6',

      blue: '#3864FF',
      gray: {
        100: 'rgba(255, 255, 255, 0.79)',
        400: '#A4A9B7',
        500: '#E5E5E5',
      },
      black: {
        400: '#293247',
        900: '#000',
      },
      green: { 400: '#D2FFDB', 600: '#9DE6AB;' },
      purple: { 400: '#E5E5FE' },
      white: '#fff',
    },
  },
  plugins: [require('tailwindcss')],
};
