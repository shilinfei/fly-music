// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入重置的css文件
import initialize from './assets/css/initialize.css';
// 引入字体图标的css文件
import fonts from './assets/font/iconfont.css'

import Vue from 'vue'
import App from './App'
import router from './router'

// 引入jsonp
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp,5000);
//引入axiosw
import Axios from 'axios'
Vue.prototype.$axios = Axios;
//引入vuex
import store from './store'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: c => c(App),
  router ,
  store
 
})
