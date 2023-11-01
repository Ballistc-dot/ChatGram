/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        imagebg: 'url(https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png)',
      },
      colors: {
        navyGrey: '#707991',
        richBlack: '#011627',
        red: '#F71735',
        lightGreen: '#78E378',
        iceBergBlue: '#8BABD8',
        lightGrey: '#F5F5F5',
        blue: '#1A9CFF',
      },
    },
  },
  plugins: [],
}
