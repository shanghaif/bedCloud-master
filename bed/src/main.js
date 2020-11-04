import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Moment from 'moment'
import Axios from 'axios'
import LoadingDirective from './directive/loading'
import Console from 'vconsole'
Vue.config.productionTip = false
const vconsole = new Console()
console.log(vconsole)

Vue.use(VueAwesomeSwiper)
Vue.use(LoadingDirective)

Vue.prototype.api = Axios.create({
//   baseURL: 'http://192.90.111.30:8785/api' // 正式环境
  // baseURL: 'http://192.168.2.20:8785/api' // 测试环境
  baseURL:'http://192.168.1.109:8785/api'
})
Vue.prototype.call = Axios.create({
    // baseURL: 'http://192.90.111.30:8787/accurateCall' // 正式环境
  baseURL: 'http://192.168.1.109:8785/accurateCall'
//   baseURL: 'http://192.168.2.20:8787/accurateCall' // 测试环境
});

// 事件总线
Vue.prototype.$bus = new Vue()

// 测试环境内容
if (process.env.NODE_ENV !== 'production') {
  window.plus = {
    getSpStr (key) {
      return /* window.localStorage.getItem(key) */ null
    },
    saveSpStr (key, value) {
      // window.localStorage.setItem(key, value)
      console.log(key, value)
    },
    getMac () {
      return '865589556633865'
    //   return '865856789580262'
    // return "865856789580502";
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

// 为所有请求自动添加deviceCode参数
Vue.prototype.api.interceptors.request.use(
  function ({ data, ...config }) {
    if (data instanceof Array) {
      return {
        ...config,
        data: data.map(item => ({
          ...item,
          deviceCode: window.plus.getMac()
        }))
      }
    } else {
      return { ...config, data: { ...data, deviceCode: window.plus.getMac() } }
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)
Vue.prototype.call.interceptors.request.use(
  function ({ data, ...config }) {
    if (data instanceof Array) {
      return {
        ...config,
        data: data.map(item => ({
          ...item,
          deviceCode: window.plus.getMac()
        }))
      }
    } else {
      return { ...config, data: { ...data, deviceCode: window.plus.getMac() } }
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)
Moment.locale('zh-cn')

// 终端尚未绑定床位时自动跳转到选床页面
router.beforeEach((to, from, next) => {
  console.log('\'' + from.path + '\'→\'' + to.path + '\' ', store.state.bindBed)
  Vue.prototype.$bus.$emit('route-change')
  if (to.path !== '/beds' && !store.state.bindBed) {
    next('/beds')
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
