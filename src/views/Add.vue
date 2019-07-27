<template>
  <div class="add">
    <h3 class="secondary--text mx-1 my-3 font-weight-light text-uppercase">add new title</h3>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3>
          <v-text-field label="Title" v-model="title" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3>
          <v-radio-group v-model="status">
            <v-radio 
              v-for="(status, index) in statuses" 
              :key="index" 
              :label="status.status" 
              :value="status.status"
              :color="status.color">
            </v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs3 sm6 md2 lg1 v-for="(item, index) in genres" :key="index" my-1>
          <v-checkbox 
            color="secondary" 
            :label="item" 
            :value="item"
            v-model="genre">
          </v-checkbox>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        {{ genre }}
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Add',
    data () {
      return {
        status: null,
        title: null,
        genre: [],
        statuses: [
          {status: 'Ongoing', color: 'green'},
          {status: 'Finished', color: 'red'}
        ],
        genres: [
          'Crime', 'Drama', 'Mistery', 'Comedy', 'Horror', 'Sci-Fi', 'Comedy', 'Horror', 'Sci-Fi' 
        ]
      }
    }
  }
</script>

<style>
  
</style>
