import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import firebase from 'firebase'
import { db } from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    serie: null,
    actor: null
  },

  getters: {
    user (state) {
      return state.currentUser
    },
    serie (state) {
      return state.serie
    },
    actor (state) {
      return state.actor
    }
  },

  mutations: {
    setUser (state, payload) {
      state.currentUser = payload
    },
    setSerie (state, payload) {
      state.serie = payload
    },
    setActor (state, payload) {
      state.actor = payload
    }
  },

  actions: {
    signup ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
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
          router.push({ name: 'new-serie' })
        })
        .catch(err => console.log(err.message))
      })
    },

    login ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.user.uid
        }
        commit('setUser', newUser)
        router.push({ name: 'new-serie' })
      })
      .catch((error) => console.log(error))
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
    },

    uploadSerie ({commit, getters}, payload) {
      const serie = {
        title: payload.title,
        startYear: payload.startYear,
        endYear: payload.endYear,
        status: payload.status,
        category: payload.category,
        actors: payload.actors,
        description: payload.description
      }
      commit('setSerie', serie)
      db.collection('series').doc(serie.title).set(serie)
      .then(() => {
        return firebase.storage().ref('series/' + payload.title).put(payload.image)
      })
      .then(async () => {
        const url = await firebase.storage().ref('series/' + payload.title).getDownloadURL();
        commit('setSerie', {
          ...serie,
          imageUrl: url
        });
      })
      .then(() => {
        return db.collection('series').doc(payload.title).update({ imageUrl: getters.serie.imageUrl })
      })
      .then(() => alert('Serie is uploaded successfuly.'))
      .catch(error => console.log(error) )
    },

    uploadActor ({commit, getters}, payload) {
      const actor = {
        firstName: payload.firstName,
        lastName: payload.lastName
      }
      commit('setActor', actor)
      db.collection('actors').doc(actor.firstName + ' ' + actor.lastName).set(actor)
      .then(() => {
        return firebase.storage().ref('actors/' + payload.firstName + ' ' + payload.lastName).put(payload.image)
      })
      .then(async () => {
        const url = await firebase.storage().ref('actors/' + payload.firstName + ' ' + payload.lastName).getDownloadURL()
        commit('setActor', {
          ...actor,
          imageUrl: url
        });
      })
      .then(() => {
        return db.collection('actors').doc(actor.firstName + ' ' + actor.lastName).update({ imageUrl: getters.actor.imageUrl })
      })
      .then(() => alert('Actor is uploaded successfuly.'))
      .catch(error => console.log(error) )
    }
  }
})
