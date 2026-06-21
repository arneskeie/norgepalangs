import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: '/norgepalangs/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main:        resolve(__dirname, 'index.html'),
        omoss:       resolve(__dirname, 'omoss.html'),
        reiserute:   resolve(__dirname, 'reiserute.html'),
        utstyr:      resolve(__dirname, 'utstyr.html'),
        sponsorer:   resolve(__dirname, 'sponsorer.html'),
        galleri:     resolve(__dirname, 'galleri.html'),
        reisebrev1:  resolve(__dirname, 'reisebrev1.html'),
        reisebrev2:  resolve(__dirname, 'reisebrev2.html'),
        reisebrev3:  resolve(__dirname, 'reisebrev3.html'),
        reisebrev4:  resolve(__dirname, 'reisebrev4.html'),
        reisebrev5:  resolve(__dirname, 'reisebrev5.html'),
        reisebrev6:  resolve(__dirname, 'reisebrev6.html'),
      },
    },
  },
})
