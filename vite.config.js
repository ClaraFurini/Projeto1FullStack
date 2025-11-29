/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Usar base relativa por padrão para evitar páginas em branco quando o site é
// servido em caminhos diferentes (ex.: GitHub Pages em domínio de usuário ou
// com nome de repositório diferente). Permite sobrescrever via variável de
// ambiente GH_PAGES_BASE se necessário.
const base = process.env.GH_PAGES_BASE ?? './'

export default defineConfig({
  base,
  plugins: [react()],
})
