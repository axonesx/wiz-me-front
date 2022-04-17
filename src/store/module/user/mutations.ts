import { TOKEN_LOGIN, TOKEN_LOGOUT, USER_LOGIN, USER_LOGOUT, USER_REQUEST } from './mutation-types'
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

const userLogout: IMutationWithoutPayload<IState> = (state) => {
  state = initialState
}

const userLogin: IMutation<IState, IUser> = (state, user) => {
  state.user = user
}

const tokenLogin: IMutation<IState, string> = (state, token) => {
    state.token = token
}

const tokenLogout: IMutationWithoutPayload<IState> = (state) => {
  state.token = ''
}


export default {
  [USER_REQUEST]: userRequest,
  [USER_SUCCESS]: userSuccess,
  [USER_ERROR]: userError,
  [USER_LOGIN]: userLogin,
  [USER_LOGOUT]: userLogout,
  [TOKEN_LOGIN]: tokenLogin,
  [TOKEN_LOGOUT]: tokenLogout,
 }