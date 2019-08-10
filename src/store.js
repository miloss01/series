import Vue from 'vue'
import Vuex from 'vuex'

import authModule from '../store/auth'
import seriesModule from '../store/series'
import actorsModule from '../store/actors'
import errorsModule from '../store/shared/errors'
import loadingModule from '../store/shared/loading'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authModule,
    seriesModule,
    actorsModule,
    errorsModule,
    loadingModule
  }
})