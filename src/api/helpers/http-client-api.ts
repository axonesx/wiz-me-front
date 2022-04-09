import Axios, { AxiosResponse } from 'axios'
import { addAuthenticationToken } from './request-interceptors'
import { manageApiError } from './response-interceptors'

const httpClientApi = Axios.create({
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
})

httpClientApi.interceptors.request.use(addAuthenticationToken)
httpClientApi.interceptors.response.use((response: AxiosResponse) => response.data, manageApiError)


export { httpClientApi }
