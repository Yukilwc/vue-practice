
import * as R from 'ramda'
// import { NProvide } from "@/typings/provide";

const timer = (time: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('')
        }, time);
    })
}

// 判重,并返回重复的详细信息，包括重复的两个元素及其索引
interface IRepeatRes {
    isRepeat: boolean,
    currentIndex?: number,
    repeatIndex?: number
}
type ICheckRepeat = <T>(list: T[], compareFunc: (a: T, b: T) => boolean) => IRepeatRes
const checkRepeat: ICheckRepeat = (list, compareFunc) => {
    let currentIndex = -1
    let repeatIndex = -1
    let afterList = [...list]
    list.find((item, index) => {
        let first = afterList.shift() as (typeof list)[number]
        let findFirstInAfter = afterList.find((afterItem, afterIndex) => {
            if (compareFunc(first, afterItem)) {
                currentIndex = index
                repeatIndex = afterIndex + list.length - afterList.length
                return true
            }
            else return false
        })
        if (findFirstInAfter) {
            return true
        }
        else return false
    })
    // 检查全部元素是否都独一无二
    if (currentIndex !== -1 && repeatIndex !== -1) {
        return {
            isRepeat: true,
            currentIndex,
            repeatIndex
        }
    }
    else {
        return {
            isRepeat: false
        }
    }

}

// type IOmit = (obj: Record<string, any>, list: string[]) =>   Record<string, any>

const omit = (obj: any, list: readonly string[]) => {
    return R.omit(list, obj)
    // if (!obj || !list || list.length <= 0) {
    //     return {...obj}
    // }
    // let newObj = { ...obj }
    // list.forEach(key => {
    //     newObj[key] = undefined
    // });
    // return newObj
}
type IStyleList2Str = (styleList: {name:string,value:string}[]) => string
const styleList2Str: IStyleList2Str = (styleList) => {
    let styleStr = styleList.reduce((total, curr) => {
        let name = curr.name
        let value = curr.value
        if (name && value) {
            let styleItem = `${name}:${value};`
            return total + styleItem
        }
        else {
            return total
        }
    }, '')
    return styleStr

}

// const provideTestInJs: NProvide.IProductTest = () => '测试ts中对全局类型使用'
export {
    timer,
    checkRepeat,
    omit,
    styleList2Str
}