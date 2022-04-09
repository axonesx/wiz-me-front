type IMutation<S, P> = (state: S, payload: P) => void
type IMutationWithoutPayload<S> = (state: S) => void

export { IMutation, IMutationWithoutPayload }