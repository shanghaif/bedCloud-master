import Vue from 'vue'
import App from './App.vue'
import Moment from 'moment'
import Axios from 'axios'
import Swiper from 'vue-awesome-swiper'
import vConsole from 'vconsole'
Vue.config.productionTip = false
Axios.defaults.baseURL = 'http://192.90.111.30:8785/api/'  //正式环境
// Axios.defaults.baseURL = 'http://192.168.1.118:8785/api/'  //测试环境
// Axios.defaults.baseURL = 'http://192.168.2.20:8785/api/'  //测试环境

Vue.prototype.axios = Axios
Vue.use(Swiper)
Moment.locale('zh-cn')
const a = new vConsole()
console.log(a)

if (process.env.NODE_ENV !== 'production') {
  window.plus = {
    getSpStr () {
      return /* window.localStorage.getItem(key) */ null
    },
    saveSpStr (key, value) {
      // window.localStorage.setItem(key, value)
      console.log(key, value)
    },
    getMac () {
      return '111111'
      // return '7d0e09006e7c57a0' //本机测试  10.21
    },
    registSocketListener () {
      console.log('register')
    },
    getAppVersion () {
      return '1.0.0'
    },
    voice_call () {
      console.log('call')
    },
    updateSysTime () {
      console.log('update system time')
    },
    getVolume () {
      return 0
    },
    setVolume () {
      console.log('set volume')
    }
  }
}

new Vue({
  render: h => h(App),
}).$mount('#app')
