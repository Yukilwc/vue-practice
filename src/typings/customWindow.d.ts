interface MyWindow extends Window {
    insertWindowVariable: () => any
}
let myWindow:MyWindow = window
export {
    MyWindow,
     myWindow
}