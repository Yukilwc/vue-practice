const timer = (time:number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('')
        },time);
    })
}

export {
    timer
}