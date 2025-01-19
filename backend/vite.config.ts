import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
  server: {
    port: 3000
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    rollupOptions: {
      external: ['reflect-metadata']
    }
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/main.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
      swc: true
    })
  ],
  optimizeDeps: {
    exclude: ['typeorm'],
    include: ['reflect-metadata']
  }
})
