import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@shared/components/ui': path.resolve(__dirname, './src/shared/components/ui'),
      '@shared/components/icons': path.resolve(__dirname, './src/shared/components/icons'),
    },
  },
  plugins: [react()],
})
