import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

// ============================================================  全局级别演示 START
// 全局错误捕获
// app.config.errorHandler = (err, instance, info) => {
//   console.error('==========customer errorHandler err', err)
//   console.error('==========customer errorHandler instance', instance)
//   console.error('==========customer errorHandler info', info)
// }
// ============================================================  全局级别演示 END

// 全局变量注入 globalProperties方案
const $testGlobal = () => {
  console.log('==========test global properties',)
  return 'test global'
}
app.config.globalProperties.$testGlobal = $testGlobal
app.config.globalProperties.$testStr = 'testStr'
console.log('==========', app.config.globalProperties.$testStr)

import { timer } from './utils/tools'
// 全局变量注入provide方案 需要通过泛型进行变量类型的规范和推导

const provideTestStr = 'provideTestStr '
app.provide<NProvide.IProductTest>('provideTest', () => {
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
})
// Mixin
// mixin 有了composition api了，还需要mixin吗？mixin本质是对一组响应式属性，生命周期，方法得复用，而mixin可实现得，compositon api也可以实现

// Plugin
import { pluginTest } from './plugins/pluginTest'
app.use(pluginTest, { config: true })

// 多语言
import { i18n } from '@/language/index'
import { NProvide } from './typings/provide'
// console.log('==========i18n',i18n)
// import { createI18n } from 'vue-i18n'
// const messages = {
//   en: {
//     message: {
//       hello: 'hello world'
//     }
//   },
//   ja: {
//     message: {
//       hello: 'こんにちは、世界'
//     }
//   }
// }

// // 2. Create i18n instance with options
// const i18n = createI18n({
//   locale: 'ja', // set locale
//   fallbackLocale: 'en', // set fallback locale
//   messages, // set locale messages
//   // If you need to specify other options, you can set other options
//   // ...
// })

app.use(i18n)

app.use(store).use(router).mount('#app')
import { omit } from './utils/js-tools'
console.log('==========', omit)
let omitRes = omit({}, [])

import AOS from 'aos'
import { IInit } from 'aos'
// console.log('==========AOS.init',AOS.init)
// import {myWindow} from '@/typings/customWindow'
window.insertWindowVariable = () => {
  console.log("==========insertWindowVariable ");
};
window.Reflect

