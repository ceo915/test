import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Single self-contained index.html for sharing with testers.
// Classic (non-module) script + older JS target so it runs from file:// and in older mobile browsers.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'es2017',
    assetsInlineLimit: 100_000_000,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } },
  },
})
