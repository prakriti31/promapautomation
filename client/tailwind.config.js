/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50:  '#fefbf5',  // pastel cream
                    100: '#fff4db',  // light buttery yellow
                    200: '#ffe9b9',  // soft lemon yellow
                    300: '#ffdda1',  // mellow sunflower
                    400: '#ffc682',  // golden peach
                    500: '#fba479',  // warm apricot (blend of red & yellow)
                    600: '#f2796e',  // pastel coral red
                    700: '#dd5e69',  // rosewood
                    800: '#b94653',  // dusty reddish mauve
                    900: '#913845',  // burgundy
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
            },
            animation: {
                slideshow: 'slideshow 20s ease-in-out infinite',
                fadeUp: 'fadeUp 0.8s ease forwards',
                marquee: 'marquee 40s linear infinite',
                scalePulse: 'scalePulse 0.4s ease-in-out',
                cardPop: 'cardPop 0.4s ease-in-out',
            },
        },
    },
    plugins: [],
};
