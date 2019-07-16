<template>
  <v-dialog max-width="500px" v-model="Regdialog">
    <v-btn flat outline color="white" slot="activator">
      <v-icon small left>face</v-icon>
      <span>Sign up</span>
    </v-btn>
    <v-card dark>
        <v-card-title>
          <span class="title font-weight-light">Sign up</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="First Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Last Name*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary lighten-1" flat @click="Regdialog = false">Close</v-btn>
          <v-btn color="green darken-2" flat>Sign up</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'Signup',
  data () {
    return {
      Regdialog: false
    }
  }
}
</script>

<style>

</style>
