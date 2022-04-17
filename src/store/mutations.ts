import { Util } from '@/api/types'
import { FETCH_PARAMETERS } from './mutation-types'
import { FETCH_PARAMETERS_SUCCESS } from './mutation-types'
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


export default {
    [FETCH_PARAMETERS]: fetchParameters,
    [FETCH_PARAMETERS_SUCCESS]: fetchSuccessParameters,
}