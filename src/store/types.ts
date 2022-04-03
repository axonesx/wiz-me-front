interface IParameters {
    apiUrl: string
    [key: string]: string
}

interface IUser {
    email: string
    password: string
    firstName: string
    lastName: string
    birthday: Date
}

interface IRootStoreState {
    user: IUser | null
    parameters: IParameters | null
    isFetchingParameters: boolean
}

export { IUser, IRootStoreState }