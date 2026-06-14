import typography from '@tailwindcss/typography';

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [
    typography,
    // ...
  ],
};
