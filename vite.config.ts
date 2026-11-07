import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // GitLab Pages serves projects from /<project-name>/ unless a custom domain
  // or user/group page is used. Override with VITE_BASE_PATH in CI if needed.
  base: process.env.VITE_BASE_PATH ?? '/',

  plugins: [react()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    // Default locals convention keeps BEM names as-is:
    // styles['portfolio-card__title--featured'] (see src/utils/bem.ts).
    modules: {
      // Readable in dev, short in prod. A single "_" separator avoids
      // colliding with BEM's "__" (element) and "--" (modifier).
      generateScopedName:
        mode === 'production' ? '[hash:base64:6]' : '[local]_[hash:base64:5]',
    },
    devSourcemap: true,
  },
}))
