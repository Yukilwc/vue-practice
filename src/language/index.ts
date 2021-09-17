import module1 from './dictionary/module1'
import module2 from './dictionary/module2'
import * as R from 'ramda'
import { createI18n } from 'vue-i18n'
// 同名检查

let keys1 = R.keys(module1)
let keys2 = R.keys(module2)
let keys = R.union(keys1, keys2)

if (keys.length < (keys1.length + keys2.length)) {
    throw new Error('翻译字段命名重复')
}
let modules = {
    ...module1,
    ...module2
}
type IModules = typeof modules
type IKeys = typeof keys
// interface ILang {
//     [name: string]: ILang | string
// }

// 语言生成
const getLang = (langIndex: number, modules: IModules) => {
    let res = R.mapObjIndexed((moduleValue, moduleKey) => {
        let moduleItem = {

        }
        R.forEachObjIndexed((itemValue, itemKey) => {
            if (itemValue[langIndex]) {
                moduleItem[itemKey] = itemValue[langIndex]
            }
            // else return `${moduleKey}.${itemKey}`
            else return ``
        }, moduleValue)
        return moduleItem
    }, modules)
    return res
}

let cn = getLang(0, modules)
let en = getLang(1, modules)

const messages = {
    "zh-CN": cn,
    "en-US": en,
}
type ICnMessageSchema = typeof cn
console.log('==========messages', messages)
const i18n = createI18n({
    locale: 'zh-CN',
    fallbackLocale: 'zh-CN',
    messages: messages
})
export {
    i18n
}