// type IOmit = (obj: object, list: string[]) => any

// declare module "*/js-tools" {
//     export const omit:IOmit
// }
declare module '*.vue' {
    import {omit} from '@/utils/js-tools'
    export {omit}
}
export {}