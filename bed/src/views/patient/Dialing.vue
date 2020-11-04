<template>
  <div id="con">
    <div class="main-div">
      <div class="nurse-head">
        <img
          class="nurse-head-img-dialing"
          src="../../assets/nurse_head_animation.gif"
          v-show="!isConnected"
        />
        <img class="nurse-head-img" src="../../assets/nurse_head_big.png" v-show="isConnected" />
        <img
          class="nurse-head-statu"
          src="../../assets/patient_dialing_connected.gif"
          v-if="isConnected"
        />
      </div>
      <p
        class="nurse-dialing"
        :style="{color:isConnected ? '#27d88b' : '#333333'}"
      >{{isConnected ? (isCalling ? '已接通' : '护士已接收') : '呼叫护士中...'}}</p>
      <p class="nurse-waiting">{{timer}}</p>
      <button
        class="hang-up-btn"
        :style="{visibility:!isConnected || isCalling ? 'visible' : 'hidden'}"
        @click="hangup"
      >挂断</button>
    </div>
  </div>
</template>

<script>
import { playSound, showMessage, joinChannel, establishPhoneCall } from '../../utils/utils'
export default {
  data: function () {
    return {
      isConnected: false,
      isCalling: false,
      hour: 0,
      min: 0,
      second: 0,
      canClick:true
    }
  },
  computed: {
    timer () {
      if (this.isConnected && this.isCalling) {
        return `${('0000000000000000' + this.min).substr(-2)}:${('0000000000000000' + this.second).substr(-2)}`
      } else {
        return '请耐心等待'
      }
    }
  },
  created () {
    if (this.$route.query.isCalled) {
      this.$isCalled = this.$route.query.isCalled === '1'
      this.$callchannelId = this.$route.query.channelId
      this.$callerCode = this.$route.query.callerCode
      this.called()
      window.plus.voice_call(this.$callchannelId)
    } else {
      joinChannel(window.plus.getMac()).then(channelId => {
        this.$channelId = channelId
        console.log('加入通道' + channelId)
        // 加入通道
        playSound('/sound/ring.wav', true).then(res => {
          console.log('playVoice', res)
          this.$voiceHandler = res
        }, err => {
          showMessage(err)
        })
        window.plus.voice_call(channelId)
      }, err => {
        showMessage(err)
      })
    }
    window.plus.registSocketListener()
  },
  mounted () {
    //按钮挂断状态
    if(this.canClick){
       this.canClick = false;
        var a=setInterval(()=>{
            this.canClick = true;
       			clearInterval(a)    
     }, 2000); 
    }
    window.app = this;
  },
  methods: {
    onSocketMessage (msg) {
      const socketData = JSON.parse(msg)
      console.log(socketData)
      switch (socketData.code) {
        case 'CALL': {
          const jsonObj = {
            code: 'BACK',
            data: {
              callerCode: socketData.data.callerCode,
              calledCode: window.plus.getMac(),
              channelId: socketData.data.channelId,
              callStatus: 7
            }
          }
          console.log('呼叫中...',socketData.data)
          window.plus.webSocket_sendMsg(JSON.stringify(jsonObj))
          break
        }
        case 'CANCEL': {
          if (this.$voiceHandler) {
            this.$voiceHandler.stop()
          }
          this.$currentCall = null
          window.plus.voice_end()
          this.$router.go(-1)
          break
        }
        case 'CALLBACK': {
          console.log(this.$voiceHandler, Boolean(this.$voiceHandler))
          console.log('位于呼叫', socketData.data.callStatus, '全部数据', socketData.data)
          if (this.$voiceHandler) {
            this.$voiceHandler.stop()
          }
          switch (socketData.data.callStatus) {
            case '2': {
              this.calling()
              break
            }
            case '3': {
              this.$currentCall = null
              window.plus.voice_end()
              this.$router.go(-1)
              break
            }
            case '4': {
              this.$currentCall = null
              window.plus.voice_end()
              this.$router.go(-1)
              showMessage('呼叫超时')
              break
            }
            case '5':
            case '6':
            case '7': {
              this.$currentCall = null
              showMessage('呼叫繁忙,请稍后再试')
              window.plus.voice_end()
              this.$router.go(-1)
              break
            }
            case '8': {
              this.$currentCall = null
              window.plus.voice_end()
              this.$router.go(-1)
              break
            }
            case '9': {
              // 卫浴呼叫占线中
              window.plus.voice_end()
              this.$router.go(-1)
              showMessage('呼叫卫浴报警中,请稍后再试')
              break
            }
            default: {
              break
            }
          }
          break
        }
      }
    },
    voiceError_callback (err) {
      showMessage(err)
    },
    // 语音call成功加入回调
    voice_callback () {
      console.log('通道加入成功：', this.$isCalled)
      if (this.$isCalled) {
        const backCmdJson = JSON.stringify({
          code: 'BACK',
          data: {
            channelId: this.$callchannelId,
            callerCode: this.$callerCode,
            calledCode: window.plus.getMac(),
            callStatus: '2'
          }
        })
        window.plus.webSocket_sendMsg(backCmdJson)
        this.$currentCall = {
          deviceCode: window.plus.getMac(),
          channelId: this.$callchannelId
        }
      } else {
        establishPhoneCall(window.plus.getMac(), this.$channelId).then(res => {
          console.log('当前呼叫', res)
          this.$currentCall = res
        })
      }
    },
    deviceCancel () {
      // 呼叫取消
      this.call.post('deviceCancel', {
        deviceCode: window.plus.getMac(),
        channelId: this.$channelId
      }).then(res => {
        if (res.data.code === 1) {
          this.$router.go(-1)
        } else {
          // this.error(res.data.msg)
        }
      })
      window.plus.voice_end()
    },
    // 呼叫通话中，呼叫和被呼都是这个界面
    calling () {
      this.isConnected = true
      const callingTimer = setTimeout(() => {
        clearTimeout(callingTimer)
        this.isCalling = true
        setInterval(() => {
          if (this.second === 59) {
            this.second = 0
            this.min++
          } else {
            this.second++
          }
        }, 1000)
      }, 3000)
    },

    called () {
      this.isCalling = true
      this.isConnected = true
      setInterval(() => {
        if (this.second === 59) {
          this.second = 0
          this.min++
        } else {
          this.second++
        }
      }, 1000)
    },

    // 患者挂断通话
    hangup () {
      if(this.canClick){   //为true能实现挂断
        window.plus.voice_end()
      if (this.$voiceHandler) {
        this.$voiceHandler.stop()
      }
      if (!this.$currentCall) {
        this.$router.go(-1)
        return
      }
      if (this.isConnected) {
        this.call.post('deviceExit', this.$currentCall).then(res => {
          if (res.data.code === 1) {
            this.$router.go(-1)
          } else {
            // this.error(res.data.msg)
          }
        })
      } else {
        this.deviceCancel()
      }
      }
    }

    // 呼叫出错
    /* error (error) {
      showMessage(error, () => {
        plus.removePage(pageTag);
      });
    } */
  }
}
</script>

<style scoped>
.main-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nurse-head {
  width: 460px;
  height: 460px;
  position: relative;
}

.nurse-head-img-dialing {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.nurse-head-img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  position: absolute;
  top: 80px;
  left: 80px;
}

.nurse-head-statu {
  width: 90px;
  height: 90px;
  position: absolute;
  top: 320px;
  left: 270px;
}

.nurse-dialing {
  font-size: 42px;
  font-weight: bold;
  margin-top: 15px;
  line-height: 56px;
}

.nurse-waiting {
  font-size: 30px;
  color: #333333;
  margin-top: 35px;
  line-height: 34px;
}

.hang-up-btn {
  width: 500px;
  height: 72px;
  border-radius: 10px;
  background-color: #fe384b;
  color: white;
  font-size: 30px;
  margin-top: 100px;
}
</style>
