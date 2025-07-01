/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50:  '#fdf6f0',  // very light peach
                    100: '#fae8d9',  // peach cream
                    200: '#f6d3c2',  // light coral pastel
                    300: '#f1bfb0',  // muted peach pink
                    400: '#eca8aa',  // soft blush pink
                    500: '#d88e96',  // pastel rose
                    600: '#b76f7b',  // dusty rose
                    700: '#995d6d',  // muted mauve
                    800: '#7c495c',  // plum base
                    900: '#623547',  // deep burgundy rose
                },
            },
            keyframes: {
                slideshow: {
                    '0%':   { transform: 'scale(1.1)', opacity: 0 },
                    '8%':   { opacity: 1 },
                    '25%':  { transform: 'scale(1)',  opacity: 1 },
                    '33%':  { opacity: 0 },
                    '100%': { opacity: 0 },
                },
                fadeUp: {
                    '0%':   { opacity: 0, transform: 'translateY(30px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
            animation: {
                slideshow: 'slideshow 20s ease-in-out infinite',
                fadeUp: 'fadeUp 0.8s ease forwards',
            },
        },
    },
    plugins: [],
};
