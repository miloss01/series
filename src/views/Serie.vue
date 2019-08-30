<template>
  <div class="serie accent">
    <v-container v-if="serie">
      <v-layout row wrap pa-3>
        <v-flex xs12 sm6 md4>
          <v-img :src="serie.imageUrl" class="mb-3" width="100%" max-height="500"></v-img>
        </v-flex>
        <v-flex xs12 sm6 md8 px-3>
          <h1 class="display-2 font-weight-light mb-4 text-uppercase white--text">{{ serie.title }}</h1>
          <h3 class="subheading white--text mt-3">Release year: <span class="primary--text">{{ serie.startYear }}</span></h3>
          <h3 class="subheading white--text">End or current year: <span class="primary--text">{{ serie.endYear }}</span></h3>
          <h3 v-if="serie.status == 'Finished'" class="subheading white--text mb-3">Status: <span class="primary--text">{{ serie.status }}</span></h3>
          <h3 v-if="serie.status == 'Ongoing'" class="subheading white--text mb-3">Status: <span class="green--text">{{ serie.status }}</span></h3>
          <p class="body-2 white--text">{{ serie.description }}</p>
          <h3 class="subheading white--text mt-3">Category: <span class="primary--text">{{ serie.category.join(', ') }}</span></h3>
          <v-layout row wrap v-if="actors" mt-4>
            <v-flex xs6 md4 lg3 v-for="actor in actors" :key="actor.imageUrl" px-3>
              <v-img :src="actor.imageUrl" height="220" width="100%" class="mb-2"></v-img>
              <p class="body-2 white--text text-xs-center">{{ actor.firstName }} {{ actor.lastName }}</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout column wrap align-center>
        <h3 class="headline white--text mt-5 text-xs-center">Comments</h3>
        <p class="body-1 grey--text text-xs-center">*Please be careful, comments can contain spoilers</p>
        <v-btn flat outline dark small @click="commentShow = !commentShow">show comments</v-btn>
      </v-layout>

      <v-layout row wrap justify-center mt-5 v-if="commentShow">
        <v-flex xs12 sm6>
          <v-textarea dark label="Comment" outline v-model="comment"></v-textarea>
          <v-btn outline color="white" class="mx-0" depressed @click="postComment" :disabled="comment == ''">post</v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap mt-5 v-if="commentShow && comments">
        <v-flex xs12 sm6 offset-sm3 v-for="(comment, index) in comments" :key="index" mt-2>
          <v-card dark color="primary">
            <v-card-title primary-title>
              <h3 class="font-weight-thin">{{ comment.author }}</h3> 
              <v-spacer></v-spacer> 
              <h5 class="font-weight-thin">{{ comment.date }}</h5>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="font-weight-thin">{{ comment.comment }}</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from '@/firebase'
import firebase from 'firebase'

export default {
  name: 'Serie',
  data () {
    return {
      serie: null,
      actors: [],
      commentShow: false,
      comment: null,
      comments: [],
      name: null
    }
  },
  created () {
    const title = this.$route.params.title
    this.getSerie(title)
    db.collection('series').doc(title).collection('comments').onSnapshot(querySnapshot => {
      this.comments = []
      querySnapshot.forEach(doc => {
        this.comments.push(doc.data())
      })
    })
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
        this.serie.actors.forEach(actor => {
          db.collection('actors').doc(actor).get()
          .then(doc => this.actors.push(doc.data()))
        })
      })
      .catch(error => console.log(error))
    },
    async postComment () {
      const userId = this.$store.getters.user.id
      const title = this.$route.params.title

      await db.collection('users').doc(userId).get()
      .then(doc => {
        this.name = doc.data().firstName + ' ' + doc.data().lastName
      })

      await db.collection('series').doc(title).collection('comments').add({
        author: this.name,
        comment: this.comment,
        date: new Date().toLocaleDateString()
      })
      .then(() => this.comment = null)
    }
  }
}
</script>