/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50:  '#fdfdfd',  // almost white
                    100: '#f5f5f5',  // soft white
                    200: '#e5e5e5',  // pastel grey
                    300: '#d4d4d4',  // light grey
                    400: '#bfbfbf',  // medium grey
                    500: '#999999',  // muted grey
                    600: '#7d7d7d',  // soft charcoal
                    700: '#5e5e5e',  // smoky grey
                    800: '#3e3e3e',  // near-black
                    900: '#1f1f1f',  // soft black
                },
            },
            keyframes: {
                slideshow: {
                    '0%':   { transform: 'scale(1.1)', opacity: 0 },
                    '8%':   { opacity: 1 },
                    '25%':  { transform: 'scale(1)', opacity: 1 },
                    '33%':  { opacity: 0 },
                    '100%': { opacity: 0 },
                },
                fadeUp: {
                    '0%':   { opacity: 0, transform: 'translateY(30px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                marquee: {
                    '0%':   { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                scalePulse: {
                    '0%': { transform: 'scale(1)', opacity: 1 },
                    '50%': { transform: 'scale(1.05)', opacity: 0.9 },
                    '100%': { transform: 'scale(1)', opacity: 1 },
                },
                cardPop: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.03)', boxShadow: '0 0 0 4px rgba(0,0,0,0.1)' },
                    '100%': { transform: 'scale(1)' },
                },
                pastelFade: {
                    '0%': {
                        background: 'linear-gradient(135deg, #f5f5f5, #e5e5e5)',
                    },
                    '50%': {
                        background: 'linear-gradient(135deg, #d4d4d4, #fdfdfd)',
                    },
                    '100%': {
                        background: 'linear-gradient(135deg, #f5f5f5, #bfbfbf)',
                    },
                },
            },
            animation: {
                slideshow: 'slideshow 20s ease-in-out infinite',
                fadeUp: 'fadeUp 0.8s ease forwards',
                marquee: 'marquee 40s linear infinite',
                scalePulse: 'scalePulse 0.4s ease-in-out',
                cardPop: 'cardPop 0.4s ease-in-out',
                pastelFade: 'pastelFade 12s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
