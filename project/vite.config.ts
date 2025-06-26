import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit if needed
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'pdf-lib': ['jspdf', 'html2canvas'],
          'xlsx': ['xlsx'],
          'framer-motion': ['framer-motion'] // Add framer-motion to manual chunks
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true // Don't try other ports
  },
  preview: {
    port: 4173,
    strictPort: true
  }
});
