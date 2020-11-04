<template>
  <div style="flex: auto;display: flex;height:100%">
    <div style="width:335px;flex: none;border-right:2px solid #D7D7D7">
      <div style=" position: relative;">
        <div class="search-input">{{searchNum}}</div>
        <img
          src="../../assets/search_icon.png"
          style="width:48px;height:48px;position: absolute;top:11px;right:35px"
        />
        <p class="keyboard-desc">输入床位可搜索该床责任护士</p>
        <ul class="keyboard-list">
          <li
            class="keyboard-item"
            v-for="num in 9"
            @click="handleSearchTextInput(num)"
            :key="num"
          >{{num}}</li>
          <li class="keyboard-item" style="margin-bottom: 0px;" @click="handleSearchTextInput(0)">0</li>
          <li class="keyboard-item" style="margin-bottom: 0px;width: 200px" @click="handleSearchTextBackspace">
            <img src="../../assets/backspace_icon.png" style="width: 48px;height:48px;" />
          </li>
        </ul>
        <div class="keyboard-call">
          <div class="keyboard-call-div"  @click="handleCallNurse(currentNurse)">
            <img src="../../assets/call_icon.png" style="width: 48px;height:48px;margin:12px" />
            <span style="font-size: 36px;color: white">拨号</span>
          </div>
        </div>
      </div>
    </div>
    <div class="nurse-list" style="flex: auto;margin-left: 35px;">
      <div
        :class="[{selected:currentNurse.deviceCode === nurse.deviceCode || $store.state.broadcastSelectedDevice.indexOf(nurse.deviceCode) !== -1},'nurse-item']"
        v-for="nurse in $store.state.deviceList.chestList"
        @touchstart.prevent="handlePickNurseStart(nurse)"
        @touchend.prevent="handlePickNurseEnd"
        :key="nurse.deviceCode"
      >
        {{nurse.name}}
        <img
          class="broadcast-icon"
          src="../../assets/radio_icon.png"
          v-show="$store.state.broadcastSelectedDevice.indexOf(nurse.deviceCode) !== -1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { showMessage } from '../../utils/utils'
export default {
  data: function () {
    return {
      searchNum: '',
      currentNurse: {}
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
    handleSearchTextInput (num) {
      this.searchNum = this.searchNum + num
      this.currentNurse = this.$store.state.deviceList.chestList.find(nurse => nurse.bed === Number(this.searchNum)) || {}
    },
    handleSearchTextBackspace () {
      if (this.searchNum) {
        this.searchNum = this.searchNum.substr(0, this.searchNum.length - 1)
        this.currentNurse = this.$store.state.deviceList.chestList.find(nurse => nurse.bed === Number(this.searchNum)) || {}
      }
    },
    handlePickNurseStart (nurse) {
      this.currentNurse = nurse
      this.searchNum = ''
      this.$callTimer = setTimeout(() => {
        this.handleCallNurse(nurse)
      }, 1000)
    },
    handlePickNurseEnd () {
      clearTimeout(this.$callTimer)
    },
    handleCallNurse (nurse) {
      if (this.currentNurse.deviceCode) {
        clearTimeout(this.$callTimer)
        this.$eventBus.$emit('call', nurse)
      }
    }
  }
}
</script>

<style scoped>
.nurse-list {
  font-size: 0;
  height: 555px;
  overflow: auto;
}

.nurse-list .nurse-item {
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

.nurse-list .nurse-item:active {
  background-color: #e7e7e7;
}

.nurse-list .nurse-item:nth-last-child(4) {
  margin-bottom: 0px;
}
.nurse-list .nurse-item:nth-last-child(3) {
  margin-bottom: 0px;
}
.nurse-list .nurse-item:nth-last-child(2) {
  margin-bottom: 0px;
}
.nurse-list .nurse-item:nth-last-child(1) {
  margin-bottom: 0px;
}
.search-input {
  width: 310px;
  height: 70px;
  line-height: 70px;
  font-size: 36px;
  padding: 0 65px 0 20px;
  border-radius: 10px;
  outline: none;
  border: 2px solid #5897f0;
  background-color: white;
  box-sizing: border-box;
}
.keyboard-call{
  width: 100%;
  height: 60px;
  position: relative;
  top: 20px;
}
.keyboard-call-div{
  width: 310px;
  background-color: #3e8cfc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}

.keyboard-desc {
  margin: 10px 0;
  font-size: 24px;
  color: #949494;
}

.keyboard-list {
  font-size: 0px;
}

.keyboard-list .keyboard-item {
  display: inline-flex;
  width: 90px;
  height: 90px;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  font-size: 36px;
  color: #363636;
  margin: 0 20px 20px 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  float: left;
}

.keyboard-list .keyboard-item:active {
  background-color: #e7e7e7;
}

.keyboard-list .keyboard-item.dialing {
  background-color: #5897f0;
}

.keyboard-list .keyboard-item.dialing:active {
  background-color: #297aec;
}

.keyboard-list .keyboard-item:nth-child(3n) {
  margin-right: 0;
}
</style>
