import Axios, { AxiosResponse } from 'axios'
import { addAuthenticationToken } from './request-interceptors'
import { manageIntegrationFileErrors } from './response-interceptors'

const httpClientIntegration = Axios.create({
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true
})

httpClientIntegration.interceptors.request.use(addAuthenticationToken)
httpClientIntegration.interceptors.response.use((response: AxiosResponse) => response.data, manageIntegrationFileErrors)

export { httpClientIntegration }