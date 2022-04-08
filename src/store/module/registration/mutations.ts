import { IMutation, IMutationWithoutPayload } from '@/store/types/mutation'
import { SIGN_UP_REQUEST } from './mutation-types'
import { SIGN_UP_SUCCESS } from './mutation-types'
import { SIGN_UP_ERROR } from './mutation-types'
import { IState } from './types'

const signUpRequest: IMutationWithoutPayload<IState> = (state) => {
  state.signUpStatus = 'loading'
}

const signUpSuccess: IMutation<IState, string> = (state, token) => {
  state.signUpStatus = 'success'
}

const signUpError: IMutationWithoutPayload<IState> = (state) => {
  state.signUpStatus = 'error'
}

export default {
  [SIGN_UP_REQUEST]: signUpRequest,
  [SIGN_UP_SUCCESS]: signUpSuccess,
  [SIGN_UP_ERROR]: signUpError,
 }