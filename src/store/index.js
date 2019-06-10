import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import {StorageStore} from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    count: 0
  },
  mutations: {
    increment () {
      this.state.count++
    },
    decrement () {
      this.state.count--
    }
  },
  modules: {
    user
  },
  plugins: [StorageStore]
})
