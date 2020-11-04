<template>
  <div id="con">
    <div class="main-div">
      <div class="header-div">
        <div class="header-menu-item selected">检查报告</div>
        <div class="header-menu-item">检验报告</div>
        <header-right v-if="false"></header-right>
      </div>
      <nav-doctor-left></nav-doctor-left>
      <div class="main-content">
        <div class="report-list">
          <div
            class="report-list-item"
            :class="{'new-report':report.new}"
            v-for="report in reportList"
            :key="report.id"
          >
            <p class="report-title">{{report.title}}</p>
            <p class="report-date">{{report.date}}</p>
            <div class="report-check-btn">查看 ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderRight from '../../components/HeaderRight.vue'
import NavDoctorLeft from '../../components/NavDoctorLeft.vue'
export default {
  data: function () {
    return {
      reportList: [{
        id: 1,
        title: '头部X线报告',
        date: '更新于：2019-06-25 20:13:09',
        new: true
      }, {
        id: 2,
        title: '心电图报告（2）',
        date: '更新于：2019-06-25 20:13:09',
        new: false
      }, {
        id: 3,
        title: '胸部CT报告',
        date: '更新于：2019-06-25 20:13:09',
        new: false
      }, {
        id: 4,
        title: '头部CT报告',
        date: '更新于：2019-06-25 20:13:09',
        new: false
      }, {
        id: 5,
        title: '腹部CT报告',
        date: '更新于：2019-06-25 20:13:09',
        new: false
      }, {
        id: 6,
        title: 'MRI报告',
        date: '更新于：2019-06-25 20:13:09',
        new: false
      }, {
        id: 7,
        title: '超声报告',
        date: '更新于：2019-06-25 20:13:09',
        new: false
      }, {
        id: 8,
        title: '其他报告',
        date: '更新于：2019-06-25 20:13:09',
        new: false
      }]
    }
  },
  components: {
    NavDoctorLeft,
    HeaderRight
  },
  methods: {
    btn1: function () {
      // this.url = webUrl + "admin/bed_choice.html"
    },
    btn2: function () {
      // this.url = webUrl + "admin/index.html"
    },
    btn3: function () {
      // this.url = webUrl + "login/admin_login.html"
    }
  }
}
</script>

<style scoped>
.header-div {
  display: flex;
  align-items: stretch;
  justify-content: center;
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
  margin-top: 40px;
  padding-right: 40px;
  background-color: transparent;
}

.report-list {
  font-size: 0;
  overflow: scroll;
  height: 950px;
}

.report-list-item {
  width: 380px;
  height: 290px;
  margin: 0px 40px 30px 0;
  padding: 45px 0 45px 35px;
  background-color: #ffffff;
  font-size: 24px;
  border-radius: 30px;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
}

.report-list-item.new-report:after {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #fe384b;
  border-radius: 50%;
  top: 10px;
  right: 10px;
}

.report-list-item:nth-child(4n) {
  margin-right: 0;
}

.report-title {
  font-size: 36px;
  line-height: 40px;
  color: black;
  font-weight: bold;
}

.report-date {
  font-size: 24px;
  color: #90909e;
}

.report-check-btn {
  width: 120px;
  height: 60px;
  line-height: 60px;
  border: 2px solid #0076fe;
  border-radius: 30px;
  text-align: center;
  color: #0076fe;
}
</style>
