enum LocalStorageKeys {
    TOKEN = 'user-token',
    TOKEN_EXPIRE_IN = 'user-token-expire-in',
    REFRESH_TOKEN = 'user-refresh-token',
    REFRESH_TOKEN_EXPIRE_IN = 'user-refresh-token-expire-in'
}

const isActiveToken = (keyToken: string, keyExpireIn: string): boolean => {
    const token = localStorage.getItem(keyToken)
    const expiresIn = localStorage.getItem(keyExpireIn)
    if (expiresIn === null || typeof expiresIn === 'undefined' || expiresIn === undefined) return false
    const expiresInDate = new Date(parseInt(expiresIn,10))
    const now = new Date()
    if(expiresInDate < now || token === null || typeof token === 'undefined' || token === undefined) {
        return false
    }
    return true
}

const getTokenFromLocalStorage =  (keyToken: string, keyExpireIn: string): string | null => {
    if(!isActiveToken(keyToken, keyExpireIn)) {
        removeTokenInLocalStorage(keyToken, keyExpireIn)
        return null
    }
    return localStorage.getItem(keyToken)
}

const setTokenInLocalStorage = (keyToken: string, keyExpireIn: string, token: string, maxAge: string):void => {
    localStorage.setItem(keyToken, token)
    const expiresIn = Date.now() + maxAge
    localStorage.setItem(keyExpireIn, expiresIn)
}


const removeTokenInLocalStorage = (keyToken: string, keyExpireIn: string):void => {
    localStorage.removeItem(keyToken)
    localStorage.removeItem(keyExpireIn)
}

const removeAllTokens = ():void => {
    removeTokenInLocalStorage(LocalStorageKeys.TOKEN, LocalStorageKeys.TOKEN_EXPIRE_IN)
    removeTokenInLocalStorage(LocalStorageKeys.REFRESH_TOKEN, LocalStorageKeys.REFRESH_TOKEN_EXPIRE_IN)
}

export {
    LocalStorageKeys,
    isActiveToken,
    getTokenFromLocalStorage,
    setTokenInLocalStorage,
    removeTokenInLocalStorage,
    removeAllTokens,
}