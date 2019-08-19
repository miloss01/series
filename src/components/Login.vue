<template>
  <v-dialog max-width="400px" v-model="loginDialog">
    <v-btn flat slot="activator">
      <span>Sign in</span>
    </v-btn>
    <form @submit.prevent="login">
      <v-card dark>
        <v-card-title>
          <span class="title font-weight-light">Sign in</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Email*" v-model="email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" v-model="password"></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="error">
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap>
            <v-flex xs12 mb-2 px-4>
              <v-btn block type="submit" color="green darken-1" flat outline :disabled="loading" :loading="loading">
                Sign in
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-flex>
            <v-flex xs12 mb-2 px-4>
              <v-btn block @click="signInGoogle" color="primary" depressed :disabled="loading" :loading="loading">
                Sign in with Google
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-flex>
            <v-flex xs12 mb-2 px-4>
              <v-btn block @click="signInFacebook" color="blue darken-4" depressed :disabled="loading" :loading="loading">
                Sign in with Facebook
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-flex>
            <v-flex xs12 px-4>
              <v-btn block color="primary lighten-1" flat @click="loginDialog = false">Close</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      loginDialog: false,
      email: null,
      password: null
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {email: this.email, password: this.password})
    },
    signInGoogle () {
      var provider = new firebase.auth.GoogleAuthProvider()
      this.$store.dispatch('signInWithProvider', provider)
    },
    signInFacebook () {
      var provider = new firebase.auth.FacebookAuthProvider()
      this.$store.dispatch('signInWithProvider', provider)
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style>

</style>
