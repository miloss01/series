<template>
  <div class="series">
    <v-container>
      <h3 class="display-2 primary--text text-xs-center font-weight-thin my-5 text-uppercase">explore series</h3>
      <p v-if="series.length == 0" class="primary--text body-2 text-xs-center my-4 text-uppercase">you are tracking all series or there is some error</p>
      <v-layout row wrap mt-5 justify-center v-if="series">
        <v-flex xs12 sm4 md3 lg2 v-for="serie in series" :key="serie.title" pa-3>
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
      inTracker: []
    }
  },
  created () {
    const userId = this.$store.getters.user.id
    db.collection('users').doc(userId).get()
    .then(doc => {
      this.inTracker = doc.data().tracker
      if (this.inTracker) {
        this.series = this.series.filter(serie => !this.inTracker.includes(serie.title))
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
      .then(() => this.$router.push({ name: 'tracker' }))
    }
  }
}
</script>