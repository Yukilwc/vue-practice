import { Directive } from "vue"

const testDirective: Directive = {
    created() {

    },
    mounted(el: Element, binding) {
        el.innerHTML = 'test-directive'
        console.log('==========el', el.innerHTML)
    },
    updated() {

    }
}
export {
    testDirective
}