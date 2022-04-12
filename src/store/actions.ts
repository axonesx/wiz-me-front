import Api from "@/api"
import { httpClientApi } from "@/api/helpers/http-client-api"
import { FETCH_PARAMETERS, FETCH_PARAMETERS_SUCCESS } from "./mutation-types"
import { IRootStoreState } from "./types"
import { IAction } from "./types/action"
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR  } from './module/authentication/mutation-types'
import { USER_LOGIN, USER_LOGOUT, TOKEN_LOGIN, TOKEN_LOGOUT } from './mutation-types'
import { removeTokenInLocalStorage, setTokenInLocalStorage } from '@/services/local-storage.service'

const loginUser: IAction<IRootStoreState, string> = ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    commit(AUTH_REQUEST)
    httpClientApi
    .post('/login', user)
      .then(resp => {
        const xsrfToken = resp.data.xsrfToken
        const maxAge = resp.data.maxAge
        setTokenInLocalStorage(xsrfToken, maxAge)
        commit(AUTH_SUCCESS)
        commit(USER_LOGIN, resp.data.findUser)
        commit(TOKEN_LOGIN, resp.data.xsrfToken)
        resolve(resp)
      })
    .catch(err => {
      commit(AUTH_ERROR, err)
      removeTokenInLocalStorage()
      reject(err)
    })
  })
}

const logoutUser: IAction<IRootStoreState, string> = ({ commit }) => {
    return new Promise((resolve, reject) => {
    commit(LOGOUT_REQUEST)
    httpClientApi
    .post('/logout')
        .then(resp => {
        commit(LOGOUT_SUCCESS)
        commit(USER_LOGOUT)
        commit(TOKEN_LOGOUT)
        removeTokenInLocalStorage()
        resolve(resp)
      })
    .catch(err => {
      commit(LOGOUT_ERROR, err)
      reject(err)
    })
  })
}

const fetchParameters: IAction<IRootStoreState, Api> = async ({ commit }, api) => {
    commit(FETCH_PARAMETERS)
    const request = await api.Parameters.fetch()
    const apiUrl = request.apiUrl
    httpClientApi.defaults.baseURL = apiUrl
    commit(FETCH_PARAMETERS_SUCCESS)
}

export default {
    fetchParameters,
    loginUser,
    logoutUser,
}