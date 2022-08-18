import { IAction } from '@/store/types/action'
import { httpClientApi } from '@/api/helpers/http-client-api'
import { IState, Activity } from './types'
import { ACTIVITY_ERROR, ACTIVITY_REQUEST, ACTIVITY_SUCCESS } from './mutation-types'

const addActivity: IAction<IState, Activity> = ({ commit }, activity) => {
  return new Promise((resolve, reject) => {
    commit(ACTIVITY_REQUEST)
    httpClientApi
    .post('/addActivity', activity)
      .then(resp => {
        commit(ACTIVITY_SUCCESS)
        resolve(resp)
      })
    .catch(err => {
      commit(ACTIVITY_ERROR, err)
      reject(err)
    })
  })
}

export default {
    addActivity,
}
