<template>
  <div reportId="con">
    <div class="main-div">
      <div class="header-div">
        <div
          :class="['header-menu-item',{selected:currentTab === '00'}]"
          @click="currentTab = '00'"
        >检查报告</div>
        <div
          :class="['header-menu-item',{selected:currentTab === '02'}]"
          @click="currentTab = '02'"
        >检验报告</div>
        <span class="setting" v-if="false">设置</span>
        <span class="login-out" @click="$router.go(-1)">退出</span>
      </div>
      <div class="nav-left">
        <div class="left-item" @click="$router.replace('/')">
          <img src="../../assets/nav_index.png" /> 首页
        </div>
        <div class="left-item" @click="$router.replace('/message')">
          <img src="../../assets/nav_news.png" /> 消息
        </div>
        <div class="left-item selected">
          <img src="../../assets/nav_report.png" /> 报告
        </div>
        <div class="left-item" @click="$router.replace('/fee')">
          <img src="../../assets/nav_pay.png" /> 缴费
        </div>
        <div class="left-item" @click="$router.replace('/intake')">
          <img src="../../assets/nav_num.png" /> 出入量
        </div>
        <div class="left-item">
          <img src="../../assets/nav_evaluate.png" /> 评价
        </div>
      </div>

      <div class="main-content">
        <div class="report-list" v-loading="reportLoading" loading-bgColor="#f2f8fd">
          <div class="report-list-item" v-for="(report,index) in reportList" :key="index">
            <p class="report-title">{{report.title}}</p>
            <p class="report-date">{{report.date}}</p>
            <div
              class="report-check-btn"
              @click="$router.push(currentTab === '02' ? `/checkDetail?reportId=${report.reportId}` : `/reportDetail?reportId=${report.reportId}`)"
            >查看 ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showMessage } from '../../utils/utils'
export default {
  data: function () {
    return {
      currentTab: '',
      reportLoading: false,
      reportList: []
    }
  },
  watch: {
    currentTab (tab) {
      this.reportLoading = true
      this.reportList = []
      this.api.post('report/getList', {
        type: tab
      }).then(res => {
        this.reportLoading = false
        if (res.data.code === 1) {
          this.reportList = res.data.data.reportList
        } else {
          showMessage(res.data.msg)
        }
      }).catch(() => {
        this.reportLoading = false
        showMessage('网络状态异常，请检查网络状态后重试！')
      })
    }
  },
  mounted () {
    this.currentTab = '00'
  },
  methods: {

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
  height: 950px;
  margin: -15px -20px;
  position: relative;
}

.report-list-item {
  width: 380px;
  height: 290px;
  margin: 15px 20px;
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
