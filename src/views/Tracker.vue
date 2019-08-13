<template>
  <div class="tracker">
    <v-container>
      <v-layout row wrap justify-center>
        <v-card min-width="600" tile class="pa-3">
          <v-card-title style="background-color: #D32F2F">
            <h2 class="white--text headline">New serie</h2>
            <v-spacer></v-spacer>
            <v-icon dark>add_circle</v-icon>
          </v-card-title>
          <v-card-actions>
            <v-select
              v-model="select"
              :items="showSeries"
              chips
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
      image: null
    }
  },
  methods: {
    setSerie () {
      this.$store.dispatch('setLoading', true)
      console.log(this.select)
      this.$store.dispatch('setLoading', false)
    }
  },
  computed: {
    showSeries () {
      this.series.forEach(serie => {
        this.seriesInCombobox.push(serie.title)
      })
      return this.seriesInCombobox
    },
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