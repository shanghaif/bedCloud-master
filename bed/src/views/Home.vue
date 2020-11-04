<template>
  <div id="patient_card">
    <div class="main-div zhyi-main-div">
      <div class="zhyi-head-div mb30">
        <img class="hospital-img mr10" src="../assets/hospital_icon.png" />
        <span class="service-system">
          <div class="name">物联网医护（机器人）服务系统</div>
          <div>Internet Medical Service System(Robot)</div>
        </span>
        <div class="right-div">
          <span class="mr20">{{$store.getters.currentDate}}</span>
          <img src="../assets/setting.png" v-if="false" />
          <span class="mr40" @click.stop="$bus.$emit('open-config')" v-if="false">设置</span>
          <img src="../assets/xiping_icon.png" />
          <span class="mr20">息屏</span>
          <div class="mui-switch mui-switch-mini" @click="$router.replace('/shade')">
            <div class="mui-switch-handle"></div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="box1">
          <div class="left">
            <div class="number">{{$store.state.patientInfo.bedName || $store.state.bindBed}}</div>
            <div class="patient-name mb20">{{formatName($store.state.patientInfo.patientName)}}</div>
            <div class="age">
              <span>{{ $store.state.patientInfo.age || '未知'}}</span>
              <img src="../assets/girl_icon.png" v-if="$store.state.patientInfo.sex === 0" />
              <img src="../assets/boy_icon.png" v-else />
            </div>
          </div>
          <div class="right">
            <div style="height:40px">
              <span
                class="nurse-level mr10"
                v-if="$store.state.patientInfo.nursingLevel === '一级护理'"
                style="color:#FE384B;background-color:rgba(254,56,75,0.1)"
              >{{$store.state.patientInfo.nursingLevel}}</span>
              <span
                class="nurse-level mr10"
                v-if="$store.state.patientInfo.nursingLevel === '二级护理'"
              >{{$store.state.patientInfo.nursingLevel}}</span>
              <span
                class="condition"
                v-if="$store.state.patientInfo.conditionCode"
              >{{$store.state.patientInfo.conditionCode}}</span>
            </div>
            <swiper
              v-if="groupAttention.length > 0"
              :options="swiperOption"
              class="warn-slider mt30"
            >
              <swiper-slide v-for="(group,index) in groupAttention" :key="index">
                <div class="warn-item" v-for="attention in group" :key="attention.attentionCode">
                  <template v-if="attention.attentionLevel === '1'">
                    <img
                      src="../assets/new_page_1.png"
                      v-if="attention.attentionCode === '防跌倒'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_2.png"
                      v-if="attention.attentionCode === '防脱管'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_3.png"
                      v-if="attention.attentionCode === '防坠床'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_4.png"
                      v-if="attention.attentionCode === '防压疮'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_5.png"
                      v-if="attention.attentionCode === '防走失'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                  </template>
                  <template v-if="attention.attentionLevel === '2'">
                    <img
                      src="../assets/new_page_1_1.png"
                      v-if="attention.attentionCode === '防跌倒'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_2_1.png"
                      v-if="attention.attentionCode === '防脱管'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_3_1.png"
                      v-if="attention.attentionCode === '防坠床'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_4_1.png"
                      v-if="attention.attentionCode === '防压疮'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_5_1.png"
                      v-if="attention.attentionCode === '防走失'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                  </template>
                  <template v-if="attention.attentionLevel === '3'">
                    <img
                      src="../assets/new_page_1_2.png"
                      v-if="attention.attentionCode === '防跌倒'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_2_2.png"
                      v-if="attention.attentionCode === '防脱管'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_3_2.png"
                      v-if="attention.attentionCode === '防坠床'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_4_2.png"
                      v-if="attention.attentionCode === '防压疮'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_5_2.png"
                      v-if="attention.attentionCode === '防走失'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                  </template>
                  <template v-if="attention.attentionLevel === '4'">
                    <img
                      src="../assets/new_page_1_3.png"
                      v-if="attention.attentionCode === '防跌倒'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_2_3.png"
                      v-if="attention.attentionCode === '防脱管'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_3_3.png"
                      v-if="attention.attentionCode === '防坠床'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_4_3.png"
                      v-if="attention.attentionCode === '防压疮'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../assets/new_page_5_3.png"
                      v-if="attention.attentionCode === '防走失'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                  </template>
                  <div style="line-height:1.25">{{attention.attentionCode}}</div>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div
              v-else
              class="warn-slider mt30"
              style="background-color:rgba(228,228,228,0.3);border-radius:12px;color:#999999;font-size:18px;text-align:center;line-height:170px"
            >暂无注意事项</div>

            <div class="cell-item">
              <span class="text1">入院时间：</span>
              <span class="text2">{{$store.state.patientInfo.inTime || '暂无'}}</span>
            </div>
            <div class="cell-item">
              <span class="text1">责任护士：</span>
              <span>{{$store.state.patientInfo.chargeNurse || '暂无'}}</span>
            </div>
            <div class="cell-item">
              <span class="text1">责任医师：</span>
              <span class="text2">{{$store.state.patientInfo.chargeDoctor || '暂无'}}</span>
            </div>
            <div class="cell-item">
              <span class="text1">
                <span style="margin-right:2em">过</span>
                <span>敏：</span>
              </span>
              <span
                class="text2 red"
                v-if="$store.state.patientInfo.allergyInfo"
              >{{$store.state.patientInfo.allergyInfo}}</span>
              <span class="text2" v-else>暂无</span>
            </div>
            <div class="cell-item">
              <span class="text1">饮食护理：</span>
              <span
                class="text2"
              >{{$store.state.patientInfo.dietNursing ? $store.state.patientInfo.dietNursing.split('^').filter(Boolean).join(',') : '暂无'}}</span>
            </div>
          </div>
        </div>
        <div class="box2">
          <div class="title">
            <img src="../assets/title_icon.png" />日常任务
          </div>
          <div
            class="news-item"
            v-for="(type,key) in $store.state.message.list"
            :key="key"
            @click="handlePickMessage(key)"
          >
            <div class="img-div mr30">
              <img class="mr20" src="../assets/news_icon1.png" v-if="key === '1'" />
              <img class="mr20" src="../assets/news_icon2.png" v-if="key === '2'" />
              <img class="mr20" src="../assets/news_icon3.png" v-if="key === '3'" />
              <img class="mr20" src="../assets/news_icon4.png" v-if="key === '4'" />
              <img class="mr20" src="../assets/news_icon5.png" v-if="key === '5'" />
              <img class="mr20" src="../assets/news_icon6.png" v-if="key === '6'" />
              <span class="news-number" v-if="type.unread > 0"></span>
            </div>
            <span>{{type.name}}</span>
            <span class="time">{{moment(type.time).format('MM-DD HH:mm')}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import moment from 'moment'
import { groupByNumber } from '../utils/utils.js'
export default {
  data: function () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true
      },
      moment: moment
    }
  },
  computed: {
    groupAttention () {
      return groupByNumber(this.$store.state.patientInfo.attentionList, 5)
    }
  },
  components: {
    swiper: Swiper,
    'swiper-slide': SwiperSlide
  },
  methods: {
    handlePickMessage (type) {
      this.$store.dispatch('switchType', Number(type))
      this.$router.push('/message')
    },
    formatName (name) {
      if (name) {
        if (name.length > 3) {
          return '*' + name.split('').slice(-2).join('')
        } else {
          const nameArr = name.split('')
          nameArr.splice(1, 1, '*')
          return nameArr.join('')
        }
      } else {
        return '暂无'
      }
    }
  }
}
</script>
<style scoped>
.zhyi-head-div .hospital-img {
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
  margin-top: 13px;
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
  padding: 0 60px;
}

.box1 {
  width: 1115px;
  height: 805px;
  background-color: #ffffff;
  border-radius: 30px;
  display: flex;
  overflow: hidden;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
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

.warn-slider .warn-item:last-child {
  margin-right: 0;
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
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
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
.box2 .news-item:active {
  background-color: #e0ebfc;
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
  right: -5px;
  top: -2px;
  display: inline-block;
  width: 20px;
  height: 20px;
  color: #ffffff;
  text-align: center;
  border-radius: 50%;
  background-color: #fe384b;
  font-size: 24px;
}
.box2 .news-item .time {
  position: absolute;
  right: 20px;
  top: 56px;
  font-size: 24px;
  color: #90909e;
}
</style>
