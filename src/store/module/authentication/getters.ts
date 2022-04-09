import { IState } from './types'

const getAuthStatus = (state: IState): string => state.authStatus

const getLogoutStatus = (state: IState): string => state.logoutStatus

export default {
  getAuthStatus,
  getLogoutStatus,
}