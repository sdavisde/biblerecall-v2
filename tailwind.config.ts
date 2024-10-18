/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
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
        error: 'hsl(var(--error))',
        green: 'hsl(var(--green))',
        darkGreen: '#5F775B',
        black: '#292728',
        blackHover: '#201e1f',
        mint: '#BEC9BC',
        darkerGrey: '#404040',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        DEFAULT: '5px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      clipPath: {
        diagonal: 'polygon(0 0, 100% 100%, 100% 0)', // Creates the diagonal divider
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
