import { NProvide } from "@/typings/provide";

const timer = (time: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('')
        }, time);
    })
}

const provideTestInJs: NProvide.IProductTest = () => '测试ts中对全局类型使用'

export {
    timer
}