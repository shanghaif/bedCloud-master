import Vue from 'vue'

export default {
  state: {
    selectedType: 0,
    list: {}
  },
  mutations: {
    getMsgs (state, payload) {
      state.list = { ...state.list, [payload.type]: { ...state.list[payload.type], noUpdate: true, list: payload.list } }
    },
    setMsg (state, payload) {
      const msgIndex = state.list[state.selectedType].list.findIndex(msg => msg.fileId === payload.fileId)
      state.list[state.selectedType].list.splice(msgIndex, 1, payload.message)
    },
    changeType (state, payload) {
      state.selectedType = payload
    },
    setUnread (state, payload) {
      state.list[payload.msgType] = { ...state.list[payload.msgType], unread: payload.unread, time: payload.msgTime }
    },
    initiateMsg (state, payload) {
      state.list = payload.reduce((result, next) => ({ ...result, [next.msgTypeCode]: { name: next.msgType, id: next.msgTypeId, time: next.newMsgTime, unread: next.noReadCount, noUpdate: false, list: [] } }), {})
    }
  },
  getters: {
    currentMsg: state => state.list[state.selectedType]
  },
  actions: {
    switchType ({ commit, state }, payload) {
      console.log({ commit, state }, payload)
      if (!state.list[payload].noUpdate) {
        Vue.prototype.api.post('message/getMsgList', {
          msgTypeId: state.list[payload].id
        }).then(res => {
          if (res.data.code === 1) {
            if (Number(state.list[payload].id) === 17) {
              Vue.prototype.api.post('message/changeReadStatus', {
                msgId: 17,
                fileId: 17,
                recordId: 17
              }).then(res => {
                if (res.data.code === 1) {
                  commit('setUnread', {
                    msgType: payload,
                    unread: 0,
                    msgTime: new Date()
                  })
                }
              })
            }
            commit('getMsgs', { type: payload, list: res.data.data.msgList })
          }
        })
      }
      commit('changeType', payload)
    },
    recieveNewMsg ({ commit, state }, payload) {
      commit('setUnread', {
        msgType: payload,
        unread: Number(state.list[payload].unread) + 1,
        msgTime: new Date()
      })
      if (payload === state.selectedType) {
        Vue.prototype.api.post('message/getMsgList', {
          msgTypeId: state.list[payload].id
        }).then(res => {
          if (res.data.code === 1) {
            if (Number(state.list[payload].id) === 17) {
              Vue.prototype.api.post('message/changeReadStatus', {
                msgId: 17,
                fileId: 17,
                recordId: 17
              }).then(res => {
                if (res.data.code === 1) {
                  commit('setUnread', {
                    msgType: payload,
                    unread: 0,
                    msgTime: new Date()
                  })
                }
              })
            }
            commit('getMsgs', { type: payload, list: res.data.data.msgList })
          }
        })
      } else {
        state.list[payload] = { ...state.list[payload], noUpdate: false }
      }
    }
  }
}
