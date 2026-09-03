import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// Vite config for the SUB Innovation Club page.
// Output goes to dist/ as static files that can be merged into the
// university CMS (sub.ac.bd) as-is.
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: fileURLToPath(new URL('./index.html', import.meta.url)),
    },
  },
});
