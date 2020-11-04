import axios from 'axios'
import store from '../store/index.js'

const baseUrl = 'http://192.90.111.30:8787/'
// const baseUrl = 'http://192.168.2.20:8787/'  //本地测试 10.21
// const baseUrl = 'http://192.168.11.05:8785/'


export function showMessage (msg, callback) {
  const messageDOM = document.createElement('div')
  messageDOM.innerText = msg
  messageDOM.style.width = '800px'
  messageDOM.style.position = 'fixed'
  messageDOM.style.borderRadius = '30px'
  messageDOM.style.top = '40%'
  messageDOM.style.left = '50%'
  messageDOM.style.marginLeft = '-400px'
  messageDOM.style.padding = '30px'
  messageDOM.style.backgroundColor = 'black'
  messageDOM.style.color = 'white'
  messageDOM.style.opacity = 0
  messageDOM.style.fontSize = '32px'
  messageDOM.style.textAlign = 'center'
  messageDOM.style.lineHeight = '60px'
  messageDOM.style.wordBreak = 'break-word'
  messageDOM.style.zIndex = 1008
  messageDOM.style.transition = 'opacity 0.5s ease'
  document.body.appendChild(messageDOM)
  const timerIn = setTimeout(() => {
    clearTimeout(timerIn)
    messageDOM.style.opacity = 0.6
    const timerOut = setTimeout(() => {
      clearTimeout(timerOut)
      messageDOM.style.opacity = 0
      const timerRemove = setTimeout(() => {
        clearTimeout(timerRemove)
        document.body.removeChild(messageDOM)
        if (callback) {
          callback()
        }
      }, 1000)
    }, 1000)
  }, 200)
}

export function showModel (opt) {
  const defaultOption = {
    title: '提示',
    contentText: '',
    buttons: [{}]
  }
  const defaultBtnOpt = {
    text: '确认',
    color: '#35BF00'
  }
  const options = Object.assign(defaultOption, opt)
  const shadeDOM = document.createElement('div')
  shadeDOM.style.opacity = 0.4
  shadeDOM.style.width = '100%'
  shadeDOM.style.height = '100%'
  shadeDOM.style.backgroundColor = 'black'
  shadeDOM.style.position = 'fixed'
  shadeDOM.style.top = 0
  shadeDOM.style.left = 0
  shadeDOM.style.zIndex = 999
  document.body.appendChild(shadeDOM)
  const modelDOM = document.createElement('div')
  modelDOM.style.width = '765px'
  modelDOM.style.height = '530px'
  modelDOM.style.position = 'fixed'
  modelDOM.style.borderRadius = '30px'
  modelDOM.style.backgroundColor = 'white'
  modelDOM.style.top = '50%'
  modelDOM.style.left = '50%'
  modelDOM.style.marginLeft = '-382.5px'
  modelDOM.style.marginTop = '-265px'
  modelDOM.style.paddingTop = '54px'
  modelDOM.style.fontSize = '32px'
  modelDOM.style.boxSizing = 'border-box'
  modelDOM.style.textAlign = 'center'
  modelDOM.style.zIndex = 1000
  const modelTitle = document.createElement('p')
  modelTitle.innerText = options.title
  modelTitle.style.padding = '0'
  modelTitle.style.margin = '0 0 64px 0'
  modelTitle.style.fontSize = '48px'
  modelDOM.appendChild(modelTitle)
  const modelContent = document.createElement('p')
  modelContent.innerText = options.contentText
  modelContent.style.padding = '0'
  modelContent.style.margin = '0'
  modelContent.style.fontSize = '36px'
  modelDOM.appendChild(modelContent)
  const modelButtonContainer = document.createElement('div')
  modelButtonContainer.style.width = '420px'
  modelButtonContainer.style.height = '100px'
  modelButtonContainer.style.fontSize = '36px'
  modelButtonContainer.style.position = 'absolute'
  modelButtonContainer.style.left = '50%'
  modelButtonContainer.style.marginLeft = '-210px'
  modelButtonContainer.style.padding = '0 -10px'
  modelButtonContainer.style.bottom = '92px'
  modelButtonContainer.style.color = 'white'
  modelButtonContainer.style.display = 'flex'
  for (const btn of options.buttons) {
    const btnOpt = Object.assign(defaultBtnOpt, btn)
    const modelButton = document.createElement('div')
    modelButton.innerText = btnOpt.text
    modelButton.style.borderRadius = '50px'
    modelButton.style.lineHeight = '100px'
    modelButton.style.flex = 'auto'
    modelButton.style.margin = '0 10px'
    modelButton.style.backgroundColor = btnOpt.color
    modelButton.onclick = btnOpt.callback
    modelButtonContainer.appendChild(modelButton)
  }
  modelDOM.appendChild(modelButtonContainer)
  document.body.appendChild(modelDOM)
  return {
    setOption: function (opt) {
      const options = Object.assign(defaultOption, opt)
      modelTitle.innerText = options.title
      modelContent.innerText = options.contentText
      const children = modelButtonContainer.childNodes
      for (let i = children.length - 1; i >= 0; i--) {
        modelButtonContainer.removeChild(children[i])
      }
      for (const btn of options.buttons) {
        const btnOpt = Object.assign(defaultBtnOpt, btn)
        const modelButton = document.createElement('div')
        modelButton.innerText = btnOpt.text
        modelButton.style.borderRadius = '50px'
        modelButton.style.lineHeight = '100px'
        modelButton.style.flex = 'auto'
        modelButton.style.margin = '0 10px'
        modelButton.style.backgroundColor = btnOpt.color
        modelButton.onclick = btnOpt.callback
        modelButtonContainer.appendChild(modelButton)
      }
    },
    close: function () {
      document.body.removeChild(modelDOM)
      document.body.removeChild(shadeDOM)
    }
  }
}

export function joinChannel (devCode) {
  return axios.post(baseUrl + 'accurateCall/getChannel').then(res => {
    if (res.data.code === 1) {
      return {
        deviceCode: devCode,
        channelId: res.data.data.channelId
      }
    } else {
      throw new Error(res.data.msg)
    }
  }, () => {
    throw new Error('网络异常，请检查您的网络。')
  })
}

export function establishPhoneCall (devCode, channelId) {
  return axios.post(baseUrl + 'accurateCall/contactCall', {
    callerCode: window.plus.getMac(),
    calledCode: devCode,
    channelId
  }).then(res => {
    if (res.data.code === 1) {
      window.plus.voice_toggleSpeaker(true)
      return { devCode, channelId }
    } else {
      window.plus.voice_end()
      if (devCode === store.state.currentCall.calledCode) {
        store.commit('hangup')
      }
      if (store.state.noticeList.length > 0) {
        console.log('进来呢得经济', store.state.noticeList)
        store.commit('handlePhoneCall')
        store.dispatch('playSound', '/sound/ring.wav')
        this.$model = showModel({
          contentText: store.state.currentCall.targetName + '正在呼叫...',
          buttons: [{
            text: '挂断',
            color: '#FE6238',
            callback: () => {
              exitPhoneCall(window.plus.getMac(), store.state.currentCall.channelId).then(res => {
                store.commit('hangup')
                this.$inChannel = false
                window.plus.voice_end()
                store.commit('stopSound')
                if (this.$model) {
                  if (store.state.noticeList.length > 0) {
                    store.commit('handlePhoneCall')
                    store.dispatch('playSound', '/sound/ring.wav')
                    this.$model.close()
                    this.$model = showModel({
                      contentText: store.state.currentCall.targetName + '正在呼叫...',
                      buttons: [{
                        text: '挂断',
                        color: '#FE6238',
                        callback: () => {
                          exitPhoneCall(window.plus.getMac(), store.state.currentCall.channelId).then(endPhoneCall()).catch(error => {
                            showMessage(error.message)
                          })
                        }
                      }, {
                        text: '接听',
                        color: '#3E8CFC',
                        callback: () => {
                          console.log('333333333333333333')
                          if (this.$model) {
                            this.$model.close()
                            this.$model = null
                          }
                          store.state.called = true
                          window.plus.webSocket_sendMsg(JSON.stringify({
                            code: 'BACK',
                            data: {
                              calledCode: store.state.currentCall.calledCode,
                              callerCode: store.state.currentCall.callerCode,
                              channelId: store.state.currentCall.channelId,
                              callStatus: '2'
                            }
                          }))
                          this.$model.setOption({
                            contentText: store.state.currentCall.targetName + '通话中...',
                            buttons: [{
                              text: '挂断',
                              color: '#FE6238',
                              callback: () => {
                                exitPhoneCall(window.plus.getMac(), store.state.currentCall.channelId).then(endPhoneCall()).catch(error => {
                                  showMessage(error.message)
                                })
                              }
                            }]
                          })
                          window.plus.voice_call(store.state.currentCall.channelId)
                          this.$store.commit('stopSound')
                          this.$store.commit('recordPhoneCall', { ...store.state.currentCall, handled: true })
                        }
                      }]
                    })
                  } else {
                    this.$model.close()
                    this.$model = null
                  }
                }
              }).catch(error => {
                showMessage(error.message)
              })
            }
          }, {
            text: '接听',
            color: '#3E8CFC',
            callback: () => {
              store.state.called = true
              console.log(this.$model, '000000000000000测试')
              window.plus.webSocket_sendMsg(JSON.stringify({
                code: 'BACK',
                data: {
                  calledCode: store.state.currentCall.calledCode,
                  callerCode: store.state.currentCall.callerCode,
                  channelId: store.state.currentCall.channelId,
                  callStatus: '2'
                }
              }))
              console.log(this.$model, '测试1111')
              this.$model.setOption({
                contentText: store.state.currentCall.targetName + '通话中...',
                buttons: [{
                  text: '挂断',
                  color: '#FE6238',
                  callback: () => {
                    exitPhoneCall(window.plus.getMac(), store.state.currentCall.channelId).then(endPhoneCall()).catch(error => {
                      showMessage(error.message+"错误2")
                    })
                  }
                }]
              })
              window.plus.voice_call(store.state.currentCall.channelId)
              this.$store.commit('stopSound')
              this.$store.commit('recordPhoneCall', { ...store.state.currentCall, handled: true })
            }
          }]
        })
      } else {
        // this.$model.close()
        // this.$model = null  //测试10.22 占线显示呼叫忙
      }
      throw new Error(res.data.msg)
    }
  }, () => {
    window.plus.voice_end()
    throw new Error('网络异常，请检查您的网络。')
  })
}

export function endPhoneCall () {
  store.commit('hangup')
  this.$inChannel = false
  window.plus.voice_end()
  store.commit('stopSound')
  if (this.$model) {
    if (this.noticeList.length > 0) {
      store.commit('handlePhoneCall')
      store.dispatch('playSound', '/sound/ring.wav')
      this.$model.close()
      this.$model = showModel({
        contentText: store.state.currentCall.targetName + '正在呼叫...',
        buttons: [{
          text: '挂断',
          color: '#FE6238',
          callback: () => {
            exitPhoneCall(window.plus.getMac(), store.state.currentCall.channelId).then(endPhoneCall()).catch(error => {
              showMessage(error.message)
            })
          }
        }, {
          text: '接听',
          color: '#3E8CFC',
          callback: () => {
            if (this.$inChannel) return
            console.log('1222222222222222')
            if (this.$model) {
              this.$model.close()
              this.$model = null
            }
            store.state.called = true
            window.plus.webSocket_sendMsg(JSON.stringify({
              code: 'BACK',
              data: {
                calledCode: store.state.currentCall.calledCode,
                callerCode: store.state.currentCall.callerCode,
                channelId: store.state.currentCall.channelId,
                callStatus: '2'
              }
            }))
            this.$model.setOption({
              contentText: store.state.currentCall.targetName + '通话中...',
              buttons: [{
                text: '挂断',
                color: '#FE6238',
                callback: () => {
                  exitPhoneCall(window.plus.getMac(), store.state.currentCall.channelId).then(endPhoneCall()).catch(error => {
                    showMessage(error.message)
                  })
                }
              }]
            })
            window.plus.voice_call(store.state.currentCall.channelId)
            this.$store.commit('stopSound')
            this.$store.commit('recordPhoneCall', { ...store.state.currentCall, handled: true })
          }
        }]
      })
    } else {
      this.$model.close()
      this.$model = null
    }
  }
}

export function exitPhoneCall (devCode, channelId) {
  return axios.post(baseUrl + 'accurateCall/deviceExit', {
    deviceCode: devCode,
    channelId: channelId
  }).then(res => {
    store.commit('stopSound')
    if (res.data.code === 1) {
      window.plus.voice_toggleSpeaker(false)
    } else {
      if (this.$model) {
        this.$model.close()
        this.$model = null
      } else {
        this.$model = null
      }
      throw new Error(res.data.msg)
    }
  }, () => {
    throw new Error('网络异常，请检查您的网络。')
  })
}

export function sendBroadcast (fileUrl) {
  return axios.post(baseUrl + 'accurateCall/global/broadcast', {
    fileUrl,
    sendDeviceCode: store.state.broadcastSelectedDevice.join(',')
  }).then(res => {
    if (res.data.code === 1) {
      return res
    } else {
      throw new Error(res.msg)
    }
  }, () => {
    throw new Error('网络异常，请检查您的网络。')
  })
}
