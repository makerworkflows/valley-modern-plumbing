import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        leakDetection: resolve(__dirname, 'leak-detection-mcallen-tx.html'),
        drainCleaning: resolve(__dirname, 'drain-cleaning-mcallen-tx.html'),
        commercialPlumber: resolve(__dirname, 'commercial-plumber-mcallen-tx.html'),
        pipeRepair: resolve(__dirname, 'pipe-repair-mcallen-tx.html'),
        sewerRepair: resolve(__dirname, 'sewer-repair-mcallen-tx.html'),
      },
    },
  },
})
