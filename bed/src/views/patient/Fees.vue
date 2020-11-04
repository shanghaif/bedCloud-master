<template>
  <div id="con">
    <div class="main-div">
      <div class="header-div">
        <div class="header-menu-item selected">费用清单</div>
        <div class="header-menu-item" @click="$router.replace('/payment')">缴费记录</div>
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
     <!-- 选择时间 -->
      <!-- <date-picker
        v-model="searchDate"
        :end="moment($store.state.time.currentTime).add(1,'day').format('YYYY-MM-DD')"
      ></date-picker> -->

      <div class="main-content" v-loading="loadingFee" loading-bgcolor="#f2f8fd">
        <div style="height:760px;position:relative">
          <table>
            <thead>
              <tr style="width: 1640px;">
                <th style="width:260px">类别</th>
                <th style="width:400px">项目名称</th>
                <th style="width:400px">时间</th>
                <th style="width:220px">单价</th>
                <th style="width:120px">数量</th>
                <th style="width:240px">金额</th>
              </tr>
            </thead>
            <tbody style="vertical-align: middle;text-align: center;background-color: white;">
              <tr v-for="record in recordList" :key="record.id">
                <td>{{record.tarCateDesc}}</td>
                <td>{{record.itemDesc}}</td>
                <td>{{record.itemBillDate}}</td>
                <td>{{Number(record.itemPrice).toFixed(2) + '元'}}</td>
                <td>{{record.itemQty + (record.packUOM || '')}}</td>
                <td>{{Number(record.itemTotalAmount).toFixed(2) + '元'}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="statistic-bar">
          <div class="payment_btn" @click="$bus.$emit('pay')">
            <img
              src="../../assets/payment_icon.png"
              style="width:36px;height:36px;margin-bottom: 15px;"
            />
            <span>缴费</span>
          </div>
          <span
            style="font-size:30px;font-weight:bold;color:#FE384B;margin-right:15px"
          >总费用：{{totalFee.toFixed(2)}}元</span>
          <span style="font-size:24px;color:#90909E" v-cloak>总预交金：{{allAmount.toFixed(2)}}元</span>
          <span v-if="false" v-cloak>预交款：5000.00元 结余：3963.00元</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from '../../components/DatePicker.vue'
import moment from 'moment'
import { showMessage } from '../../utils/utils'
export default {
  data () {
    return {
      searchDate: moment(),
      totalFee: 0,
      moment: moment,
      allAmount: 0,
      recordList: [],
      loadingFee: false,
      pageNo:1,
      pageSize:20,
      totalnum:0
    }
  },
//   watch: {
//     searchDate (date) {
//       this.loadingFee = true
//       this.api.post('expense/paymentList', {
//         beginTime: date.format('YYYY-MM-DD'),
//         endTime: date.format('YYYY-MM-DD')
//       }).then(res => {
//         this.loadingFee = false
//         if (res.data.code === 1) {
//           this.totalFee = Number(res.data.data.billTotalAmount)
//           this.allAmount = Number(res.data.data.pBAllAmount)
//           this.recordList = res.data.data.paymentList
//         } else {
//           showMessage(res.data.msg)
//         }
//       }).catch(() => {
//         this.loadingFee = false
//         showMessage('网络状态异常，请检查网络状态后重试！')
//       })
//     }
//   },
  mounted () {
    this.searchDate = moment(this.$store.state.time.currentTime)
    this.loadingFee = true
    this.api.post('expense/allPaymentList', {
    //   beginTime: this.searchDate.format('YYYY-MM-DD'),
    //   endTime: this.searchDate.format('YYYY-MM-DD'),
         pageNum:this.pageNo,
         pageSize:this.pageSize
      }).then(res => {
         this.loadingFee = false
         if (res.data.code === 1) {
         this.totalFee = Number(res.data.data.billTotalAmount)
         this.allAmount = Number(res.data.data.totalPrepayAmount)
         this.recordList = res.data.data.paymentList
         this.pageNo += 1
         this.totalnum = res.data.data.count
       } else {
         showMessage(res.data.msg)
       }
      }).catch(() => {
         this.loadingFee = false
         showMessage('网络状态异常，请检查网络状态后重试！')
       })
       window.addEventListener('scroll',this.handleScroll);
  },
  methods:{
      handleScroll(){
          console.log('进来了')
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var windowHeitht = document.documentElement.clientHeight || document.body.clientHeight;
			var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			//是否滚动到底部的判断
			if(scrollTop + windowHeitht == scrollHeight){
                console.log((this.pageNo+1)*this.pageSize)
                if(this.pageNo*this.pageSize < this.totalnum || this.pageNo*this.pageSize - this.totalnum <=20){
                       this.api.post('expense/allPaymentList', {
                //   beginTime: this.searchDate.format('YYYY-MM-DD'),
                //   endTime: this.searchDate.format('YYYY-MM-DD'),
                  pageNum:this.pageNo,
                  pageSize:this.pageSize
              }).then(res => {
                 this.loadingFee = false
               if (res.data.code === 1) {
                  this.totalFee = Number(res.data.data.billTotalAmount)
                  this.allAmount = Number(res.data.data.totalPrepayAmount)
                  this.recordList = [...this.recordList,...res.data.data.paymentList]
                  this.pageNo += 1
                 } else {
                   showMessage(res.data.msg)
                 }
                     }).catch(() => {
                    this.loadingFee = false
                    showMessage('网络状态异常，请检查网络状态后重试！')
               })
                }
            }
      }
  }
//   components: {
//     'date-picker': DatePicker
//   }
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
  position: relative;
}

.statistic-bar {
  height:230px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 40px;
  margin: 0 -40px;
  position: fixed;
  z-index: 20;
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
  right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 25;
}
</style>
