export default {
  state: {
    error: null
  },
  getters: {
    error (state) {
      return state.error
    }
  },
  mutations: {
    setError (state, payload) {
      state.error = payload.message
    }
  }
}