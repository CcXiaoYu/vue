// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import https from './server'
//import Axios from 'axios';
Vue.use(https);

import store from './store'


import '@/assets/css/reset.css'
import '@/assets/css/header.css'
import '@/assets/css/account.css'
import '@/assets/css/address.css'
import '@/assets/css/cart.css'
import '@/assets/css/checkout.css'
import '@/assets/css/goodsList.css'
//import '@/assets/css/item.css'
import '@/assets/css/order.css'


//Vue.prototype.HOST = '/api'
//Vue.prototype.$axios = Axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
