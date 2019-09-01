<template>
  <div class="series">
    <v-container>
      <h3 class="display-2 primary--text text-xs-center font-weight-thin my-5 text-uppercase">explore series</h3>
      <v-layout row wrap mt-5 justify-center>
        <v-flex xs12 sm4 md3 lg2 v-for="serie in showSeries" :key="serie.title" pa-3>
          <v-card tile flat>
            <v-card-title class="px-0 py-2">
              <router-link :to="{ name: 'serie', params: { title: serie.title }}" style="text-decoration: none">
                <h3 class="body-3 primary--text">{{ serie.title }}</h3>
              </router-link>
            </v-card-title>
            <v-img :src="serie.imageUrl" width="100%" height="200"></v-img>
            <v-card-actions class="px-0 py-2">
              <v-spacer></v-spacer>
              <v-btn small depressed outline color="primary" @click="setSerie({ title: serie.title, imageUrl: serie.imageUrl })">track</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from '@/firebase'
import firebase from 'firebase'

export default {
  name: 'Series',
  data () {
    return {
      series: [],
      inTracker: [],
      showSeries: []
    }
  },
  created () {
    const firstTime = this.$store.getters.firstTime
    if(firstTime == false) {
      this.$store.commit('setFirstTime', true)
      this.$router.go()
    } else {
      this.$store.commit('setFirstTime', false)
    }
    const userId = this.$store.getters.user.id
    db.collection('users').doc(userId).onSnapshot(doc => {
      this.inTracker = doc.data().tracker
      console.log(this.inTracker)

      if (this.inTracker) {
        this.series.forEach(serie => {
          if (!this.inTracker.includes(serie.title))
            this.showSeries.push(serie)
        })
      } else {
        this.series.forEach(serie => {
          this.showSeries.push(serie)
        })
      }
    })
  },
  firestore: {
    series: db.collection('series')
  },
  methods: {
    async setSerie (payload) {
      const userId = this.$store.getters.user.id
      
      await db.collection('users').doc(userId).collection('tracker').doc(payload.title)
      .set({
        title: payload.title,
        imageUrl: payload.imageUrl,
        season: 1,
        episode: 1
      })

      await db.collection('users').doc(userId)
      .update({ tracker: firebase.firestore.FieldValue.arrayUnion(payload.title) })
      .then(() => this.$router.go())
    }
  }
}
</script>