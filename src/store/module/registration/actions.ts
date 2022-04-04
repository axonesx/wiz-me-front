import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from './mutation-types'
import { IAction } from '@/store/types/action'
import { IState } from './types'
import { httpClientApi } from '@/api/helpers/http-client-api'
import { USER_SUCCESS } from '../user/mutation-types'


const signupUser: IAction<IState, string> = ({commit, dispatch }, user) => {
  return new Promise((resolve, reject) => {
    commit(SIGN_UP_REQUEST)
    httpClientApi
    .post('/signup', user)
      .then(resp => {
        commit(SIGN_UP_SUCCESS)
        commit(USER_SUCCESS, resp)
        resolve(resp)
      })
    .catch(err => {
      commit(SIGN_UP_ERROR, err)
      reject(err)
    })
  })
}

export default {
  signupUser,
}