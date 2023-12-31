/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        satisfy: ['var(--satisfy)'],
        rockSalt: ['var(--rock-salt)'],
        urbanist: ['var(--urbanist)'],
        openDyslexic: ['var(--open-dyslexic)'],
      },
      fontSize: {
        sm: ['14px', '17px'],
        md: ['16px', '20px'],
        base: ['20px', '24px'],
        lg: ['24px', '28px'],
        xl: ['34px', '43px'],
      },
      colors: {
        lightGrey: '#F2F2F2',
        darkGrey: '#BABABA',
        charcoal: '#676767',
        white: '#FFFFFF',
        yellow: '#D0CE94',
        red: '#CC706F',
        darkRed: '#B64846',
        green: '#81957f',
        darkGreen: '#5F775B',
        black: '#292728',
        blackHover: '#201e1f',
        mint: '#BEC9BC',
        darkerGrey: '#404040',
      },
      borderRadius: {
        DEFAULT: '5px',
      },
    },
  },
  plugins: [],
}
