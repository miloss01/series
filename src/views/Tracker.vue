<template>
  <div class="tracker">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
          <v-card min-width="100%" tile class="pa-3 mb-4">
            <v-card-title style="background-color: #572631">
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
                    color="#420b17"
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
              <v-btn color="primary" depressed flat outline :disabled="loading" @click="setSerie">
                Add new
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row wrap v-if="this.tracker">
        <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3 v-for="track in tracker" :key="track.title">
          <v-card min-width="100%" tile class="pa-3 mb-2" dark>
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
                :disabled="loading"
                depressed 
                @click="updateTrack({ title: track.title, season: track.season, episode: track.episode })" class="mr-3"
              >
                update
              </v-btn>
              <v-btn color="primary" depressed @click="deleteTrack(track.title)" :disabled="loading">
                delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/firebase'

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
      })
    })
  },
  methods: {
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
      this.$store.dispatch('setLoading', true)
      db.collection('users').doc(this.userId).collection('tracker').doc(payload.title).update({
        season: payload.season,
        episode: payload.episode
      })
      .then(() => {
        this.$store.dispatch('setLoading', false)
        console.log('updated track')
      })
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

<style scoped>
  .tracker {
    background: linear-gradient(0deg, rgba(117, 117, 117, 0.01) 0%, rgba(117, 117, 117, 0.01) 1%,rgba(235, 235, 235, 0.01) 1%, rgba(235, 235, 235, 0.01) 6%,rgba(196, 196, 196, 0.01) 6%, rgba(196, 196, 196, 0.01) 18%,rgba(209, 209, 209, 0.01) 18%, rgba(209, 209, 209, 0.01) 53%,rgba(196, 196, 196, 0.01) 53%, rgba(196, 196, 196, 0.01) 94%,rgba(223, 223, 223, 0.01) 94%, rgba(223, 223, 223, 0.01) 100%),linear-gradient(45deg, rgba(168, 168, 168, 0.05) 0%, rgba(168, 168, 168, 0.05) 6%,rgba(124, 124, 124, 0.05) 6%, rgba(124, 124, 124, 0.05) 20%,rgba(136, 136, 136, 0.05) 20%, rgba(136, 136, 136, 0.05) 23%,rgba(217, 217, 217, 0.05) 23%, rgba(217, 217, 217, 0.05) 24%,rgba(46, 46, 46, 0.05) 24%, rgba(46, 46, 46, 0.05) 71%,rgba(155, 155, 155, 0.05) 71%, rgba(155, 155, 155, 0.05) 100%),linear-gradient(135deg, rgba(73, 73, 73, 0.08) 0%, rgba(73, 73, 73, 0.08) 20%,rgba(235, 235, 235, 0.08) 20%, rgba(235, 235, 235, 0.08) 53%,rgba(69, 69, 69, 0.08) 53%, rgba(69, 69, 69, 0.08) 61%,rgba(104, 104, 104, 0.08) 61%, rgba(104, 104, 104, 0.08) 100%),linear-gradient(0deg, rgba(9, 9, 9, 0.01) 0%, rgba(9, 9, 9, 0.01) 1%,rgba(240, 240, 240, 0.01) 1%, rgba(240, 240, 240, 0.01) 6%,rgba(235, 235, 235, 0.01) 6%, rgba(235, 235, 235, 0.01) 7%,rgba(235, 235, 235, 0.01) 7%, rgba(235, 235, 235, 0.01) 56%,rgba(32, 32, 32, 0.01) 56%, rgba(32, 32, 32, 0.01) 68%,rgba(33, 33, 33, 0.01) 68%, rgba(33, 33, 33, 0.01) 71%,rgba(190, 190, 190, 0.01) 71%, rgba(190, 190, 190, 0.01) 81%,rgba(209, 209, 209, 0.01) 81%, rgba(209, 209, 209, 0.01) 100%),linear-gradient(0deg, rgba(50, 50, 50, 0.02) 0%, rgba(50, 50, 50, 0.02) 10%,rgba(2, 2, 2, 0.02) 10%, rgba(2, 2, 2, 0.02) 14%,rgba(27, 27, 27, 0.02) 14%, rgba(27, 27, 27, 0.02) 23%,rgba(22, 22, 22, 0.02) 23%, rgba(22, 22, 22, 0.02) 25%,rgba(252, 252, 252, 0.02) 25%, rgba(252, 252, 252, 0.02) 36%,rgba(82, 82, 82, 0.02) 36%, rgba(82, 82, 82, 0.02) 61%,rgba(168, 168, 168, 0.02) 61%, rgba(168, 168, 168, 0.02) 96%,rgba(255, 255, 255, 0.02) 96%, rgba(255, 255, 255, 0.02) 100%),linear-gradient(90deg, rgb(66, 11, 23),rgb(28, 37, 18));
  }
</style>