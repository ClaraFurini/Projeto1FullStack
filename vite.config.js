import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Garantir que os assets sejam resolvidos no caminho correto ao servir pelo GitHub Pages
  base: '/Projeto1FullStack/',
  plugins: [react()],
})
