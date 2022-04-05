import { IState } from './types'

  const isAuthenticated = (state: IState): boolean => !!state.token

  const authStatus = (state: IState): string => state.authStatus

  const logoutStatus = (state: IState): string => state.logoutStatus

export default {
  isAuthenticated,
  authStatus,
  logoutStatus,
}