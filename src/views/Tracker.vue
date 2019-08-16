<template>
  <div class="tracker">
    <v-container>
      <v-layout row wrap justify-center>
        <v-card min-width="600" tile class="pa-3 mb-4">
          <v-card-title style="background-color: #D32F2F">
            <h2 class="white--text headline">New serie</h2>
            <v-spacer></v-spacer>
            <v-icon dark>add_circle</v-icon>
          </v-card-title>
          <v-card-actions>
            <v-select
              v-model="select"
              :items="seriesInCombobox"
              chips
              label="Choose serie to keep track of:"
              clearable
            >
              <template v-slot:selection="data">
                <v-chip
                  color="primary"
                  dark
                  outline
                  :key="JSON.stringify(data.item)"
                  :selected="data.selected"
                  :disabled="data.disabled"
                  class="v-chip--select-multi"
                  @click.stop="data.parent.selectedIndex = data.index"
                  @input="data.parent.selectItem(data.item)"
                >
                  <v-avatar class="accent white--text">
                    {{ data.item.slice(0, 1).toUpperCase() }}
                  </v-avatar>
                  {{ data.item }}
                </v-chip>
              </template>
            </v-select>
          </v-card-actions>
          <v-card-actions v-if="getImage">
            <v-img :src="getImage" max-width="600" max-height="350" contain></v-img>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" depressed flat outline :disabled="loading" :loading="loading" @click="setSerie">
              Add new
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>

      <v-layout row wrap justify-center v-if="this.tracker">
        <v-card v-for="track in tracker" :key="track.title" min-width="600" tile class="pa-3 mb-2" dark>
          <v-card-title style="background-color: #2f2f2f">
            <h3 class="white--text headline">{{ track.title }}</h3>
          </v-card-title>
          <v-card-actions>
            <v-layout row wrap>
              <v-flex xs5>
                <v-text-field min="0" step="1" type="number" label="Season" :value="track.season" 
                @change="track.season = $event"></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs5>
                <v-text-field min="0" step="1" type="number" label="Episode" :value="track.episode"
                @change="track.episode = $event"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              color="green darken-3" 
              depressed 
              @click="updateTrack({ title: track.title, season: track.season, episode: track.episode })" class="mr-3">update</v-btn>
            <v-btn color="primary" depressed @click="deleteTrack(track.title)">delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/firebase'
import { constants } from 'crypto';
export default {
  name: 'Tracker',
  data () {
    return {
      select: null,
      series: [],
      seriesInCombobox: [],
      image: null,
      inTracker: [],
      userId: null,
      tracker: []
    }
  },
  created () {
    this.userId = this.$store.getters.user.id
    db.collection('users').doc(this.userId).onSnapshot(doc => {
      this.inTracker = doc.data().tracker
      console.log(this.inTracker)
      if (this.inTracker) {
        this.series.forEach(serie => {
          if (!this.inTracker.includes(serie.title))
            this.seriesInCombobox.push(serie.title)
        })
      } else {
        this.series.forEach(serie => {
          this.seriesInCombobox.push(serie.title)
        })
      }
    })
    db.collection('users').doc(this.userId).collection('tracker').onSnapshot(querySnapshot => {
      this.tracker = []
      querySnapshot.forEach(doc => {
        this.tracker.push(doc.data())
        // console.log(doc.data().title + ' season: ' + doc.data().season + ' episode: ' + doc.data().episode)
      })
    })
  },
  methods: {
    // ubacivanje u tracker array radi -->
    setSerie () {
      if (this.select) {
        this.$store.dispatch('setLoading', true)
        db.collection('users').doc(this.userId).collection('tracker').doc(this.select).set({
          title: this.select,
          season: 1,
          episode: 1
        })
        db.collection('users').doc(this.userId).update({ tracker: firebase.firestore.FieldValue.arrayUnion(this.select) })
        .then(() => {
          console.log('success')
          this.seriesInCombobox = this.seriesInCombobox.filter(serie => serie !== this.select)
          this.select = null
          this.$store.dispatch('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          this.$store.dispatch('setLoading', false)
        })
      }
    },
    deleteTrack (payload) {
      console.log(payload)
      db.collection('users').doc(this.userId).update({ tracker: firebase.firestore.FieldValue.arrayRemove(payload) })
      db.collection('users').doc(this.userId).collection('tracker').doc(payload).delete()
      .then(() => console.log('removed'))
    },
    updateTrack (payload) {
      db.collection('users').doc(this.userId).collection('tracker').doc(payload.title).update({
        season: payload.season,
        episode: payload.episode
      })
      .then(() => console.log('updated track'))
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    getImage () {
      if (this.select) {
        this.$store.dispatch('setLoading', true)
        db.collection('series').where('title', '==', this.select).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.image = doc.data().imageUrl
            this.$store.dispatch('setLoading', false)
          })
        })
        .catch(error => {
          this.$store.dispatch('setLoading', false)
        })
        return this.image
      } else {
        return null
      }
    }
  },
  firestore: {
    series: db.collection('series')
  }
}
</script>