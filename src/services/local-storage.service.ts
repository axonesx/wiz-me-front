enum LocalStorageKeys {
    TOKEN = 'user-token',
    TOKEN_EXPIRE_IN = 'user-token-expire-in'
}

const getTokenFromLocalStorage = (): string | null => {
    const expiresIn = localStorage.getItem(LocalStorageKeys.TOKEN_EXPIRE_IN)
    if (expiresIn === null || typeof expiresIn === 'undefined' || expiresIn === undefined) return null
    const expiresInDate = new Date(parseInt(expiresIn,10))
    const now = new Date()
    if(expiresInDate < now) {
        removeTokenInLocalStorage()
        return null
    }
    return localStorage.getItem(LocalStorageKeys.TOKEN)
}

const setTokenInLocalStorage = (token: string, maxAge: string):void => {
    localStorage.setItem(LocalStorageKeys.TOKEN, token)
    const expiresIn = Date.now() + maxAge
    localStorage.setItem(LocalStorageKeys.TOKEN_EXPIRE_IN, expiresIn)
}


const removeTokenInLocalStorage = ():void => {
    localStorage.removeItem(LocalStorageKeys.TOKEN)
    localStorage.removeItem(LocalStorageKeys.TOKEN_EXPIRE_IN)
}

export {
    LocalStorageKeys,
    getTokenFromLocalStorage,
    setTokenInLocalStorage,
    removeTokenInLocalStorage,
}