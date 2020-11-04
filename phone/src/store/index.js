import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import moment from 'moment'

const audioCtx = new AudioContext()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTime: 0,
    broadcastSelectedDevice: [],
    bindInfo: {
      hospitalName: '',
      areaName: '',
      name: ''
    },
    deviceList: {
      chestList: [],
      bedList: [],
      doctorList: [],
      ipList: []
    },
    currentCall: {
      calledCode: '',
      callerCode: '',
      channelId: '',
      targetName: ''
    },
    recordList: [],
    bathCallList: [],
    noticeList: [],
    currentAudioSourceNode: null,
    called: false
  },
  getters: {
    currentDate (state) {
      return moment(state.currentTime).format('YYYY-MM-DD HH:mm')
    }
  },
  mutations: {
    updateTime (state, payload) {
      state.currentTime = payload
    },
    pickupDevice (state, payload) {
      const index = state.broadcastSelectedDevice.indexOf(payload)
      if (index < 0) {
        state.broadcastSelectedDevice.push(payload)
      } else {
        state.broadcastSelectedDevice.splice(index, 1)
      }
    },
    clearSelectedDevice (state) {
      state.broadcastSelectedDevice = []
    },
    bindOffice (state, payload) {
      state.bindInfo = payload
    },
    getDeviceList (state, payload) {
      state.deviceList = payload
    },
    phoneCall (state, payload) {
      state.currentCall = payload
    },
    hangup (state) {
      state.currentCall = {
        calledCode: '',
        callerCode: '',
        channelId: '',
        targetName: ''
      }
    },
    newPhoneCall (state, payload) {
      console.log('new phone call', payload)
      state.noticeList.push(payload)
    },
    recordPhoneCall (state, payload) {
      state.recordList.push(payload)
    },
    handlePhoneCall (state) {
      const phoneCall = state.noticeList.shift()
      state.recordList.push({ ...phoneCall, handled: true })
      state.currentCall = phoneCall
    },
    unhandledPhoneCall (state, payload) {
      const index = state.noticeList.findIndex(notice => notice.channelId === payload)
      if (index >= 0) {
        const phoneCall = state.noticeList.splice(index, 1)
        state.recordList.push({ ...phoneCall, handled: false })
      }
    },
    newBathCall (state, payload) {
      state.bathCallList.push(payload)
    },
    handleBathCall (state) {
      state.bathCallList.shift()
    },
    stopSound (state) {
      console.log('stop', '来了就是这里')
      if (state.currentAudioSourceNode) {
        state.currentAudioSourceNode.stop()
        state.currentAudioSourceNode.disconnect()
      }
    },
    changeAudioSourceNode (state, payload) {
      console.log('changeAudioSourceNode', payload)
      if (state.currentAudioSourceNode) {
        state.currentAudioSourceNode.stop()
        state.currentAudioSourceNode.disconnect()
      }
      if (payload) {
        state.currentAudioSourceNode = audioCtx.createBufferSource()
        state.currentAudioSourceNode.buffer = payload
        state.currentAudioSourceNode.connect(audioCtx.destination)
        state.currentAudioSourceNode.loop = true
        state.currentAudioSourceNode.start()
      }
    }
  },
  actions: {
    playSound ({ commit }, url) {
      console.log('play sound', url)
      Axios.get(url, {
        responseType: 'arraybuffer',
        baseURL: ''
      }).then(res => res.data).then(arrBuffer => {
        audioCtx.decodeAudioData(arrBuffer, function (audioBuffer) {
          commit('changeAudioSourceNode', audioBuffer)
        })
      })
    }
  },
  modules: {
  }
})
