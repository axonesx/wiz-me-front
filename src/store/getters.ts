import { IUser } from './types'
import { IRootStoreState } from './types'

const isProfileLoaded = (state: IRootStoreState): boolean => !!state.user.firstName

const getProfile = (state: IRootStoreState): IUser => state.user

const getToken = (state: IRootStoreState): string | null => state.token

const isAuthenticated = (state: IRootStoreState): boolean => !!state.token

const parameters =
    (state: IRootStoreState) =>
        (parameterName: string): string | null =>
            state.parameters && state.parameters[parameterName]

const existParameters = (state: IRootStoreState) => !!state.parameters

export default {
    getProfile,
    isProfileLoaded,
    parameters,
    existParameters,
    getToken,
    isAuthenticated,
}