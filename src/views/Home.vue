<template>
  <div class="home">
    <v-parallax :src="require('@/assets/images/bg3.jpg')" height="600">
      <v-layout align-center column justify-center>
        <h1 class="display-2 font-weight-thin mb-3 text-uppercase">
          <span class="primary--text">List</span>
          <span class="white--text">Series</span>
        </h1>
        <h4 class="subheading mb-5">Check your series and keep notes of progress!</h4>
        <small class="mb-5" v-if="!userIsAuth">*You must be logged in to track series...</small>
        <v-btn color="white" outline depressed :to="{ name: 'tracker' }" :disabled="!userIsAuth">
          track series
        </v-btn>
      </v-layout>
    </v-parallax>

    <!-- <v-container class="pa-0" fluid>
      <v-layout row wrap class="text-xs-center" justify-center style="background: linear-gradient(to bottom right, #340a13 46%, #690f22 100%)">
        <v-flex xs12 sm3 xl4>
          <v-card dark color="#340a13" flat class="py-5">
            <v-card-text>
              <h2 class="display-4 font-weight-thin text-uppercase white--text">13</h2>
            </v-card-text>
            <v-card-text>
              <h2 class="display-1 font-weight-thin text-uppercase white--text">Series</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3 xl4>
          <v-card dark color="#340a13" flat class="py-5">
            <v-card-text>
              <h2 class="display-4 font-weight-thin text-uppercase white--text">78</h2>
            </v-card-text>
            <v-card-text>
              <h2 class="display-1 font-weight-thin text-uppercase white--text">Seasons</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3 xl4>
          <v-card dark color="red" flat class="py-5">
            <v-card-text>
              <h2 class="display-4 font-weight-thin text-uppercase white--text">156</h2>
            </v-card-text>
            <v-card-text>
              <h2 class="display-1 font-weight-thin text-uppercase white--text">Episodes</h2>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container> -->

    <v-container class="pa-0" fluid>
      <v-layout row wrap class="text-xs-center">
        <v-flex xs12>
          <v-card tile class="py-2">
            <v-card-text>
              <h2 class="headline font-weight-light text-uppercase primary--text">our offers</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md8>
          <v-carousel hide-controls height="400">
            <v-carousel-item v-for="(img, index) in imgs" :key="index" :src="img"></v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex xs12 md4>
          <v-layout row wrap class="text-xs-center">
            <v-flex xs6 v-for="(item, index) in items" :key="index">
              <v-card dark ripple tile :color="item.color" flat class="pb-5 pt-2" min-height="200">
                <v-card-text>
                  <h2 class="font-weight-thin text-uppercase primary--text">{{ item.name }}</h2>
                </v-card-text>
                <v-card-text>
                  <h2 class="display-1 font-weight-thin text-uppercase accent--text">{{ item.number }}</h2>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
<!-- offline, responsive, feedback (support), free -->
    <v-container class="pa-0" fluid>
      <v-layout row wrap class="text-xs-center">
        <v-flex xs12>
          <v-card tile class="py-2">
            <v-card-text>
              <h2 class="headline font-weight-light text-uppercase primary--text">features</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap class="text-xs-center" justify-center>
            <v-flex xs4 md2 mx-2 my-5 v-for="feature in features" :key="feature.title" class="text-xs-center">
              <v-card tile color="#f2f2f2" flat>
                <v-card-text>
                  <v-icon size="70" color="primary lighten-2">{{ feature.icon }}</v-icon>
                </v-card-text>
                <v-card-text>
                  <h2 class="subheading font-weight-light text-uppercase primary--text">{{ feature.title }}</h2>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="pa-0" fluid>
      <v-layout row wrap class="text-xs-center">
        <v-flex xs12>
          <v-card tile class="py-2">
            <v-card-text>
              <h2 class="headline font-weight-light text-uppercase primary--text">newsletter</h2>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-parallax height="300" :src="require('@/assets/images/newsletter.jpg')">
            <v-layout align-center column justify-center>
              <v-flex xs4>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field v-model="email" dark color="white" type="email" label="Email" prepend-icon="email" :rules="[rules.email]"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn block color="white" outline depressed @click="applyNewsletter" :disabled="!emailValid">Apply for newsletter</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-parallax>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { db } from '@/firebase'

  export default {
    name: 'Home',
    data () {
      return {
        emailValid: false,
        rules: {
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (pattern.test(value)) {
              this.emailValid = true
              return 'Email is formatted well'
            } else {
              this.emailValid = false
              return 'Email is not formatted well'
            }
            // return pattern.test(value) || 'nije dobro'
          }
        },
        email: null,
        imgs: [
          require('@/assets/slider/sl1.jpg'),
          require('@/assets/slider/sl2.jpg'),
          require('@/assets/slider/sl3.jpeg'),
          require('@/assets/slider/sl4.jpg'),
          require('@/assets/slider/sl5.jpg')
        ],
        items: [
          { name: 'series', number: '13', color: '#f2f2f2' },
          { name: 'seasons', number: '78', color: '#f2f2f2' },
          { name: 'episodes', number: '156', color: '#f2f2f2' },
          { name: 'users', number: '93', color: '#f2f2f2' }
        ],
        features: [
          { title: 'Online', icon: 'signal_wifi_4_bar'},
          { title: 'Responsive', icon: 'mobile_friendly'},
          { title: 'Support', icon: 'contact_support'},
          { title: 'Free', icon: 'credit_card'}
        ]
      }
    },
    computed: {
      userIsAuth () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      applyNewsletter () {
        db.collection('newsletter').doc(this.email).set({
          email: this.email
        })
        .then(() => {
          this.email = null
          alert('You have successfuly applied for newsletter')
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  /* .home {
    background: linear-gradient(to bottom right, #161616 76%, #ac0b0b 76%);
  } */
</style>

