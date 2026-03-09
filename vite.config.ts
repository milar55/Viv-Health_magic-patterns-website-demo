import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Viv-Health_magic-patterns-website-demo/',
  plugins: [react()],
})
