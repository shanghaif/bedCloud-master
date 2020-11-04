import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/index.ts'
import Moment from 'moment'
import Axios from 'axios'
import vConsole from 'vconsole'

import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
const vconsole = new vConsole()
console.log(vconsole)
// Axios.defaults.baseURL = 'http://192.90.111.30:8785/api/' // 正式地址
Axios.defaults.baseURL = 'http://192.90.2.20:8785/api/' // 测试地址
Vue.prototype.axios = Axios
Moment.locale('zh-cn')
const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/detail',
    component: () => import('./views/Details.vue')
  },
  {
    path: '/bathCall',
    component: () => import('./views/BathCall.vue')
  },
  {
    path: '/roomSelect',
    component: () => import('./views/RoomSelect.vue')
  },
]
const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' &&
    from.path !== '/login' &&
    !store.state.bindRoom) {
    next('/login')
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
