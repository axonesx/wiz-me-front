import { IMutation, IMutationWithoutPayload } from '@/store/types/mutation'
import { SIGN_UP_REQUEST } from './mutation-types'
import { SIGN_UP_SUCCESS } from './mutation-types'
import { SIGN_UP_ERROR } from './mutation-types'
import { IState } from './types'

const signUpRequest: IMutationWithoutPayload<IState> = (state) => {
  state.status = 'loading'
}

const signUpSuccess: IMutation<IState, string> = (state, token) => {
  state.status = 'success'
}

const signUpErro: IMutationWithoutPayload<IState> = (state) => {
  state.status = 'error'
} 

export default {
  [SIGN_UP_REQUEST]: signUpRequest,
  [SIGN_UP_SUCCESS]: signUpSuccess,
  [SIGN_UP_ERROR]: signUpErro,
 }