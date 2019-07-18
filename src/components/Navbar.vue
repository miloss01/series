<template>
  <div class="nav">
    <v-navigation-drawer style="background: linear-gradient(to bottom right, #340a13 46%, #690f22 100%)" dark temporary v-model="sideNav" fixed width="250px">
      <v-layout column wrap align-center>
        <v-flex xs12 mb-5 mt-3>
          <router-link to="/" tag="span" style="cursor: pointer" mb-4>
            <span class="primary--text text-uppercase title">List</span>
            <span class="text-uppercase white--text font-weight-light title">Series</span>
          </router-link>
        </v-flex>
        <v-flex xs12>
          <Signup />
        </v-flex>
        <v-flex xs12>
          <Login />
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

    <v-toolbar app style="background: linear-gradient(to right, #340a13 46%, #690f22 100%)" dark clipped-left absolute>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="primary--text text-uppercase">List</span>
          <span class="text-uppercase font-weight-light">Series</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <Signup class="hidden-xs-only"></Signup>
      <Login class="hidden-xs-only"></Login>
    </v-toolbar>
  </div>
</template>

<script>
import Signup from './Signup'
import Login from './Login'

export default {
  name: 'Navbar',
  components: {
    Signup,
    Login
  },
  data () {
    return {
      sideNav: false
    }
  }
}
</script>

<style>

</style>
