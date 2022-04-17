interface IParameters {
    apiUrl: string
    [key: string]: string
}

interface IRootStoreState {
    parameters: IParameters | null
    isFetchingParameters: boolean
}

export { IRootStoreState, IParameters }