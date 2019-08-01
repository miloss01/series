<template>
  <div class="show-users">
    <v-container>
      <v-layout row wrap justify-center>
        <v-flex xs12>
          <v-card flat>
            <v-card-title style="background-color: #f2f0eb">
              <h2 class="subheader font-weight-light text-uppercase secondary--text">users</h2>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
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
        {{ showSelected }}
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: 'Preview',
  data () {
    return {
      users: [],
      ids: [],
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
    showSelected () {
      this.ids = []
      this.selected.forEach((item) => {
        this.ids.push(item.id)
      })
      return console.log(this.ids)
    }
  },
  firestore: {
    users: db.collection('users')
  }
}
</script>

<style>

</style>
