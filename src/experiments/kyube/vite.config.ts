import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/impractical-series/src/experiments/kyube/',
  build: {
    outDir: resolve(__dirname, '../../../dist/src/experiments/kyube'),
    emptyOutDir: true,
    target: 'esnext',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
  },
});