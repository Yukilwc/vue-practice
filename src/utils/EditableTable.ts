// 可编辑表格抽象 基于开放封闭原则,对扩展开放，对修改封闭,每次改动不应该对Row和Table进行修改
// vue3如何令该表格变成响应式?


// 抽象可编辑表格行
abstract class Row {
    abstract data: Record<string, any> = {

    }
    status = {
        isEditing: false, // 行的编辑状态
        isAddRow: false // 是用于添加的行
    }
    constructor() {

    }
    // 构造函数 构造一个添加行
    AddRow = () => {
        this.status.isAddRow = true
        this.status.isEditing = true
        return this
    }
    // throw new Error('抽象方法禁止调用')
    edit = () => {
        this.status.isEditing = true
    }
    save = () => {
        this.status.isEditing = false
    }
    // 构造函数 从接口数据构造
    abstract FromAPIRow(res: Record<string, any>): Row
    abstract check(): string
    abstract getParams(): Record<string, any>

}
// 抽象可编辑表格类
abstract class Table {
    list: Row[] = []
    rowFactory: RowFactory
    constructor(rowFactory: RowFactory) {
        console.log('==========Table construct start',)
        this.rowFactory = rowFactory
    }
    // 构造函数 空表格构造
    EmptyTable = () => {
        this.list = []
        this.list.push(this.rowFactory.create().AddRow())
        return this
    }
    // 构造函数 从接口数据构造
    FromAPITable = (res: Record<string, any>[]) => {
        let data = res;
        data.forEach((item) => {
            this.list.push(this.rowFactory.create().FromAPIRow(item));
        });
        this.list.push(this.rowFactory.create().AddRow())
        // console.log("==========table fromBackend ", this);
        return this;
    }
    // 返回当前正在添加状态的行，一般都是最后一行
    getAddingRow = () => {
        return this.list.find(item => item.status.isAddRow)
    }
    add = () => {
        const row = this.getAddingRow()
        if (row) {
            row.status.isAddRow = false
            row.status.isEditing = false
            this.list.push(this.rowFactory.create().AddRow())
        }
        else throw new Error('add未找到要添加的行')
    }
    del = (index: number) => {
        this.list.splice(index, 1);
    }
    edit = (index: number) => {
        let row = this.list[index]
        row.edit()
    }
    save = (index: number) => {
        let row = this.list[index]
        row.save()
    }
    // 大于一行
    isOverZero = () => {
        if (this.list.filter(item => !item.status.isAddRow).length > 0) {
            return ''
        }
        else {
            return '请至少添加一条信息'
        }
    }
    // 全部已经保存了
    isAllSaved = () => {
        let findRes = this.list.find(item => item.status.isEditing && !item.status.isAddRow)
        if (findRes) {
            return '有未保存的信息'
        }
        return ''

    }
    // 判重,并返回重复的详细信息，包括重复的两个row及其索引
    checkRepeat = (compareFunc: (a: Row, b: Row) => boolean) => {
        // 元素在数组中是独一无二的
        function isNotUnique(currentRow: Row, currentIndex: number, list: Row[]) {
            let findIndex = -1
            let findRes = list.find((item, index) => {
                if (index !== currentIndex && compareFunc(currentRow, item)) {
                    // 存在
                    findIndex = index
                    return true
                }
                else {
                    return false
                }
            })
            if (findRes) {
                return {
                    currentRow,
                    currentIndex,
                    repeatRow: findRes,
                    repeatIndex: findIndex
                }
            }
            else {
                return null
            }
        }
        // 检查全部元素是否都独一无二
        let notUniqueRes: {
            currentRow: Row | null
            currentIndex: number
            repeatRow: Row | null
            repeatIndex: number
        } = {
            currentRow: null,
            currentIndex: -1,
            repeatRow: null,
            repeatIndex: -1
        }
        let findIsNotUnique = this.list.find((currentRow, currentIndex) => {
            let res = isNotUnique(currentRow, currentIndex, this.list)
            if (res) {
                notUniqueRes = res
                return true
            }
            else {
                return false
            }
        })
        if (findIsNotUnique) {
            return notUniqueRes
        }
        else {
            return null
        }
    }
    abstract getParams(): Record<string, any>[]

}
// 用来实例化可编辑表格的工厂
// class TableFactory {

// }

abstract class RowFactory {
    constructor() {
    }
    abstract create(): Row
}

// 使用举例

// class MyRow extends Row {
//     data: Record<string, any> = {
//         id: 1,
//         name: '',
//     }
//     FromAPIRow = (res: Record<string, any>) => {
//         // mapObj(this.data, res);
//         this.data.id = res.id
//         this.data.name = res.name
//         this.status.isEditing = false
//         this.status.isAddRow = false
//         return this;

//     }
//     check(): string {
//         // let va = new Validator()
//         // va.add(this.data.id, [['isNotEmpty', '请选择id']])
//         // va.add(this.data.name, [['isNotEmpty', '请选择name']])
//         // let { errorMsg } = va.start()
//         // return errorMsg;
//         return ''
//     }
//     getParams(): Record<string, any> {
//         // return omit(this.data, ['name'])
//         return { id: this.data.id }
//     }

// }

// // 业务相关的可编辑表格类
// class MyTable extends Table {
//     constructor(rowFactory: RowFactory) {
//         super(rowFactory)
//     }
//     getParams(): Record<string, any>[] {
//         let params = this.list.filter(item => !item.status.isAddRow).map(item => item.data)
//         params = params.map(item => {
//             // return omit(item, ['name'])
//             return item
//         })
//         console.log('==========table get params', params)
//         return params

//     }

// }

// // 实现工厂方法

// class MyRowFactory extends RowFactory {
//     create = () => {
//         return new MyRow()
//     }

// }


// let factory = new MyRowFactory()
// const table = new MyTable(factory)

export {
    Table, Row, RowFactory
}