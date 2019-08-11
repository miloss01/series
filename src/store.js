import Vue from 'vue'
import Vuex from 'vuex'

import authModule from '../store/auth'
import seriesModule from '../store/series'
import actorsModule from '../store/actors'
import alertsModule from '../store/shared/alerts'
import loadingModule from '../store/shared/loading'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authModule,
    seriesModule,
    actorsModule,
    alertsModule,
    loadingModule
  },
})