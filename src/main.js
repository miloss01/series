import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

let app = null

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      beforeCreate () {
        if (user)
          this.$store.dispatch('autoLogin', user)
      },
      render: h => h(App)
    }).$mount('#app')
  }
})