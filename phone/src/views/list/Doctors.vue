<template>
  <div class="doctor-list">
    <div
      :class="['doctor-item', {selected:$store.state.broadcastSelectedDevice.indexOf(doctor.deviceCode) !== -1}]"
      v-for="doctor in $store.state.deviceList.doctorList"
      @touchstart.prevent="handlePickBedStart(doctor)"
      @touchend.prevent="handlePickBedEnd"
      :key="doctor.deviceCode"
    >
      <span style="color:#5897F0">{{doctor.name}}</span>
      <img
        class="broadcast-icon"
        src="../../assets/radio_icon.png"
        v-show="$store.state.broadcastSelectedDevice.indexOf(doctor.deviceCode) !== -1"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  methods: {
    handlePickBedStart (doctor) {
      this.$callTimer = setTimeout(() => {
        this.handleCallBed(doctor)
      }, 1000)
    },
    handlePickBedEnd () {
      clearTimeout(this.$callTimer)
    },
    handleCallBed (doctor) {
      clearTimeout(this.$callTimer)
      this.$eventBus.$emit('call', doctor)
    }
  }
}
</script>

<style scoped>
.doctor-list {
  font-size: 0;
}

.doctor-list .doctor-item {
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

.doctor-list .doctor-item:active {
  background-color: #e7e7e7;
}
</style>
