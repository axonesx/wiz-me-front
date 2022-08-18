import { IState } from './types'

const getActivityStatus = (state: IState): string => state.activityStatus

export default {
  getActivityStatus,
}