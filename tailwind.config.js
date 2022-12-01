const path = require('path');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * Themes
 */
const themes = {
  // Default theme is required for theming system to work correctly
  default: {
    primary: {
      ...colors.indigo,
      DEFAULT: colors.indigo[600],
    },
    accent: {
      ...colors.slate,
      DEFAULT: colors.slate[800],
    },
    warn: {
      ...colors.red,
      DEFAULT: colors.red[600],
    },
    'on-warn': {
      500: colors.red['50'],
    },
  },
  // Rest of the themes will use the 'default' as the base
  // theme and extend it with their given configuration
  teal: {
    primary: {
      ...colors.teal,
      DEFAULT: colors.teal[600],
    },
  },
  purple: {
    primary: {
      ...colors.purple,
      DEFAULT: colors.purple[600],
    },
  },
  amber: {
    primary: colors.amber,
  },
};

/**
 * Tailwind configuration
 */
const config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,scss,ts}', './projects/**/*.{html,scss,ts}'],
  important: true,
  theme: {
    fontFamily: {
      sans: ['IRANSansX', ...defaultTheme.fontFamily.sans],
    },
    screens: {
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1440px',
    },
    extend: {
      flex: {
        0: '0 0 auto',
      },
      zIndex: {
        '-1': -1,
        49: 49,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        99: 99,
        999: 999,
        9999: 9999,
        99999: 99999,
      },
      spacing: {
        // Bigger values
        100: '25rem',
        120: '30rem',
        128: '32rem',
        140: '35rem',
        160: '40rem',
        180: '45rem',
        192: '48rem',
        200: '50rem',
        240: '60rem',
        256: '64rem',
        280: '70rem',
        320: '80rem',
        360: '90rem',
        400: '100rem',
        480: '120rem',

        // Fractional values
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
      },
      minHeight: ({ theme }) => ({
        ...theme('spacing'),
      }),
      maxHeight: {
        none: 'none',
      },
      minWidth: ({ theme }) => ({
        ...theme('spacing'),
        screen: '100vw',
      }),
      maxWidth: ({ theme }) => ({
        ...theme('spacing'),
        screen: '100vw',
      }),

      // @tailwindcss/typography
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'var(--color-text-default)',
            '[class~="lead"]': {
              color: 'var(--color-text-secondary)',
            },
            a: {
              color: 'var(--color-primary-500)',
            },
            strong: {
              color: 'var(--color-text-default)',
            },
            'ol > li::before': {
              color: 'var(--color-text-secondary)',
            },
            'ul > li::before': {
              backgroundColor: 'var(--color-text-hint)',
            },
            hr: {
              borderColor: 'var(--color-border)',
            },
            blockquote: {
              color: 'var(--color-text-default)',
              borderLeftColor: 'var(--color-border)',
            },
            h1: {
              color: 'var(--color-text-default)',
            },
            h2: {
              color: 'var(--color-text-default)',
            },
            h3: {
              color: 'var(--color-text-default)',
            },
            h4: {
              color: 'var(--color-text-default)',
            },
            'figure figcaption': {
              color: 'var(--color-text-secondary)',
            },
            code: {
              color: 'var(--color-text-default)',
              fontWeight: '500',
            },
            'a code': {
              color: 'var(--color-primary)',
            },
            pre: {
              color: theme('colors.white'),
              backgroundColor: theme('colors.zinc.800'),
            },
            thead: {
              color: 'var(--color-text-default)',
              borderBottomColor: 'var(--color-border)',
            },
            'tbody tr': {
              borderBottomColor: 'var(--color-border)',
            },
            'ol[type="A" s]': false,
            'ol[type="a" s]': false,
            'ol[type="I" s]': false,
            'ol[type="i" s]': false,
          },
        },
      }),
    },
  },
  plugins: [
    require(path.resolve(__dirname, './src/tailwind-preset/plugins/utilities')),
    require(path.resolve(__dirname, './src/tailwind-preset/plugins/icon-size')),
    require(path.resolve(__dirname, './src/tailwind-preset/plugins/theming'))({
      themes,
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};

module.exports = config;
