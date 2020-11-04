<template>
  <div id="home" v-cloak>
    <div class="main-div zhyi-main-div">
      <div class="zhyi-head-div mb30">
        <img class="img-div" src="../../assets/nurse_head.png" />
        <span>HI！{{userInfo.name}}</span>
        <header-right style="right:50px">
          <span class="mr40" slot="custom">{{$store.getters.currentDate}}</span>
        </header-right>
      </div>
      <div
        class="suspension-ball"
        id="touch"
        @click="go_infusion_list"
        v-if="infusion_card.order_admin_id > 0"
      >
        <div class="p1">{{infusion_card.order_text}}</div>
        <div class="p2">输液卡一：{{infusion_card.status_text}}</div>
      </div>
      <div class="box-content">
        <div class="left-box mr40" style="margin-left:60px">
          <div class="box1 mb20">
            <div class="patient-info">
              <span class="bed-number">{{$store.state.patientInfo.bedName || $store.state.bindBed}}</span>
              <span class="name">{{$store.state.patientInfo.patientName}}</span>
            </div>
            <div class="mt40">
              <span class="age mr10">{{ $store.state.patientInfo.age || '未知'}}</span>
              <img
                class="age-img mr10"
                src="../../assets/girl.png"
                v-if="$store.state.patientInfo.sex === 0"
              />
              <img class="age-img mr10" src="../../assets/boy.png" v-else />
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
                      src="../../assets/new_page_1.png"
                      v-if="attention.attentionCode === '防跌倒'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_2.png"
                      v-if="attention.attentionCode === '防脱管'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_3.png"
                      v-if="attention.attentionCode === '防坠床'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_4.png"
                      v-if="attention.attentionCode === '防压疮'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_5.png"
                      v-if="attention.attentionCode === '防走失'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                  </template>
                  <template v-if="attention.attentionLevel === '2'">
                    <img
                      src="../../assets/new_page_1_1.png"
                      v-if="attention.attentionCode === '防跌倒'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_2_1.png"
                      v-if="attention.attentionCode === '防脱管'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_3_1.png"
                      v-if="attention.attentionCode === '防坠床'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_4_1.png"
                      v-if="attention.attentionCode === '防压疮'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_5_1.png"
                      v-if="attention.attentionCode === '防走失'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                  </template>
                  <template v-if="attention.attentionLevel === '3'">
                    <img
                      src="../../assets/new_page_1_2.png"
                      v-if="attention.attentionCode === '防跌倒'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_2_2.png"
                      v-if="attention.attentionCode === '防脱管'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_3_2.png"
                      v-if="attention.attentionCode === '防坠床'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_4_2.png"
                      v-if="attention.attentionCode === '防压疮'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_5_2.png"
                      v-if="attention.attentionCode === '防走失'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                  </template>
                  <template v-if="attention.attentionLevel === '4'">
                    <img
                      src="../../assets/new_page_1_3.png"
                      v-if="attention.attentionCode === '防跌倒'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_2_3.png"
                      v-if="attention.attentionCode === '防脱管'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_3_3.png"
                      v-if="attention.attentionCode === '防坠床'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_4_3.png"
                      v-if="attention.attentionCode === '防压疮'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                    <img
                      src="../../assets/new_page_5_3.png"
                      v-if="attention.attentionCode === '防走失'"
                      style="width:80px;height:80px;margin-bottom:18px"
                    />
                  </template>
                  <div style="line-height:1.25">{{attention.attentionCode}}</div>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="box2" @click="$router.push('/intake')">
            <div class="div-box">
              <span>
                <div>近24小时</div>
                <div>总入量ml</div>
              </span>
              <span class="number">{{$store.state.userInputAmount}}</span>
            </div>
            <div class="div-box">
              <span>
                <div>近24小时</div>
                <div>总出量ml</div>
              </span>
              <span class="number">{{$store.state.userOutputAmount}}</span>
            </div>
          </div>
        </div>
        <div class="right-box">
          <div class="top-title">医嘱执行</div>
          <div class="zhyi-box-four">
            <div class="box-item">
              <div class="number">10</div>
              <div>输液任务</div>
            </div>
            <div class="box-item">
              <div class="number">5</div>
              <div>注射任务</div>
            </div>
            <div class="box-item">
              <div class="number">2</div>
              <div>口服任务</div>
            </div>
            <div class="box-item">
              <div class="number">6</div>
              <div>护理任务</div>
            </div>
            <div class="box-item">
              <div class="number">2</div>
              <div>采样任务</div>
            </div>
          </div>

          <div class="flex-box mt20">
            <div class="box3">
              <div class="p1 data mb50">
                <span>
                  <div class="number mb10">18</div>
                  <div>呼吸bpm</div>
                </span>
                <span>
                  <div class="number mb10">120/80</div>
                  <div>无创血压mmHg</div>
                </span>
                <span>
                  <div class="number mb10">37.5</div>
                  <div>体温℃</div>
                </span>
                <button class="zhyl-button" @click="$router.push('/sign')">体征录入</button>
              </div>
              <div class="p2 data">
                <span>
                  <div class="number mb10">85</div>
                  <div>脉率bpm</div>
                </span>
                <span>
                  <div class="number mb10">98</div>
                  <div>血氧%</div>
                </span>
                <span>
                  <div class="number mb10">83</div>
                  <div>心率bpm</div>
                </span>
                <button class="zhyl-button">三测单</button>
              </div>
            </div>

            <div class="box4">
              <div :class="['img-div',{disabled:checkDisabled}]" @click="handleCheckDialog">
                <div
                  :class="{ green: leftMinites > 20, orange: leftMinites <= 20, red: leftMinites <= 10 }"
                  style="font-size:18px;font-weight:bold"
                >距离下次打卡</div>
                <div
                  :class="{ green: leftMinites > 20, orange: leftMinites <= 20, red: leftMinites <= 10 }"
                  style="font-size:18px;font-weight:bold;margin-bottom:10px"
                >{{leftMinites}}分钟</div>
                <div>巡查打卡</div>
              </div>
              <div class="img-div">
                <img src="../../assets/nurse_sheet.png" />
                <div>评估单</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="check-dialog" v-show="checkDialog">
      <img
        src="../../assets/close_dlg.png"
        style="position:absolute;top:20px;right:20px"
        @click="handleCloseCheckDialog"
      />
      <div
        :class="[{ green: leftMinites > 20, orange: leftMinites <= 20, red: leftMinites <= 10 },'check-content']"
      >
        <span style="font-size:20px;font-weight:bold;color:#4e4e4e;margin-bottom:20px">请刷卡</span>
        <span style="font-size:40px">距离下次巡查</span>
        <span style="font-size:72px;margin:50px 0">{{leftMinites}}</span>
        <span style="font-size:40px;margin-bottom:10px">分钟</span>
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
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import HeaderRight from '../../components/HeaderRight.vue'
import { groupByNumber } from '../../utils/utils'
export default {
  data: function () {
    return {
      checkDisabled: false,
      checkDialog: false,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true
      },
      infusion_card: {}
    }
  },
  computed: {
    groupAttention () {
      return groupByNumber(this.$store.state.patientInfo.attentionList, 5)
    },
    leftMinites () {
      return this.$store.state.checkMinLeft
    },
    userInfo () {
      return this.$store.state.currentUser || {}
    }
  },
  mounted () {
    this.$bus.$on('close-check', this.handleCloseCheckDialog)
  },
  components: {
    swiper: Swiper,
    'swiper-slide': SwiperSlide,
    HeaderRight
  },
  methods: {
    handleCheckDialog () {
      if (!this.checkDisabled) {
        this.checkDialog = true
        this.$bus.$emit('start-check')
      }
    },
    handleCloseCheckDialog () {
      this.checkDialog = false
      this.$bus.$emit('stop-check')
    }
  }
}
</script>

<style scoped>
.suspension-ball {
  position: absolute;
  width: 440px;
  height: 152px;
  left: 500px;
  top: 76px;
  color: #ffffff;
  background-image: url("../../assets/xuanfuqiu.png");
  background-size: 440px 152px;
  padding: 50px 0 0 150px;
  margin-left: -220px;
  margin-top: -76px;
  z-index: 999;
}

.suspension-ball .p1 {
  font-size: 30px;
  line-height: 40px;
}

.suspension-ball .p2 {
  font-size: 24px;
}

.box-content {
  display: flex;
}

.box1 {
  width: 650px;
  border-radius: 30px;
  background-color: #ffffff;
  height: 400px;
  padding: 20px 40px 0;
  box-shadow: 1px 1px 15px rgba(150, 183, 233, 0.3);
}

.box1 .patient-info .bed-number {
  font-size: 72px;
  line-height: 1;
  color: #0076fe;
  margin-right: 18px;
}

.box1 .patient-info .name {
  font-size: 42px;
  line-height: 1;
  font-weight: bold;
  color: #393939;
}

.box1 .age {
  font-size: 30px;
  color: #393939;
}

.box1 .age-img {
  width: 30px;
  height: 30px;
  vertical-align: sub;
}

.nurse-level {
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

.box2 {
  width: 650px;
  height: 190px;
  background-color: #ffffff;
  border-radius: 30px;
  background-image: url("../../assets/more_icon.png");
  background-size: 120px;
  background-position: right bottom;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 15px rgba(150, 183, 233, 0.3);
}

.box2 .div-box {
  height: 80px;
  line-height: 34px;
  flex: 1;
  font-size: 24px;
  color: #4e4e4e;
  padding-left: 50px;
  display: flex;
  align-items: center;
  border-right: 1px solid #f2f2f2;
}

.box2 .div-box:last-child {
  border-right: none;
}

.box2 .div-box .number {
  font-size: 42px;
  font-weight: bold;
  color: #393939;
  margin-left: 35px;
}

.right-box {
  width: 1110px;
}

.right-box .top-title {
  font-size: 36px;
  line-height: 1;
  color: #4e4e4e;
  height: 78px;
}

.zhyi-box-four .box-item {
  width: 200px;
}

.zhyi-box-four .box-item .number {
  font-size: 54px;
  padding: 45px 0 30px;
  line-height: 1;
}

.zhyi-box-four .box-item:last-child {
  background-color: #5897f0;
}

.flex-box {
  display: flex;
  justify-content: space-between;
}

.box3 {
  height: 312px;
  width: 880px;
  background-color: #ffffff;
  border-radius: 30px;
  padding-top: 30px;
  box-shadow: 1px 1px 15px rgba(150, 183, 233, 0.3);
}

.box3 .data {
  height: 100px;
  padding-right: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box3 .data span {
  font-size: 24px;
  color: #4e4e4e;
  line-height: 1;
  text-align: center;
  flex: 1;
}

.box3 .data .number {
  font-size: 42px;
  font-weight: bold;
  color: #393939;
}

.box3 .data button {
  width: 220px;
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  color: #ffffff;
  border-radius: 30px;
  padding-left: 80px;
}

.box3 .p1 button {
  background-color: #73d6ad;
  background-image: url("../../assets/sancedan_cion.png");
  background-size: 48px;
  background-position: left 30px center;
  background-repeat: no-repeat;
}

.box3 .p2 button {
  background-color: #7d88e4;
  background-image: url("../../assets/tizhengluru_icon.png");
  background-size: 48px;
  background-position: left 30px center;
  background-repeat: no-repeat;
}

.box4 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.box4 .img-div {
  width: 206px;
  height: 148px;
  border-radius: 30px;
  background-color: #ffffff;
  font-size: 30px;
  color: #393939;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 1px 1px 15px rgba(150, 183, 233, 0.3);
}

.box4 .img-div.disabled {
  opacity: 0.4;
}

.box4 .no_xiaodu {
  height: 312px;
}

.box4 .img-div img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.green {
  color: #2cd04d !important;
  border-color: #2cd04d !important;
}

.orange {
  color: #ffa233 !important;
  border-color: #ffa233 !important;
}

.red {
  color: #ff4337 !important;
  border-color: #ff4337 !important;
}

.check-dialog {
  width: 1000px;
  height: 800px;
  position: absolute;
  border-radius: 30px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  background-color: white;
  border: 2px solid #d0d0d0;
  padding: 75px 175px;
}

.check-content {
  width: 650px;
  height: 650px;
  border: 2px solid red;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
