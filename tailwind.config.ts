import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { withUt } from 'uploadthing/tw';
import plugin from 'tailwindcss/plugin';
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');
const svgToDataUri = require('mini-svg-data-uri');

export default withUt({
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}', // must use this line to compile and generate our RizzUI components style
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}', // Tremor module
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px', // only need to control product grid mode in ultra 4k device
    },
    extend: {
      aspectRatio: {
        poster: '2 / 3',
      },
      colors: {
        // light mode
        tremor: {
          brand: {
            faint: '#eff6ff', // blue-50
            muted: '#bfdbfe', // blue-200
            subtle: '#60a5fa', // blue-400
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#1d4ed8', // blue-700
            inverted: '#ffffff', // white
          },
          background: {
            muted: '#f9fafb', // gray-50
            subtle: '#f3f4f6', // gray-100
            DEFAULT: '#ffffff', // white
            emphasis: '#374151', // gray-700
          },
          border: {
            DEFAULT: '#e5e7eb', // gray-200
          },
          ring: {
            DEFAULT: '#e5e7eb', // gray-200
          },
          content: {
            subtle: '#9ca3af', // gray-400
            DEFAULT: '#6b7280', // gray-500
            emphasis: '#374151', // gray-700
            strong: '#111827', // gray-900
            inverted: '#ffffff', // white
          },
        },
        // dark mode
        'dark-tremor': {
          brand: {
            faint: '#0B1229', // custom
            muted: '#172554', // blue-950
            subtle: '#1e40af', // blue-800
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#60a5fa', // blue-400
            inverted: '#030712', // gray-950
          },
          background: {
            muted: '#131A2B', // custom
            subtle: '#1f2937', // gray-800
            DEFAULT: '#111827', // gray-900
            emphasis: '#d1d5db', // gray-300
          },
          border: {
            DEFAULT: '#1f2937', // gray-800
          },
          ring: {
            DEFAULT: '#1f2937', // gray-800
          },
          content: {
            subtle: '#4b5563', // gray-600
            DEFAULT: '#6b7280', // gray-600
            emphasis: '#e5e7eb', // gray-200
            strong: '#f9fafb', // gray-50
            inverted: '#000000', // black
          },
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        gray: {
          0: 'rgb(var(--gray-0) / <alpha-value>)',
          50: 'rgb(var(--gray-50) / <alpha-value>)',
          100: 'rgb(var(--gray-100) / <alpha-value>)',
          200: 'rgb(var(--gray-200) / <alpha-value>)',
          300: 'rgb(var(--gray-300) / <alpha-value>)',
          400: 'rgb(var(--gray-400) / <alpha-value>)',
          500: 'rgb(var(--gray-500) / <alpha-value>)',
          600: 'rgb(var(--gray-600) / <alpha-value>)',
          700: 'rgb(var(--gray-700) / <alpha-value>)',
          800: 'rgb(var(--gray-800) / <alpha-value>)',
          900: 'rgb(var(--gray-900) / <alpha-value>)',
          1000: 'rgb(var(--gray-1000) / <alpha-value>)',
        },
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        primary: {
          lighter: 'rgb(var(--primary-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--primary-default) / <alpha-value>)',
          dark: 'rgb(var(--primary-dark) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          lighter: 'rgb(var(--secondary-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--secondary-default) / <alpha-value>)',
          dark: 'rgb(var(--secondary-dark) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
        },
        red: {
          lighter: 'rgb(var(--red-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--red-default) / <alpha-value>)',
          dark: 'rgb(var(--red-dark) / <alpha-value>)',
        },
        orange: {
          lighter: 'rgb(var(--orange-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--orange-default) / <alpha-value>)',
          dark: 'rgb(var(--orange-dark) / <alpha-value>)',
        },
        blue: {
          lighter: 'rgb(var(--blue-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--blue-default) / <alpha-value>)',
          dark: 'rgb(var(--blue-dark) / <alpha-value>)',
        },
        green: {
          lighter: 'rgb(var(--green-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--green-default) / <alpha-value>)',
          dark: 'rgb(var(--green-dark) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'tremor-small': '0.375rem',
        'tremor-default': '0.5rem',
        'tremor-full': '9999px',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        lexend: ['var(--font-lexend)'],
        cal: ['var(--font-cal)', ...fontFamily.sans],
        title: ['var(--font-title)', ...fontFamily.sans],
        mono: ['Consolas', ...fontFamily.mono],
      },
      fontSize: {
        'tremor-label': ['0.75rem'],
        'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      // required these animations for the Loader component
      animation: {
        'meteor-effect': 'meteor 5s linear infinite',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        aurora: 'aurora 60s linear infinite',
        first: 'moveVertical 30s ease infinite',
        second: 'moveInCircle 20s reverse infinite',
        third: 'moveInCircle 40s linear infinite',
        fourth: 'moveHorizontal 40s ease infinite',
        fifth: 'moveInCircle 20s ease infinite',
        wiggle: 'wiggle 0.8s both',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        blink: 'blink 1.4s infinite both;',
        'scale-up': 'scaleUp 500ms infinite alternate',
        'spin-slow': 'spin 4s linear infinite',
        popup: 'popup 500ms var(--popup-delay, 0ms) linear 1',
        skeleton: 'skeletonWave 1.6s linear 0.5s infinite',
        'spinner-ease-spin': 'spinnerSpin 0.8s ease infinite',
        'spinner-linear-spin': 'spinnerSpin 0.8s linear infinite',
        shine: 'shine 2s linear infinite',
      },
      backgroundImage: {
        skeleton: `linear-gradient(90deg,transparent,#ecebeb,transparent)`,
        'skeleton-dark': `linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)`,
      },
      boxShadow: {
        profilePic:
          '0px 2px 4px -2px rgba(0, 0, 0, 0.10), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
        // light
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        // dark
        'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'dark-tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'dark-tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
        moveHorizontal: {
          '0%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
          '50%': {
            transform: 'translateX(50%) translateY(10%)',
          },
          '100%': {
            transform: 'translateX(-50%) translateY(-10%)',
          },
        },
        moveInCircle: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(180deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        moveVertical: {
          '0%': {
            transform: 'translateY(-50%)',
          },
          '50%': {
            transform: 'translateY(50%)',
          },
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        wiggle: {
          '0%, 100%': {
            transform: 'translateX(0%)',
            transformOrigin: '50% 50%',
          },
          '15%': { transform: 'translateX(-6px) rotate(-6deg)' },
          '30%': { transform: 'translateX(9px) rotate(6deg)' },
          '45%': { transform: 'translateX(-9px) rotate(-3.6deg)' },
          '60%': { transform: 'translateX(3px) rotate(2.4deg)' },
          '75%': { transform: 'translateX(-2px) rotate(-1.2deg)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        popup: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        skeletonWave: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '50%': {
            /* +0.5s of delay between each loop */
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        spinnerSpin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        shine: {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
      content: {
        underline: 'url("/public/underline.svg")',
      },
      gridTemplateColumns: {
        '18': 'repeat(18, minmax(0, 1fr))',
      },
      maxWidth: {
        app: '1080px',
      },
      width: {
        1536: '1536px',
      },
      height: {
        150: '37.5rem',
      },
      margin: {
        30: '7.5rem',
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    addVariablesForColors,
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    plugin(function ({ addVariant }) {
      // required this to prevent any style on readOnly input elements
      addVariant('not-read-only', '&:not(:read-only)');
    }),
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'bg-dot-thick': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      );
    },
  ],
}) satisfies Config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}
