import { AVATAR_DELETE_ERROR, AVATAR_DELETE_REQUEST, AVATAR_DELETE_SUCCESS, AVATAR_UPLOAD_ERROR, AVATAR_UPLOAD_REQUEST, AVATAR_UPLOAD_SUCCESS, TOKEN_LOGIN, USER_LOGIN, USER_LOGOUT, USER_REQUEST, USER_UPDATE_ERROR, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from './mutation-types'
import { USER_SUCCESS } from './mutation-types'
import { USER_ERROR } from './mutation-types'
import { IState, IUser } from './types'
import { IMutation, IMutationWithoutPayload } from '@/store/types/mutation'

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

const uploadAvatarRequest: IMutationWithoutPayload<IState> = (state) => {
  state.userUploadAvatarRequestStatus = 'loading'
}

const uploadAvatarSuccess: IMutationWithoutPayload<IState> = (state) => {
  state.userUploadAvatarRequestStatus = "success"
}

const uploadAvatarError: IMutationWithoutPayload<IState> = (state) => {
  state.userUploadAvatarRequestStatus = "error"
}

const deleteAvatarRequest: IMutationWithoutPayload<IState> = (state) => {
  state.userDeleteAvatarRequestStatus = 'loading'
}

const deleteAvatarSuccess: IMutationWithoutPayload<IState> = (state) => {
  state.userDeleteAvatarRequestStatus = "success"
}

const deleteAvatarError: IMutationWithoutPayload<IState> = (state) => {
  state.userDeleteAvatarRequestStatus = "error"
}

const userLogout: IMutationWithoutPayload<IState> = (state) => {
  state.user = null
  state.token = null
  state.userRequestStatus= '',
  state.userUpdateRequestStatus= '',
  state.userUploadAvatarRequestStatus= '',
  state.userDeleteAvatarRequestStatus= ''
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
  [AVATAR_UPLOAD_REQUEST]: uploadAvatarRequest,
  [AVATAR_UPLOAD_SUCCESS]: uploadAvatarSuccess,
  [AVATAR_UPLOAD_ERROR]: uploadAvatarError,
  [AVATAR_DELETE_REQUEST]:deleteAvatarRequest,
  [AVATAR_DELETE_SUCCESS]:deleteAvatarSuccess,
  [AVATAR_DELETE_ERROR]:deleteAvatarError,
 }