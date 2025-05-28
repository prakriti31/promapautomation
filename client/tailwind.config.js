/* eslint-env node */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50:  '#f4f9fc',
                    100: '#e9f2f8',
                    200: '#c9e0f0',
                    300: '#a8cde8',
                    400: '#7fb3dd',
                    500: '#5a9ad1',   // main pastel-blue
                    600: '#4383b8',
                    700: '#326594',
                    800: '#24496b',
                    900: '#162d43',
                },
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
