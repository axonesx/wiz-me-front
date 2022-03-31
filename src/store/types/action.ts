import {Commit, Dispatch } from 'vuex'

type IAction<S, P> = (
    { commit, dispatch, state }: { commit: Commit; dispatch: Dispatch; state: S;}, 
    payload: P,
   ) => void

type IActionWithoutPayload<S> = (
    { commit, dispatch, state }: { commit: Commit; dispatch: Dispatch; state: S;},
   ) => void

export { IAction, IActionWithoutPayload }