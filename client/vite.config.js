/* vite.config.js */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',   // 8000, not 8888
                changeOrigin: true,
                secure: false,
                rewrite: p => p.replace(/^\/api/, ''),
            },
        },
    },
});
