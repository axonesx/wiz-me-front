interface IUser {
    email: string
    firstName: string
    lastName: string
    birthday: Date
    createdAt: Date
}


interface IState {
    user: IUser | null
    token: string | null
    userRequestStatus: string
}

export { IState, IUser, }