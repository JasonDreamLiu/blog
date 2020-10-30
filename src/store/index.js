import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    io:null
  },
  mutations: {
    setIo(state,ioObj){
      state.io = ioObj
    }
  },
  actions: {
  },
  modules: {
  }
})
