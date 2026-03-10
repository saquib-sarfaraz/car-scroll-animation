/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        accent: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0f172a',
        mist: '#f6f1e8',
        tide: '#e6f1ee',
        ember: '#f08c48',
        ocean: '#2f6f6c',
      },
      boxShadow: {
        glow: '0 40px 120px -40px rgba(15, 23, 42, 0.45)',
      },
    },
  },
  plugins: [],
}
