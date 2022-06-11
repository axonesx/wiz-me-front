import { durationBetweenTwoDates, formatDate } from "@/services/date.service"
import { formatToInitial } from "@/services/string.service"
import { IDuration } from "@/types/date"
import { IState, IUser } from "./types"


    const isProfileLoaded = (state: IState): boolean => !!state.user?.firstName

    const getProfile = (state: IState): IUser | null => {return state.user}

    const getInitial = (state: IState): string => {return formatToInitial(state.user)}

    const getDurationBeingUser = (state: IState): IDuration | null => {
        const now = new Date
        if(state.user) return durationBetweenTwoDates(now, state.user?.createdAt)
        return null
    }

    const getBirthday = (state: IState): string | null => {
        if(state.user) return formatDate(state.user?.birthday)
        return null
    }

    const getToken = (state: IState): string | null => state.token

    const isAuthenticated = (state: IState): boolean => !!state.token

    const getUserUpdateRequestStatus = (state: IState): string => state.userUpdateRequestStatus

    const getUserUploadAvatarRequestStatus = (state: IState): string => state.userUploadAvatarRequestStatus

    const getUserDeleteAvatarRequestStatus = (state: IState): string => state.userDeleteAvatarRequestStatus


export default {
    isProfileLoaded,
    getProfile,
    getDurationBeingUser,
    getBirthday,
    getToken,
    isAuthenticated,
    getUserUpdateRequestStatus,
    getUserUploadAvatarRequestStatus,
    getUserDeleteAvatarRequestStatus,
    getInitial,
}