import { checkRepeat } from "@/utils/tools"

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