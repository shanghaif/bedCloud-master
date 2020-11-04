<template>
  <div class="container">
    <div style="margin-bottom:20px;color:white;display:flex;align-items:center">
      <span style="font-size:80px;">{{$store.state.bindRoom}}</span>
      <span
        style="font-size:60px;"
        v-if="bedsList.length > 0"
      >{{`（${bedsList[0].bedName}-${bedsList[bedsList.length - 1].bedName}）`}}</span>
      <span class="exit-btn" @click="$router.replace('/')">
        <img src="../assets/exit_icon.png" style="width:36px;height:36px;margin-right:10px" />
        <span style="font-size:30px;color:white">退出</span>
      </span>
    </div>
    <swiper :options="swiperOption" style="width:100%;padding-bottom:40px">
      <swiper-slide
        style="font-size:0;padding:0 20px;"
        v-for="(group,index) in groupedBedsList"
        :key="index"
      >
        <div
          :class="['bed-items',{selected:bed.bedCode === selectedBedCode,disabled:!bed.inhospitalCode}]"
          v-for="bed in group"
          :key="bed.bedCode"
          @click="handleSelectBedChange(bed)"
        >
          <span style="font-size:36px">{{bed.bedName}}</span>
          <span style="font-size:20px">{{bed.patientName || '暂无'}}</span>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="patient-info">
      <div style="margin-bottom:20px;display:flex;align-items:center">
        <span style="font-size:32px;font-weight:bold;">患者基本信息</span>
        <span
          class="operation-tag"
          style="background-color:rgba(254,56,75,0.1);color:#fe384b;"
          v-if="patientInfomation.operationDate && moment().isSame(patientInfomation.operationDate,'day')"
        >今日手术</span>
        <span
          class="operation-tag"
          style="background-color:rgba(62,140,252,0.1);color:#3e8cfc;"
          v-if="patientInfomation.operationDate && operationDays > 0 && operationDays <= 14"
        >术后第{{operationDays}}天</span>
      </div>
      <div style="margin-bottom:10px;font-size:16px">
        <div
          style="display:inline-block;margin-right:30px;text-align:center"
          v-for="attention in patientInfomation.attentionList"
          :key="attention.attentionCode"
        >
          <template v-if="attention.attentionLevel === '1'">
            <img
              class="mb20"
              src="../assets/new_page_1.png"
              v-if="attention.attentionCode === '防跌倒'"
            />
            <img
              class="mb20"
              src="../assets/new_page_2.png"
              v-if="attention.attentionCode === '防脱管'"
            />
            <img
              class="mb20"
              src="../assets/new_page_3.png"
              v-if="attention.attentionCode === '防坠床'"
            />
            <img
              class="mb20"
              src="../assets/new_page_4.png"
              v-if="attention.attentionCode === '防压疮'"
            />
            <img
              class="mb20"
              src="../assets/new_page_5.png"
              v-if="attention.attentionCode === '防走失'"
            />
          </template>
          <template v-if="attention.attentionLevel === '2'">
            <img
              class="mb20"
              src="../assets/new_page_1_1.png"
              v-if="attention.attentionCode === '防跌倒'"
            />
            <img
              class="mb20"
              src="../assets/new_page_2_1.png"
              v-if="attention.attentionCode === '防脱管'"
            />
            <img
              class="mb20"
              src="../assets/new_page_3_1.png"
              v-if="attention.attentionCode === '防坠床'"
            />
            <img
              class="mb20"
              src="../assets/new_page_4_1.png"
              v-if="attention.attentionCode === '防压疮'"
            />
            <img
              class="mb20"
              src="../assets/new_page_5_1.png"
              v-if="attention.attentionCode === '防走失'"
            />
          </template>
          <template v-if="attention.attentionLevel === '3'">
            <img
              class="mb20"
              src="../assets/new_page_1_2.png"
              v-if="attention.attentionCode === '防跌倒'"
            />
            <img
              class="mb20"
              src="../assets/new_page_2_2.png"
              v-if="attention.attentionCode === '防脱管'"
            />
            <img
              class="mb20"
              src="../assets/new_page_3_2.png"
              v-if="attention.attentionCode === '防坠床'"
            />
            <img
              class="mb20"
              src="../assets/new_page_4_2.png"
              v-if="attention.attentionCode === '防压疮'"
            />
            <img
              class="mb20"
              src="../assets/new_page_5_2.png"
              v-if="attention.attentionCode === '防走失'"
            />
          </template>
          <template v-if="attention.attentionLevel === '4'">
            <img
              class="mb20"
              src="../assets/new_page_1_3.png"
              v-if="attention.attentionCode === '防跌倒'"
            />
            <img
              class="mb20"
              src="../assets/new_page_2_3.png"
              v-if="attention.attentionCode === '防脱管'"
            />
            <img
              class="mb20"
              src="../assets/new_page_3_3.png"
              v-if="attention.attentionCode === '防坠床'"
            />
            <img
              class="mb20"
              src="../assets/new_page_4_3.png"
              v-if="attention.attentionCode === '防压疮'"
            />
            <img
              class="mb20"
              src="../assets/new_page_5_3.png"
              v-if="attention.attentionCode === '防走失'"
            />
          </template>
          <div>{{attention.attentionCode}}</div>
        </div>
      </div>
      <div class="patient-data-row">
        <span style="width:300px">
          <span class="patient-data-head">
            <span>姓</span>
            <span>名</span>
          </span>
          <span>：{{patientInfomation.patientName || '暂无'}}</span>
        </span>
        <span style="width:300px;color:red;font-weight:bold">
          <span class="patient-data-head">
            <span>体</span>
            <span>重</span>
          </span>
          <span>：{{patientInfomation.weight ? patientInfomation.weight + 'Kg' : '暂无'}}</span>
        </span>
      </div>
      <div class="patient-data-row">
        <span style="width:300px">
          <span class="patient-data-head">
            <span>年</span>
            <span>龄</span>
          </span>
          <span>：{{patientInfomation.age || '暂无'}}</span>
        </span>
        <span style="width:300px">
          <span class="patient-data-head">
            <span>性</span>
            <span>别</span>
          </span>
          <span>：{{patientInfomation.sex === 0 ? '女' : (patientInfomation.sex ? '男' : '暂无')}}</span>
        </span>
      </div>
      <div class="patient-data-row">
        <span style="width:300px">
          <span class="patient-data-head">
            <span>住</span>
            <span>院</span>
            <span>医</span>
            <span>生</span>
          </span>
          <span>：{{patientInfomation.chargeDoctor || '暂无'}}</span>
        </span>
        <span style="width:300px">
          <span class="patient-data-head">
            <span>护</span>
            <span>理</span>
            <span>级</span>
            <span>别</span>
          </span>
          <span>：{{patientInfomation.nursingLevel || '暂无'}}</span>
        </span>
      </div>
      <div class="patient-data-row">
        <span style="width:300px">
          <span class="patient-data-head">
            <span>入</span>
            <span>院</span>
            <span>时</span>
            <span>间</span>
          </span>
          <span>：{{patientInfomation.inTime || '暂无'}}</span>
        </span>
        <span style="width:300px">
          <span class="patient-data-head">
            <span>入</span>
            <span>院</span>
            <span>天</span>
            <span>数</span>
          </span>
          <span>：{{patientInfomation.inTime ? moment().diff(patientInfomation.inTime,'days') + '天' : '暂无'}}</span>
        </span>
      </div>
      <div class="patient-data-row">
        <span style="width:300px">
          <span class="patient-data-head">
            <span>总</span>
            <span>费</span>
            <span>用</span>
          </span>
          <span>：{{patientInfomation.totalMoney ? patientInfomation.totalMoney + '元' : '暂无'}}</span>
        </span>
        <span style="width:300px">
          <span class="patient-data-head">
            <span>费</span>
            <span>用</span>
            <span>余</span>
            <span>额</span>
          </span>
          <span>：{{patientInfomation.money ? patientInfomation.money + '元' : '暂无'}}</span>
        </span>
      </div>
      <div class="patient-data-row">
        <span>
          <span class="patient-data-head">
            <span>饮</span>
            <span>食</span>
            <span>护</span>
            <span>理</span>
          </span>
          <span>：{{patientInfomation.dietNursing || '暂无'}}</span>
        </span>
      </div>
      <div class="patient-data-row">
        <span>
          <span class="patient-data-head">
            <span>诊</span>
            <span>断</span>
          </span>
          <span>：{{patientInfomation.diagnosis || '暂无'}}</span>
        </span>
      </div>
      <div class="patient-data-row">
        <span style="color:red;font-weight:bold">
          <span class="patient-data-head">
            <span>过</span>
            <span>敏</span>
            <span>史</span>
          </span>
          <span>：{{patientInfomation.allergyInfo || '暂无'}}</span>
        </span>
      </div>
      <div class="patient-data-row">
        <span style="color:red;font-weight:bold">
          <span class="patient-data-head">
            <span>手</span>
            <span>术</span>
            <span>名</span>
            <span>称</span>
          </span>
          <span>：{{patientInfomation.operationName || '暂无'}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import moment from 'moment'
export default {
  data: function () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
      },
      patientInfomation: {},
      moment: moment,
      selectedBedCode: '1',
      bedsList: []
    }
  },
  computed: {
    groupedBedsList () {
      return this.groupByNumber(this.bedsList, 4)
    },
    operationDays () {
      return moment().diff(this.patientInfomation.operationDate, 'day')
    }
  },
  watch: {
    selectedBedCode (newCode) {
      const bed = this.bedsList.find(bed => bed.bedCode === newCode)
      console.log(newCode, bed)
      if (!bed) return
      if (newCode || bed.deviceCode) {
        this.axios.post('bedside/getInHospitalInfo', {
          deviceCode: bed.deviceCode,
          bedCode: newCode
        }).then(res => {
          if (res.data.code === 1) {
            this.patientInfomation = res.data.data
          }
        })
      } else {
        this.patientInfomation = {}
      }
    }
  },
  mounted () {
    this.axios.post('gate/getBedList', {
      deviceCode: process.env.NODE_ENV !== 'production' ? 'EGP6CUQSEL' : window.plus.getMac()
    }).then(res => {
      if (res.data.code === 1) {
        this.bedsList = res.data.data.bedList
        if (res.data.data.bedList.length > 0) {
          console.log(res.data.data.bedList[0].bedCode)
          this.selectedBedCode = res.data.data.bedList[0].bedCode
        }
      }
    })
  },
  components: {
    swiper: Swiper,
    'swiper-slide': SwiperSlide
  },
  methods: {
    groupByNumber (arr, num) {
      const result = [];
      for (var i = 0; i < arr.length; i += num) {
        result.push(arr.slice(i, i + num));
      }
      return result
    },
    handleSelectBedChange (bed) {
      if (bed.inhospitalCode) {
        this.selectedBedCode = bed.bedCode
      }
    }
  }
}
</script>

<style>
.container {
  background-color: #6395f2;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.exit-btn {
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px;
  padding: 20px;
  border-radius: 10px;
}
.exit-btn:active {
  background-color: rgba(0, 0, 0, 0.4);
}

.bed-items {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px;
  width: 150px;
  height: 150px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 1px 1px 15px #4a85f0;
}

.bed-items.selected {
  background-color: #3684ed;
  color: white;
}
.bed-items.disabled {
  opacity: 0.65;
}
.patient-info {
  flex: auto;
  background-color: white;
  border-radius: 30px;
  font-size: 24px;
  color: #333333;
  padding: 20px 30px;
}
.swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  width: 20px;
  height: 20px;
  margin: 1px 6px !important;
}
.operation-tag {
  display: inline-block;
  width: 96px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  margin-left: 20px;
  border-radius: 10px;
}
.patient-data-row {
  line-height: 30px;
  padding: 20px 0;
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.patient-data-head {
  display: inline-flex;
  justify-content: space-between;
  width: 100px;
}
</style>