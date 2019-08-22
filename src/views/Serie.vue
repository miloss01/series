<template>
  <div class="serie">
    <h2 v-if="serie">{{ serie.title }}</h2>
    <h2 v-if="serie">{{ serie.description }}</h2>
    <h2 v-if="serie">{{ serie.startYear }}</h2>
    <h2 v-if="serie">{{ serie.endYear }}</h2>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: 'Serie',
  data () {
    return {
      serie: null
    }
  },
  created () {
    const title = this.$route.params.title
    this.getSerie(title)
  },
  watch: {
    '$route.params.title' (title) {
      this.getSerie(title)
    }
  },
  methods: {
    getSerie (title) {
      db.collection('series').doc(title).get()
      .then(doc => {
        this.serie = doc.data()
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>