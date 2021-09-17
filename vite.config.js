/*
 * @Author: 李文超
 * @Date: 2021-08-24 17:07:48
 * @LastEditors: 李文超
 * @LastEditTime: 2021-08-24 17:25:01
 * @Description: file content
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
console.log('==========',path.resolve(__dirname,'src'))
// https://vitejs.dev/config/
export default defineConfig({ 
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname,'src')
      }
    ] 
  }
})
