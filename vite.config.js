import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Jika masih error blank screen, opsi server ini kadang membantu di local
  server: {
    port: 5173,
    host: true
  }
})
