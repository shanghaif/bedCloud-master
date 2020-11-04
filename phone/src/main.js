
import Vue from 'vue'
import App from './App.vue'
import Office from './views/Office.vue'
import router from './router'
import store from './store'
import BathCall from './views/BathCall.vue'
import Axios from 'axios'
import Vconsole from 'vconsole'

Vue.prototype.$eventBus = new Vue()
Axios.defaults.baseURL = 'http://192.90.111.30:8785/api/'
// Axios.defaults.baseURL = 'http://192.168.2.20:8785/api/'  //测试环境  10.21

Axios.interceptors.request.use(
  function ({ data, ...config }) {
    if (data instanceof FormData) {
      data.append('deviceCode', window.plus.getMac())
      return { ...config, data }
    } else {
      return { ...config, data: { ...data, deviceCode: window.plus.getMac() } }
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)
router.beforeEach((to, from, next) => {
  if (to.path !== '/office' && !store.state.bindInfo.name) {
    next('/office')
  } else {
    next()
  }
})
// if (process.env.NODE_ENV !== 'production') {
//   window.plus = {
//     getSpStr () {
//       return /* window.localStorage.getItem(key) */ null
//     },
//     saveSpStr (key, value) {
//       // window.localStorage.setItem(key, value)
//       console.log(key, value)
//     },
//     getMac () {
//       // return '865856789580262'
//     //   return '66596ba2d3082910'
//     },
//     registSocketListener () {
//       console.log('register')
//     },
//     getAppVersion () {
//       return '1.0.0'
//     },
//     voice_call () {
//       console.log('call')
//     },
//     updateSysTime () {
//       console.log('update system time')
//     },
//     getVolume () {
//       return 0
//     },
//     setVolume () {
//       console.log('set volume')
//     }
//   }
// }
Vue.prototype.axios = Axios
const vConsole = new Vconsole()
console.log(vConsole)
new Vue({
  router,
  store,
  render: function (h) {
    if (this.$route.path === '/bathcall') {
      return h(BathCall)
    } else if (this.$route.path === '/office') {
      return h(Office)
    } else {
      return h(App)
    }
  }
}).$mount('#app')
