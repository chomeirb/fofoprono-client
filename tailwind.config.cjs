/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        col1: "#3C3744",
        col2: "#3D52D5",
        col3: "#B4C5E4",
        col4: "#FBFFF1",
      },
      boxShadow: {
        'top': '0 -10px 15px -3px rgba(0, 0, 0, 0.2)',
        'in': 'inset 10px 0px 15px 0 rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
        serif: ["Inter var", "serif"],
        'proxima': ["'Proxima Nova'", "system-ui", "sans-serif"],
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
