import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from './mutation-types'
import { IAction } from '@/store/types/action'
import { IState } from './types'
import { httpClientApi } from '@/api/helpers/http-client-api'


const signupUser: IAction<IState, string> = ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    commit(SIGN_UP_REQUEST)
    httpClientApi
    .post('/signup', user)
      .then(resp => {
        const message = resp.data.isNewUser ? 'loginPage.login.registration.success.textNotYetRegistrated': 'loginPage.login.registration.success.textAlreadyRegistrated'
        commit(SIGN_UP_SUCCESS, message)
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