import { ApiError } from '@/helper/api-error'
import { RequestError } from '@/helper/request-error'
import router from '@/router'
import { getTokenFromLocalStorage, LocalStorageKeys } from '@/services/local-storage.service'
import { store } from '@/store'
import { LOGOUT_SUCCESS } from '@/store/module/authentication/mutation-types'
import { USER_LOGOUT } from '@/store/module/user/mutation-types'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { httpClientApi } from './http-client-api'
import { httpClientIntegration } from './http-client-integration'

async function manageApiError(error: AxiosError): Promise<RequestError | ApiError > {
    const { response } = error
    if (response){
        if (response.status === 401 || response.status === 498) {
            const oldRefreshToken = getTokenFromLocalStorage(LocalStorageKeys.REFRESH_TOKEN, LocalStorageKeys.REFRESH_TOKEN_EXPIRE_IN)
            if (oldRefreshToken) {
                await store.dispatch('reloadToken', oldRefreshToken)
                const token = getTokenFromLocalStorage(LocalStorageKeys.TOKEN, LocalStorageKeys.TOKEN_EXPIRE_IN)
                if (token && response.config.headers){
                    response.config.headers['x-xsrf-token'] = `${token}`
                }
                return httpClientApi.request(response.config)
            }
            store.dispatch(USER_LOGOUT)
            store.dispatch(LOGOUT_SUCCESS)
            router.push('/login')
            dispatchGlobalError('auth.token.missing')
            return Promise.reject(new ApiError(response.statusText, response.status, error.code))
        } else if (response.status === 500) {
            dispatchGlobalError('unknown')
            return Promise.reject(new ApiError(response.statusText, response.status, error.code))
        }
        dispatchGlobalError(response)
        return Promise.reject(new ApiError(response.statusText, response.status, error.code))
    }
    dispatchGlobalError(error.message)
    return Promise.reject(new RequestError(error.message))
}

function dispatchGlobalError(response: AxiosResponse | string) {
    let errorMessage = ''

    if (typeof response == 'string') {
        errorMessage = response
    } else if (response.data.message) {
      errorMessage = response.data.message as string
    }

    store.dispatch('setGlobalError', errorMessage)
}

async function manageIntegrationFileErrors(error: AxiosError): Promise<RequestError | ApiError | AxiosRequestConfig> {
    const { response } = error
    if (response) {
      if (response.status === 401 || response.status === 498) {
        const oldRefreshToken = getTokenFromLocalStorage(LocalStorageKeys.REFRESH_TOKEN, LocalStorageKeys.REFRESH_TOKEN_EXPIRE_IN)
        if (oldRefreshToken) {
            await store.dispatch('reloadToken', oldRefreshToken)
            const token = getTokenFromLocalStorage(LocalStorageKeys.TOKEN, LocalStorageKeys.TOKEN_EXPIRE_IN)
            if (token && response.config.headers){
                response.config.headers['x-xsrf-token'] = `${token}`
            }
            return httpClientIntegration.request(response.config)
        }
        store.dispatch(USER_LOGOUT)
        store.dispatch(LOGOUT_SUCCESS)
        router.push('/login')
        dispatchGlobalError('auth.token.missing')
      } else if (response.status === 500) {
        dispatchGlobalError('unknown')
        return Promise.reject(new ApiError(response.statusText, response.status, error.code))
      }
      return Promise.reject(new ApiError(response.statusText, response.status, error.code))
    }

    return Promise.reject(new RequestError(error.message))
  }

 export { manageApiError, manageIntegrationFileErrors, }