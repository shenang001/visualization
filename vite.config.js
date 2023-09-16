import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", 

  plugins: [vue()],
  build:{
    target: ['es2015', 'chrome63'], // 默认是modules,百度说是更改这个会去输出兼容浏览器，尝试没啥作用，先配置吧
  },
  resolve:{
    alias:{
      // 基地址指明
      '@':'./src'
    }
  },
  server:{
    // 热更新
    hmr:true,
  }
})
