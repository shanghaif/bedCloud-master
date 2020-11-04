import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        bindRoom: '' // 设备绑定的病房
    },
    mutations: {
        bindRoom(state, payload) {
            state.bindRoom = payload
        }
    }
})