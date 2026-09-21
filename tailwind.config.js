/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#07090e',
          card: '#0d1117',
          surface: '#111827',
          border: '#1f293d',
          violet: '#a855f7',
          cyan: '#00f0ff',
          neon: '#39ff14',
          amber: '#f59e0b',
          rose: '#f43f5e'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'neon-violet': '0 0 25px rgba(168, 85, 247, 0.45)',
        'neon-cyan': '0 0 25px rgba(0, 240, 255, 0.45)',
        'neon-inferno': '0 0 25px rgba(245, 158, 11, 0.45)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 24px rgba(0, 240, 255, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
