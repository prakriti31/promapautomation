import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Shim __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
    server: {
        hmr: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
            },
            '/uploads': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,
            },
        },
        fs: {
            strict: true,
        },
        // ✅ This enables fallback for deep links
        historyApiFallback: true,
    },
});
