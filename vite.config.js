import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from the root on Vercel, so no base path and no 404.html shim —
// unknown paths are rewritten to index.html by vercel.json instead.
export default defineConfig({
  plugins: [react()],
})
