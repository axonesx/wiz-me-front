import { getTokenFromLocalStorage, LocalStorageKeys } from '@/services/local-storage.service'
import { AxiosRequestConfig } from 'axios'

export async function addAuthenticationToken(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    if (config.url !== '/logout' && config.url !== '/login' && config.url !== '/reloadToken' && config.url !== '/sign-up'){
        const token = getTokenFromLocalStorage(LocalStorageKeys.TOKEN, LocalStorageKeys.TOKEN_EXPIRE_IN)
        if (token && config.headers){
            config.headers['x-xsrf-token'] = `${token}`
        }
    }
    return config
}