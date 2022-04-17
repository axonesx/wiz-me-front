import { IRootStoreState } from './types'

const parameters =
    (state: IRootStoreState) =>
        (parameterName: string): string | null =>
            state.parameters && state.parameters[parameterName]

const existParameters = (state: IRootStoreState) => !!state.parameters

export default {
    parameters,
    existParameters,
}