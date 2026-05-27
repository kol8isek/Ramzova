import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f4efe6',
        sand: '#e8dfce',
        stone: {
          950: '#0e0d0b',
          900: '#1a1814',
          800: '#2a2620',
          700: '#3b362d',
        },
        gold: {
          DEFAULT: '#b48a4a',
          light: '#d4b07a',
          dark: '#8a6634',
        },
        forest: '#2e3a2c',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.4em',
      },
      animation: {
        'fade-up': 'fadeUp 1s ease-out forwards',
        'fade-in': 'fadeIn 1.6s ease-out forwards',
        'scroll-down': 'scrollDown 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scrollDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(10px)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
