import router from '@/router'
import firebase from 'firebase'
import { db } from '@/firebase'

export default {
  state: {
    currentUser: null,
    firstTime: true
  },
  getters: {
    user (state) {
      return state.currentUser
    },
    firstTime (state) {
      return state.firstTime
    }
  },
  mutations: {
    setUser (state, payload) {
      state.currentUser = payload
    },
    setFirstTime (state, payload) {
      state.firstTime = payload
    }
  },
  actions: {
    signInWithProvider ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithPopup(payload)
      .then(result => {
        commit('setLoading', false)
        commit('clearError')
        var user = result.user
        console.log(user)
        const dbUser = {
          id: user.uid,
          email: user.email,
          firstName: user.displayName.split(' ')[0],
          lastName: user.displayName.split(' ')[1]
        }
        const newUser = {
          id: user.uid
        }
        db.collection('users').doc(dbUser.id).set(dbUser)
        .then(() => {
          commit('setUser', newUser)
          commit('setLoading', false)
          // router.push({ name: 'tracker' })
          router.go({ name: 'tracker' })
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
      }).catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
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
          // router.push({ name: 'tracker' })
          router.go({ name: 'tracker' })
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
        // router.push({ name: 'tracker' })
        router.go({ name: 'tracker' })
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
    },
    logout ({commit}) {
      firebase.auth().signOut()
      .then(() => {
        commit('setUser', null)
      })
    }
  }
}