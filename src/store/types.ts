interface IParameters {
    apiUrl: string
    [key: string]: string
}

interface IRootStoreState {
    parameters: IParameters | null
    isFetchingParameters: boolean
    globalError: string | undefined
}

export { IRootStoreState, IParameters }