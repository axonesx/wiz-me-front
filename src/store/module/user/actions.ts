import { USER_REQUEST, USER_SUCCESS, USER_ERROR, USER_UPDATE_ERROR, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, AVATAR_UPLOAD_REQUEST, AVATAR_UPLOAD_SUCCESS, AVATAR_UPLOAD_ERROR, AVATAR_DELETE_REQUEST, AVATAR_DELETE_SUCCESS, AVATAR_DELETE_ERROR } from './mutation-types'
import { IAction, IActionWithoutPayload } from '@/store/types/action'
import { IState, IUser } from './types'
import { httpClientApi } from '@/api/helpers/http-client-api'
import { httpClientIntegration } from '@/api/helpers/http-client-integration'
import { store } from '@/store'
import { filesToFormData } from '@/services/file.service'


const requestUser: IAction<IState, number> = async ({ commit, dispatch }, id) => {
  commit(USER_REQUEST)
  return httpClientApi
  .post(`/${id}`)
    .then(resp => {
      commit(USER_SUCCESS, resp)
    })
    .catch(() => {
      commit(USER_ERROR)
      dispatch('loginUser')
    })
}

const updateUser: IAction<IState, IUser> = async ({ commit }, userData) => {
  commit(USER_UPDATE_REQUEST)
  const id = store.getters.getProfile.id
  return httpClientApi
  .put(`/users/${id}`, userData)
    .then(resp => {
      commit(USER_UPDATE_SUCCESS, resp.data)
    })
    .catch(() => {
      commit(USER_UPDATE_ERROR)
    })
}


const uploadAvatar: IAction<IState, File[]> = async ({ commit }, files) => {
  commit(USER_UPDATE_REQUEST)
  commit(AVATAR_UPLOAD_REQUEST)
  const id = store.getters.getProfile.id
  const fd = filesToFormData(files)
  return httpClientIntegration
  .post(`/users/${id}/uploadAvatar`, fd)
    .then(resp => {
      commit(USER_UPDATE_SUCCESS, resp.data)
      commit(AVATAR_UPLOAD_SUCCESS)
    })
    .catch(() => {
      commit(AVATAR_UPLOAD_ERROR)
    })
}

const deleteAvatar: IActionWithoutPayload<IState> = async ({ commit }) => {
  commit(USER_UPDATE_REQUEST)
  commit(AVATAR_DELETE_REQUEST)
  const id = store.getters.getProfile.id
  return httpClientIntegration
  .delete(`/users/${id}/deleteAvatar`)
    .then(resp => {
      commit(USER_UPDATE_SUCCESS, resp.data)
      commit(AVATAR_DELETE_SUCCESS)
    })
    .catch(() => {
      commit(AVATAR_DELETE_ERROR)
    })
}

export default {
  requestUser,
  updateUser,
  uploadAvatar,
  deleteAvatar,
}