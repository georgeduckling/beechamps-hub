import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0D1B2E',
        gold: '#F5A623',
        'gold-hover': '#FFD166',
        cream: '#FDF9F3',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
