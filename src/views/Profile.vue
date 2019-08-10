<template>
  <div class="profile">
    <p v-if="user"> {{ user.firstName }}</p>
    <p v-if="user"> {{ user.lastName }}</p>
    <p v-if="user"> {{ user.email }}</p>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: 'Profile',
  data () {
    return {
      user: null
    }
  },
  created () {
    const id = this.$route.params.id
    this.getUser(id)
  },
  watch: {
    '$route.params.id' (id) {
      this.getUser(id)
    }
  },
  methods: {
    getUser (userId) {
      db.collection('users').doc(userId).get()
      .then(doc => {
        this.user = doc.data()
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>
