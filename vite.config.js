import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: globalThis.process?.env?.BASE_PATH || '/Electrohub/dist/',
  plugins: [react(), tailwindcss()],
})
