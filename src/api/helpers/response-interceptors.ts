import { ApiError } from '@/helper/api-error';
import { RequestError } from '@/helper/request-error';
import { getTokenFromLocalStorage } from '@/services/local-storage.service';
import { store } from '@/store';
import { LOGOUT_SUCCESS } from '@/store/module/authentication/mutation-types';
import { AxiosError } from 'axios';

export function manageApiError(error: AxiosError): Promise<RequestError | ApiError> {
    const { response } = error
    if (response){
        if (response.status === 401) {
            store.dispatch(LOGOUT_SUCCESS)
        }
        return Promise.reject(new ApiError(response.statusText, response.status, error.code)) 
    }
    return Promise.reject(new RequestError(error.message)) 
}