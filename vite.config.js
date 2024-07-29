import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404',
      writeBundle() {
        fs.copyFileSync(
          path.resolve(__dirname, 'public/404.html'),
          path.resolve(__dirname, 'dist/404.html')
        )
      }
    }
  ],
  base: '/Portfolio/',
})