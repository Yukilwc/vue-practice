import { checkRepeat, omit, styleList2Str } from "@/utils/tools"
// import {omit} from '@/utils/js-tools'

describe("tools checkRepeat", () => {
    it("列表为空", () => {
        let list: number[] = []
        let res = checkRepeat(list, (a, b) => a === b)
        expect(res.isRepeat).toBe(false)
    })
    it("列表为基本类型元素", () => {
        let list: number[] = [1, 2, 3, 4, 5, 1, 2, 3]
        let res = checkRepeat(list, (a, b) => a === b)
        expect(res).toEqual({
            isRepeat: true,
            currentIndex: 0,
            repeatIndex: 5
        })
        res = checkRepeat([8, 9, 10], (a, b) => a === b)
        expect(res).toEqual({
            isRepeat: false,
        })

    })
    it("列表为复杂对象", () => {
        let list = [{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 2, name: '2' }, { id: 2, name: '4' }, { id: 8, name: '9', others: '' }]
        let res = checkRepeat(list, (a, b) => a === b)
        expect(res).toEqual({
            isRepeat: false,
        })
        res = checkRepeat(list, (a, b) => a.id === b.id && a.name === b.name)
        expect(res).toEqual({
            isRepeat: true,
            currentIndex: 1,
            repeatIndex: 2
        })

    })
})

describe("tools omit", () => {
    it('omit删除对象中元素', () => {
        let obj = {
            a: ['c'],
            b: 2,
            c: undefined,
            d: null,
            e: '',
            f: 0,
        }
        let omitRes = omit(obj, ['a', 'c', 'e'])
        expect(omitRes).toEqual({
            b: 2,
            d: null,
            f: 0,
        })
        omitRes = omit(obj, ['a', 't'])
        expect(omitRes).toEqual({
            b: 2,
            c: undefined,
            d: null,
            e: '',
            f: 0,

        })
    })
})

describe("tools  styleList2Str", () => {
    it('样式字符串生成', () => {
        let params: { name: string, value: string }[] = []
        let res = styleList2Str(params)
        expect(res).toEqual('')
        res = styleList2Str([
            {
                name:'width',
                value:'10px'
            },
            {
                name:'background-color',
                value:'white',
            }
        ])
        expect(res).toEqual('width:10px;background-color:white;')

    })
})