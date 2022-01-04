module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      blue: '#1fb6ff',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      grayDark: '#273444',
      gray: '#8492a6',
      grayLight: '#d3dce6',
    },
  },
  plugins: [require('tailwindcss')],
};
