import { IState } from './types'

const getSignUpStatus = (state: IState): string => state.signUpStatus
const getSignUpMessage = (state: IState): string => state.signUpMessage

export default {
  getSignUpStatus,
  getSignUpMessage,
}