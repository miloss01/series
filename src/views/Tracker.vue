<template>
  <div class="tracker">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm8 lg6>
          <v-card tile class="pa-3 mb-4">
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
        </v-flex>
      </v-layout>

      <v-card tile class="py-2 my-3 mx-2">
        <v-card-text>
          <h2 class="headline font-weight-light text-uppercase primary--text">tracker</h2>
        </v-card-text>
      </v-card>

      <v-layout row wrap v-if="this.tracker">
        <v-flex xs12 sm6 md4 lg3 v-for="track in tracker" :key="track.title">
          <v-card tile class="pa-3 ma-2" :img="track.imageUrl" dark>
            <v-card-title style="background-color: rgba(0,0,0,0.9)">
              <router-link :to="{ name: 'serie', params: { title: track.title }}" style="text-decoration: none">
                <h3 class="white--text headline">{{ track.title }}</h3>
              </router-link>
            </v-card-title>
            <v-card-actions style="background-color: rgba(0,0,0,0.9)">
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
            <v-card-actions style="background-color: rgba(0,0,0,0.9)">
              <v-spacer></v-spacer>
              <v-btn 
                color="green darken-3" 
                depressed 
                @click="updateTrack({ title: track.title, season: track.season, episode: track.episode })" class="mr-3">update</v-btn>
              <v-btn color="primary" depressed @click="deleteTrack(track.title)">delete</v-btn>
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
      tracker: [],
      imageUrl: null
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
    async setSerie () {
      if (this.select) {
        this.$store.dispatch('setLoading', true)
        await db.collection('series').doc(this.select).get()
        .then(doc => this.imageUrl = doc.data().imageUrl)
        .catch(error => {
          console.log(error)
          this.$store.dispatch('setLoading', false)
        })

        await db.collection('users').doc(this.userId).collection('tracker').doc(this.select)
        .set({
          title: this.select,
          imageUrl: this.imageUrl,
          season: 1,
          episode: 1
        })

        await db.collection('users').doc(this.userId)
        .update({ tracker: firebase.firestore.FieldValue.arrayUnion(this.select) })
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