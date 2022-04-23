import { ApiError } from '@/helper/api-error'
import { RequestError } from '@/helper/request-error'
import router from '@/router'
import { store } from '@/store'
import { LOGOUT_SUCCESS } from '@/store/module/authentication/mutation-types'
import { USER_LOGOUT } from '@/store/module/user/mutation-types'
import { AxiosError } from 'axios'

function manageApiError(error: AxiosError): Promise<RequestError | ApiError> {
    const { response } = error
    if (response){
        if (response.status === 401) {
            store.dispatch(LOGOUT_SUCCESS)
            store.dispatch(USER_LOGOUT)
            router.push('/login')
        }
        dispatchGlobalError(response)
        return Promise.reject(new ApiError(response.statusText, response.status, error.code))
    }
    dispatchGlobalError(response)
    return Promise.reject(new RequestError(error.message))
}

function dispatchGlobalError(response: any) {
    let errorMessage = ''

    if (response.data.message) {
      errorMessage = response.data.message as string
    }

    store.dispatch('setGlobalError', errorMessage)
  }

 export { manageApiError, }