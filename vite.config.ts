import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: '/impractical-series/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        threaded: resolve(__dirname, 'src/experiments/threaded/index.html'),
        hypnosis: resolve(__dirname, 'src/experiments/hypnosis-spiral/index.html'),
        penumbra: resolve(__dirname, 'src/experiments/penumbra/index.html'),
        parametric: resolve(__dirname, 'src/experiments/parametric-love/index.html'),
        archivist: resolve(__dirname, 'src/experiments/archivist-vault/index.html'),
        astraeus: resolve(__dirname, 'src/experiments/astraeus-flow/index.html'),
        grass: resolve(__dirname, 'src/experiments/just-grass/index.html')
      }
    }
  }
})