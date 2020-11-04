<template>
  <div v-cloak>
    <keep-alive :max="1" exclude="report-detail,check-detail,education-page">
      <router-view/>
    </keep-alive>
    <div class="config-dialog" v-if="showConfigDialog" @click.stop>
      <div class="config-title">系统设置</div>
      <div class="config-row" v-if="false">
        <span>音量调节</span>
        <span>{{ $store.state.patientInfo.bedName || $store.state.bindBed }}</span>
      </div>
      <div class="config-row" v-if="false">
        <span>亮度调节</span>
        <span>{{ $store.state.patientInfo.bedName || $store.state.bindBed }}</span>
      </div>
      <div class="config-row" @click="goBeds">
        <span>床位配置</span>
        <span>{{ $store.state.patientInfo.bedName || $store.state.bindBed }}</span>
        <img src="./assets/more.png" style="position:absolute;top:32px;right:30px;"/>
      </div>
      <div class="config-row" @click="checkUpdate">
        <span>软件版本</span>
        <span>{{ configInfo.version }}</span>
        <img src="./assets/more.png" style="position:absolute;top:32px;right:30px;"/>
      </div>
      <div class="config-row">
        <span>设备编码</span>
        <span>{{ configInfo.mac }}</span>
      </div>
      <div class="config-row" @click="exitApp">
        <span>退出应用</span>
      </div>
    </div>
    <div class="dialog-body" v-if="showConfirmCancel">
      <div class="dialog-title">提示</div>
      <span class="dialog-row">是否取消本次支付？</span>
      <div>
        <span class="dialog-btn" @click.stop="handleCancelOrder">确认</span>
        <span class="dialog-btn cancel" @click.stop="showConfirmCancel = false">按错了</span>
      </div>
    </div>
    <div
      style="box-shadow:2px 2px 8px rgba(0,0,0,0.2);padding:40px;position:fixed;transform:translate(-50%,-50%);left:50%;top:50%;width:500px;height:auto;background-color:white;color:#90909b;border-radius:30px"
      v-show="showPayDialog"
      @click.stop
    >
      <div style="font-size:28px;line-height:40px;margin-bottom:30px">
        <span style="width:180px;display:inline-block">患者名：</span>
        <span>{{ payInfo.patientName }}</span>
      </div>
      <div style="font-size:28px;line-height:40px;margin-bottom:30px">
        <span style="width:180px;display:inline-block">住院号：</span>
        <span>{{ payInfo.inHospitalId }}</span>
      </div>
      <div
        style="height:258px;position:relative"
        v-loading="qrCodeLoading"
        loading-text="正在生成二维码..."
      >
        <div v-if="!showCode">
          <div style="font-size:28px;line-height:40px;height:150px;margin-bottom:30px">
            <span style="width:180px;display:inline-block">缴费金额：</span>
            <input
              v-model.number="payAmount"
              type="number"
              step="0.01"
              style="height:40px;padding:0 20px;margin:0 20px 0 0;border:none;border-radius:10px;outline:none;background-color: #e3ebfb;width:160px;"
            />元
            <div
              style="font-size:28px;height:60px;margin-top:30px;display:flex;justify-content:space-between"
            >
              <div class="fee-btn" @click.stop="payAmount = payAmount + 1">+1</div>
              <div class="fee-btn" @click.stop="payAmount = payAmount + 10">+10</div>
              <div class="fee-btn" @click.stop="payAmount = payAmount + 100">+100</div>
              <div class="fee-btn" @click.stop="payAmount = payAmount + 1000">+1000</div>
            </div>
          </div>
          <div class="fee-confirm-btn" @click="handleConfirmPay">确认缴费</div>
        </div>
        <div style="height:228px;margin-bottom:30px;text-align:center" v-else>
          <div class="qrcode" ref="qrcode" @click="handleConfirmPay"></div>
          <p style="margin:0">{{ tipMessage }}</p>
        </div>
      </div>
    </div>
    <transition>
      <div class="message" v-if="showMessage">{{ messageContent }}</div>
    </transition>
  </div>
</template>

<script>
import 'swiper/css/swiper.min.css'
import Axios from 'axios'
import './assets/mui.css'
import QRCode from 'qrcodejs2'
import { playSound, showMessage, inPeriod } from './utils/utils'

export default {
  data () {
    return {
      showCode: false,
      showPayDialog: false,
      showMessage: false,
      qrCodeLoading: false,
      showConfirmCancel: false,
      messageContent: '',
      payAmount: 0,
      tipMessage: '',
      payInfo: {
        patientName: '',
        inHospitalId: ''
      },
      showConfigDialog: false,
      clickTime: ''
    }
  },
  computed: {
    configInfo () {
      return {
        version: window.plus.getAppVersion() || '未知',
        // mac: window.plus.getMac() || '未知'
        mac: '865589556633865'  //编码数据 10.23
      }
    }
  },
  created () {
    window.app = this
    window.plus.registSocketListener() //心跳测试
    this.$bus.$on('open-config', () => {
      this.showConfigDialog = true
    })
    this.$bus.$on('check', () => {
      this.checkIn(1)
    })
    this.$bus.$on('start-check', () => {  
      console.log('start-check')
      this.$checking = true
    })
    this.$bus.$on('stop-check', () => {
      console.log('stop-check')
      this.$checking = false
    })
    this.$bus.$on('refresh-homedata', () => {
      console.log('hahaha')
      this.getHomeData()
    })
    this.$bus.$on('pay', () => {
      this.api.post('pay/getPatientInfo').then(res => {
        if (res.data.code === 1) {
          this.payInfo = res.data.data
          this.showPayDialog = true
          const handleCancelPay = () => {
            this.handleCancelOrder()
            document.body.removeEventListener('click', handleCancelPay)
          }
          document.body.addEventListener('click', handleCancelPay)
        }
      })
    })

    const bindBed = window.plus.getSpStr('bindBed')
    console.log('getSpStr bindBed: ' + bindBed)
    // 检查绑定
    if (!bindBed) {
      this.api.post('device/bindcheck').then(res => {
        if (res.data.code === 1) {
          window.plus.saveSpStr('bindBed', res.data.data.name)
          this.$store.commit('bindBed', res.data.data.name)
          if (res.data.data.name) {
            this.$router.replace('/')
          }
        }
      })
    } else {
      this.$store.commit('bindBed', bindBed)
      this.$router.replace('/')
    }
    console.log('get server time')
    // 服务器获取时间
    this.api.post('getTime').then(res => {
      if (res.data.code === 1) {
        console.log('update system time', res.data.data.time)
        this.$store.commit('updateTime', Number(res.data.data.time))
        window.plus.updateSysTime(Number(res.data.data.time))
      }
    }).finally(() => {
      const now = new Date(this.$store.state.time.currentTime)
      console.log('current system time', now.toString())
      const leftMilliSec = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds())
      console.log(leftMilliSec, '息屏')
      const dateTimer = setTimeout(() => {
        clearTimeout(dateTimer)
        this.$store.commit('updateTime', this.$store.state.time.currentTime + leftMilliSec)
        setInterval(() => {
          // 时间更新
          console.log('update app time', now.getTime())
          this.$store.commit('updateTime', this.$store.state.time.currentTime + 60000)
          // 息屏策略判断
          if (this.$store.state.outConfig.some(config => inPeriod(config.startTime, config.endTime))) {
            if (['/dialing', '/shade'].indexOf(this.$route.path) < 0) {
              const time = Math.round(new Date().getTime() / 1000)
              console.log(time, this.clickTime, '小雨')
              if ((time - this.clickTime) < 60) {
                return
              } else {
                this.$router.push('/shade')
              }
            }
          } else if (this.$route.path === '/shade') {
            this.$router.go(-1)
          }
          // 音量策略判断
          const currentConfig = this.$store.state.volumeConfig.find(config => inPeriod(config.startTime, config.endTime))
          console.log('current volume', Number(window.plus.getVolume()) !== Number(currentConfig.volume))
          console.log(Number(window.plus.getVolume()),'默认音量')
          if (currentConfig && Number(window.plus.getVolume()) !== Number(currentConfig.volume)) {
              //  window.plus.setVolume(Number(currentConfig.volume))
              var myDate = new Date();
               var hours =  myDate.getHours();  
               var minutes=  myDate.getMinutes();
               var seconds = myDate.getSeconds(); 
              if(hours<10){
                  hours="0"+hours;
              }
               if(minutes<10){
                    minutes="0"+minutes;
             }
               if(seconds<10){
                    seconds="0"+seconds;
             }
              var date = hours+":"+minutes+":"+seconds;
             console.log(date,'当前时间')
               if(date == '08:30:00'){
                   window.plus.setVolume(2);
                }else if(date == '17:00:00'){
                   window.plus.setVolume(3);
                }else if(date == '00:00:00'){
                   window.plus.setVolume(3);
                }
                console.log(window.plus.getVolume(),'实时音量')
          }
          // 打卡判断
          if (inPeriod(this.$store.state.checkInConfig.startTime, this.$store.state.checkInConfig.endTime)) {
            if (this.$store.state.checkMinLeft > 0) {
              this.$store.commit('minLeft', this.$store.state.checkMinLeft - 1)
            } else {
              this.$bus.$emit('check')
            }
          }
        }, 60000)
      }, leftMilliSec)
      // 获取息屏策略
      const outConfig = window.plus.getSpStr('outConfig')
      if (!outConfig) {
        this.getOutConfig()
      } else {
        this.$store.commit('getOutConfig', JSON.parse(outConfig))
      }
      // 获取音量策略
      const volumeConfig = window.plus.getSpStr('volumeConfig')
      if (!volumeConfig) {
        this.getVolumeConfig() //没有调节音量
      } else {  
        this.$store.commit('getVolumeConfig', JSON.parse(volumeConfig))
      }
      // 除了数组中的页面，其他页面60s不操作跳回主页面
      const excludeArr = ['/', '/education', '/dialing', '/beds', '/reportDetail', '/checkDetail', '/shade']
      let timeoutTimer = null
      const refreshTimer = () => {
        clearTimeout(timeoutTimer)
        this.clickTime = Math.round(new Date().getTime() / 1000)
        console.log(this.clickTime, '当前点击时间')
        timeoutTimer = setTimeout(() => {
          clearTimeout(timeoutTimer)
          if (excludeArr.indexOf(this.$route.path) < 0) {
            this.$router.replace('/')
          }
        }, 60000)
      }
      document.body.addEventListener('click', refreshTimer)
      this.$bus.$on('route-change', refreshTimer)

      this.$bus.$emit('refresh-homedata')
      setInterval(() => {
        this.$bus.$emit('refresh-homedata')
      }, 300000)
      this.getCheckRule()
    })
  },
  mounted () {
    document.body.addEventListener('click', () => {
      this.showConfigDialog = false
    })
    this.$router.beforeEach((to, from, next) => {
      if (from.path === '/dialing') {
        window.app = this
      }
      next()
    })
  },
  methods: {
    exitApp () {
      window.plus.exitApp()
    },
    checkUpdate () {
      window.plus.checkAppVersion()
    },
    getHomeData () {
      Axios.all([
        this.api.post('bedside/getInHospitalInfo'), //获取病人信息
        this.api.post('patient/homeMsgList')   
      ]).then(([infoRes, msgRes]) => {
        if (infoRes.data.code === 1) {
          this.$store.commit('getPatientInfo', infoRes.data.data)
        } else {
          this.$store.commit('getPatientInfo', null)
        }
        if (msgRes.data.code === 1) {
          this.$store.commit('initiateMsg', msgRes.data.data.msgList)
          if (this.$route.path === '/message' && this.$store.state.message.selectedType > 0) {
            this.$store.dispatch('switchType', this.$store.state.message.selectedType)
          }
        } else {
          this.$store.commit('initiateMsg', [])
        }
      })
    },
    getOutConfig () {
      this.api.post('audio/setOut').then(res => {
        if (res.data.code === 1 && res.data.data) {
          this.$store.commit('getOutConfig', res.data.data.set_time)
          window.plus.saveSpStr('outConfig', JSON.stringify(res.data.data.set_time))
        }
      })
    },
    getVolumeConfig () {
      this.api.post('audio/volume').then(res => {
        if (res.data.code === 1 && res.data.data) {
          this.$store.commit('getVolumeConfig', res.data.data.set_time)
          console.log(res.data.data.set_time,'数据')
          window.plus.saveSpStr('volumeConfig', JSON.stringify(res.data.data.set_time))
        }
      })
    },
    makeQrCode (url) {
      let code = null
      clearTimeout(this.$timeUpTimer)
      this.tipMessage = '请扫描二维码完成付款'
      if (this.showCode) {
        code = new QRCode(this.$refs.qrcode, {
          text: url,
          width: 210,
          height: 210,
          colorDark: '#000000',
          colorLight: '#ffffff'
        })
      }
      return code
    },
    goBeds () {
      this.$router.push('/beds')
      this.showConfigDialog = false
    },
    handleConfirmPay () {
      // showMessage('该功能暂未开放，敬请期待！')
      this.qrCodeLoading = true
      this.api.post('pay/payMoney', {
        payment: this.payAmount,
        inHospitalId: this.payInfo.inHospitalId
      }).then(res => {
        if (res.data.code === 1 && res.data.data.phoneQR.SUCCESS === 'true') {
          this.qrCodeLoading = false
          this.showCode = true
          this.$nextTick(() => {
            this.$refs.qrcode.innerHTML = ''
            clearInterval(this.$timer)
            this.makeQrCode(decodeURIComponent(res.data.data.phoneQR.QRURL))
            const handleConfirmCancel = () => {
              this.showConfirmCancel = true
            }
            document.body.addEventListener('click', handleConfirmCancel)
            this.$timer = setInterval(() => {
              this.api.post('pay/querNcmedPay', {
                id: res.data.data.id
              }).then(res => {
                if (res.data.code === 1) {
                  this.handleCancelOrder()
                  document.body.removeEventListener('click', handleConfirmCancel)
                  if (res.data.data === '1') {
                    showMessage('支付成功！')
                  } else if (res.data.data === '2') {
                    showMessage('支付失败！')
                  }
                }
              })
            }, 3000)
            this.$timeUpTimer = setTimeout(() => {
              this.tipMessage = '该二维码已失效，请点击刷新'
              clearTimeout(this.$timeUpTimer)
              clearInterval(this.$timer)
            }, 90000)
          })
        }
      })
    },
    handleCancelOrder () {
      this.showConfirmCancel = false
      this.qrCodeLoading = false
      this.showCode = false
      this.showPayDialog = false
      this.payAmount = 0
      clearInterval(this.$timer)
    },
    checkIn (type) {
      this.api.post('clockInRule/receptionAPPClockIn', {
        type,
        clockInType: 1,
        clockInCertificateName: type === 1 ? this.$store.state.patientInfo.chargeNurse : this.$store.state.currentUser.name,
        clockInCertificateId: type === 1 ? this.$store.state.patientInfo.chargeNurseCode : this.$store.state.currentUser.code,
        clockInPlaceId: this.$store.state.patientInfo.bedCode,
        patientId: this.$store.state.patientInfo.patientId,
        patientName: this.$store.state.patientInfo.patientName
      }).then(res => {
        if (res.data.code === 1) {
          if (type !== 1) {
            showMessage('打卡成功！')
          }
          this.$bus.$emit('close-check')
        }
      })
      this.getCheckRule()
    },
    getCheckRule () {
      this.api.post('clockInRule/getClockInRuleRecord').then(res => {
        if (res.data.code === 1) {
          this.$store.commit('getCheckInConfig', {
            startTime: res.data.data.patrolBedStart,
            endTime: res.data.data.patrolBedEnd
          })
          if (this.$store.state.patientInfo.nursingLevel === '一级护理') {
            this.$store.commit('minLeft', Number(res.data.data.gradeOneNursing))
          } else if (this.$store.state.patientInfo.nursingLevel === '二级护理') {
            this.$store.commit('minLeft', Number(res.data.data.gradeTowNursing))
          }
        }
      })
    },
    icInfo_callback (info) {
      const identify = window.plus.getSpStr(info)
      if (!identify) {
        this.api.post('rfid/identify', {
          identifyCode: info
        }).then(res => {
          if (res.data.code === 1) {
            window.plus.saveSpStr(info, JSON.stringify(res.data.data))
            this.handleCardIdentity(res.data.data)
            console.log('刷卡第一步',res.data.data)
          }
        })
      } else {
        console.log(JSON.parse(identify))
        this.handleCardIdentity(JSON.parse(identify))
        console.log('刷卡第一步getSpStr(info)数据',identify)
      }
    },
    handleCardIdentity (person) {
      this.$store.commit('login', person)
      switch (person.identity) {
        case '1': {
          this.$router.push('/patient')
          break
        }
        case '2': {
          if (this.$route.path === '/nurse') {
            if (this.$checking) {
              this.checkIn(0)
            }
          } else {
            this.$router.push('/nurse')
            this.outPutShow()
          }
          break
        }
        case '3': {
          this.$router.push('/doctor')
          break
        }
        case '4': {
          break
        }
      }
    },
    outPutShow () {
      this.api.post('bedside/inputAndOutputStats', {
        patientId: this.$store.state.patientInfo.patientId,
        startTime: this.$store.getters.recordStartTime.format('YYYY-MM-DD hh:mm:ss'),
        endTime: this.$store.getters.recordEndTime.format('YYYY-MM-DD hh:mm:ss')
      }).then(res => {
        if (res.data.code === 1) {
          this.$store.commit('getUserInputOutput', res.data.data)
          console.log('刷卡第二步',res.data.data)
        } else {
          this.$store.commit('getUserInputOutput', {
            inputStats: 0,
            outputStats: 0
          })
        }
      })
    },
    onSocketMessage (json) {
      const socketData = JSON.parse(json)
      console.log(socketData)
      switch (socketData.code) {
        case 'CALL': {
            console.log('呼叫第一步',socketData.data)
          this.$router.push(`/dialing?isCalled=1&channelId=${socketData.data.channelId}&callerCode=${socketData.data.callerCode}`)
          break
        }
        // 收到新消息
        case 'APIPULL': {
          if (socketData.data.apiType === '2') {
            playSound('/sound/message.mp3')
            this.$store.dispatch('recieveNewMsg', socketData.data.msgTypeId)
            // 收到配置策略修改推送
          } else if (socketData.data.apiType === '3') {
            this.getOutConfig()
            this.getVolumeConfig()
          }
          break
        }
        // 收到广播推送
        case 'NOTICE': {
          if (this.$broadcastAudio) {
            this.$broadcastAudio.stop()
          }
          playSound('/sound/broadcast.mp3')
          playSound('http://192.90.111.30:8783/resource' + socketData.data.voiceUrl).then(res => {
          // playSound('http://192.168.2.20:8783/resource' + socketData.data.voiceUrl).then(res => { //测试
          })
        }
      }
    },
    HANDLE_CALL_callback () {
      this.handleCall()
    },
    F_GPIO_callback () {
      this.handleCall()
    },
    handleCall () {
      this.$router.push('/dialing')
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

body {
  background-color: #f2f8fd;
}
[v-cloak]{
    display: none;
    }
.main-div {
  width: 1920px;
  height: 1080px;
}

iframe {
  border: none;
}

.mt10 {
  margin-top: 10px;
}

.mt20 {
  margin-top: 20px;
}

.mt30 {
  margin-top: 30px;
}

.mt40 {
  margin-top: 40px;
}

.mr10 {
  margin-right: 10px;
}

.mr20 {
  margin-right: 20px;
}

.mr30 {
  margin-right: 30px;
}

.mr40 {
  margin-right: 40px;
}

.mb10 {
  margin-bottom: 10px;
}

.mb20 {
  margin-bottom: 20px;
}

.mb30 {
  margin-bottom: 30px;
}

.mb40 {
  margin-bottom: 40px;
}

.mb50 {
  margin-bottom: 50px;
}

.message {
  position: absolute;
  line-height: 150px;
  font-size: 36px;
  color: white;
  background-color: rgba(51, 51, 51, 0.8);
  border: 1px solid #797979;
  border-radius: 75px;
  padding: 0 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all ease 0.6s;
}

.message.v-leave-active,
.message.v-enter-active {
  opacity: 0;
}

/* 左侧栏 */
.nav-left {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #5897f0;
  z-index: 999;
}

.nav-left .left-item {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  flex-direction: column;
}

.nav-left .left-item.selected {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-left .left-item img {
  width: 60px;
  height: 60px;
}

.main-content {
  margin-top: 10px;
  margin-left: 240px;
  width: 1680px;
  background-color: #ffffff;
}

/* 头部 */
.header-div {
  height: 90px;
  line-height: 90px;
  background-color: #ffffff;
  width: 1920px;
  text-align: center;
  box-shadow: 1px 1px 15px rgba(150, 183, 233, 0.3);
}

.header-div .title {
  font-size: 32px;
  font-weight: bold;
  color: #363939;
}

.header-div .setting {
  position: absolute;
  right: 150px;
  font-size: 30px;
  color: #4e4e4e;
}

.header-div .login-out {
  position: absolute;
  right: 20px;
  font-size: 30px;
  padding: 0 20px;
  color: #4e4e4e;
}

.header-div .login-out:active {
  background-color: #e7e7e7;
}

.header-div .close {
  position: absolute;
  left: 18px;
  font-size: 30px;
  color: #90909e;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header-div .close img {
  width: 48px;
  height: 48px;
}

/* 各端首页头部 */
.zhyi-head-div {
  height: 144px;
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 30px;
  color: #393939;
  position: relative;
  line-height: 1;
  padding: 0 60px;
}

.zhyi-head-div .img-div {
  width: 90px;
  height: 90px;
  margin-right: 20px;
}

.zhyi-head-div .right-div {
  position: absolute;
  right: 60px;
  top: 42px;
  display: flex;
  align-items: center;
}

.zhyi-head-div .right-div img {
  width: 48px;
  height: 48px;
}

/* 各大首页公共样式 */
.zhyi-box-four {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.zhyi-box-four .box-item {
  border-radius: 30px;
  height: 200px;
  width: 260px;
  text-align: center;
  color: #ffffff;
  font-size: 30px;
  font-weight: bold;
}

.zhyi-box-four .box-item:nth-child(1) {
  background-color: #5897f0;
}

.zhyi-box-four .box-item:nth-child(2) {
  background-color: #73d6ad;
}

.zhyi-box-four .box-item:nth-child(3) {
  background-color: #fbaf6a;
}

.zhyi-box-four .box-item:nth-child(4) {
  background-color: #7d88e4;
}

/* 错误提示 */
.error-msg-tip {
  width: 550px;
  height: 60px;
  line-height: 60px;
  color: #fe3848;
  font-size: 24px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  background-color: #ffebed;
  margin: auto;
}

.error-msg-tip img {
  width: 36px;
  height: 36px;
  margin: 0 10px;
}

/* 颜色 */
.red {
  color: #fe3848;
}

/* 组件样式 */
.main-div .zhyl-input {
  width: 500px;
  border-radius: 10px;
  height: 72px;
  background-color: #f2f8fd;
  padding-left: 20px;
  font-size: 30px;
  border: none;
  margin: 0;
}

.main-div .zhyl-input::-webkit-input-placeholder {
  color: #90909e;
}

.main-div .zhyl-button {
  padding: 0;
  border: none;
  text-align: center;
  background-color: #3e8cfc;
  color: #ffffff;
}

.main-div .zhyl-button-blue {
  width: 360px;
  height: 72px;
  line-height: 72px;
  padding: 0;
  border: none;
  text-align: center;
  background-color: #3e8cfc;
  color: #ffffff;
  font-size: 30px;
  border-radius: 10px;
  transition: none;
}

.main-div .zhyl-button-blue:active {
  background-color: #a2c8fd;
}

/* 轮播公共样式 */
.warn-slider {
  height: 170px;
}

.warn-slider .warn-item {
  width: 100px;
  display: inline-block;
  text-align: center;
  font-size: 24px;
  color: #4e4e4e;
  margin-right: 13px;
}

.warn-slider .warn-item:last-child {
  margin-right: 0;
}

.warn-slider .mui-slider-group .mui-slider-item img {
  width: 80px;
  height: 80px;
}

.warn-slider .mui-indicator {
  width: 20px;
  height: 20px;
  background-color: #d0d0d8;
}

.warn-slider .mui-active.mui-indicator {
  background-color: #3e8cfc;
}

.warn-slider .mui-slider-indicator {
  bottom: 20px;
}

.fee-btn {
  width: 100px;
  font-size: 24px;
  padding: 10px 0px;
  border: 2px solid #e3ebfb;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
}

.fee-btn:active {
  background-color: #e7e7e7;
}

.fee-confirm-btn {
  display: inline-block;
  font-size: 24px;
  padding: 10px 20px;
  border: none;
  background-color: #3e8cfc;
  color: white;
  border-radius: 10px;
  margin-left: 140px;
  line-height: 1.2;
  width: 140px;
  margin-bottom: 30px;
}

.fee-confirm-btn:active {
  background-color: #297aec;
}

.qrcode {
  display: inline-block;
  padding: 9px;
  width: 228px;
  height: 228px;
  position: relative;
}

.dialog-body {
  width: 360px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  background-color: white;
  padding: 20px 30px;
  z-index: 10000;
}

.dialog-title {
  font-size: 28px;
  font-weight: bold;
  line-height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
}

.dialog-row {
  display: inline-block;
  font-size: 24px;
  line-height: 50px;
  padding: 0 10px;
  margin-bottom: 20px;
}

.dialog-btn {
  display: inline-block;
  font-size: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #3e8cfc;
  color: white;
  border-radius: 10px;
  line-height: 1.2;
  margin-bottom: 20px;
}

.dialog-btn:active {
  opacity: 0.6;
}

.dialog-btn.cancel {
  background-color: white;
  border: 1px solid #3e8cfc;
  color: #3e8cfc;
}

.dialog-btn + .dialog-btn {
  margin-left: 20px;
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
