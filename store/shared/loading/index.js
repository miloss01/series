export default {
  state: {
    loading: false
  },
  getters: {
    loading (state) {
      return state.loading
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    }
  }
}