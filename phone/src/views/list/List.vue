<template>
  <div style="height:100%;overflow:hidden">
    <div class="patients-container">
      <router-view></router-view>
    </div>
    <div class="btn-bar">
<!--      <button-->
<!--        :class="['btn-bar-button',{pressed:pressingBtn === 'doctor'}]"-->
<!--        @touchstart.prevent="handlePickDocotrStart"-->
<!--        @touchend.prevent="handlePickDoctorEnd"-->
<!--      >-->
<!--        呼叫医生-->
<!--        <img src="../../assets/doctor_icon.png" class="bar-button-icon" />-->
<!--      </button>-->
<!--      <button-->
<!--        :class="['btn-bar-button',{pressed:pressingBtn === 'nurse'}]"-->
<!--        @touchstart.prevent="handlePickCheifNurseStart"-->
<!--        @touchend.prevent="handlePickCheifNurseEnd"-->
<!--      >-->
<!--        呼叫护士长-->
<!--        <img src="../../assets/nurse_icon.png" class="bar-button-icon" />-->
<!--      </button>-->
      <button
        :class="['btn-bar-button',{pressed:pressingBtn === 'broadcast',recording:$store.state.broadcastSelectedDevice.length > 0}]"
        v-if="$route.path === '/list/beds'"
        @click="handleSelectBroadcast"
      >
        <div class="record-dialog" v-show="pressingBtn === 'broadcast' && false">
          <div class="wave-view" style="display:inline-block;width:120px;height:60px;margin:0 20px"></div>
        </div>
        <span>{{$store.state.broadcastSelectedDevice.length > 0 ? '发送广播': '患者全区广播'}}</span>
        <img src="../../assets/radio_icon.png" class="bar-button-icon" />
      </button>
    </div>
    <div
      style="width:400px;height:180px;position:absolute;left:50%;top:50%;display:flex;flex-direction:column;justify-content:space-between;transform:translate(-50%,-50%);background-color:white;border-radius:30px;box-shadow: 2px 2px 7.5px rgba(128, 128, 128, 0.2);padding:40px"
      v-show="showVoiceDialog"
    >
      <audio :src="recordSrc" controls style="width:100%;margin-top:20px"></audio>
      <div style="display:flex;justify-content:space-between">
        <button
          class="btn-bar-button"
          style="width:45%;box-shadow:none"
          @click="handleVoice(1)"
        >发送语音</button>
        <button
          class="btn-bar-button"
          style="width:45%;box-shadow:none;margin:0"
          @click="handleVoice(0)"
        >保存语音</button>
      </div>
    </div>
    <div
      style="width:600px;height:700px;position:absolute;left:50%;top:50%;display:flex;flex-direction:column;justify-content:space-between;transform:translate(-50%,-50%);background-color:white;border-radius:30px;box-shadow: 2px 2px 7.5px rgba(128, 128, 128, 0.2);padding:60px;box-sizing:border-box"
      v-show="showSelectBroadcastDialog"
    >
      <img
        src="../../assets/close_icon.png"
        style="position:absolute;top:20px;right:20px;width:36px;height:36px;"
        @click="handleCloseBroadcastDialog"
      />
      <device-tree
        v-model="selectedBroadcast"
        :data-list="broadcastList"
        child-key="subs"
        style="height:500px;margin-bottom:30px"
      ></device-tree>
      <button
        class="btn-bar-button"
        style="width:45%;box-shadow:none;margin:auto"
        @click="handleSendBroadcast"
      >发送语音</button>
    </div>
  </div>
</template>

<script>
// import Recorder from 'recorder-core/recorder.mp3.min'
// import 'recorder-core/src/extensions/frequency.histogram.view'
// import 'recorder-core/src/extensions/lib.fft'
import DeviceTreeVue from '../../components/DeviceTree.vue'
import { showMessage, sendBroadcast } from '../../utils/utils'
// import { showMessage } from '../../utils/utils'
export default {
  data: function () {
    return {
      doctorCode: '',
      nurseCode: '',
      pressingBtn: '',
      recordBlob: null,
      selectedDevice: [],
      selectedBroadcast: {},
      broadcastList: [],
      showVoiceDialog: false,
      showSelectBroadcastDialog: false
    }
  },
  computed: {
    recordSrc () {
      return this.recordBlob ? (window.URL || window.webkitURL).createObjectURL(this.recordBlob) : ''
    }
  },
  mounted () {
    /* this.axios.post('nursingStation/officeotherinfo').then(res => {
      if (res.data.code === 1) {
        this.doctorCode = res.data.data.doctorCode,
          this.nurseCode = res.data.data.nurseCode
      } else {
        showMessage(res.data.msg)
      }
    }).catch(() => {
      showMessage('网络异常，请检查您的网络。')
    }) */
    this.axios.post('file/broadcast').then(res => {
      if (res.data.code === 1) {
        this.broadcastList = res.data.data
      }
    })
  },
  components: {
    'device-tree': DeviceTreeVue
  },
  methods: {
    handlePickVoiceStart () {
      this.pressingBtn = 'broadcast'
      /* this.$recorder = Recorder({
        type: "mp3",
        sampleRate: 16000,
        bitRate: 16,
        onProcess: (buffers, powerLevel, bufferDuration, bufferSampleRate) => {
          if (this.$waveView) {
            this.$waveView.input(buffers[buffers.length - 1], powerLevel, bufferSampleRate)
          }
          console.log(buffers)
        }
      });
      this.$recorder.open(() => {
        document.body.ontouchend = this.handlePickVoiceEnd
        this.$waveView = Recorder.FrequencyHistogramView({
          elem: ".wave-view",
          position: 0,
          stripeEnable: false
        })
        this.$recorder.start()
      }, (msg, isUserNotAllow) => {
        console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg)
      }); */
    },
    handlePickVoiceEnd (ev) {
      ev.preventDefault()
      this.pressingBtn = ''
      document.body.ontouchend = null
      /* this.$recorder.stop((blob) => {
        this.$recorder.close();
        this.$recorder = null;

        this.showVoiceDialog = true;
        this.recordBlob = blob;

      }, msg => {
        console.log("录音失败:" + msg);
        this.$recorder.close();
        this.$recorder = null;
      }); */
    },
    handleVoice () {
      /* this.showVoiceDialog = false;
      this.recordBlob = null;
      const formData = new FormData();
      const fileObj = new File([this.recordBlob], 'record.mp3')
      formData.append('file', fileObj)
      formData.append('type', type)
      this.axios.post('common/broadcastMP3', formData).then(res => {
        if (res.data.code === 1) {
          if (type === 0) {
            this.$message('保存成功！')
          } else {
            this.axios.post('global/broadcast', {
              fileUrl: res.data.data,
              sendDeviceCode: this.$store.state.broadcastSelectedDevice.join(',')
            }).then(res => {
              if (res.data.code === 1) {
                this.$message('发送成功！')
              }
            })
          }
        }
      }) */
    },
    handleSelectBroadcast () {
      this.showSelectBroadcastDialog = true
      this.axios.post('file/broadcast').then(res => {
        if (res.data.code === 1) {
          this.broadcastList = res.data.data
        }
      })
    },
    handlePickDocotrStart () {
      this.pressingBtn = 'doctor'
      this.$callTimer = setTimeout(() => {
        this.handleCall({
          deviceCode: this.doctorCode,
          name: '医生办公室'
        })
      }, 1000)
    },
    handlePickDoctorEnd () {
      this.pressingBtn = ''
      clearTimeout(this.$callTimer)
    },
    handlePickCheifNurseStart () {
      this.pressingBtn = 'nurse'
      this.$callTimer = setTimeout(() => {
        this.handleCall({
          deviceCode: this.nurseCode,
          name: '护士长'
        })
      }, 1000)
    },
    handlePickCheifNurseEnd () {
      this.pressingBtn = ''
      clearTimeout(this.$callTimer)
    },
    handleCall (nurse) {
      if (nurse.deviceCode) {
        this.pressingBtn = ''
        clearTimeout(this.$callTimer)
        this.$eventBus.$emit('call', nurse)
      }
    },
    handleCloseBroadcastDialog () {
      this.showSelectBroadcastDialog = false
      this.selectedBroadcast = {}
    },
    handleSendBroadcast () {
      if (!this.selectedBroadcast.fileUrl) {
        showMessage('请选择发送的文件！')
        return
      }
      if (!this.$store.state.broadcastSelectedDevice.length > 0) {
        showMessage('请选择发送的设备！')
        return
      }
      sendBroadcast(this.selectedBroadcast.fileUrl).then(() => {
        showMessage('发送成功！')
        this.$store.commit('clearSelectedDevice')
        this.handleCloseBroadcastDialog()
      }).catch(() => {
        showMessage('网络连接异常，请检查网络后重试！')
      })
    }
  }
}
</script>

<style>
.selected {
  border: 4px solid #5897f0 !important;
}

.broadcast-icon {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 40px;
  height: 40px;
}
</style>

<style scoped>
.patients-container {
  height: 850px;
  padding-bottom: 30px;
  overflow: auto;
  margin-bottom: -20px;
}

.btn-bar {
  height: 100px;
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.btn-bar-button {
  outline: none;
  border: none;
  width: 270px;
  height: 60px;
  font-size: 24px;
  color: white;
  border-radius: 30px;
  background-color: #5897f0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  margin-right: 30px;
}

.btn-bar-button .bar-button-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  left: 5px;
  top: 5px;
}

.btn-bar-button.pressed,
.btn-bar-button:active {
  background-color: #297aec;
}

.btn-bar-button.recording {
  background-color: #35bf00;
}

.record-dialog {
  position: absolute;
  width: 220px;
  height: 124px;
  padding: 30px;
  background-color: white;
  z-index: 10;
  border-radius: 30px;
  top: -200%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 2px 2px 7.5px rgba(128, 128, 128, 0.2);
}

.record-dialog::after {
  content: "";
  width: 20px;
  height: 20px;
  margin-left: -10px;
  margin-top: -10px;
  box-sizing: border-box;
  position: absolute;
  border: 10px solid transparent;
  border-color: white white transparent transparent;
  transform: rotate(135deg);
  left: 50%;
  top: 100%;
  box-shadow: 2px -2px 2px rgba(128, 128, 128, 0.2);
}
</style>
