interface IUser {
    email?: string
    password?: string
    firstName?: string
    lastName?: string
    birthday?: Date
}

interface IState {
    status: string, 
    userProfile: IUser, 
}

export { IState, IUser }