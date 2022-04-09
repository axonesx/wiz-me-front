interface IParameters {
    apiUrl: string
    [key: string]: string
}

interface IUser {
    email?: string
    firstName?: string
    lastName?: string
    birthday?: Date
}

interface IRootStoreState {
    user: IUser
    token: string | null
    parameters: IParameters | null
    isFetchingParameters: boolean
}

export { IRootStoreState, IUser, IParameters }