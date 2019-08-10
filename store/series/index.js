import firebase from 'firebase'
import { db } from '@/firebase'

export default {
  state: {
    serie: null
  },
  getters: {
    serie (state) {
      return state.serie
    }
  },
  mutations: {
    setSerie (state, payload) {
      state.serie = payload
    }
  },
  actions: {
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
    }
  }
}