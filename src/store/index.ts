
import Vuex from 'vuex'
import { state } from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import exemple from './module/exemple'
import authentication from './module/authentication'
import user from './module/user'

const conf = {
  modules: {
    user,
    authentication,
  },
  state,
  getters,
  mutations,
  actions,
}

const store = new Vuex.Store(conf)

export { store }