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
        // High-End Light Theme Palette
        'b2b-bg': '#F8FAFC',          // Slate-50 Pure Crisp Light Background
        'b2b-card': '#FFFFFF',        // Pure White Card Background
        'b2b-surface': '#F1F5F9',     // Slate-100 Surface
        'b2b-border': '#CBD5E1',      // Slate-300 Border
        
        // Primary Blue Accent from Logo (Petroleum Teal Blue #3A8899 / #52B5C9)
        'b2b-blue': '#3A8899',         // Primary Petroleum Blue
        'b2b-blue-hover': '#2B6F7E',
        'b2b-blue-dark': '#1F535F',
        'b2b-blue-light': '#52B5C9',   // Light Cyan Blue Highlight
        
        'b2b-text-dark': '#0F172A',    // Slate-900 Deep Charcoal Black
        'b2b-text-muted': '#64748B',   // Slate-500 Muted Text
      },
      fontFamily: {
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'sharp': '0 4px 15px -3px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.04)',
        'b2b': '0 10px 30px -5px rgba(15, 23, 42, 0.08)',
      }
    },
  },
  plugins: [],
}
