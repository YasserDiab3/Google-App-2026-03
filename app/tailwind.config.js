/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Breakpoints aligned with legacy design-tokens.css
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1600px',
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1e40af',
          light: '#3b82f6',
        },
        brand: {
          DEFAULT: '#003865',
          mid: '#004C8C',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#aa3636',
        info: '#06b6d4',
        purple: '#8b5cf6',
      },
      fontFamily: {
        // Arabic-first font stack
        sans: ['Cairo', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'Arial', 'Helvetica', 'sans-serif'],
      },
      // Layout dimension tokens (aligned with legacy design-tokens.css)
      spacing: {
        sidebar: '280px',
        'sidebar-collapsed': '70px',
        header: '64px',
        'header-mobile': '56px',
        // Button height tokens
        'btn-sm': '36px',
        'btn-md': '44px',
        'btn-lg': '52px',
        // Icon button tokens
        'icon-sm': '32px',
        'icon-md': '40px',
        'icon-lg': '44px',
        // KPI
        'kpi-icon': '48px',
      },
      minHeight: {
        'touch': '44px',   // WCAG minimum touch target
        'btn': '44px',
        'btn-sm': '36px',
        'btn-lg': '52px',
        'input': '44px',
      },
      minWidth: {
        'touch': '44px',
        'btn': '44px',
        'kpi': '140px',
      },
      zIndex: {
        dropdown: '100',
        sticky: '200',
        overlay: '300',
        modal: '400',
        toast: '500',
        tooltip: '600',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
        md: '0 4px 6px -1px rgba(0,0,0,0.1)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.1)',
        card: '0 2px 8px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
