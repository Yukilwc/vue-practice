

declare namespace NProvide {
    type IProductTest = () => string
    const variableType: string
    const variableValue = '1'
}

export {NProvide}
// 此种定义方式，可以让类型成为全局 但是只能ts文件中使用，vue文件中无法使用，如果想全部通用，那么得定义module吧，让ts主动去匹配
// declare type IProductTest = ()=>string
