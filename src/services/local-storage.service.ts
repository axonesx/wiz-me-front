enum LocalStorageKeys {
    TOKEN = 'user-token',
    TOKEN_EXPIRE_IN = 'user-token-expire-in'
}

const isActiveToken = (): boolean => {
    const expiresIn = localStorage.getItem(LocalStorageKeys.TOKEN_EXPIRE_IN)
    if (expiresIn === null || typeof expiresIn === 'undefined' || expiresIn === undefined) return false
    const expiresInDate = new Date(parseInt(expiresIn,10))
    const now = new Date()
    if(expiresInDate < now) return false
    return true
}

const getTokenFromLocalStorage = (): string | null => {
    if(!isActiveToken()) {
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
    isActiveToken,
    getTokenFromLocalStorage,
    setTokenInLocalStorage,
    removeTokenInLocalStorage,
}