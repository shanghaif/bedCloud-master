<template>
  <div style="height:100%;display:flex">
    <div class="keyboard-container">
      <div class="search-input">{{searchText}}
      </div>
      <img
        src="../assets/search_icon.png"
        style="width:48px;height:48px;position: absolute;top:11px;right:35px"
      />
      <p class="keyboard-desc">输入科室首字母可进行搜索</p>
      <ul class="keyboard-list">
        <li
          class="keyboard-item"
          v-for="letter in alphabet"
          @click="handleSearchTextInput(letter)"
          :key="letter"
        >{{letter}}</li>
        <li class="keyboard-item keyboard-backspace" @click="handleSearchTextBackspace">退格</li>
      </ul>
      <div class="keyboard-call">
        <div class="keyboard-call-div" @click="handleCall">
          <img src="../assets/call_icon.png" style="width: 48px;height:48px;margin:12px" />
          <span style="font-size: 36px;color: white">拨号</span>
        </div>
      </div>
    </div>
    <div style="flex:auto;padding:0 25px">
      <div class="device-list-container">
        <device-tree
          v-model="current"
          :data-list="phoneList"
          node-key="deviceCode"
          child-key="list"
          search-key="pinyin"
          :search-word="searchText"
          style="overflow-x: hidden;overflow-y: auto;flex: auto;"
          v-if="currentTag === 'phonebook'"
        ></device-tree>
        <ul style="font-size:24px;overflow-x: hidden;overflow-y: auto;flex: auto;" v-else>
          <li
            :class="[{active:history.handled},'history-list-item']"
            v-for="history in $store.state.historyList"
            :key="history.channelId"
            @touchstart.prevent="handlePickIpPhoneStart(history)"
            @touchend.prevent="handlePickIpPhoneEnd()"
          >{{history.targetName}}</li>
        </ul>
        <div class="device-nav-right">
          <div
            :class="[{active:currentTag === 'phonebook'},'device-nav-right-item']"
            style="border-bottom:1px solid #5897F0;"
            @click="currentTag = 'phonebook'"
          >电话簿</div>
          <div
            :class="[{active:currentTag === 'history'},'device-nav-right-item']"
            style="border-top:1px solid #5897F0;"
            @click="currentTag = 'history'"
          >历史记录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceTreeVue from '../components/DeviceTree.vue'
import pinyin from 'pinyin'
export default {
  data: function () {
    return {
      currentTag: 'phonebook',
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      searchText: '',
      current: {},
      phoneList: []
    }
  },
  components: {
    'device-tree': DeviceTreeVue
  },
  mounted () {
    console.log(window.pinyinUtil)
    this.axios.post('nursingStation/phoneBook').then(res => {
      if (res.data.code === 1) {
        this.phoneList = res.data.data.phoneList.map((department, index) => ({
          name: department.deptName,
          deviceCode: index,
          pinyin: pinyin(department.deptName, {
            style: pinyin.STYLE_FIRST_LETTER
          }).join('').toUpperCase(),
          list: department.list.map(list => ({
            pinyin: pinyin(list.name, {
              style: pinyin.STYLE_FIRST_LETTER
            }).join('').toUpperCase(),
            ...list
          }))
        }))
      }
    })
  },
  methods: {
    handleSearchTextInput (letter) {
      this.searchText = this.searchText + letter
    },
    handleSearchTextBackspace () {
      if (this.searchText) {
        this.searchText = this.searchText.substr(0, this.searchText.length - 1)
      }
    },
    handlePickIpPhoneStart (node) {
      this.$callTimer = setTimeout(() => {
        this.handleRecallIpPhone(node)
      }, 1000)
    },
    handlePickIpPhoneEnd () {
      clearTimeout(this.$callTimer)
    },
    handleCall () {
      if (this.current.deviceCode) {
        // 将拨打电话事件传输到事件总线
        this.$eventBus.$emit('call', this.current)
      }
    },
    handleRecallIpPhone (node) {
      if (node.channelId) {
        clearTimeout(this.$callTimer)
        // 将拨打电话事件传输到事件总线
        this.$eventBus.$emit('call', {
          deviceCode: node.callerCode === window.plus.getMac() ? node.callerCode : node.calledCode,
          name: node.targetName
        })
      }
    }
  }
}
</script>

<style scoped>
.keyboard-container {
  width: 467px;
  padding-right: 25px;
  border-right: 2px solid #c9c9c9;
  margin-bottom: -3px;
  position: relative;
}

.search-input {
  width: 440px;
  height: 70px;
  line-height: 70px;
  font-size: 36px;
  padding: 0 65px 0 20px;
  border-radius: 10px;
  outline: none;
  border: 2px solid #5897f0;
  background-color: white;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.keyboard-desc {
  margin: 10px 0;
  font-size: 24px;
  color: #949494;
}
.keyboard-call{
  width: 100%;
  height: 60px;
  position: relative;
  top: 20px;
}
.keyboard-call-div{
  width: 100%;
  background-color: #3e8cfc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}

.keyboard-list {
  font-size: 0px;
}

.keyboard-list .keyboard-item {
  float: left;
  width: 72px;
  height: 72px;
  text-align: center;
  line-height: 72px;
  background-color: white;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  font-size: 36px;
  color: #363636;
  margin: 0 0 20px 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.keyboard-list .keyboard-item:active {
  background-color: #e7e7e7;
}

.keyboard-list .keyboard-item:nth-child(5n + 1) {
  margin: 0;
}

.keyboard-list .keyboard-item.keyboard-backspace {
  width: 350px;
  margin: 0;
  float: right;
}

.keyboard-list .keyboard-item.dialing {
  background-color: #5897f0;
}

.keyboard-list .keyboard-item.dialing:active {
  background-color: #297aec;
}

.device-list-container {
  border: 2px solid #5897f0;
  border-radius: 15px;
  height: 930px;
  background-color: white;
  display: flex;
}

.device-nav-right {
  width: 85px;
  border-left: 2px solid #5897f0;
  display: flex;
  flex-direction: column;
}

.device-nav-right .device-nav-right-item {
  margin: 0 15px;
  box-sizing: border-box;
  flex: auto;
  font-size: 32px;
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  text-align: center;
  line-height: 55px;
  color: #949494;
  letter-spacing: 6px;
}

.device-nav-right .device-nav-right-item.active {
  color: #5897f0;
}

.history-list-item {
  padding: 17px 30px;
  border-bottom: 1px solid #d7d7d7;
}

.history-item.active {
  padding: 17px 30px;
  border-bottom: 1px solid #d7d7d7;
}
</style>
