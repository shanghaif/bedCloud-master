import moment from 'moment'

export default {
  state: {
    currentTime: 0
  },
  getters: {
    currentDate (state) {
      return moment(state.currentTime).format('MM月DD日  HH:mm  dddd')
    },
    recordStartTime (state) {
      return moment(state.currentTime).set({
        hours: 0,
        minutes: 0,
        seconds: 0
      })
    },
    recordEndTime (state) {
      return moment(state.currentTime).set({
        hours: 0,
        minutes: 0,
        seconds: 0
      }).add(1, 'days')
    }
  },
  mutations: {
    updateTime (state, payload) {
      state.currentTime = payload
    }
  }
}
