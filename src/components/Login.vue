<template>
  <v-dialog max-width="400px" v-model="loginDialog">
    <v-btn flat slot="activator">
      <span>Log in</span>
    </v-btn>
    <v-card dark>
        <v-card-title>
          <span class="title font-weight-light">Log in</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
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
          <v-btn color="primary lighten-1" flat @click="loginDialog = false">Close</v-btn>
          <v-btn color="green darken-2" flat>Log in</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginDialog: false
    }
  }
}
</script>

<style>

</style>
