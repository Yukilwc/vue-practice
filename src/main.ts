import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

// ============================================================  全局级别演示 START
// 全局错误捕获
app.config.errorHandler = (err, instance, info) => {
    console.error('==========customer errorHandler err', err)
    console.error('==========customer errorHandler instance', instance)
    console.error('==========customer errorHandler info', info)
}
// ============================================================  全局级别演示 END

// 全局变量注入
const $testGlobal = () => {
  console.log('==========test global properties',)
  return 'test global'
}
app.config.globalProperties.$testGlobal = $testGlobal
app.config.globalProperties.$testStr = 'testStr'
console.log('==========',app.config.globalProperties.$testStr)

app.use(store).use(router).mount('#app')