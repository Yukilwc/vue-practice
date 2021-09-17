import { Directive } from "vue"

const testDirective: Directive = {
    mounted(el: Element) {
        el.innerHTML = 'test-directive'
        console.log('==========el', el.innerHTML)
    },
}
export {
    testDirective
}