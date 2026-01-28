import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/flc-application/",
  envPrefix: 'VITE_',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
