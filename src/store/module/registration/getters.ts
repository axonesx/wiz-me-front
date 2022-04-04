import { IState } from './types'
  
  const signUpStatus = (state: IState): string => state.status

export default {
  signUpStatus,
}