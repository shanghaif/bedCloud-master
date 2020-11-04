<template>
  <div class="interest-screen" @mousedown="$router.replace('/')">
    <div class="patient_info">
      <img class="mr10" src="../assets/patient_info.png" />患者信息卡
    </div>
    <div class="today-time">
      <span class="big-number mr30">{{hour}}</span>
      <span class="date">
        <div>{{week}}</div>
        <div>{{month}}</div>
      </span>
    </div>
    <div class="suspension-ball" id="touch" v-if="infusion_card.order_admin_id > 0">
      <div class="p1">{{infusion_card.order_text}}</div>
      <div class="p2">输液卡一：{{infusion_card.status_text}}</div>
    </div>
    <div class="notice-div">
      <div
        class="notice-item mb20"
        v-for="key in Object.keys($store.state.message.list).filter(key => Number($store.state.message.list[key].unread) > 0)"
        :key="key"
        @tap="open_message(key)"
      >
        <div class="item-body">
          <img class="mr20" src="../assets/news_icon1.png" v-if="key === '1'" />
          <img class="mr20" src="../assets/news_icon2.png" v-if="key === '2'" />
          <img class="mr20" src="../assets/news_icon3.png" v-if="key === '3'" />
          <img class="mr20" src="../assets/news_icon4.png" v-if="key === '4'" />
          <img class="mr20" src="../assets/news_icon5.png" v-if="key === '5'" />
          <img class="mr20" src="../assets/news_icon6.png" v-if="key === '6'" />
          <span class="text">{{$store.state.message.list[key].name}}</span>
          <span class="time">{{$store.state.message.list[key].time}}</span>
        </div>
        <div class="more">
          共{{$store.state.message.list[key].unread}}条通知
          <img src="../assets/more.png" />
        </div>
      </div>
    </div>
    <div v-if="false" class="notice-div no-message">
      <div class="notice-item mb20">暂无信息</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data: function () {
    return {
      infusion_card: {
        /* order_admin_id: 1,
        order_text: '复方氨基酸(18AA-V',
        status_text: '输液中 */
      }, // 输液卡数据
      bindBed: 0
    }
  },
  computed: {
    hour: function () { return moment(this.$store.state.time.currentTime).format('HH:mm') },
    week: function () { return moment(this.$store.state.time.currentTime).format('dddd') },
    month: function () { return moment(this.$store.state.time.currentTime).format('MM月DD日') }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
}

.zhyi-head-div .hospital-img {
  width: 100px;
  height: 100px;
}

.zhyi-head-div .hospital {
  color: #393939;
  font-size: 22px;
  line-height: 1.6;
  margin-right: 25px;
}

.zhyi-head-div .hospital-name {
  font-size: 38px;
  font-weight: bold;
}

.zhyi-head-div .service-system {
  color: #90909e;
  font-size: 20px;
  line-height: 1.6;
}

.zhyi-head-div .service-system .name {
  font-size: 26px;
}

.zhyi-head-div .mui-switch-mini {
  width: 120px;
  height: 60px;
  border-radius: 30px;
  background-color: #e4e4e4;
  border: none;
}

.zhyi-head-div .mui-switch .mui-switch-handle {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}

.zhyi-head-div .mui-switch-mini.mui-active .mui-switch-handle {
  background-color: #3e8cfc;
}

.zhyi-head-div .mui-switch.mui-active {
  border: none;
  background-color: #e2edfc;
}

.content {
  display: flex;
  justify-content: space-between;
}

.box1 {
  width: 1115px;
  height: 805px;
  background-color: #ffffff;
  border-radius: 30px;
  display: flex;
  overflow: hidden;
}

.box1 .left {
  width: 420px;
  background-color: #7a8df6;
  padding-top: 120px;
  text-align: center;
  line-height: 1;
}

.box1 .number {
  width: 240px;
  height: 240px;
  background-color: #cee1fb;
  line-height: 240px;
  font-size: 72px;
  font-weight: bold;
  color: #5897f0;
  border-radius: 50%;
  margin: 0 auto 60px;
}

.box1 .left .patient-name {
  font-size: 42px;
  font-weight: bold;
  color: #ffffff;
}

.box1 .left .age {
  font-size: 36px;
  color: #ffffff;
}

.box1 .left .age img {
  margin-left: 10px;
  width: 30px;
  height: 30px;
}

.box1 .right {
  padding: 40px;
  width: 695px;
}

.box1 .nurse-level {
  font-size: 24px;
  font-weight: bold;
  color: #3e8cfc;
  width: 120px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  text-align: center;
  background-color: #ecf4ff;
  border-radius: 10px;
}

.box1 .condition {
  font-size: 24px;
  font-weight: bold;
  color: #fe684b;
  border-radius: 10px;
  text-align: center;
  display: inline-block;
  width: 90px;
  height: 40px;
  line-height: 40px;
  background-color: #ffebed;
}

.warn-slider .warn-item {
  margin-right: 24px;
}

.box1 .cell-item {
  line-height: 75px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 30px;
  color: #4e4e4e;
  text-align: justify;
}

.box1 .cell-item .text1 {
  display: inline-block;
  vertical-align: top;
}

.box1 .cell-item .text2 {
  width: 330px;
  display: inline-block;
}

.content .box2 {
  width: 645px;
  height: 805px;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 0 30px;
}

.box2 .title {
  height: 100px;
  display: flex;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  color: #4e4e4e;
}

.box2 .title img {
  width: 48px;
  height: 48px;
  margin-right: 20px;
}

.box2 .news-item {
  height: 140px;
  font-size: 36px;
  color: #393939;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  position: relative;
}

.box2 .news-item:last-child {
  border-bottom: none;
}

.box2 .news-item .img-div {
  width: 90px;
  height: 90px;
  position: relative;
}

.box2 .news-item .news-number {
  position: absolute;
  right: -20px;
  top: -20px;
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  text-align: center;
  border-radius: 50%;
  background-color: #fe384b;
  font-size: 24px;
}

.box2 .news-item .time {
  position: absolute;
  right: 20px;
  font-size: 24px;
  color: #90909e;
}

/* 鎭睆椤甸潰 */
.interest-screen {
  width: 1920px;
  height: 1080px;
  background-color: #1f2530;
  position: relative;
  overflow: hidden;
}

.interest-screen .patient_info {
  position: absolute;
  left: 20px;
  top: 10px;
  font-size: 30px;
  padding: 10px 20px;
  font-weight: bold;
  color: #90909e;
  display: flex;
  align-items: center;
  line-height: 1;
}

.interest-screen .patient_info:active {
  background-color: #e7e7e7;
}

.interest-screen .today-time {
  position: absolute;
  left: 210px;
  top: 490px;
  color: #ffffff;
  display: flex;
  align-items: center;
}

.interest-screen .today-time .big-number {
  font-size: 99px;
  line-height: 1;
}

.interest-screen .today-time .date {
  font-size: 36px;
  line-height: 1.3;
}

.suspension-ball {
  position: absolute;
  width: 440px;
  height: 152px;
  left: 40px;
  bottom: 65px;
  color: #ffffff;
  background-image: url("../assets/xuanfuqiu.png");
  background-size: 440px 152px;
  padding: 40px 0 0 130px;
}

.suspension-ball .p1 {
  font-size: 30px;
  line-height: 40px;
  margin-bottom: 10px;
}

.suspension-ball .p2 {
  font-size: 24px;
}

.interest-screen .notice-div {
  position: absolute;
  right: 170px;
  top: 10px;
}

.notice-div .notice-item {
  width: 780px;
  height: 160px;
  border-radius: 30px;
  padding: 30px 40px 0;
  background-color: #cdcfd4;
}

.notice-div .notice-item .item-body {
  position: relative;
  display: flex;
  align-items: flex-start;
}
.notice-div .notice-item .item-body img {
  width: 60px;
  height: 60px;
}

.notice-div .notice-item .text {
  font-size: 36px;
  color: #393939;
  line-height: 1;
}

.notice-div .notice-item .more {
  font-size: 24px;
  color: #90909e;
  display: flex;
  align-items: center;
  margin-left: 80px;
  margin-top: 5px;
  line-height: 1;
}

.notice-div .notice-item .time {
  position: absolute;
  right: 0;
  font-size: 24px;
  color: #90909e;
}
</style>
