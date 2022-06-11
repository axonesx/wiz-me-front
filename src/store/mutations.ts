import { Util } from '@/api/types'
import { FETCH_PARAMETERS, FETCH_PARAMETERS_SUCCESS, SET_GLOBAL_ERROR } from './mutation-types'
import { IRootStoreState } from './types'
import { IMutation, IMutationWithoutPayload } from './types/mutation'

const fetchParameters: IMutationWithoutPayload<IRootStoreState> = (state) => {
    state.parameters = null
    state.isFetchingParameters = true
}

const fetchSuccessParameters: IMutation<IRootStoreState, Util.IParameters>  = (state, parameters) => {
    state.parameters = parameters
    state.isFetchingParameters = false
}

const setGlobalError: IMutation<IRootStoreState, string | undefined> = (state, error) => {
    state.globalError = error
}

export default {
    [FETCH_PARAMETERS]: fetchParameters,
    [FETCH_PARAMETERS_SUCCESS]: fetchSuccessParameters,
    [SET_GLOBAL_ERROR]: setGlobalError,
}