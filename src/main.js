// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/common.css'
// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 引入vue-amap
import AMap from 'vue-amap'

// 请求接口封装
import {dataGet, dataPost} from './utils/axios.js'

Vue.prototype.$dataGet = dataGet
Vue.prototype.$dataPost = dataPost

Vue.use(VueAwesomeSwiper)
Vue.use(AMap)
Vue.use(require('vue-wechat-title'))

AMap.initAMapApiLoader({
  // 高德key
  key: 'ee0e3a51d00f96a3afe0827d1e6d879f',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
