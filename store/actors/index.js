import firebase from 'firebase'
import { db } from '@/firebase'

export default {
  state: {
    actor: null
  },
  getters: {
    actor (state) {
      return state.actor
    }
  },
  mutations: {
    setActor (state, payload) {
      state.actor = payload
    }
  },
  actions: {
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
}