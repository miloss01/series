<template>
  <div class="admin">
    <v-container>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3 v-for="btn in btns" :key="btn.text">
          <v-btn :color="btn.color" outline flat :to="btn.link" block>
            {{ btn.text }}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      btns: [
        { text: 'Preview', color: 'purple', link: { name: 'preview'} },
        { text: 'Tracker', color: 'blue lighten-2', link: { name: 'tracker'} },
        { text: 'New Serie', color: '#eb4034', link: { name: 'new-serie'} },
        { text: 'New Actor', color: 'green darken-3', link: { name: 'new-actor'} },
      ]
    }
  }
}
</script>