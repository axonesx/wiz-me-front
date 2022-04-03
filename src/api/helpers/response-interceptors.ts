import { ApiError } from '@/helper/api-error';
import { RequestError } from '@/helper/request-error';
import { getTokenFromLocalStorage } from '@/services/local-storage.service';
import { store } from '@/store';
import { AUTH_LOGOUT } from '@/store/module/user/mutation-types';
import { AxiosError, AxiosRequestConfig } from 'axios';

export function manageApiError(error: AxiosError): Promise<RequestError | ApiError> {
    const { response } = error
    if (response){
        if (response.status === 401) {
            store.dispatch(AUTH_LOGOUT)
        }
        return Promise.reject(new ApiError(response.statusText, response.status, error.code)) 
    }
    return Promise.reject(new RequestError(error.message)) 
}