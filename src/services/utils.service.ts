const isItemsExist = function(items: any[]): boolean {
    let isExist = true
    items.forEach((item) => {
        if(item === null || item.length === 0){
            isExist = false
        }
    })
    return isExist
}

export {
    isItemsExist,
}