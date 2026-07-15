//import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url' //per alias @/(pto 2)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url))} //per alias @/(pto 2)
  },
  test: {
    environment:'jsdom',
    globals: true
  },
})
