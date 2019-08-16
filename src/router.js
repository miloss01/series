import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewSerie from './views/NewSerie.vue'
import NewActor from './views/NewActor.vue'
import Preview from './views/Preview.vue'
import Profile from './views/Profile.vue'
import NoPage from './views/NoPage.vue'
import Admin from './views/Admin.vue'
import Tracker from './views/Tracker.vue'
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
        requiresAdmin: true
      }
    },
    {
      path: '/new/actor',
      name: 'new-actor',
      component: NewActor,
      meta: {
        requiresAdmin: true
      }
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview,
      meta: {
        requiresAdmin: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAdmin: true
      }
    },
    {
      path: '/tracker',
      name: 'tracker',
      component: Tracker,
      beforeEnter: (to, from, next) => {
        if (firebase.auth().currentUser)
          next()
        else
          next({ name: 'home' })
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
  if (to.matched.some(rec => rec.meta.requiresAdmin)) {
    if (firebase.auth().currentUser && firebase.auth().currentUser.uid == 'NrwueO9AI6bu2Bjxh0Ye7wgclIv2')
      next()
    else
      next({ name: 'home' })
  } else {
    next()
  }
})

export default router