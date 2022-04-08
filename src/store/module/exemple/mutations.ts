import { IMutation, IMutationWithoutPayload } from '@/store/types/mutation'
import { SET_TITLE } from './mutation-types'
import { IState } from './types'

const setTitle: IMutation<IState, string> = (state, newTitle) => {
  state.title = newTitle
}

export default {
    [SET_TITLE]: setTitle,
 }