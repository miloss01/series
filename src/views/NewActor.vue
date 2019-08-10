<template>
  <div class="new-actor">
    <v-container>
      <v-layout row wrap justify-center>
        <v-card max-width="600" class="pa-3">
          <v-card-title>
            <h2 class="headline font-weight-light text-uppercase primary--text">add new actor</h2>
          </v-card-title>
          <v-form @submit.prevent="addActor">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="First name" v-model="actor.firstName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Last name" v-model="actor.lastName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-btn @click="refEvent" outline color="primary">Image</v-btn>
                <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="pickFile">
              </v-flex>
              <v-flex xs12 my-3>
                <img :src="actor.imageUrl" style="max-width: 100%; max-height: 350px">
              </v-flex>
            </v-layout>
            <v-btn type="submit" outline color="primary" :disabled="!formValidation">Upload</v-btn>
          </v-form>
        </v-card>
      </v-layout>
      <v-layout row wrap>
        {{ actor }}
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'NewActor',
  data () {
    return {
      actor: {
        firstName: null,
        lastName: null,
        imageUrl: null,
        image: null
      },
      actors: []
    }
  },
  computed: {
    formValidation () {
      if (
        this.actor.firstName &&
        this.actor.lastName &&
        this.actor.imageUrl &&
        this.actor.image 
      ) return true
      else return false
    }
  },
  methods: {
    refEvent () {
      this.$refs.fileInput.click()
    },
    pickFile (event) {
      this.actor.imageUrl = URL.createObjectURL(event.target.files[0])
      this.actor.image = event.target.files[0]
    },
    addActor () {
      const newActor = {
        firstName: this.actor.firstName,
        lastName: this.actor.lastName,
        imageUrl: this.actor.imageUrl,
        image: this.actor.image
      }
      this.$store.dispatch('uploadActor', newActor)
      this.clearForm()
    },
    clearForm() {
      this.actor.firstName = null
      this.actor.lastName = null
      this.actor.imageUrl = null
      this.actor.image = null
    }
  }
}
</script>

<style>

</style>
