/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: 'var(--charcoal)',
        electric: 'var(--electric)',
        steel: 'var(--steel)',
        offwhite: 'var(--offwhite)',
        'bg-900': 'var(--bg-900)',
        'bg-800': 'var(--bg-800)',
        'bg-700': 'var(--bg-700)',
        accent: 'var(--accent)',
        secondary: 'var(--secondary)',
        text: 'var(--text)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '120': '120ms',
        '150': '150ms',
      },
      transitionTimingFunction: {
        'snap': 'cubic-bezier(0.2, 0.9, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.12s cubic-bezier(0.2, 0.9, 0.2, 1)',
        'slide-up': 'slideUp 0.12s cubic-bezier(0.2, 0.9, 0.2, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(6px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

