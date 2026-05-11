import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Expose sw.js, manifest.json and icons at root
  publicDir: 'public',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 5173,
    // Serve sw.js with correct MIME type at root during dev
    headers: {
      'Service-Worker-Allowed': '/',
    },
  },
});
