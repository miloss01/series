<template>
  <div class="add">
    <v-container>
      <v-layout row wrap justify-center>
        <v-card max-width="600" class="pa-3">
          <v-card-title>
            <h2 class="headline font-weight-light text-uppercase primary--text">add new serie</h2>
          </v-card-title>
          <v-form>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Title" v-model="serie.title"></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field min="0" step="1" type="number" label="Start year" v-model="serie.startYear"></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 sm4>
                <v-text-field min="0" step="1" type="number" label="End or current year" v-model="serie.endYear"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-radio-group v-model="serie.status">
                  <v-radio 
                    v-for="(status, index) in statuses" 
                    :key="index" 
                    :label="status.label" 
                    :value="status.name"
                    :color="status.color">
                  </v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-combobox hide-no-data hide-selected dense label="Category" :items="categories" multiple chips deletable-chips v-model="serie.category"></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-combobox hide-no-data hide-selected dense label="Actors" :items="actors" multiple chips deletable-chips v-model="serie.actors"></v-combobox>
              </v-flex> 
            </v-layout>
          </v-form>
        </v-card>
      </v-layout>
      <v-layout row wrap>
        {{ serie }}
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Add',
    data () {
      return {
        serie: {
          title: null,
          startYear: null,
          endYear: null,
          status: null,
          category: null,
          actors: null
        },
        statuses: [
          { label: 'Ongoing', name: 'ongoing', color: 'green' },
          { label: 'Finished', name: 'finished', color: 'red' }
        ],
        actors: [
          'Megan Boone', 'Jackie Chan', 'Bradley Cooper', 'Harrison Ford'
        ],
        categories: [
          'Crime', 'Drama', 'Mistery', 'Comedy', 'Horror', 'Sci-Fi'
        ]
      }
    }
  }
</script>

<style>
  
</style>
