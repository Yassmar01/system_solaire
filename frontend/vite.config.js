import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// https://vitejs.dev/config/

export default defineConfig({
    plugins: [react()],
    base: './', // Necessary for Electron
    build: {
      outDir: 'dist', // Output directory
    },
    server: {
      port: 3000, // Vite's dev server
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
  });
