import { USER_REQUEST } from './mutation-types'
import { USER_SUCCESS } from './mutation-types'
import { USER_ERROR } from './mutation-types'
import { IState } from './types'
import { IMutationWithoutPayload } from '@/store/types/mutation'

const userRequest: IMutationWithoutPayload<IState> = (state) => {
  state.userRequestStatus = 'loading'
}

const userSuccess: IMutationWithoutPayload<IState> = (state) => {
  state.userRequestStatus = "success"
}

const userError: IMutationWithoutPayload<IState> = (state) => {
  state.userRequestStatus = "error"
}

export default {
  [USER_REQUEST]: userRequest,
  [USER_SUCCESS]: userSuccess,
  [USER_ERROR]: userError,
 }