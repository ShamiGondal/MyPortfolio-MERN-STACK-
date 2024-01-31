import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the correct output directory
    sourcemap: true, // Enable source maps for debugging
    // other build options...
  },
  server: {
    port: 3000, // Specify the development server port
    // other server options...
  },
  // other Vite configuration options...
});
