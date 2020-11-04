<template>
  <div class="main-div">
    <div class="header-div">
      <div
        class="header-menu-item"
        :class="{selected:currentTab === 0}"
        @click="currentTab = 0"
      >当前医嘱</div>
      <div
        class="header-menu-item"
        :class="{selected:currentTab === 1}"
        @click="currentTab = 1"
      >长期医嘱</div>
      <div
        class="header-menu-item"
        :class="{selected:currentTab === 2}"
        @click="currentTab = 2"
      >临时医嘱</div>
      <span class="setting">设置</span>
      <span class="login-out">退出</span>
    </div>
    <nav-doctor-left></nav-doctor-left>
    <div class="main-content">
      <div style="height:40px"></div>
      <div class="advise-list">
        <div class="advise-list-item" v-for="record in recordList" :key="record.orderId">
          <div class="advise-list-item-head">
            <span class="advise-list-item-type">{{record.tempOrLong === '临时医嘱' ? '临' : '长'}}</span>
            <span class="advise-list-item-date">{{moment(record.planStartDate).format('MM-DD')}}</span>
          </div>
          <div>
            <p style="color:#393939;font-size:36px;margin-top: 10px;">{{record.orderText}}</p>
            <p style="color:#90909e;font-size:24px;">{{record.orderCategory}}</p>
          </div>
          <div style="flex:auto"></div>
          <div class="advise-list-item-status">
            <p class="advise-status-text">{{record.orderStatus}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavDoctorLeft from '../../components/NavDoctorLeft.vue'
import moment from 'moment'
export default {
  data: function () {
    return {
      pickDate: false,
      currentTab: 0,
      moment: moment,
      recordList: []
    }
  },
  components: {
    NavDoctorLeft
  },
  mounted () {
    this.api.post('bedside/listBaseOrder', {
      pageSize: 10,
      pageNum: 1,
      inHospitalId: this.$store.state.patientInfo.inHospitalId
    }).then(res => {
      if (res.data.code === 1) {
        this.recordList = res.data.data.listBaseOrder
      }
    })
  },
  methods: {
    handlePickDate: function () {
      // this.$mask = mui.createMask(this.handleCancelDatePick);
      this.pickDate = true
      this.$mask.show()
    },
    handleCancelDatePick: function () {
      if (this.pickDate) {
        this.pickDate = false
        this.$mask.close()
      }
    }
  }
}
</script>

<style scoped>
.header-div {
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding-left: 200px;
}

.header-menu-item {
  width: 200px;
  line-height: 90px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #363939;
  position: relative;
}

.header-menu-item.selected {
  color: #0076fe;
}

.header-menu-item.selected:after {
  content: "";
  width: 60px;
  height: 15px;
  background-color: #0076fe;
  position: absolute;
  bottom: 0;
  left: 70px;
  border-radius: 10px;
}

.main-content {
  margin-top: 0px;
  padding-right: 60px;
  background-color: transparent;
}

.advise-list {
  border-radius: 30px 30px 0 0;
  height: 100%;
  background-color: white;
  padding: 0 40px;
}

.advise-list-item {
  display: flex;
  align-items: stretch;
  padding: 30px 0;
  line-height: 1;
  height: 150px;
  border-bottom: 1px solid #f2f2f2;
}

.advise-list-item-head {
  width: 100px;
  border-right: 1px solid #e4e4e4;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.advise-list-item-type {
  display: inline-block;
  border-radius: 50%;
  width: 46px;
  height: 46px;
  line-height: 46px;
  font-size: 24px;
  font-weight: bold;
  background-color: rgba(115, 214, 173, 0.2);
  color: #35bf00;
  text-align: center;
}

.advise-list-item-date {
  font-size: 24px;
  color: #90909e;
}

.advise-list-item-status {
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.advise-status-text {
  width: 140px;
  text-align: center;
  font-size: 30px;
  color: #fe6238;
  font-weight: bold;
  line-height: 90px;
  margin: 0;
}

.advise-progress-container {
  width: 120px;
  height: 20px;
  background-color: #f2f8fd;
  border-radius: 10px;
}

.advise-progress {
  height: 20px;
  background-color: #fe6238;
  border-radius: 10px;
}

.advise-search-bar {
  height: 150px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  font-size: 30px;
  color: #90909e;
}

.advise-search-date {
  width: 680px;
  line-height: 90px;
  padding: 0 30px;
  background-color: #e3ebfb;
  border-radius: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
}

.advise-search-content {
  width: 600px;
  line-height: 90px;
  padding: 0 30px;
  background-color: #e3ebfb;
  border-radius: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-picker-container {
  margin-left: 200px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #90909e;
}

.date-picker {
  width: 450px;
  height: 90px;
  padding: 0 30px;
  line-height: 90px;
  background-color: #e3ebfb;
  border-radius: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 100px;
}

.statistic-bar {
  height: 90px;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 40px;
  position: relative;
}

.data-picker-dialog {
  width: 1100px;
  height: 980px;
  position: fixed;
  padding-top: 30px;
  background-color: white;
  left: 410px;
  top: 50px;
  border-radius: 30px;
  z-index: 999;
}

.data-picker-dialog-title {
  margin-left: 50px;
  height: 100px;
  line-height: 100px;
  font-size: 36px;
  font-weight: bold;
  color: #333333;
}

.data-picker-title {
  height: 97px;
  padding: 0 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 32px;
  font-weight: bold;
  color: #333333;
}

.data-picker-dialog-content {
  padding: 0px 50px;
  border-bottom: 1px solid #e7e7e7;
}

.data-picker-date-line {
  height: 100px;
  padding: 0 35px;
  font-size: 0;
}

.data-picker-date {
  font-size: 30px;
  line-height: 100px;
  text-align: center;
  color: #393939;
  display: inline-block;
  width: 90px;
  height: 100%;
  margin-left: 50px;
}

.data-picker-date:first-child {
  color: #3e8cfc;
  margin-left: 0;
}

.data-picker-date.selected {
  background-color: #3e8cfc;
  color: white;
}

.data-picker-btn {
  margin: 40px 0;
  width: 325px;
  height: 72px;
  background-color: #3e8cfc;
  color: white;
  border-radius: 10px;
  font-size: 30px;
}
</style>
