# 经验杂谈

## vue3.0

### vue文件中使用全局类型

vue文件是无法识别全局类型的，ts文件可以，这是配置问题？
总之可以先定义模块级别的，反正引入也方便



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

## Typescript

### class

属性是可以不赋值初始化的，前提是，构造函数中已经进行了赋值

### type与interface

* type能定义原始类型，从定义的广度上比interface大
* 一般继承extends，使用interface比较多

### 函数重载

#### 情景
#### 重载的规则

* 参数不同
* 函数名相同
* 函数体共用

### 装饰器

#### 分类

* 类
* 属性
* 方法
* 参数

#### 装饰器工厂

### 泛型

* 泛型可以参与参数，返回值的类型定义，常用于工具类函数的编写
* 泛型使用时，是可以自行推导的，不用一定指定<>类型，可以通过参数类型推导

### 技巧

* 为对象动态分配属性，一般使用 Record,如果过于定制化，可以使用索引签名+部分属性定义
* 

### 模块

模块可理解成 Vue 中的单个 vue 文件，它是以功能为单位进行划分的，一个模块负责一个功能。其与 namespace 的最大区别在于：namespace 是跨文件的，module 是以文件为单位的，一个文件对应一个 module。
### 从最基层开始明确类型

从定义的变量，原子函数开始，类型就是确定的，从而从底向上的进行推导

### 尽可能不用 as any等

如果用，则列举出用的情景

### import文件需要写清楚后缀

由于ts通过import的文件后缀判定是否进行编译，因此 .vue  .ts都要写清除
## 构建

### 注意事项

> 最好使用npm install,而不要使用cnpm,因为cnpm会引起Error: Cannot find module vue-loader-v16/package.json 等错误

### 配置文件

> 不论是vue.config.js还是vite.config.js，最好都不要加成ts，好像tsconfig.json中没包含对配置js的解析
### 关于eslint

#### 彻底关闭(不推荐)

* vue.config.js添加 lintOnSave: false
* 注释 .ellintrc.js中，extends中的插件，但是extends数组还是要保留的。

#### 仅添加部分rules的off