<template>
  <div class="show-users">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs12>
          <v-card flat>
            <v-card-title style="background-color: #f2f0eb">
              <h2 class="subheader font-weight-light text-uppercase secondary--text">users</h2>
              <v-spacer></v-spacer>
              <v-btn depressed color="primary" :disabled="ifSelected" @click="deleteSelected">Delete selected</v-btn>
            </v-card-title>
            <v-card-text>
              <v-flex xs12 sm6>
                <v-text-field max-width="200" v-model="search" append-icon="search" label="Search"></v-text-field>
              </v-flex>
            </v-card-text>
          </v-card>
          <v-data-table :headers="headers" :items="users" :search="search" v-model="selected" select-all item-key="id">
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
              <td class="text-xs-left">{{ props.item.firstName }}</td>
              <td class="text-xs-left">{{ props.item.lastName }}</td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="text-xs-left">{{ props.item.password }}</td>
              <td class="text-xs-left">{{ props.item.id }}</td>
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
  name: 'ShowUsers',
  data () {
    return {
      users: [],
      search: '',
      selected: [],
      headers: [
        { text: 'First name', value: 'firstName' },
        { text: 'Last name', value: 'lastName' },
        { text: 'Email', value: 'email' },
        { text: 'Password', value: 'password' },
        { text: 'User ID', value: 'id' }
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
      let deleteUser = firebase.functions().httpsCallable('deleteUser')
      this.selected.forEach(user => {
        deleteUser({ id: user.id })
      })
    }
  },
  firestore: {
    users: db.collection('users')
  }
}
</script>

<style>

</style>
