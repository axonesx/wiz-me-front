import { IRootStoreState } from './types'

const parameters =
    (state: IRootStoreState) =>
        (parameterName: string): string | null =>
            state.parameters && state.parameters[parameterName]

const existParameters = (state: IRootStoreState) => !!state.parameters

const getGlobalError = (state: IRootStoreState) => state.globalError

const existGlobalError = (state: IRootStoreState) => !!state.globalError


export default {
    parameters,
    existParameters,
    getGlobalError,
    existGlobalError,
}