/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stranger Things color palette
        'upside-down': {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
          600: '#242424',
          500: '#2d2d2d',
        },
        'blood-red': {
          DEFAULT: '#8B0000',
          light: '#DC143C',
          neon: '#FF0040',
          glow: '#FF1744',
        },
        'hawkins': {
          dark: '#1C1C1C',
          gray: '#3A3A3A',
          fog: '#4A4A4A',
          light: '#808080',
        },
        'neon': {
          red: '#FF0040',
          pink: '#FF1493',
          blue: '#00D4FF',
        }
      },
      fontFamily: {
        'stranger': ['ITC Benguiat', 'Georgia', 'serif'],
        'retro': ['VT323', 'Courier New', 'monospace'],
        'display': ['Bebas Neue', 'Impact', 'sans-serif'],
      },
      backgroundImage: {
        'fog-gradient': 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.6) 50%, rgba(0,0,0,0.9) 100%)',
        'red-glow': 'radial-gradient(circle, rgba(139,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
        'upside-pattern': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23222222\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      boxShadow: {
        'neon-red': '0 0 5px #FF0040, 0 0 20px #FF0040, 0 0 40px #8B0000',
        'neon-glow': '0 0 10px rgba(255,0,64,0.5), 0 0 20px rgba(255,0,64,0.3), 0 0 30px rgba(255,0,64,0.2)',
        'inner-glow': 'inset 0 0 20px rgba(255,0,64,0.1)',
      },
      animation: {
        'flicker': 'flicker 2s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 1,
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
          },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px #FF0040, 0 0 20px #FF0040',
          },
          '50%': {
            boxShadow: '0 0 20px #FF0040, 0 0 40px #FF0040, 0 0 60px #8B0000',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
      },
    },
  },
  plugins: [],
}
