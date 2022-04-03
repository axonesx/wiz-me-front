import { AUTH_REQUEST } from './mutation-types'
import { AUTH_SUCCESS } from './mutation-types'
import { AUTH_ERROR } from './mutation-types'
import { AUTH_LOGOUT, USER_REQUEST } from '../user/mutation-types'
import { IAction } from '@/store/types/action'
import { IState } from './types'
import { httpClientApi } from '@/api/helpers/http-client-api'
import { removeTokenInLocalStorage, setTokenInLocalStorage } from '@/services/local-storage.service'

const loginUser: IAction<IState, string> = ({commit, dispatch }, user) => {
  return new Promise((resolve, reject) => { // The Promise used for router redirect in login
    commit(AUTH_REQUEST)
    httpClientApi
    .post('/login', user)
      .then(resp => {
        const token = resp.request.cookie['Authorization']
        console.log(token)
        setTokenInLocalStorage(token)
        commit(AUTH_SUCCESS, token)
        dispatch('requestUser')
        resolve(resp)
      })
    .catch(err => {
      commit(AUTH_ERROR, err)
      removeTokenInLocalStorage()
      reject(err)
    })
  })
}

const logoutUser: IAction<IState, string> = ({commit }) => {
  return new Promise<void>(resolve => {
    commit(AUTH_LOGOUT)
    removeTokenInLocalStorage()
    resolve()
  });
}

export default {
  loginUser,
  logoutUser,
}