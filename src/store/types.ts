interface IUser {
    email: string
    password: string
    firstName: string
    lastName: string
    birthday: Date
}

interface IRootStoreState {
    user: IUser | null
}

export { IUser, IRootStoreState }