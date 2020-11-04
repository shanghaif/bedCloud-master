<template>
  <div id="con">
    <div class="main-div">
      <div class="header-div">
        <div class="header-menu-item" @click="$router.replace('/fee')">费用清单</div>
        <div class="header-menu-item selected">缴费记录</div>
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
        <div class="left-item" @click="$router.replace('/reports')">
          <img src="../../assets/nav_report.png" /> 报告
        </div>
        <div class="left-item selected">
          <img src="../../assets/nav_pay.png" /> 缴费
        </div>
        <div class="left-item" @click="$router.replace('/intake')">
          <img src="../../assets/nav_num.png" /> 出入量
        </div>
        <div class="left-item">
          <img src="../../assets/nav_evaluate.png" /> 评价
        </div>
      </div>
      <div class="main-content" v-loading="loadingPayment" loading-bgColor="#f2f8fd">
        <table style="width: 1640px">
          <thead>
            <tr style="width: 1640px;">
              <th style="width:300px">付款方式</th>
              <th style="width:600px">单据号</th>
              <th style="width:370px">交易时间</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody style="vertical-align: middle;text-align: center;background-color: white;">
            <tr v-for="record in recordList" :key="record.payNo">
              <td>{{record.payMode}}</td>
              <td>{{record.payNo}}</td>
              <td>{{record.payDate}}</td>
              <td>{{Number(record.payAmout).toFixed(2) + '元'}}</td>
            </tr>
          </tbody>
        </table>
        <div class="statistic-bar">
          <img src="../../assets/up_icon.png" style="width:36px;height:36px;margin-right: 15px;" />
          <span style="line-height:36px">上滑加载</span>
          <div class="payment_btn" @click="$bus.$emit('pay')">
            <img
              src="../../assets/payment_icon.png"
              style="width:36px;height:36px;margin-bottom: 15px;"
            />
            <span>缴费</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { showMessage } from '../../utils/utils'
export default {
  data () {
    return {
      searchDate: moment(),
      recordList: [],
      loadingPayment: false
    }
  },
  mounted () {
    this.searchDate = moment(this.$store.state.time.currentTime)
    this.loadingPayment = true
    this.api.post('expense/advancePayment').then(res => {
      this.loadingPayment = false
      if (res.data.code === 1) {
        this.recordList = res.data.data.recordList
      } else {
        showMessage(res.data.msg)
      }
    }).catch(() => {
      this.loadingPayment = false
      showMessage('网络状态异常，请检查网络状态后重试！')
    })
  }
}
</script>

<style scoped>
tr {
  border: 1px solid #e2e2e2;
}

th,
td {
  font-weight: normal;
  padding: 10px;
  text-align: left;
}

th:first-child,
td:first-child {
  padding-left: 40px;
  text-align: left;
}

th:last-child,
td:last-child {
  padding-right: 50px;
  text-align: right;
}

table {
  width: 100%;
  font-size: 30px;
  line-height: 59px;
  border-radius: 10px;
  margin-top: 20px;
  color: #868686;
}

thead {
  color: #393939;
  background-color: #fcfcfc;
}

tbody {
  font-size: 28px;
}

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
  padding-right: 40px;
  background-color: transparent;
  height: 970px;
  position: relative;
}

.statistic-bar {
  width: 1720px;
  height: 90px;
  display: flex;
  justify-content: center;
  font-size: 24px;
  color: #90909e;
  align-items: center;
  background-image: linear-gradient(to top, white, rgba(255, 255, 255, 0));
  padding: 0 40px;
  position: fixed;
  bottom: 0;
  left: 200px;
  z-index: 10;
}

.payment_btn {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  font-size: 30px;
  background-color: #3e8cfc;
  color: white;
  position: absolute;
  top: -60px;
  right: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
</style>
