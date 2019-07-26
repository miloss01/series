<template>
  <v-footer height="auto" style="background: linear-gradient(to right, #340a13 46%, #690f22 100%)">
    <v-layout justify-center row wrap>
      <v-btn v-for="link in links" :key="link" color="white" flat> {{ link }} </v-btn>
      <v-flex xs12 primary lighten-2 py-3 text-xs-center white--text style="background: linear-gradient(to right, #340a13 46%, #690f22 100%); border-top: 1px solid white">
        &copy;2019 — <strong>Patrick Jane</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      links: [
        'Home',
        'About Us',
        'List Series'
      ]
    }
  }
}
</script>

<style>

</style>
