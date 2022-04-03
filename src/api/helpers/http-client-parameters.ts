import Axios, { AxiosResponse } from 'axios';

const httpClientParameters = Axios.create({
    baseURL: '/',
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    }
})
httpClientParameters.defaults.baseURL = '/'
httpClientParameters.interceptors.response.use((response: AxiosResponse)=> response.data)

export { httpClientParameters }
