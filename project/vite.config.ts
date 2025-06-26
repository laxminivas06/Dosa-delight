import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: [], // Empty array ensures all dependencies are bundled
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('jspdf') || id.includes('html2canvas')) return 'pdf-lib';
            if (id.includes('xlsx')) return 'xlsx';
            if (id.includes('framer-motion')) return 'framer-motion';
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true
  },
  preview: {
    port: 4173,
    strictPort: true
  }
});