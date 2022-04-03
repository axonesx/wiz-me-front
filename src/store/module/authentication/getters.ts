import { IState } from './types'

  const isAuthenticated = (state: IState): boolean => !!state.token
  
  const authStatus = (state: IState): string => state.status

export default {
  isAuthenticated,
  authStatus,
}