import Vue from 'vue'
import App from './App.vue'
import Moment from 'moment'
import Axios from 'axios'
import vConsole from 'vconsole'

const con = new vConsole()
console.log(con)
Moment.locale('zh-cn')
Vue.config.productionTip = false
Axios.defaults.baseURL = 'http://192.90.111.30:8785/api/'
Vue.prototype.axios = Axios

new Vue({
  render: h => h(App),
}).$mount('#app')
