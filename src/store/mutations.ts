import { Util } from '@/api/types'
import { FETCH_PARAMETERS } from './mutation-types'
import { FETCH_PARAMETERS_SUCCESS } from './mutation-types'
import { USER_LOGIN } from './mutation-types'
import { USER_LOGOUT } from './mutation-types'
import { TOKEN_LOGIN } from './mutation-types'
import { TOKEN_LOGOUT } from './mutation-types'
import { IRootStoreState, IUser } from './types'
import { IMutation, IMutationWithoutPayload } from './types/mutation'

const fetchParameters: IMutationWithoutPayload<IRootStoreState> = (state) => {
    state.parameters = null
    state.isFetchingParameters = true
}

const fetchSuccessParameters: IMutation<IRootStoreState, Util.IParameters>  = (state, parameters) => {
    state.parameters = parameters
    state.isFetchingParameters = false
}

const userLogout: IMutationWithoutPayload<IRootStoreState> = (state) => {
  state.user = {}
}

const userLogin: IMutation<IRootStoreState, IUser> = (state, user) => {
  state.user = user
}

const tokenLogin: IMutation<IRootStoreState, string> = (state, token) => {
    state.token = token
}

const tokenLogout: IMutationWithoutPayload<IRootStoreState> = (state) => {
  state.token = ''
}

export default {
    [USER_LOGIN]: userLogin,
    [USER_LOGOUT]: userLogout,
    [TOKEN_LOGIN]: tokenLogin,
    [TOKEN_LOGOUT]: tokenLogout,
    [FETCH_PARAMETERS]: fetchParameters,
    [FETCH_PARAMETERS_SUCCESS]: fetchSuccessParameters,
    [USER_LOGOUT]: userLogout,
}