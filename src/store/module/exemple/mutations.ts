import { SET_TITLE } from './mutation-types';
import { IState } from './types';

const setTitle = (state: IState, newTitle:string) => {
  state.title = newTitle
}

export default {
    [SET_TITLE]: setTitle,
 }