enum LocalStorageKeys {
    TOKEN = 'user-token'
}

const getTokenFromLocalStorage = () => {
    return localStorage.getItem(LocalStorageKeys.TOKEN)
}

const setTokenInLocalStorage = (token: string):void => {
    localStorage.setItem(LocalStorageKeys.TOKEN, token)
}


const removeTokenInLocalStorage = ():void => {
    localStorage.removeItem(LocalStorageKeys.TOKEN)
}

export {
    LocalStorageKeys,
    getTokenFromLocalStorage,
    setTokenInLocalStorage,
    removeTokenInLocalStorage,
}