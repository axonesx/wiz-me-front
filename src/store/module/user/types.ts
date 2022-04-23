interface IUser {
    id: number,
    email: string
    firstName: string
    lastName: string
    birthday: Date
    description: string
    createdAt: Date
}

interface IUserToUpdate {
    id: number
    email?: string
    password?: string
    firstName?: string
    lastName?: string
    birthday?: Date
    description?: string
}


interface IState {
    user: IUser | null
    token: string | null
    userRequestStatus: string
    userUpdateRequestStatus: string
}

export { IState, IUser, IUserToUpdate}