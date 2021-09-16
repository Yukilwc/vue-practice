import { Plugin } from 'vue'
interface IOptions  {
    config: boolean
}
const pluginTest: Plugin = {
    install(app, options:IOptions) {
        // app.provide
        console.log('==========install plugin',)
    }
}

export {
    pluginTest
}