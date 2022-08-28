/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./src/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/**/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "white",
        appbg: "#F6F4F0",
      },
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
        serif: ["Inter var", "serif"],
      },
      screens: {
        'm15': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }

        'i1': {'min': '1279px', 'max':'1535px'},

        'm12': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }

        'i2': {'min': '1023px', 'max':'1279px'},

        'm10': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }

        'i3': {'min': '767px', 'max':'1023px'},

        'm8': {'max': '767px'},
        // => @media (max-width: 767px) { ... }

        'i4': {'min': '639px', 'max':'767px'},

        'm6': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
      },
      animation: {
        'spin-logo': 'spin 5s linear infinite',
        'scrolling-screens': 'horizontalTranslate 25s linear infinite',
      },
      keyframes: {
        horizontalTranslate: {
          '0%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(-100%)'},
        },
      },
      backgroundImage: {
        'homeLanding': "url('images/homeLanding.png')",
        'pricingLanding': "url('images/pricingLanding.png')",
      },
      backgroundSize: {
        '2000': '2000px',
      },
      gridTemplateColumns: {
        'welcome': '5fr 4fr',
      },
      spacing: {
        112: '26rem',
        116: '28rem',
        128: '32rem',
        140: '36rem',
        152: '42rem',
        164: '48rem',
        'ham': 'calc(100vh - var(--header-height) - 16px)',
      },
      borderRadius: {
        '4xl': '1.75rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      rotate: {
        '405': '405deg',
      },
    },
  },
  plugins: [],
}
