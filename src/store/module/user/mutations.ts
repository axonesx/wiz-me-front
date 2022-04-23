import { TOKEN_LOGIN, TOKEN_LOGOUT, USER_LOGIN, USER_LOGOUT, USER_REQUEST, USER_UPDATE_ERROR, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from './mutation-types'
import { USER_SUCCESS } from './mutation-types'
import { USER_ERROR } from './mutation-types'
import { IState, IUser } from './types'
import { IMutation, IMutationWithoutPayload } from '@/store/types/mutation'
import { initialState } from './mocks'

const userRequest: IMutationWithoutPayload<IState> = (state) => {
  state.userRequestStatus = 'loading'
}

const userSuccess: IMutationWithoutPayload<IState> = (state) => {
  state.userRequestStatus = "success"
}

const userError: IMutationWithoutPayload<IState> = (state) => {
  state.userRequestStatus = "error"
}

const userUpdateRequest: IMutationWithoutPayload<IState> = (state) => {
  state.userUpdateRequestStatus = 'loading'
}

const userUpdateSuccess: IMutation<IState, IUser> = (state, user) => {
  state.userUpdateRequestStatus = "success"
  state.user = user
}

const userUpdateError: IMutationWithoutPayload<IState> = (state) => {
  state.userUpdateRequestStatus = "error"
}

const userLogout: IMutationWithoutPayload<IState> = (state) => {
  state.user = null
  state.token = null
}

const userLogin: IMutation<IState, IUser> = (state, user) => {
  state.user = user
}

const tokenLogin: IMutation<IState, string> = (state, token) => {
    state.token = token
}

export default {
  [USER_REQUEST]: userRequest,
  [USER_SUCCESS]: userSuccess,
  [USER_ERROR]: userError,
  [USER_UPDATE_REQUEST]: userUpdateRequest,
  [USER_UPDATE_SUCCESS]: userUpdateSuccess,
  [USER_UPDATE_ERROR]: userUpdateError,
  [USER_LOGIN]: userLogin,
  [USER_LOGOUT]: userLogout,
  [TOKEN_LOGIN]: tokenLogin,
 }