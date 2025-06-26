import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ['react-intersection-observer'], // Explicitly mark as external
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'pdf-lib': ['jspdf', 'html2canvas'],
          'xlsx': ['xlsx'],
          'framer-motion': ['framer-motion'],
          'intersection-observer': ['react-intersection-observer'] // Add to chunks
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