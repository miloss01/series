<template>
  <div class="show-actors">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs12>
          <v-card flat>
            <v-card-title style="background-color: #37eb34">
              <h2 class="subheader font-weight-light text-uppercase white--text">actors</h2>
              <v-spacer></v-spacer>
              <v-btn outline dark depressed flat :disabled="ifSelected" @click="deleteSelected">Delete selected</v-btn>
            </v-card-title>
            <v-card-text>
              <v-flex xs12 sm6>
                <v-text-field max-width="200" v-model="search" append-icon="search" label="Search"></v-text-field>
              </v-flex>
            </v-card-text>
          </v-card>
          <v-data-table :headers="headers" :items="actors" :search="search" v-model="selected" select-all item-key="firstName">
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
                <img :src="props.item.imageUrl" alt="No image." width="110" height="90">
              </td>
              <td class="text-xs-left">{{ props.item.firstName }}</td>
              <td class="text-xs-left">{{ props.item.lastName }}</td>
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
      actors: [],
      search: '',
      selected: [],
      headers: [
        { text: 'Thumbnail', value: 'thumbnail' },
        { text: 'First name', value: 'firstname' },
        { text: 'Last name', value: 'lastname' }
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
      let deleteActor = firebase.functions().httpsCallable('deleteActor')
      this.selected.forEach(actor => {
        deleteActor({ firstName: actor.firstName, lastName: actor.lastName})
      })
    }
  },
  firestore: {
    actors: db.collection('actors')
  }
}
</script>

<style>

</style>
