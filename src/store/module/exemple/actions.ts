import { SET_TITLE } from './mutation-types'
import { IAction } from '@/store/types/action'
import { IState } from './types'

const updateTitle: IAction<IState, string> = ({ commit }, newTitle) => {
  commit(SET_TITLE, newTitle)
}

export default {
  updateTitle,
}