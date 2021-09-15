# 经验杂谈

## vue3.0

### 全局属性

#### 2.0的Vue.prototype

#### 3.0的app.config.globalProperties

更多作为插件使用？用于能访问到app的，如插件install的地方?
如果在setup中访问，会有很大的局限性，因为setup难以接触到Vue实例程序

改全局属性策略，仅适用于options api风格的编写，在vue3中最好不要使用

如果一定要用，记得要加ts的声明扩展

#### 3.0的provide/inject

更适合作为2.0的Vue.prototype的替代品?适合composition api风格

### 注意事项

> 尽量，最好，避免使用getCurrentInstance(),其在生产环境存在太多的不确定性
