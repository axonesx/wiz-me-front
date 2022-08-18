import { IMutationWithoutPayload } from '@/store/types/mutation'
import { ACTIVITY_REQUEST } from './mutation-types'
import { ACTIVITY_SUCCESS } from './mutation-types'
import { ACTIVITY_ERROR } from './mutation-types'
import { IState } from './types'

const activityRequest: IMutationWithoutPayload<IState> = (state) => {
  state.activityStatus = 'loading'
}

const activitySuccess: IMutationWithoutPayload<IState> = (state) => {
  state.activityStatus = 'success'
}

const activityError: IMutationWithoutPayload<IState> = (state) => {
  state.activityStatus = 'error'
}

export default {
  [ACTIVITY_REQUEST]: activityRequest,
  [ACTIVITY_SUCCESS]: activitySuccess,
  [ACTIVITY_ERROR]: activityError,
}