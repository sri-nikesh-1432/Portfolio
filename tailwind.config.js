/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F6F7FB',
        ivory: '#FAF8F3',
        paper: '#FDFBF7',
        ink: '#0E1526',
        inkSoft: '#2A3550',
        muted: '#5A6B85',
        faint: '#8B97AD',
        line: 'rgba(14, 21, 38, 0.08)',
        accent: {
          blue: '#4C8DFF',
          teal: '#2BB6A7',
          lavender: '#8B7CF6',
          gold: '#C9A24B',
          red: '#C5221F',
        },
        status: {
          green: '#2E9E6B',
          amber: '#C77D2E',
          red: '#C5221F',
          blue: '#3B6FE0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(31, 38, 135, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        glassHover: '0 16px 48px rgba(76, 141, 255, 0.18), inset 0 1px 0 rgba(255,255,255,0.7)',
        card: '0 2px 12px rgba(14, 21, 38, 0.05)',
        lift: '0 24px 64px -12px rgba(14, 21, 38, 0.18)',
        stamp: '2px 3px 6px rgba(197, 34, 31, 0.28)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(4%, -3%) scale(1.05)' },
          '66%': { transform: 'translate(-3%, 3%) scale(0.97)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        floatSlow: 'float 11s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        blink: 'blink 1.1s step-end infinite',
        marquee: 'marquee 32s linear infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
        riseIn: 'riseIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
