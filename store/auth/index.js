import router from '@/router'
import firebase from 'firebase'
import { db } from '@/firebase'

export default {
  state: {
    currentUser: null
  },
  getters: {
    user (state) {
      return state.currentUser
    }
  },
  mutations: {
    setUser (state, payload) {
      state.currentUser = payload
    }
  },
  actions: {
    signup ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false)
        commit('clearError')
        const dbUser = {
          id: user.user.uid,
          email: user.user.email,
          password: payload.password,
          firstName: payload.firstName,
          lastName: payload.lastName
        }
        const newUser = {
          id: user.user.uid
        }
        db.collection('users').doc(dbUser.id).set(dbUser)
        .then(() => {
          commit('setUser', newUser)
          commit('setLoading', false)
          router.push({ name: 'tracker' })
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    login ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false)
        commit('clearError')
        const newUser = {
          id: user.user.uid
        }
        commit('setUser', newUser)
        router.push({ name: 'tracker' })
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    autoLogin ({commit}, payload) {
      const newUser = {
        id: payload.uid
      }
      commit('setUser', newUser)
      router.push({ name: 'tracker' })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      .then(() => {
        commit('setUser', null)
      })
    }
  }
}