/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#1862a1',
        secondary: '#17a052',
        forText: '#575757',
        forLinks: '#1862a1',
        forBackground: '#e5ecf3',
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['18px', '29px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'class',
};
