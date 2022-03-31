
import Vuex from 'vuex'
import { state } from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import exemple from './module/exemple'

const conf = {
  modules: {
    exemple,
  },
  state,
  getters,
  mutations,
  actions,
}

const store = new Vuex.Store(conf)

export { store }