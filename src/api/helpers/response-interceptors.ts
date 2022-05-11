import { ApiError } from '@/helper/api-error'
import { RequestError } from '@/helper/request-error'
import router from '@/router'
import { store } from '@/store'
import { LOGOUT_SUCCESS } from '@/store/module/authentication/mutation-types'
import { USER_LOGOUT } from '@/store/module/user/mutation-types'
import { AxiosError, AxiosResponse } from 'axios'

function manageApiError(error: AxiosError): Promise<RequestError | ApiError> {
    const { response } = error
    if (response){
        if (response.status === 401) {
            store.dispatch(LOGOUT_SUCCESS)
            store.dispatch(USER_LOGOUT)
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

async function manageIntegrationFileErrors(error: AxiosError): Promise<RequestError | ApiError> {
    const { response } = error
    if (response) {
      if (response.status === 401) {
          store.dispatch(USER_LOGOUT)
          store.dispatch(LOGOUT_SUCCESS)
          router.push('/login')
          dispatchGlobalError('token.missing')
      } else if (response.status === 500) {
        dispatchGlobalError('unknown')
        return Promise.reject(new ApiError(response.statusText, response.status, error.code))
      }
      return Promise.reject(new ApiError(response.statusText, response.status, error.code))
    }

    return Promise.reject(new RequestError(error.message))
  }

 export { manageApiError, manageIntegrationFileErrors, }