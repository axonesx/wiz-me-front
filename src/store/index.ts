import { createStore } from 'vuex'
import state from '@/store/state'
import getters from '@/store/getters'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import modules from '@/store/modules'



const conf = {
  state,
  getters,
  mutations,
  actions,
  modules
}

export default createStore(conf)