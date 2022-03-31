
import Vuex from 'vuex'
import state from '@/store/state'
import getters from '@/store/getters'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
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