import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: '/norgepalangs-ny/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main:       resolve(__dirname, 'index.html'),
        omoss:      resolve(__dirname, 'omoss.html'),
        reiserute:  resolve(__dirname, 'reiserute.html'),
        reisebrev:  resolve(__dirname, 'reisebrev.html'),
        utstyr:     resolve(__dirname, 'utstyr.html'),
      },
    },
  },
})
