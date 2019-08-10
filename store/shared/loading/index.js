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
      state.error = payload
    }
  }
}