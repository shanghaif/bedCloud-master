<template>
  <div id="con">
    <div class="main-div">
      <div class="zhyi-head-div mb30" style="padding-left:50px">
        <img class="img-div" src="../../assets/doctor_head.png" />
        <span>HI！康安定 医生</span>
        <header-right style="right:50px">
          <span class="mr40" slot="custom">{{$store.getters.currentDate}}</span>
        </header-right>
      </div>
      <div class="main-content">
        <div class="left-box">
          <div class="home-card box1" @click="go(5)">
            <div class="top">
              <p class="mb20">
                <span class="bed-name">{{$store.state.patientInfo.bedName || $store.state.bindBed}}</span>
                <span class="name">{{$store.state.patientInfo.patientName}}</span>
              </p>
              <p class="p2">
                <span class="age">{{ $store.state.patientInfo.age || '未知'}}</span>
                <img src="../../assets/girl.png" v-if="$store.state.patientInfo.sex === 0" />
                <img src="../../assets/boy.png" v-else />
                <span
                  class="patient-care-rank"
                  v-if="$store.state.patientInfo.nursingLevel === '一级护理'"
                  style="color:#FE384B;background-color:rgba(254,56,75,0.1)"
                >{{$store.state.patientInfo.nursingLevel}}</span>
                <span
                  class="patient-care-rank"
                  v-if="$store.state.patientInfo.nursingLevel === '二级护理'"
                >{{$store.state.patientInfo.nursingLevel}}</span>
                <span
                  class="patient-care-status"
                  v-if="$store.state.patientInfo.conditionCode"
                >{{$store.state.patientInfo.conditionCode}}</span>
              </p>
            </div>
            <div class="bottom">
              <div class="mui-row">
                <span class="mui-col-sm-6 ml">近24小时总入量 ml</span>
                <span class="mui-col-sm-6 number">{{$store.state.userInputAmount}}</span>
              </div>
              <div class="mui-row">
                <span class="mui-col-sm-6 ml">近24小时总出量ml</span>
                <span class="mui-col-sm-6 number">{{$store.state.userOutputAmount}}</span>
              </div>
            </div>
          </div>
          <div class="home-card mui-row box2">
            <div class="patient-status mui-col-sm-4">
              <span class="patient-status-data">18</span>
              <span class="patient-status-name">呼吸 bpm</span>
            </div>
            <div class="patient-status mui-col-sm-4">
              <span class="patient-status-data">120/80</span>
              <span class="patient-status-name">无创血压 mmHg</span>
            </div>
            <div class="patient-status mui-col-sm-4">
              <span class="patient-status-data">37.5</span>
              <span class="patient-status-name">体温 ℃</span>
            </div>
            <div class="patient-status mui-col-sm-4">
              <span class="patient-status-data">85</span>
              <span class="patient-status-name">脉率 bpm</span>
            </div>
            <div class="patient-status mui-col-sm-4">
              <span class="patient-status-data">98</span>
              <span class="patient-status-name">血氧 %</span>
            </div>
            <div class="patient-status mui-col-sm-4">
              <span class="patient-status-data">83</span>
              <span class="patient-status-name">心率 bpm</span>
            </div>
          </div>
        </div>
        <div class="right-box">
          <div class="box3">
            <div class="home-card home-tab-card" @click="go(1)">
              <img src="../../assets/nav_report.png" />
              <span>报告查询</span>
            </div>
            <div class="home-card home-tab-card" @click="go(2)">
              <img src="../../assets/nav_record.png" />
              <span>电子病历</span>
            </div>
            <div class="home-card home-tab-card" @click="go(3)">
              <img src="../../assets/nav_advice.png" />
              <span>医嘱</span>
            </div>
            <div class="home-card home-tab-card" @click="go(4)">
              <img src="../../assets/nav_xdjh.png" />
              <span>心电监护</span>
            </div>
          </div>
          <div class="advise-list-title">
            <span>昨日新开医嘱</span>
            <img @click="go(3)" src="../../assets/right_arrow_circle.png" />
          </div>
          <div class="home-card box4">
            <div class="advise-list">
              <div class="advise-list-item">
                <div class="advise-list-item-head">
                  <span class="advise-list-item-type">{{currentTab === 2 ? '临' : '长'}}</span>
                  <span class="advise-list-item-date">06-01</span>
                </div>
                <div class="middle-div">
                  <p class="p1">混合糖电解质注射液(500m|袋装) /江苏正大丰海</p>
                  <p class="p2">500ml / 静滴 / Qd</p>
                </div>
                <div class="advise-list-item-status">
                  <p class="advise-status-text">已执行1/2</p>
                  <div class="advise-progress-container">
                    <div class="advise-progress" style="width: 60px;"></div>
                  </div>
                </div>
              </div>
              <div class="advise-list-item">
                <div class="advise-list-item-head">
                  <span class="advise-list-item-type">{{currentTab === 2 ? '临' : '长'}}</span>
                  <span class="advise-list-item-date">06-01</span>
                </div>
                <div class="middle-div">
                  <p class="p1">中长链脂肪乳注射液(20%* 250ml)/华瑞制药</p>
                  <p class="p2">350ml / 静滴 / Q8d</p>
                </div>
                <div class="advise-list-item-status">
                  <p class="advise-status-text" style="color:#35BF00">未执行</p>
                </div>
              </div>
              <div class="advise-list-item">
                <div class="advise-list-item-head">
                  <span class="advise-list-item-type">{{currentTab !== 1 ? '临' : '长'}}</span>
                  <span class="advise-list-item-date">06-01</span>
                </div>
                <div class="middle-div">
                  <p class="p1">氯化钾注射液(10ml:1g)/中国大家</p>
                  <p class="p2">350ml / 静滴 / Bid</p>
                </div>
                <div class="advise-list-item-status">
                  <p class="advise-status-text" style="color:#90909e">已执行</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderRight from '../../components/HeaderRight.vue'
import '../../assets/mui.css'
export default {
  data: function () {
    return {
      pickDate: false,
      currentTab: 0,
      recordList: [{
        id: 1,
        type: '护理类',
        name: '一级护理',
        norm: '/',
        unit: '天',
        count: 1,
        fee: 9.00

      }, {
        id: 2,
        type: '护理类',
        name: '特级护理',
        norm: '/',
        unit: '瓶',
        count: 1,
        fee: 27.00
      }, {
        id: 3,
        type: '中成药',
        name: '康复新液',
        norm: '100ML四川好医生',
        unit: '瓶',
        count: 3,
        fee: 139.00
      }, {
        id: 4,
        type: '中成药',
        name: '康复新液',
        norm: '100ML四川好医生',
        unit: '',
        count: 3,
        fee: 139.00
      }, {
        id: 5,
        type: '中成药',
        name: '复方苦参注射液',
        norm: '5ML山西振东',
        unit: '支',
        count: 5,
        fee: 203.00
      }, {
        id: 6,
        type: '中成药',
        name: '复方苦参注射液',
        norm: '5ML山西振东',
        unit: '支',
        count: 5,
        fee: 203.00
      }, {
        id: 7,
        type: '中成药',
        name: '复方苦参注射液',
        norm: '5ML山西振东',
        unit: '支',
        count: 5,
        fee: 203.00
      }, {
        id: 8,
        type: '护理类',
        name: '一级护理',
        norm: '/',
        unit: '床日',
        count: 1,
        fee: 9.00
      }]
    }
  },
  components: {
    HeaderRight
  },
  methods: {
    handlePickDate: function () {
      // this.$mask = mui.createMask(this.handleCancelDatePick)
      this.pickDate = true
      this.$mask.show()
    },
    handleCancelDatePick: function () {
      if (this.pickDate) {
        this.pickDate = false
        this.$mask.close()
      }
    },
    go (url) {
      switch (url) {
        case 1:
          // plus.navigateTo(webUrl + "doctors/reports.html", "doctors_reports")
          break
        case 2:
          // plus.navigateTo(webUrl + "doctors/record.html", "doctors_record")
          break
        case 3:
          // plus.navigateTo(webUrl + "doctors/advises.html", "doctors_advises")
          break
        case 4:
          // plus.navigateTo(webUrl + "doctors/reports.html", "doctors_reports")
          break
        case 5:
          // plus.navigateTo(webUrl + "doctors/intake_output.html", "doctors_intake_output")
          break
      }
    }
  }
}
</script>

<style scoped>
.main-content {
  margin: 35px 60px;
  width: 1800px;
  background-color: transparent;
  font-size: 0;
  line-height: 0px;
}

.home-card {
  display: inline-block;
  border-radius: 30px;
  background-color: white;
  font-size: 30px;
  line-height: 1;
  overflow: hidden;
  position: relative;
}

.home-tab-card {
  width: 260px;
  height: 200px;
  font-weight: bold;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.advise-list-title {
  height: 110px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 36px;
  color: #4e4e4e;
}

.advise-list {
  border-radius: 30px 30px 0 0;
  height: 100%;
  background-color: white;
  padding: 0 40px;
  overflow: auto;
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
  flex: none;
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
.advise-list-item-type.long {
  background-color: #ffa851;
  color: #ff6600;
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
  flex: none;
}

.advise-status-text {
  width: 140px;
  text-align: center;
  font-size: 30px;
  color: #fe6238;
  font-weight: bold;
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

.patient-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}

.patient-status-data {
  line-height: 60px;
  font-weight: bold;
  font-size: 42px;
  color: #393939;
}

.patient-status-name {
  line-height: 30px;
  font-size: 24px;
  color: #4e4e4e;
}

.patient-care-rank {
  font-size: 24px;
  font-weight: bold;
  border-radius: 12px;
  margin-right: 10px;
  width: 120px;
  line-height: 40px;
  text-align: center;
  color: #3e8cfc;
  background-color: rgba(62, 140, 252, 0.1);
}

.patient-care-status {
  font-size: 24px;
  font-weight: bold;
  border-radius: 12px;
  width: 90px;
  line-height: 40px;
  text-align: center;
  color: #fe384b;
  background-color: rgba(254, 56, 75, 0.1);
}

/* 鍚庨潰鍔犵殑浠ｇ爜 */
.left-box {
  width: 650px;
  margin-right: 40px;
  float: left;
}

.box1 {
  width: 650px;
  height: 410px;
  padding: 35px 20px 35px 30px;
  background-image: url(../../assets/more_icon.png);
  background-size: 120px;
  background-position: right bottom;
  background-repeat: no-repeat;
  box-shadow: 1px 1px 15px rgba(150, 183, 233, 0.3);
}

.box1 .top {
  padding: 0 20px;
  border-bottom: 1px solid #f2f2f2;
}

.box1 .top .bed-name {
  font-size: 72px;
  color: #0076fe;
  margin-right: 25px;
}

.box1 .top .name {
  font-size: 42px;
  color: #393939;
  font-weight: bold;
}

.box1 .top .p2 {
  display: flex;
  align-items: center;
  height: 80px;
}

.box1 .top .p2 .age {
  font-size: 30px;
  color: #333333;
}

.box1 .top .p2 img {
  width: 30px;
  height: 30px;
  margin-left: 15px;
  margin-right: 30px;
}
.p2 .day {
  color: #3e8cfc;
  font-size: 24px;
  padding: 2px;
  border: 1px solid #3e8cfc;
  border-radius: 4px;
  margin-left: 10px;
}
.box1 .bottom {
  padding: 36px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box1 .bottom .mui-row {
  padding: 0 25px;
}

.box1 .bottom .mui-row .ml {
  line-height: 40px;
  color: #4e4e4e;
  font-size: 24px;
}

.box1 .bottom .mui-row .number {
  line-height: 80px;
  color: #393939;
  font-size: 42px;
  font-weight: bold;
  text-align: center;
}

.box2 {
  width: 650px;
  height: 410px;
  margin-top: 20px;
  padding: 30px 20px;
  background-image: url(../../assets/more_icon.png);
  background-size: 120px;
  background-position: right bottom;
  background-repeat: no-repeat;
  box-shadow: 1px 1px 15px rgba(150, 183, 233, 0.3);
}

.right-box {
  width: 1110px;
  float: left;
}

.box3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
}

.box3 .home-tab-card:nth-child(1) {
  background-color: #5897f0;
}

.box3 .home-tab-card:nth-child(2) {
  background-color: #73d6ad;
}

.box3 .home-tab-card:nth-child(3) {
  background-color: #fbaf6a;
}

.box3 .home-tab-card:nth-child(4) {
  background-color: #7d88e4;
}

.box3 .home-tab-card img {
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
}

.advise-list-title img {
  width: 48px;
  height: 48px;
}

.box4 {
  width: 1110px;
  height: 530px;
  padding-top: 40px;
  padding-bottom: 30px;
  box-shadow: 1px 1px 15px rgba(150, 183, 233, 0.3);
}

.box4 .middle-div {
  overflow: hidden;
  white-space: nowrap;
  flex: 2;
}

.box4 .middle-div .p1 {
  color: #393939;
  font-size: 36px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box4 .middle-div .p2 {
  color: #90909e;
  font-size: 24px;
}
</style>
