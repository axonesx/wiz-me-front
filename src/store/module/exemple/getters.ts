import { IState } from './types'

const getTitle = (state: IState): string => state.title

const titleUpperCase = (state: IState): string => {
  return state.title.toUpperCase()
}

export default {
    titleUpperCase,
    getTitle,
}