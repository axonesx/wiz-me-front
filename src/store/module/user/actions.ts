import { AUTH_LOGOUT, USER_REQUEST } from './mutation-types'
import { USER_SUCCESS } from './mutation-types'
import { USER_ERROR } from './mutation-types'
import { IActionWithoutPayload } from '@/store/types/action'
import { IState } from './types'
import { httpClientApi } from '@/api/helpers/http-client-api'


const requestUser: IActionWithoutPayload<IState> = ({ commit, dispatch }) => {
  commit(USER_REQUEST)
  httpClientApi
  .post('/user')
    .then(resp => {
      commit(USER_SUCCESS, resp);
    })
    .catch(() => {
      commit(USER_ERROR);
      dispatch('loginUser');
    });
}

export default {
  requestUser,
}