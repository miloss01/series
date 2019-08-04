<template>
  <div class="show-series">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs12>
          <v-card flat>
            <v-card-title style="background-color: #eb4034">
              <h2 class="subheader font-weight-light text-uppercase white--text">series</h2>
              <v-spacer></v-spacer>
              <v-btn outline dark depressed flat :disabled="ifSelected" @click="deleteSelected">Delete selected</v-btn>
            </v-card-title>
            <v-card-text>
              <v-flex xs12 sm6>
                <v-text-field max-width="200" v-model="search" append-icon="search" label="Search"></v-text-field>
              </v-flex>
            </v-card-text>
          </v-card>
          <v-data-table :headers="headers" :items="series" :search="search" v-model="selected" select-all item-key="title">
            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    {{ props.header.text }}
                  </span>
                </template>
                <span>
                  {{ props.header.text }}
                </span>
              </v-tooltip>
            </template>
            <template v-slot:items="props">
              <td>
                <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
              </td>
              <td class="text-xs-left">
                <img :src="props.item.imageUrl" alt="No image." width="150" height="90">
              </td>
              <td class="text-xs-left">{{ props.item.title }}</td>
              <td class="text-xs-left">{{ props.item.status }}</td>
              <td class="text-xs-left">{{ props.item.startYear }}</td>
              <td class="text-xs-left">{{ props.item.endYear }}</td>
              <td class="text-xs-left">{{ props.item.actors.join(', ') }}</td>
              <td class="text-xs-left">{{ props.item.category.join(', ') }}</td>
              <td class="text-xs-left">{{ props.item.description }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/firebase'
import functions from 'firebase/functions'

export default {
  name: 'ShowSeries',
  data () {
    return {
      series: [],
      search: '',
      selected: [],
      headers: [
        { text: 'Thumbnail', value: 'thumbnail' },
        { text: 'Title', value: 'title' },
        { text: 'Status', value: 'status' },
        { text: 'Start year', value: 'startyear' },
        { text: 'End year', value: 'endorcurrentyear' },
        { text: 'Actors', value: 'actors' },
        { text: 'Category', value: 'category' },
        { text: 'Description', value: 'description' }
      ]
    }
  },
  computed: {
    ifSelected () {
      if (this.selected.length === 0) 
        return true
      else 
        return false
    }
  },
  methods: {
    deleteSelected () {
      let deleteSerie = firebase.functions().httpsCallable('deleteSerie')
      this.selected.forEach(serie => {
        deleteSerie({ title: serie.title })
      })
    }
  },
  firestore: {
    series: db.collection('series')
  }
}
</script>

<style>

</style>
