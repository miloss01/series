<template>
  <v-footer dark height="auto">
    <v-card flat tile class="text-xs-center" style="background: linear-gradient(to right, #340a13 46%, #690f22 100%)">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text pt-0 pb-3">
        We create engaging brand assets and trusted content for your site, and then market it to authoritative sites across the web. Clients also get consulting from Jim Boykin and Ann Smarty. We've been trusted since 1999. Peace and Love.
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        &copy;2019 — <strong>Patrick Jane</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      icons: [
        'keyboard_arrow_up',
        'local_offer',
        'check',
        'mail',
        'format_list_bulleted'
      ]
    }
  }
}
</script>

<style>

</style>
