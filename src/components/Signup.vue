<template>
  <v-dialog max-width="500px" v-model="regDialog">
    <v-btn flat outline color="white" slot="activator">
      <v-icon small left>face</v-icon>
      <span>Sign up</span>
    </v-btn>
    <form @submit.prevent="signup">
      <v-card dark>
        <v-card-title>
          <span class="title font-weight-light">Sign up</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="First Name*" v-model="firstName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Last Name*" v-model="lastName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" v-model="email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" v-model="password"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary lighten-1" flat @click="regDialog = false">Close</v-btn>
          <v-btn type="submit" color="green darken-2" flat>Sign up</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script>

export default {
  name: 'Signup',
  data () {
    return {
      regDialog: false,
      firstName: null,
      lastName: null,
      email: null,
      password: null
    }
  },
  methods: {
    signup () {
      const newUser = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      }
      this.$store.dispatch('signup', newUser)
      this.$router.push({ name: 'add' })
    }
  }
}
</script>

<style>

</style>
