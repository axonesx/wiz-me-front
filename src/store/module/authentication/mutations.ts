import { IMutation, IMutationWithoutPayload } from '@/store/types/mutation'
import { AUTH_REQUEST } from './mutation-types'
import { AUTH_SUCCESS } from './mutation-types'
import { AUTH_ERROR } from './mutation-types'
import { IState } from './types'

const authRequest: IMutationWithoutPayload<IState> = (state) => {
  state.status = 'loading'
}

const authSuccess: IMutation<IState, string> = (state, token) => {
  state.status = 'success'
  state.token = token
}

const authErro: IMutationWithoutPayload<IState> = (state) => {
  state.status = 'error'
} 

export default {
  [AUTH_REQUEST]: authRequest,
  [AUTH_SUCCESS]: authSuccess,
  [AUTH_ERROR]: authErro,
 }