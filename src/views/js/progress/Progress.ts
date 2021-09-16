import { reactive } from 'vue'
type IStatus = "zero" | "adding" | "loading" | "completed";
interface IData {
    current: number,
    status: IStatus,
    totalTime: number, // 总时长ms
    unitTime: number, // 时间间隔ms
}
class Progress {
    data: IData = {
        current: 0,
        status: 'zero',
        totalTime: 10000,
        unitTime: 17,
    }
    intervalInstance: number | null = null
    constructor() {
        this.data = reactive(this.data)
    }
    start = (totalTime = this.data.totalTime, unitTime = this.data.unitTime) => {
        console.log('==========p start',)
        console.log('==========重置进度',)
        this.data.current = 0
        this.data.status = 'zero'
        this.data.totalTime = totalTime
        this.data.unitTime = unitTime
        this.data.status = 'adding'
        this.destroyInterval()
        this.intervalInstance = setInterval(() => {
            if (this.data.current >= this.data.totalTime) {
                console.log('========== 到达终点',)
                this.destroyInterval()
                this.data.current = this.data.totalTime
                this.data.status = 'loading'
                return
            }
            else {
                this.data.current += this.data.unitTime
            }
        }, this.data.unitTime)
    }
    end = () => {
        console.log('==========p end',)
        console.log('==========结束流程',)
        this.destroyInterval()
        console.log('==========进度直接拉满',)
        this.data.current = this.data.totalTime
        this.data.status = 'completed'
    }
    destroyInterval() {
        if (this.intervalInstance) {
            clearInterval(this.intervalInstance)
            this.intervalInstance = null
        }
    }
}

export {
    Progress
}