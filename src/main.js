import Vue from 'vue'
import App from './App'
import api from './utils/api'

import mpvueToastRegistry from 'mptoast/src/registry'
mpvueToastRegistry(Vue)

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$api = api

const app = new Vue(App)
app.$mount()
Vue.prototype.globalData = getApp().globalData
