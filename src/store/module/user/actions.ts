import { USER_REQUEST, USER_SUCCESS, USER_ERROR, USER_UPDATE_ERROR, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from './mutation-types'
import { IAction } from '@/store/types/action'
import { IState, IUserToUpdate } from './types'
import { httpClientApi } from '@/api/helpers/http-client-api'
import { store } from '@/store'


const requestUser: IAction<IState, number> = ({ commit, dispatch }, id) => {
  commit(USER_REQUEST)
  httpClientApi
  .post(`/${id}`)
    .then(resp => {
      commit(USER_SUCCESS, resp)
    })
    .catch(() => {
      commit(USER_ERROR)
      dispatch('loginUser')
    })
}

const updateUser: IAction<IState, IUserToUpdate> = ({ commit }, userData) => {
  commit(USER_UPDATE_REQUEST)
  const id = store.getters.getProfile.id
  httpClientApi
  .put(`/users/${id}`, userData)
    .then(resp => {
      commit(USER_UPDATE_SUCCESS, resp.data)
    })
    .catch(() => {
      commit(USER_UPDATE_ERROR)
    })
}

export default {
  requestUser,
  updateUser,
}