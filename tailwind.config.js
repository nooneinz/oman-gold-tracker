/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'Tahoma', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        page: 'var(--page)',
        card: 'var(--card)',
        field: 'var(--field)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        gold: 'var(--gold)',
        'gold-strong': 'var(--gold-strong)',
        btn: 'var(--btn)',
      },
      boxShadow: {
        card: 'var(--card-shadow)',
      },
    },
  },
  plugins: [],
}
