<template>
  <div class="serie accent">
    <v-container v-if="serie">
      <v-layout row wrap pa-3>
        <v-flex xs12 sm6 md4>
          <v-img :src="serie.imageUrl" class="mb-3" width="100%" max-height="500"></v-img>
        </v-flex>
        <v-flex xs12 sm6 md8 px-3>
          <h1 class="display-2 font-weight-light mb-4 text-uppercase white--text">{{ serie.title }}</h1>
          <h3 class="subheading white--text mt-3">Release year: <span class="primary--text">{{ serie.startYear }}</span></h3>
          <h3 class="subheading white--text">End or current year: <span class="primary--text">{{ serie.endYear }}</span></h3>
          <h3 v-if="serie.status == 'Finished'" class="subheading white--text mb-3">Status: <span class="primary--text">{{ serie.status }}</span></h3>
          <h3 v-if="serie.status == 'Ongoing'" class="subheading white--text mb-3">Status: <span class="green--text">{{ serie.status }}</span></h3>
          <p class="body-2 white--text">{{ serie.description }}</p>
          <h3 class="subheading white--text mt-3">Category: <span class="primary--text">{{ serie.category.join(', ') }}</span></h3>

          <v-layout row wrap v-if="actors" mt-4>
            <v-flex xs6 lg3 v-for="actor in actors" :key="actor.imageUrl" px-3>
              <v-img :src="actor.imageUrl" height="230" max-height="auto" class="mb-2"></v-img>
              <p class="body-2 white--text text-xs-center">{{ actor.firstName }} {{ actor.lastName }}</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: 'Serie',
  data () {
    return {
      serie: null,
      actors: []
    }
  },
  created () {
    const title = this.$route.params.title
    this.getSerie(title)
  },
  watch: {
    '$route.params.title' (title) {
      this.getSerie(title)
    }
  },
  methods: {
    getSerie (title) {
      db.collection('series').doc(title).get()
      .then(doc => {
        this.serie = doc.data()
        this.serie.actors.forEach(actor => {
          db.collection('actors').doc(actor).get()
          .then(doc => this.actors.push(doc.data()))
        })
      })
      .catch(error => console.log(error))
    }
  }
}
</script>