import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      // 基地址指明
      '@':'./src'
    }
  },
  server:{
    // 热更新
    hmr:true,
    host: 'localhost',
    // port: 8080, // 端口
    proxy: {
      '/api': { // 请求接口中要替换的标识
          target: 'https://api.imooc-web.lgdsunday.club/api', // 代理地址
          changeOrigin: true, // 是否允许跨域
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, '') // api标志替换为''
      }
  }
  }
})
