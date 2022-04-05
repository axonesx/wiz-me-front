import { USER_LOGOUT, USER_REQUEST } from './mutation-types'
import { USER_SUCCESS } from './mutation-types'
import { USER_ERROR } from './mutation-types'
import { IAction } from '@/store/types/action'
import { IState } from './types'
import { httpClientApi } from '@/api/helpers/http-client-api'


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

export default {
  requestUser,
}