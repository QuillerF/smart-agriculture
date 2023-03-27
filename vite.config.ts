import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

// 项目信息
import { name } from './package.json'

// 需要代理请求的nginx地址
const proxyArr = [
  'https://console-mock.apipost.cn/mock/1687b7c4-ec1e-4b16-ab7e-b9e85e03300d',
  'http://118.190.113.210:8091'
]

export default defineConfig({
  base: `/`,
  plugins: [
    AutoImport({
      dts: './src/auto-imports.d.ts',
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      resolvers: [ElementPlusResolver(), VueUseComponentsResolver()],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        // 全局属性
        globalsPropValue: true
      }
    }),
    Components({
      dts: './src/components.d.ts',
      dirs: ['src/components/'],
      extensions: ['vue'],
      resolvers: [ElementPlusResolver()]
    }),

    svgLoader({ defaultImport: 'component' }),
    vue(),
    vueJsx()
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
        @import "@/assets/styles/variables.less";
      `,
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: name,
    chunkSizeWarningLimit: 2000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        pure_funcs: ['console.log', 'console.info'],
        drop_debugger: true
      }
    },
    assetsDir: 'static',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8099,
    open: true,
    cors: true,
    // 接口代理
    proxy: {
      '/zhny': {
        target: proxyArr[1],
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/zhny/, '')
      }
    }
  }
})
