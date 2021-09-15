
import { ComponentCustomProperties } from 'vue'
declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $testGlobal: () => string
        $testStr: string

    }
}