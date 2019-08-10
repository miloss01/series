import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewSerie from './views/NewSerie.vue'
import NewActor from './views/NewActor.vue'
import Preview from './views/Preview.vue'
import Profile from './views/Profile.vue'
import NoPage from './views/NoPage.vue'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new/serie',
      name: 'new-serie',
      component: NewSerie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new/actor',
      name: 'new-actor',
      component: NewActor,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '*',
      name: '404',
      component: NoPage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if(firebase.auth().currentUser)
      next()
    else
      next({ name: 'home' })
  } else {
    next()
  }
})

export default router