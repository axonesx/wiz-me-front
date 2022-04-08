import { IState } from './types'

const getSignUpStatus = (state: IState): string => state.signUpStatus

export default {
  getSignUpStatus,
}