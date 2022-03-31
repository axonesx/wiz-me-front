import { IState } from './types'

const titleUpperCase = (state: IState): string => {
    return state.title.toUpperCase();
  }

export default {
    titleUpperCase,
}