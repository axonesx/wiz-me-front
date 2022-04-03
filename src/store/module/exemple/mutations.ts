import { IMutation, IMutationWithoutPayload } from '@/store/types/mutation';
import { SET_TITLE } from './mutation-types';
import { IState } from './types';

const setTitle: IMutation<IState, string> = (state, newTitle) => {
  state.title = newTitle
}

const setTitleByDefault: IMutationWithoutPayload<IState> = (state) => {
  state.title = 'NEW_TITLE'
}

export default {
    [SET_TITLE]: setTitle,
 }