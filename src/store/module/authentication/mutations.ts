import { IMutationWithoutPayload } from '@/store/types/mutation'
import { AUTH_REQUEST } from './mutation-types'
import { AUTH_SUCCESS } from './mutation-types'
import { AUTH_ERROR } from './mutation-types'
import { LOGOUT_REQUEST } from './mutation-types'
import { LOGOUT_SUCCESS } from './mutation-types'
import { LOGOUT_ERROR } from './mutation-types'
import { IState } from './types'

const authRequest: IMutationWithoutPayload<IState> = (state) => {
  state.authStatus = 'loading'
}

const authSuccess: IMutationWithoutPayload<IState> = (state) => {
  state.authStatus = 'success'
}

const authErro: IMutationWithoutPayload<IState> = (state) => {
  state.authStatus = 'error'
}

const logoutRequest: IMutationWithoutPayload<IState> = (state) => {
  state.logoutStatus = 'loading'
}

const logoutSuccess: IMutationWithoutPayload<IState> = (state) => {
  state.logoutStatus = 'success'
}

const logoutError: IMutationWithoutPayload<IState> = (state) => {
  state.logoutStatus = 'error'
}


export default {
  [AUTH_REQUEST]: authRequest,
  [AUTH_SUCCESS]: authSuccess,
  [AUTH_ERROR]: authErro,
  [LOGOUT_REQUEST]: logoutRequest,
  [LOGOUT_SUCCESS]: logoutSuccess,
  [LOGOUT_ERROR]: logoutError,
 }