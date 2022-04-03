import { IState, IUser } from './types'

const getProfile = (state: IState): IUser => {
  return state.userProfile
}

const isProfileLoaded = (state: IState): boolean => {
  return !!state.userProfile.firstName
}

export default {
  getProfile,
  isProfileLoaded,
}