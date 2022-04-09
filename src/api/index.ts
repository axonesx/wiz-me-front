import * as Parameters from './parameters'

let api: Api

export default class Api {
    public Parameters = Parameters
}

export function getApi() {
    if (!api) {
        api = new Api()
    }
    return api
}