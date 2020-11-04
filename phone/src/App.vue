<template>
  <div>
    <router-view></router-view>
    <div class="config-dialog" v-if="showConfigDialog" @click.stop>
      <div class="config-title">系统设置</div>
      <div class="config-row" @click="$router.push('/office')">
        <span>修改绑定位置</span>
        <span>{{$store.state.bindInfo.name}}</span>
        <img src="./assets/more.png" style="position:absolute;top:32px;right:30px;" />
      </div>
      <div class="config-row" @click="checkUpdate">
        <span>软件版本</span>
        <span>{{configInfo.version}}</span>
        <img src="./assets/more.png" style="position:absolute;top:32px;right:30px;" />
      </div>
      <div class="config-row">
        <span>设备编码</span>
        <span>{{configInfo.mac}}</span>
      </div>
      <div class="config-row" @click="exitApp">
        <span>退出应用</span>
      </div>
    </div>
  </div>
</template>

<script>
import { showMessage, showModel, joinChannel, establishPhoneCall, exitPhoneCall } from './utils/utils.js'
// import store from '@/store'
export default {
  data: function () {
    return {
      showConfigDialog: false
    }
  },
  computed: {
    currentCall () {
      return this.$store.state.currentCall
    },
    noticeList () {
      return this.$store.state.noticeList
    },
    configInfo () {
      return {
        version: window.plus.getAppVersion ? (window.plus.getAppVersion() || '未知') : '未知',
        mac: window.plus.getMac() || '未知'
      }
    }
  },
  created () {
    window.app = this
    if (process.env.NODE_ENV === 'production') {
      window.plus.registSocketListener()
    }
    const bindInfoJson = window.plus.getSpStr('bindInfo') || '{}'
    const bindInfo = JSON.parse(bindInfoJson)
    if (!bindInfo.name) {
      this.axios.post('device/bindcheck').then(res => {
        if (res.data.code === 1) {
          this.$store.commit('bindOffice', res.data.data)
          if (res.data.data.name) {
            window.plus.saveSpStr('bindInfo', JSON.stringify(res.data.data))
            this.$router.replace('/list/beds')
          }
        }
      })
    } else {
      this.$store.commit('bindOffice', bindInfo)
      this.$router.replace('/list/beds')
    }
  },
  mounted () {
    console.log('app mounted')
    this.$eventBus.$off('call')
    this.$eventBus.$on('open-config', () => {
      console.log('open-config')
      this.showConfigDialog = true
    })
    document.body.addEventListener('click', () => {
      this.showConfigDialog = false
    })
    this.$eventBus.$on('call', (item) => {
      console.log(item)
      joinChannel(item.deviceCode).then(call => {
        this.$store.state.called = false
        window.plus.voice_call(call.channelId)
        this.$store.commit('phoneCall', {
          calledCode: call.deviceCode,
          callerCode: window.plus.getMac(),
          channelId: call.channelId,
          targetName: item.name
        })
        this.$store.commit('recordPhoneCall', {
          calledCode: call.deviceCode,
          callerCode: window.plus.getMac(),
          channelId: call.channelId,
          targetName: item.name,
          handled: true
        })
        // this.$calling = true
        // this.$store.dispatch('playSound', '/sound/beep.wav', this.$calling)
      }).catch(err => {
        showMessage(err.message)
      })
    })
    window.app = this
    this.axios.post('nursingStation/deviceList').then(res => {
      if (res.data.code === 1) {
        this.$store.commit('getDeviceList', res.data.data)
      } else {
        showMessage(res.data.msg)
      }
    }).catch(() => {
      showMessage('网络异常，请检查您的网络。')
    })

    setInterval(() => {
      this.axios.post('nursingStation/deviceList').then(res => {
        if (res.data.code === 1) {
          this.$store.commit('getDeviceList', res.data.data)
        }
      })
    }, 300000)

    this.axios.post('getTime').then(res => {
      if (res.data.code === 1) {
        this.$store.commit('updateTime', Number(res.data.data.time))
        window.plus.updateSysTime(Number(res.data.data.time))
      }
    }).finally(() => {
      const now = new Date(this.$store.state.currentTime)
      this.$store.commit('updateTime', now.getTime())
      const leftMilliSec = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds())
      console.log(leftMilliSec,'134')
      const dateTimer = setTimeout(() => {
        clearTimeout(dateTimer)
        this.$store.commit('updateTime', this.$store.state.currentTime + leftMilliSec)
        setInterval(() => {
          // 时间更新
          this.$store.commit('updateTime', this.$store.state.currentTime + 60000)
        }, 60000)
      }, leftMilliSec)
    })
  },
  methods: {
    exitApp () {
      window.plus.exitApp()
    },
    checkUpdate () {
      window.plus.checkAppVersion()
    },
    // 加入通道成功之后的回调函数
    voice_callback () {
      this.$inChannel = true
      const deviceCode = window.plus.getMac()
      if (this.$store.state.called) {
        window.plus.webSocket_sendMsg(JSON.stringify({
          code: 'BACK',
          data: {
            calledCode: this.currentCall.calledCode,
            callerCode: this.currentCall.callerCode,
            channelId: this.currentCall.channelId,
            callStatus: '2'
          }
        }))
        this.$model.setOption({
          contentText: this.currentCall.targetName + '通话中...',
          buttons: [{
            text: '挂断',
            color: '#FE6238',
            callback: () => {
              exitPhoneCall(deviceCode, this.currentCall.channelId).then(this.endPhoneCall).catch(error => {
                showMessage(error.message)
              })
            }
          }]
        })
      } else {
        establishPhoneCall(this.currentCall.calledCode, this.currentCall.channelId).then(({ devCode, channelId }) => {
          this.$model = showModel({
            contentText: this.currentCall.targetName + '正在呼叫中...',
            buttons: [{
              text: '取消呼叫',
              callback: () => {
                exitPhoneCall(devCode, channelId).then(this.endPhoneCall).catch(error => {
                  showMessage(error.message)
                })
              }
            }]
          })
        }).catch(err => {
          this.$inChannel = false
          showMessage(err.message)
        })
      }
    },
    onSocketMessage (msg) {
      const socketData = JSON.parse(msg)
      console.log(socketData)
      const deviceCode = window.plus.getMac()
      switch (socketData.code) {
        // 接到呼叫
        case 'CALL': {
          switch (socketData.data.deviceType) {
            // 卫浴呼叫
            case '1': {
              if (socketData.data.onoff !== '0') {
                // 如果当前正在和其他设备通话则强行挂断，转卫浴呼叫
                if (this.currentCall.calledCode) {
                  exitPhoneCall(window.plus.getMac(), this.currentCall.channelId).then(this.endPhoneCall).catch(error => {
                    showMessage(error.message)
                  })
                }
                this.$eventBus.$off('call')
                this.$store.commit('newBathCall', socketData.data.showMsg)
                window.plus.playTextToVoice(socketData.data.voiceMsg)   //呼叫提示音播放 10.21

                this.$router.push('/bathcall')
                this.$store.dispatch('playSound', '/sound/voice.mp3')
              } else {
                // 卫浴呼叫挂断
                this.$store.commit('handleBathCall')
                if (this.$store.state.bathCallList.length === 0) {
                  this.$router.go(-1)
                  this.$store.commit('stopSound')
                }
              }
              break
            }
            // 其他设备普通呼叫
            default: {
              // 卫浴呼叫中返回忙音
              if (this.$route.path === '/bathCall') {
                window.plus.webSocket_sendMsg(JSON.stringify({
                  code: 'BACK',
                  data: {
                    callerCode: socketData.data.callerCode,
                    calledCode: window.plus.getMac(),
                    channelId: socketData.data.channelId,
                    callStatus: '9'
                  }
                }))
              }
              console.log('current call', this.currentCall)
              // 如果当前正在和其他设备通话则排入呼叫等待队列
              if (this.currentCall.calledCode) {
                this.$store.commit('newPhoneCall', {
                  calledCode: window.plus.getMac(),
                  callerCode: socketData.data.callerCode,
                  channelId: socketData.data.channelId,
                  targetName: socketData.data.showMsg
                })
                // this.$store.commit('unhandledPhoneCall', socketData.data.channelId)
              } else {
                // 更新会话信息
                this.$store.commit('phoneCall', {
                  calledCode: deviceCode,
                  callerCode: socketData.data.callerCode,
                  channelId: socketData.data.channelId,
                  targetName: socketData.data.showMsg
                })
                window.plus.playTextToVoice(socketData.data.voiceMsg)   //呼叫提示音播放 10.21
                this.$store.dispatch('playSound', '/sound/ring.wav')
                this.$model = showModel({
                  contentText: this.currentCall.targetName + '正在呼叫...',
                  buttons: [{
                    text: '挂断',
                    color: '#FE6238',
                    callback: () => {
                      this.$store.commit('recordPhoneCall', { ...this.currentCall, handled: false })
                      exitPhoneCall(window.plus.getMac(), this.currentCall.channelId).then(this.endPhoneCall).catch(error => {
                        showMessage(error.message)
                      })
                    }
                  }, {
                    text: '接听',
                    color: '#3E8CFC',
                    callback: () => {
                      this.phoneAnswer()
                    }
                  }]
                })
              }
            }
          }
          break
        }
        // 呼叫方取消呼叫
        case 'CANCEL': {
          if (this.currentCall.channelId) {
            console.log(socketData.data.channelId, this.currentCall.channelId)
            if (socketData.data.channelId === this.currentCall.channelId) {
              // 挂断当前通话
              // exitPhoneCall(window.plus.getMac(), this.currentCall.channelId).then(this.endPhoneCall).catch(error => {
              //   showMessage(error.message)
              // })
              // store.commit('stopSound')
              // window.plus.voice_toggleSpeaker(false)
              // if (this.$model) {
              //   this.$model.close()
              if (!this.$inChannel) {
                this.currentCall.calledCode = ''
              }
              this.endPhoneCall()
            } else {
              // 从呼叫等候队列中移除该呼叫
              this.$store.commit('unhandledPhoneCall', socketData.data.channelId)
              // this.axios.post('accurateCall/deviceCancel', {
              //   channelId: socketData.data.channelId
              // }).then(res => {
              //   console.log(res)
              // }).catch(error => {
              //   showMessage(error.message)
              // })
            }
          } else {
            this.endPhoneCall()
          }
          break
        }
        // 发起呼叫后收到的回调
        case 'CALLBACK': {
          switch (socketData.data.callStatus) {
            // 对方接通呼叫
            case '2': {
              // this.$calling = false
              this.$store.commit('stopSound')

              if (this.$model) {
                this.$model.setOption({
                  contentText: this.currentCall.targetName + '正在通话中...',
                  buttons: [{
                    text: '挂断',
                    color: '#FE6238',
                    callback: () => {
                      exitPhoneCall(window.plus.getMac(), this.currentCall.channelId).then(this.endPhoneCall).catch(error => {
                        showMessage(error.message)
                      })
                    }
                  }]
                })
              }
              break
            }
            // 对方挂断呼叫
            case '3': {
              this.endPhoneCall()
              showMessage('通话已结束')
              break
            }
            // 对方无人接听
            case '4': {
              this.endPhoneCall()
              showMessage(this.currentCall.targetName + '暂时无人接听。请稍后再试')
              break
            }
            // 对方通话中
            case '7': {
              this.endPhoneCall()
              showMessage(this.currentCall.targetName + '正在通话中。请稍后再试')
              break
            }
            // 会话通道关闭
            case '8': {
              this.endPhoneCall()
              break
            }
          }
          break
        }
      }
    },
    phoneAnswer () {
      if (this.$inChannel) return
      this.$store.state.called = true
      window.plus.voice_call(this.currentCall.channelId)
      this.$store.commit('stopSound')
      this.$store.commit('recordPhoneCall', { ...this.currentCall, handled: true })
    },
    hangUp () {
      exitPhoneCall(window.plus.getMac(), this.currentCall.channelId).then(this.endPhoneCall).catch(error => {
        showMessage(error.message)
      })
    },
    endPhoneCall () {
      this.$store.commit('hangup')
      this.$inChannel = false
      window.plus.voice_end()
      this.$store.commit('stopSound')
      if (this.$model) {
        if (this.noticeList.length > 0) {
          this.$store.commit('handlePhoneCall')
          this.$store.dispatch('playSound', '/sound/ring.wav')
          this.$model.close()
          this.$model = showModel({
            contentText: this.currentCall.targetName + '正在呼叫...',
            buttons: [{
              text: '挂断',
              color: '#FE6238',
              callback: () => {
                exitPhoneCall(window.plus.getMac(), this.currentCall.channelId).then(this.endPhoneCall).catch(error => {
                  showMessage(error.message)
                })
              }
            }, {
              text: '接听',
              color: '#3E8CFC',
              callback: () => {
                this.phoneAnswer()
              }
            }]
          })
        } else {
          this.$model.close()
          this.$model = null
        }
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f2f8fd;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.top-bar {
  height: 70px;
  background-color: white;
  box-shadow: 1px 1px 15px rgba(150, 283, 233, 0.3);
  display: flex;
  align-items: center;
  padding: 0 30px;
  font-size: 24px;
  justify-content: space-between;
  flex: none;
  position: relative;
}

.main-content {
  flex: auto;
  display: flex;
  padding: 30px 0 30px 30px;
}

.nav-right {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: flex-end;
}

.nav-right .nav-right-item {
  width: 55px;
  flex: 1;
  background-color: #5897f0;
  color: white;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  line-height: 55px;
  font-size: 24px;
  letter-spacing: 0.3rem;
}

.nav-right .nav-right-item:first-child {
  border-radius: 20px 0 0 0;
}

.nav-right .nav-right-item:last-child {
  border-radius: 0 0 0 20px;
}

.nav-right .nav-right-item.selected {
  background-color: white;
  color: #5897f0;
  border: 4px solid #5897f0;
  border-radius: 20px 0 0 20px;
  border-right-width: 0;
  width: 80px;
  line-height: 80px;
}

.notice-list {
  font-size: 0;
  position: absolute;
  width: 100%;
  z-index: 9999;
  margin: -10px;
  left: 20px;
  top: 20px;
}

.notice-list .notice-item {
  width: 210px;
  height: 95px;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  font-size: 16px;
  color: white;
  background-color: #fe6238;
  box-shadow: 2px 2px 5px rgba(51, 51, 51, 0.1);
  box-sizing: border-box;
  display: inline-flex;
  justify-content: space-between;
  align-items: flex-start;
}

.notice-move {
  transition: transform 1s;
}

.notice-leave-active {
  position: absolute;
}

.notice-enter-active,
.notice-leave-active {
  transition: all 1s ease;
}

.notice-enter,
.notice-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.config-dialog {
  width: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  box-shadow: 2px 2px 8px #ecf2fb;
  background-color: white;
  padding: 20px 0px 60px 0px;
}

.config-title {
  font-size: 36px;
  font-weight: bold;
  line-height: 100px;
  padding: 0 40px;
}
.config-row {
  font-size: 30px;
  line-height: 100px;
  padding: 0 40px;
  border-bottom: 1px solid #e7e7e7;
  position: relative;
}

.config-row:active {
  background-color: #e7e7e7;
}

.config-row span:first-child {
  display: inline-block;
  width: 250px;
}
</style>
