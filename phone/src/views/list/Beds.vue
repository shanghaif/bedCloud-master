<template>
  <div class="patients-list">
    <div
      :class="['patients-item', {selected:$store.state.broadcastSelectedDevice.indexOf(bed.deviceCode) !== -1}]"
      v-for="bed in $store.state.deviceList.bedList"
      @click="handleSelectBed(bed.deviceCode)"
      @touchstart.prevent="handlePickBedStart(bed)"
      @touchend.prevent="handlePickBedEnd"
      :key="bed.deviceCode"
    >
      <span style="color:#5897F0">{{bed.name}}</span>
      <span style="font-size:24px;margin-top:5px">{{bed.patientName || '暂无'}}</span>
      <img
        class="broadcast-icon"
        src="../../assets/radio_icon.png"
        v-show="$store.state.broadcastSelectedDevice.indexOf(bed.deviceCode) !== -1"
      />
    </div>
  </div>
</template>

<script>
import { showMessage } from '../../utils/utils'
export default {
  data: function () {
    return {
      noticeList: []
    }
  },
  mounted () {
    this.axios.post('nursingStation/deviceList').then(res => {
      if (res.data.code === 1) {
        this.$store.commit('getDeviceList', res.data.data)
      } else {
        showMessage(res.data.msg)
      }
    }).catch(() => {
      showMessage('网络异常，请检查您的网络。')
    })
  },
  methods: {
    handlePickBedStart (bed) {
      this.$store.commit('pickupDevice', bed.deviceCode)
      this.$callTimer = setTimeout(() => {
        console.log('timer handler call')
        this.handleCallBed(bed)
      }, 1000)
    },
    handlePickBedEnd () {
      clearTimeout(this.$callTimer)
    },
    handleCallBed (bed) {
      clearTimeout(this.$callTimer)
      console.log('emit call event')
      if (!this.$store.state.currentCall.channelId) {
        this.$eventBus.$emit('call', bed)
      }
    }
  }
}
</script>

<style scoped>
.patients-list {
  font-size: 0;
}

.patients-list .patients-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 95px;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  background-color: white;
  color: #333333;
  font-size: 28px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 0 20px 20px 0;
  user-select: none;
  position: relative;
}

.patients-list .patients-item:active {
  background-color: #e7e7e7;
}
</style>
