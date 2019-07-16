<template>
  <div class="home">
    <v-parallax :src="require('@/assets/images/bg3.jpg')" height="600">
      <v-layout align-center column justify-center>
        <h1 class="display-2 font-weight-thin mb-3 text-uppercase">
          <span class="primary--text">List</span>
          <span class="white--text">Series</span>
        </h1>
        <h4 class="subheading mb-5">Check your series and keep notes of progress!</h4>
        <v-btn color="white" outline depressed to="/add">List series</v-btn>
      </v-layout>
    </v-parallax>

    <v-container class="pa-0" fluid>
      <v-layout row wrap class="text-xs-center" justify-center style="background: linear-gradient(to bottom right, #340a13 46%, #690f22 100%)">
        <v-flex xs12 sm3 xl4>
          <v-card color="rgb(0, 0, 0, 0)" dark flat class="py-5">
            <v-card-text>
              <h2 class="display-4 font-weight-thin text-uppercase white--text">13</h2>
            </v-card-text>
            <v-card-text>
              <h2 class="display-1 font-weight-thin text-uppercase white--text">Series</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3 xl4>
          <v-card color="rgb(0, 0, 0, 0)" dark flat class="py-5">
            <v-card-text>
              <h2 class="display-4 font-weight-thin text-uppercase white--text">78</h2>
            </v-card-text>
            <v-card-text>
              <h2 class="display-1 font-weight-thin text-uppercase white--text">Seasons</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3 xl4>
          <v-card color="rgb(0, 0, 0, 0)" dark flat class="py-5">
            <v-card-text>
              <h2 class="display-4 font-weight-thin text-uppercase white--text">156</h2>
            </v-card-text>
            <v-card-text>
              <h2 class="display-1 font-weight-thin text-uppercase white--text">Episodes</h2>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { db } from '@/firebase'

  export default {
    name: 'Home',
    data () {
      return {
        
      }
    }
  }
</script>

<style scoped>
  /* .home {
    background: linear-gradient(to bottom right, #161616 76%, #ac0b0b 76%);
  } */
</style>

