import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name: string) => `vant/es/${name}/style`
        }
      ]
    })
  ],
  resolve: {
    alias:{
      '@': path.resolve(__dirname, './src'),//设置别名
      '_c': path.resolve(__dirname, './src/components')
    }
  },
  build: {
    assetsInlineLimit: 10240, // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
    cssCodeSplit: true, // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在块加载时插入。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
    sourcemap: false
  },
})
