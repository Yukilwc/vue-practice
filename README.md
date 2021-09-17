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

### 响应性

#### class实例的相应式修改

对于类实例，进行relative,修改成响应性对象，此时，直接通过实例访问，可以发生响应变化。
但是，如果在类实例中，通过this进行修改，则不会。
原因是，this是类自身得类实例，是没有经过响应性包装得，因此无法修改.

能想到的解决方案: 

* 传入已经响应性化得实例，作为_this,需要多添加一个_this属性和init方法
* 类内需要暴露得对象，进行relative化,需要多添加一个data对象


[关于这个问题得回答](https://stackoverflow.com/questions/67894487/vue-3-reactivity-not-triggered-from-inside-a-class-instance)

以及官方文档得建议
> The best practice here is to never hold a reference to the original raw object and only work with the reactive version:
[Link](https://v3.vuejs.org/guide/reactivity.html#proxy-vs-original-identity)

也就是说，对于添加了响应式得对象，最好不要通过任何形式引用其非响应式得原对象，而this就是跳过了proxy，直接对原生对象进行了引用.

### mixin

在 Vue 2 中，mixin 是将部分组件逻辑抽象成可重用块的主要工具。但是，他们有几个问题：

Mixin 很容易发生冲突：因为每个 mixin 的 property 都被合并到同一个组件中，所以为了避免 property 名冲突，你仍然需要了解其他每个特性。

可重用性是有限的：我们不能向 mixin 传递任何参数来改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性。

为了解决这些问题，我们添加了一种通过逻辑关注点组织代码的新方法：组合式 API。

因此，vue3中，不要使用mixn
### 注意事项

> 尽量，最好，避免使用getCurrentInstance(),其在生产环境存在太多的不确定性

> 不要在setup中使用async await，这会导致无法显示页面,需要的话，在生命周期钩子里使用

## 类型推断

### 从最基层开始明确类型

从定义的变量，原子函数开始，类型就是确定的，从而从底向上的进行推导

### 尽可能不用 as any等

如果用，则列举出用的情景
## 构建

### 注意事项

> 最好使用npm install,而不要使用cnpm,因为cnpm会引起Error: Cannot find module vue-loader-v16/package.json 等错误