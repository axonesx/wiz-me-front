interface IUser {
    id: number
    email: string
    firstName: string
    lastName: string
    birthday: Date
    description?: string
    avatarPath?: string
    createdAt: Date
}

interface IState {
    user: IUser | null
    token: string | null
    userRequestStatus: string
    userUpdateRequestStatus: string
    userUploadAvatarRequestStatus: string
    userDeleteAvatarRequestStatus: string
}

export { IState, IUser, }