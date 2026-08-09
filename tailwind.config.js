/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        birch: '#EDE2CE',
        ivory: '#F4EBDC',
        paper: '#FAF3E4',
        wooddark: '#33220F',
        ink: '#33220F',
        inkSoft: '#4E3A22',
        muted: '#7C6443',
        faint: '#A58D68',
        line: 'rgba(51, 34, 15, 0.14)',
        accent: {
          blue: '#B0893F',
          teal: '#8C6A38',
          lavender: '#8C3A2B',
          gold: '#C9A24B',
          red: '#9E2B20',
          copper: '#B06E3C',
          rosewood: '#8C3A2B',
        },
        status: {
          green: '#5E8C4A',
          amber: '#B06E2E',
          red: '#9E2B20',
          blue: '#A97C2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(96, 64, 26, 0.10), inset 0 1px 0 rgba(255,255,255,0.6)',
        glassHover: '0 16px 48px rgba(122, 88, 30, 0.22), inset 0 1px 0 rgba(255,255,255,0.7)',
        card: '0 2px 12px rgba(51, 34, 15, 0.06)',
        lift: '0 24px 64px -12px rgba(46, 26, 8, 0.3)',
        stamp: '2px 3px 6px rgba(158, 43, 32, 0.28)',
        brass: '0 4px 12px rgba(122, 88, 30, 0.35), inset 0 1px 0 rgba(255,255,255,0.5)',
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
