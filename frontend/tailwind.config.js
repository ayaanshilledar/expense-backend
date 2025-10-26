/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(153 60% 53%)',
          foreground: 'hsl(0 0% 100%)',
        },
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
        },
        background: {
          DEFAULT: 'hsl(0 0% 98%)',
        },
        border: {
          DEFAULT: 'hsl(214.3 31.8% 91.4%)',
        },
        foreground: {
          DEFAULT: 'hsl(222.2 47.4% 11.2%)',
        },
        muted: {
          DEFAULT: 'hsl(210 40% 96.1%)',
          foreground: 'hsl(215.4 16.3% 46.9%)',
        },
        popover: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(222.2 47.4% 11.2%)',
        },
        input: {
          DEFAULT: 'hsl(214.3 31.8% 91.4%)',
        },
        secondary: {
          DEFAULT: 'hsl(210 40% 96.1%)',
          foreground: 'hsl(222.2 47.4% 11.2%)',
        },
        accent: {
          DEFAULT: 'hsl(210 40% 96.1%)',
          foreground: 'hsl(222.2 47.4% 11.2%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 100% 50%)',
          foreground: 'hsl(210 40% 98%)',
        },
        ring: {
          DEFAULT: 'hsl(215 20.2% 65.1%)',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.5rem',
        sm: '0.5rem',
      }
    },
  },
  plugins: [],
}

