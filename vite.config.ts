import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Make asset paths work on GitHub Pages even when hosted under a subpath.
  base: process.env.VITE_BASE_URL ?? './',
})
