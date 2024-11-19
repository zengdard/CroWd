import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

export default defineConfig({
  plugins: [
    vue(),
    monacoEditorPlugin({
      languageWorkers: ['editorWorkerService', 'typescript']
    })
  ],
  root: '.',
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api.js',
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        manualChunks: {
          'monaco-editor': ['monaco-editor']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})