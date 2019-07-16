<template>
  <div class="nav">
    <v-navigation-drawer dark temporary v-model="sideNav" fixed width="250px">
      <v-layout column wrap>
        <v-flex>
          <Signup />
        </v-flex>
        <v-flex>
          <Login />
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

    <v-toolbar app dark clipped-left absolute>
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
