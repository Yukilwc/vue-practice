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

// 全局变量注入 globalProperties方案
const $testGlobal = () => {
  console.log('==========test global properties',)
  return 'test global'
}
app.config.globalProperties.$testGlobal = $testGlobal
app.config.globalProperties.$testStr = 'testStr'
console.log('==========', app.config.globalProperties.$testStr)

import { IProductTest } from '@/typings/types'
import { timer } from './utils/tools'
// 全局变量注入provide方案 需要通过泛型进行变量类型的规范和推导

const provideTestStr = 'provideTestStr '

app.provide<IProductTest>('provideTest', () => {
  return 'provideTest'
})
app.provide<string>('provideTestStr', provideTestStr)
app.provide<typeof timer>('timer', timer)

// 性能监听

app.config.performance = true
import GlobalComp from '@/components/GlobalComp.vue'
// 全局组件注册
app.component('GlobalComp', GlobalComp)
// 全局指令注册
import { testDirective } from '@/directives/test-directive'
app.directive('test-directive', testDirective)
app.directive('test-directive-2', {
  mounted(el, binding) {

  }
})
// Mixin
// mixin 有了composition api了，还需要mixin吗？mixin本质是对一组响应式属性，生命周期，方法得复用，而mixin可实现得，compositon api也可以实现

// Plugin
import { pluginTest } from './plugins/pluginTest'
app.use(pluginTest,{config: true})

// 多语言
import '@/language/index'

app.use(store).use(router).mount('#app')