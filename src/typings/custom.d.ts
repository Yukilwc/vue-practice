declare global {
    // interface MyWindow extends Window {
    //     insertWindowVariable: () => any
    // }
    // declare var window: MyWindow;
    interface Window {
        insertWindowVariable: () => any
    }
}

// let myWindow:MyWindow = window
// export {
//     MyWindow,
//      myWindow
// }