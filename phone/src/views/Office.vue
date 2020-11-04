<template>
  <div id="con" style="display: flex;flex-direction: column;align-items:center;height: 100%;">
    <div class="top-bar" style="width:100%">
      医护分机位置配置
      <span
        style="right:30px;line-height: 32px;position:absolute;top:19px"
      >{{`${$store.state.bindInfo.hospitalName}  ${$store.state.bindInfo.areaName}  ${$store.state.bindInfo.name}`}}</span>
    </div>
    <div class="main-content" style="postion:relative;align-items:center">
      <div
        style="display:flex;width:840px;min-height:720px;flex-wrap:wrap;align-content:flex-start"
      >
        <div
          :class="['office-item',{selected:selectedOffice === office.officeId,disabled:office.isSelect === '1'}]"
          v-for="office in officeList"
          :key="office.officeId"
          @click="handleSelect(office)"
        >{{office.officeName}}</div>
      </div>
      <div class="office-btn" @click="handleBindOffice">保存设置</div>
      <p style="color:#b2b2b2;font-size:32px;margin:20px 0 0 0">点击相应按钮选择医护分机安装位置</p>
    </div>
    <p style="color:#b2b2b2;font-size:28px;margin-bottom:40px">NCMED--IP Version1.0.0</p>
  </div>
</template>

<script>
import { showMessage } from '../utils/utils'
export default {
  data: function () {
    return {
      selectedOffice: 0,
      officeList: []
    }
  },
  mounted () {
    this.axios.post('nursingStation/getOfficeList').then(res => {
      if (res.data.code === 1) {
        this.officeList = res.data.data.officeList
      }
    })
  },
  methods: {
    handleSelect (office) {
      if (office.isSelect === '0') {
        this.selectedOffice = office.officeId
      }
    },
    handleBindOffice () {
      this.axios.post('nursingStation/setOffice', {
        officeId: this.selectedOffice
      }).then(res => {
        if (res.data.code === 1) {
          showMessage('位置保存成功！')
          const bindInfo = { ...this.$store.state.bindInfo, name: this.officeList.find(office => office.officeId === this.selectedOffice).officeName }
          window.plus.saveSpStr('bindInfo', JSON.stringify(bindInfo))
          this.$store.commit('bindOffice', bindInfo)
          this.$router.replace('/list/beds')
        }
      })
    }
  }
}
</script>

<style scoped>
.main-content {
  padding-top: 10px;
  padding-bottom: 20px;
  align-items: flex-start;
  flex-direction: column;
}
.top-bar {
  display: flex;
  justify-content: center;
}
.office-item {
  flex: none;
  font-size: 32px;
  width: 400px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  background-color: white;
  margin: 10px;
  border: 1px solid #e7e7e7;
  border-radius: 30px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px #e7e7e7;
}
.office-item.disabled {
  opacity: 0.5;
}
.office-item.selected {
  background-color: #3e8cfc;
  border: none;
  color: white;
}
.office-btn {
  width: 840px;
  height: 72px;
  line-height: 72px;
  padding: 0;
  border: none;
  text-align: center;
  background-color: #3e8cfc;
  color: #ffffff;
  font-size: 30px;
  border-radius: 36px;
  transition: none;
}

.office-btn:active {
  background-color: #a2c8fd;
}
</style>
