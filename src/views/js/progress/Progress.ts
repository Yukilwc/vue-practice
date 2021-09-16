import { reactive } from 'vue'
type IStatus = "zero" | "adding" | "loading" | "completed";
interface IData {
    current: number,
    status: IStatus
}
class Progress {
    data: IData = {
        current: 0,
        status: 'zero'
    }
    constructor() {
        this.data = reactive(this.data)
    }
    start = () => {
        console.log('==========p start',)
        this.data.status = 'adding'
    }
    end = () => {
        console.log('==========p end',)
        this.data.status = 'completed'
    }
}

export {
    Progress
}