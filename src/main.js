// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import "babel-polyfill";
// import vueParticleLine from 'vue-particle-line'

import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/app.css'
import 'vue-particle-line/dist/vue-particle-line.css'
import store from '@/store/index'
import '@/common/css/reset.scss'
import '@/common/js/permission'
import '@/common/css/transition'
import Alert from '@/components/message/main'
import shadow from '@/utils/setShade'

Vue.use(ElementUI, {
  size: 'medium'
})
// Vue.use(vueParticleLine)

Vue.config.productionTip = false
Vue.prototype.$Alert = Alert
Vue.prototype.$shadow = shadow


window.addEventListener('beforeunload', ()=>{
  let newArr = JSON.stringify([])
  localStorage.setItem('dialogRouteNames', newArr)
})

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
