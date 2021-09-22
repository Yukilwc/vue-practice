import { Table, Row, RowFactory } from "@/utils/EditableTable"
class MyRow extends Row {
    data: Record<string, any> = {
        id: undefined,
        aId: '',
        aName: '',
        bId: '',
        bName: "",
        isCheck: false,
        text: '',
    }
    FromAPIRow(res: Record<string, any>): Row {
        let keys = Object.keys(this.data)
        keys.forEach(key => {
            this.data[key] = res[key]
        })
        return this
    }
    check(): string {
        if (!this.data.aId) {
            return 'aId不能为空'
        }
        return ''
    }
    getParams(): Record<string, any> {
        throw new Error("Method not implemented.")
    }

}
class MyTable extends Table {
    getParams(): Record<string, any>[] {
        throw new Error("Method not implemented.")
    }

}
class MyRowFactory extends RowFactory {
    create(): Row {
        return new MyRow()
    }

}
let apiRes: Record<string, any>[] = [
    {
        id: 1,
        aId: '1',
        aName: 'name1',
        bId: '2',
        bName: "name2",
        isCheck: true,
        text: 'text',
        others: null,
    },
    {
        id: 2,
        aId: '2',
        aName: 'name1',
        bId: '8',
        bName: "name2",
        isCheck: true,
        text: 'textddd',
        others: 'aaa',
    },
    {
        id: 3,
        aId: '5',
        aName: 'name1',
        bId: null,
        bName: null,
        isCheck: false,
        text: 'textccc',
        others: 'ddd',
    },
]



describe("EditableTable.ts", () => {
    it('构造空表格', () => {
        let table = new MyTable(new MyRowFactory())
        table = table.EmptyTable()
        expect(table.list).toHaveLength(1)
        expect(table.list[0].data).toHaveProperty('id', undefined)
        expect(table.list[0].status.isEditing).toBe(true)
        expect(table.list[0].status.isAddRow).toBe(true)
    })
    it("构造API数据初始化的表格", () => {
        let table = new MyTable(new MyRowFactory())
        table = table.FromAPITable(apiRes)
        expect(table.list).toHaveLength(apiRes.length + 1)
        table.list.forEach((row, index) => {
            if (index === apiRes.length) {
                expect(row.status).toEqual({
                    isEditing: true,
                    isAddRow: true
                })
                expect(row.data).toHaveProperty('id', undefined)
            }
            else {
                expect(row.status).toEqual({
                    isEditing: false,
                    isAddRow: false
                })
                expect(row.data.id).toEqual(apiRes[index].id)
            }
        })
    })
    it("行校验", () => {
        let table = new MyTable(new MyRowFactory())
        table = table.FromAPITable(apiRes)

        let addRow = table.list[table.list.length - 1]
        addRow.data = {
            aId: null,
            aName: 'name1',
            bId: '8',
            bName: "name2",
            isCheck: true,
            text: 'textddd',
        }
        let msg = addRow.check()
        expect(Boolean(msg)).toBe(true)
        addRow.data = {
            aId: 2,
            aName: 'name1',
            bId: '8',
            bName: "name2",
            isCheck: true,
            text: 'textddd',
        }
        msg = addRow.check()
        expect(Boolean(msg)).toBe(false)

    })
    it("增加", () => {
        let table = new MyTable(new MyRowFactory())
        table = table.FromAPITable(apiRes)

        let addRow = table.list[table.list.length - 1]
        let addData = {
            aId: '2',
            aName: 'name1',
            bId: '8',
            bName: "name2",
            isCheck: true,
            text: 'textddd',
        }
        addRow.data = addData
        table.add()
        expect(table.list).toHaveLength(apiRes.length + 2)
        table.list.forEach((row, index) => {
            if (index === apiRes.length + 1) {
                expect(row.status).toEqual({
                    isEditing: true,
                    isAddRow: true
                })
                expect(row.data).toHaveProperty('id', undefined)
            }
            else if (index === apiRes.length) {
                expect(row.status).toEqual({
                    isEditing: false,
                    isAddRow: false
                })
                expect(row.data).toEqual(addData)
            }
            else {
                expect(row.status).toEqual({
                    isEditing: false,
                    isAddRow: false
                })
                expect(row.data.id).toEqual(apiRes[index].id)
            }
        })
    })
    it("删除", () => {
        let table = new MyTable(new MyRowFactory())
        table = table.FromAPITable(apiRes)
        table.del(0)
        expect(table.list).toHaveLength(apiRes.length)
        expect(table.list[0].data.id).toBe(apiRes[1].id)
    })
    it("编辑&保存", () => {
        let table = new MyTable(new MyRowFactory())
        table = table.FromAPITable(apiRes)
        table.edit(0)
        expect(table.list[0].status).toEqual({
            isEditing: true,
            isAddRow: false
        })
        table.save(0)
        expect(table.list[0].status).toEqual({
            isEditing: false,
            isAddRow: false
        })

    })
    it('行判重', () => {
        let table = new MyTable(new MyRowFactory())
        table = table.FromAPITable(apiRes)

        let addRow = table.list[table.list.length - 1]
        let addData = {
            aId: '2',
            aName: 'name1',
            bId: '9',
            bName: "name9",
            isCheck: true,
            text: 'textddd',
        }
        addRow.data = addData
        table.add()
        let msg = table.checkRepeat((a, b) => {
            return a.data.aId === b.data.aId && a.data.isCheck === b.data.isCheck
        })
        if (msg) {

            expect(Boolean(msg)).toBe(true)
            expect(msg.currentIndex).toBe(1)
            expect(msg.repeatIndex).toBe(3)
        }
        msg = table.checkRepeat((a, b) => {
            return a.data.aId === b.data.aId && a.data.isCheck === b.data.isCheck && a.data.bId === b.data.bId
        })
        expect(Boolean(msg)).toBe(false)

    })
})