import { state } from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import registration from './module/registration'
import authentication from './module/authentication'
import user from './module/user'
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls"
import { createStore } from "vuex"

const ls = new SecureLS({ isCompression: false })

const conf = {
  modules: {
    user: user,
    auth: authentication,
    reg: registration,
  },
  state,
  getters,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      key: 'user-state',
      paths: ['user'],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
}

const store = createStore(conf)

export { store }