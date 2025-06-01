import { defineConfig } from 'vite';
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
