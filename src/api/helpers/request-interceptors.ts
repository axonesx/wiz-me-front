import { getTokenFromLocalStorage } from '@/services/local-storage.service';
import { AxiosRequestConfig } from 'axios';

export function addAuthenticationToken(config: AxiosRequestConfig): AxiosRequestConfig {
    const token = getTokenFromLocalStorage()
    if (token && config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
    
}