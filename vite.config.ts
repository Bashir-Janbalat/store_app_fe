import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    build: {
        sourcemap: false,
        chunkSizeWarningLimit: 800,
        target: 'esnext',
        minify: 'esbuild',
    },
    server: {
        host: true,          // يسمح لأي IP (مطلوب داخل Docker)
        port: 4000,          // يطابق منفذ Docker
        open: false          // لا تفتح المتصفح تلقائيًا داخل الحاوية
    },
    optimizeDeps: {
        include: [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
            'stylis',
            'stylis-plugin-rtl',
        ],
    },
});
