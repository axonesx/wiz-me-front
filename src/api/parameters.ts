import { httpClientParameters } from './helpers/http-client-parameters'
import { Util } from './types'

export async function fetch() {
    return (httpClientParameters.get('config.json') as unknown) as Util.IParameters
}