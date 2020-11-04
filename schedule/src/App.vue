<template>
  <article id="app">
    <div
      style="position: fixed;width:100%;height:100%;z-index: 888;background-color: rgba(0,0,0,0.3);"
      v-if="showDetail || showDesc"
      @click="showDetail = showDesc = false"
    ></div>
    <div class="detail-dialog" v-if="showDetail">
      <div
        style="color:#3e8cfc;font-size:36px;font-weight:bold;line-height:1;margin:30px auto 10px auto;width: fit-content;"
      >患者信息</div>
      <template v-if="currentBed.attentionList">
        <div
          style="display:inline-flex;flex-direction:column;align-items:center;margin-right:40px"
          v-for="attention in currentBed.attentionList"
          :key="attention.attentionCode"
        >
          <template v-if="attention.attentionLevel === '1'">
            <img
              src="./assets/new_page_1.png"
              v-if="attention.attentionCode === '防跌倒'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_2.png"
              v-if="attention.attentionCode === '防脱管'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_3.png"
              v-if="attention.attentionCode === '防坠床'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_4.png"
              v-if="attention.attentionCode === '防压疮'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_5.png"
              v-if="attention.attentionCode === '防走失'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
          </template>
          <template v-if="attention.attentionLevel === '2'">
            <img
              src="./assets/new_page_1_1.png"
              v-if="attention.attentionCode === '防跌倒'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_2_1.png"
              v-if="attention.attentionCode === '防脱管'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_3_1.png"
              v-if="attention.attentionCode === '防坠床'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_4_1.png"
              v-if="attention.attentionCode === '防压疮'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_5_1.png"
              v-if="attention.attentionCode === '防走失'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
          </template>
          <template v-if="attention.attentionLevel === '3'">
            <img
              src="./assets/new_page_1_2.png"
              v-if="attention.attentionCode === '防跌倒'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_2_2.png"
              v-if="attention.attentionCode === '防脱管'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_3_2.png"
              v-if="attention.attentionCode === '防坠床'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_4_2.png"
              v-if="attention.attentionCode === '防压疮'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_5_2.png"
              v-if="attention.attentionCode === '防走失'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
          </template>
          <template v-if="attention.attentionLevel === '4'">
            <img
              src="./assets/new_page_1_3.png"
              v-if="attention.attentionCode === '防跌倒'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_2_3.png"
              v-if="attention.attentionCode === '防脱管'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_3_3.png"
              v-if="attention.attentionCode === '防坠床'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_4_3.png"
              v-if="attention.attentionCode === '防压疮'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
            <img
              src="./assets/new_page_5_3.png"
              v-if="attention.attentionCode === '防走失'"
              style="width:52px;height:52px;margin-bottom:10px"
            />
          </template>
          <span style="font-size:18px">{{attention.attentionCode}}</span>
        </div>
      </template>
      <div class="patient-info-row">
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>床</span>
            <span>号</span>
          </div>
          ：{{currentBed.bedName}}
        </div>
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>姓</span>
            <span>名</span>
          </div>
          ：{{currentBed.patientName}}
        </div>
      </div>
      <div class="patient-info-row">
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>年</span>
            <span>龄</span>
          </div>
          ：{{currentBed.age}}
        </div>
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>性</span>
            <span>别</span>
          </div>
          ：{{currentBed.sex === 0 ? '女 ' : '男 '}}
        </div>
      </div>
      <div class="patient-info-row">
        <div
          class="patient-info-col"
          :style="{color:currentBed.nursingLevel === '一级护理' ? 'red' : 'inherit',fontWeight:currentBed.nursingLevel === '一级护理' ? 'bold' : 'normal'}"
        >
          <div class="patient-info-label">
            <span>护</span>
            <span>理</span>
            <span>等</span>
            <span>级</span>
          </div>
          ：{{currentBed.nursingLevel}}
        </div>
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>住</span>
            <span>院</span>
            <span>号</span>
          </div>
          ：{{currentBed.inHospitalId}}
        </div>
      </div>
      <div class="patient-info-row">
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>主</span>
            <span>治</span>
            <span>医</span>
            <span>生</span>
          </div>
          ：{{currentBed.chargeDoctor || currentBed.chargeDoctorCode || '暂无'}}
        </div>
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>医</span>
            <span>疗</span>
            <span>保</span>
            <span>险</span>
          </div>
          ：{{currentBed.healthInsurance || '暂无'}}
        </div>
      </div>
      <div class="patient-info-row">
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>总</span>
            <span>费</span>
            <span>用</span>
          </div>
          ：{{currentBed.totalMoney}}元
        </div>
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>预</span>
            <span>交</span>
            <span>金</span>
          </div>
          ：{{currentBed.depositAmount}}元
        </div>
      </div>
      <div class="patient-info-row">
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>入</span>
            <span>院</span>
            <span>日</span>
            <span>期</span>
          </div>
          ：{{currentBed.inTime}}
        </div>
        <div class="patient-info-col" v-if="currentBed.inTime">
          <div class="patient-info-label">
            <span>入</span>
            <span>院</span>
            <span>天</span>
            <span>数</span>
          </div>
          ：{{moment().diff(currentBed.inTime.split(' ')[0],'day')}}天
        </div>
      </div>
      <div
        class="patient-info-row"
        style="color:red;font-weight:bold"
        v-if="currentBed.allergyInfo"
      >
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>过</span>
            <span>敏</span>
            <span>史</span>
          </div>：
          <div>
            <marquee-text :marquee-text="currentBed.allergyInfo"></marquee-text>
          </div>
        </div>
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>体</span>
            <span>重</span>
          </div>
          ：{{currentBed.weight}}Kg
        </div>
      </div>
      <div class="patient-info-row" v-else>
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>过</span>
            <span>敏</span>
            <span>史</span>
          </div>：暂无
        </div>
        <div class="patient-info-col" style="color:red;font-weight:bold">
          <div class="patient-info-label">
            <span>体</span>
            <span>重</span>
          </div>
          ：{{currentBed.weight}}Kg
        </div>
      </div>
      <div class="patient-info-row">
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>联</span>
            <span>系</span>
            <span>电</span>
            <span>话</span>
          </div>
          ：{{currentBed.telephone || '暂无'}}
        </div>
      </div>
      <div class="patient-info-row">
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>手</span>
            <span>术</span>
          </div>：
          <div>
            <marquee-text
              :marquee-text="currentBed.operationName ? (currentBed.operationTime ? '（术后第' + moment().diff(currentBed.operationTime.split(' ')[0],'day') + '天）' : '') + currentBed.operationName.replace('今日','') : '暂无手术'"
            ></marquee-text>
          </div>
        </div>
      </div>
      <div class="patient-info-row">
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>饮</span>
            <span>食</span>
            <span>护</span>
            <span>理</span>
          </div>：
          <div>
            <marquee-text
              :marquee-text="currentBed.dietNursing ? currentBed.dietNursing.split('^').filter(Boolean).join('，') : '暂无'"
            ></marquee-text>
          </div>
        </div>
      </div>
      <div class="patient-info-row">
        <div class="patient-info-col">
          <div class="patient-info-label">
            <span>诊</span>
            <span>断</span>
            <span>结</span>
            <span>果</span>
          </div>：
          <div>
            <marquee-text :marquee-text="currentBed.diagnosis"></marquee-text>
          </div>
        </div>
      </div>
    </div>
    <div
      class="detail-dialog"
      style="width:300px;height:200px;box-shadow:1px 1px 5px rgba(0, 0, 0, 0.4);display:flex;flex-direction:column;align-items:center;justify-content:space-around"
      v-if="showDesc"
    >
      <p style="align-self:flex-start">设置备注</p>
      <input v-model="currentDesc" style="width:100%;height:40px;padding:12px;border-radius:4px" />
      <button
        style="width:90px;height:30px;outline:none;border:none;border-radius:4px;background-color:#4081fb;color:white;"
        @click="handleSetBedDesc"
      >确 认</button>
    </div>
    <div class="detail-dialog" style="width:500px;height:250px;box-shadow:1px 1px 5px rgba(0, 0, 0, 0.4);display:flex;flex-direction:column;align-items:center;justify-content:space-around" v-if="isSurgery">
      <label>设置</label>
      <div class="surgery-list" v-for="item in surgeryList" :key="item">
        <span style="font-size: 18px">{{item.name}}</span>
        <div>
        <button
            class="surgery-button"
            :style="{'background-color': item.onOff==1 ? 'orangered' : '#b2b2b2'}"
            @click="item.onOff = 1"
        >开启</button>
        <button
            class="surgery-button-one"
            :style="{'background-color': item.onOff==0 ? 'orangered' : '#b2b2b2'}"
            @click="item.onOff = 0"
        >关闭</button>
        </div>
      </div>
      <div>
        <button
            style="width:90px;height:30px;outline:none;border:none;border-radius:4px;background-color:#b2b2b2;color:white;margin-right: 20px"
            @click="isSurgery = false"
        >取消</button>
        <button
            style="width:90px;height:30px;outline:none;border:none;border-radius:4px;background-color:#4081fb;color:white;"
            @click="handleSetSurgery"
        >确 认</button>
      </div>
    </div>
    <header>
      <span>小儿外科</span>
      <span style="position:fixed;left:20px">{{dateTime}}</span>
      <span style="position:fixed;right:20px" @click="getChartData">刷新</span>
    </header>
    <main>
      <div>
        <swiper :options="swiperOption" ref="swiper">
          <swiper-slide v-for="(group,index) in groupedChartList" :key="index">
            <ol class="patient-list clearfix">
              <li
                v-for="bed in group"
                :key="bed.bedName"
                @touchstart.prevent="handleBedTouchStart(bed)"
                @touchend.prevent="handleBedTouchEnd(bed)"
              >
                <div :class="['patient-info',{empty:bed.isInHospital === 0}]">
                  <div class="patient-bed-name">
                    {{bed.bedName}}
                    <div class="attention-list" v-if="bed.patientName && bed.attentionList">
                      <template v-for="attention in bed.attentionList">
                        <template v-if="attention.attentionLevel === '1'">
                          <img
                            src="./assets/new_page_1.png"
                            v-if="attention.attentionCode === '防跌倒'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_2.png"
                            v-if="attention.attentionCode === '防脱管'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_3.png"
                            v-if="attention.attentionCode === '防坠床'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_4.png"
                            v-if="attention.attentionCode === '防压疮'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_5.png"
                            v-if="attention.attentionCode === '防走失'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                        </template>
                        <template v-if="attention.attentionLevel === '2'">
                          <img
                            src="./assets/new_page_1_1.png"
                            v-if="attention.attentionCode === '防跌倒'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_2_1.png"
                            v-if="attention.attentionCode === '防脱管'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_3_1.png"
                            v-if="attention.attentionCode === '防坠床'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_4_1.png"
                            v-if="attention.attentionCode === '防压疮'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_5_1.png"
                            v-if="attention.attentionCode === '防走失'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                        </template>
                        <template v-if="attention.attentionLevel === '3'">
                          <img
                            src="./assets/new_page_1_2.png"
                            v-if="attention.attentionCode === '防跌倒'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_2_2.png"
                            v-if="attention.attentionCode === '防脱管'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_3_2.png"
                            v-if="attention.attentionCode === '防坠床'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_4_2.png"
                            v-if="attention.attentionCode === '防压疮'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_5_2.png"
                            v-if="attention.attentionCode === '防走失'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                        </template>
                        <template v-if="attention.attentionLevel === '4'">
                          <img
                            src="./assets/new_page_1_3.png"
                            v-if="attention.attentionCode === '防跌倒'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_2_3.png"
                            v-if="attention.attentionCode === '防脱管'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_3_3.png"
                            v-if="attention.attentionCode === '防坠床'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_4_3.png"
                            v-if="attention.attentionCode === '防压疮'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                          <img
                            src="./assets/new_page_5_3.png"
                            v-if="attention.attentionCode === '防走失'"
                            style="width:16px;height:16px"
                            :key="attention.attentionCode"
                          />
                        </template>
                      </template>
                    </div>
                  </div>
                  <template v-if="bed.isInHospital === 1">
                    <div style="display:flex">
                      <span
                        style="background-color:#ff0000;height:6px;flex:auto"
                        v-if="bed.hasDanger === '1'"
                      ></span>
                      <span
                        style="background-color:#00ff00;height:6px;flex:auto"
                        v-if="bed.todayInTime === 1"
                      ></span>
                      <span
                        style="background-color:#33ccff;height:6px;flex:auto"
                        v-if="bed.todayOperation === 1"
                      ></span>
                    </div>
                    <div class="patient-label" v-if="bed.patientName">
                      {{bed.patientName + '/' + bed.age}}
                      <div
                        class="rank"
                        v-if="bed.nursingLevel === 1"
                        style="background-color:rgba(254,56,75,0.1);color:#fe384b"
                      >一级护理</div>
                      <div class="rank" v-else-if="bed.nursingLevel === 2">二级护理</div>
                    </div>
                    <ul class="patient-tag-list">
                      <li>
                        <span>{{'性别：' + (bed.sex === 0 ? '女' : '男')}}</span>
                        <span>
                          <span>
                            级别：
                            <span
                              style="color:red;font-weight:bold"
                              v-if="bed.nursingLevel === '一级护理'"
                            >一</span>
                            <span v-if="bed.nursingLevel === '二级护理'">二</span>
                          </span>
                        </span>
                      </li>
                      <li>
                        <span>住院号:</span>
                        <span>{{bed.inHospitalId}}</span>
                      </li>
                      <li>
                        <span>入院时间:</span>
                        <span>{{moment(bed.inTime).format('YYYY/MM/DD')}}</span>
                      </li>
                      <li>
                        <span>余额:</span>
                        <span>{{bed.money}}元</span>
                      </li>
                      <li>
                        <span>主治医生:</span>
                        <span>{{bed.chargeDoctor || currentBed.chargeDoctorCode || '暂无'}}</span>
                      </li>
                      <li style="font-weight:bold;color:red;margin-right:-15px" v-if="bed.allergyInfo">
                        <span>过敏史:</span>
                        <marquee-text :marquee-text="bed.allergyInfo || '暂无'"></marquee-text>
                      </li>
                      <li v-else>
                        <span>过敏史:</span>
                        <span>暂无</span>
                      </li>
                    </ul>
                  </template>
                  <ul class="patient-tag-list" v-if="bed.isInHospital === 0">
                    <li
                      class="patient-label"
                      v-if="bed.inHospitalId"
                      style="align-self: center;"
                    >{{bed.patientName}}</li>
                    <li v-if="bed.inHospitalId">
                      <span>住院号:</span>
                      <span>{{bed.inHospitalId}}</span>
                    </li>
                    <li
                      style="align-self: center;flex:auto;font-size:16px;line-height:1.2;font-weight:bold"
                    >{{bed.bz}}</li>
                  </ul>
                </div>
              </li>
            </ol>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </main>
  </article>
</template>

<script>
import Moment from 'moment'
import { showMessage } from './utils/utils.js'
import 'swiper/css/swiper.css'
import MarqueeTextVue from './components/MarqueeText.vue'
export default {
  data: function () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        effect: 'fade'
      },
      bedList: [], //病床列表
      surgeryList:[], //手术设置列表
      currentBed: {},
      currentDesc: '',
      dateTime: '', //设备时间
      showDetail: false,//详情弹窗
      showDesc: false, //备注弹窗
      isSurgery:false, //是否设置手术弹窗
      inHospitalId:'', //病患ID
      bedCode:'', //病患床位号
      moment: Moment
    }
  },
  computed: {
    groupedChartList () {
      return this.groupByNumber(this.bedList, 50)
    }
  },
  components: {
    'marquee-text': MarqueeTextVue
  },
  mounted () {
    console.log('app mounted')
    const now = new Date();
    this.dateTime = Moment(now).format('YYYY-MM-DD HH:mm');
    const leftMilliSec = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    const dateTimer = setTimeout(() => {
      clearTimeout(dateTimer)
      this.dateTime = Moment().format('YYYY-MM-DD HH:mm');
      setInterval(() => {
        this.dateTime = Moment().format('YYYY-MM-DD HH:mm');
        console.log('time tick')
      }, 60000)
    }, leftMilliSec)
    this.getChartData()
    setInterval(this.getChartData, 600000)
    window.plus.registSocketListener()
  },
  methods: {
    //获取列表数据
    getChartData () {
      this.axios.post('chart/getChartList', {
        deviceCode: window.plus ? window.plus.getMac() : 'ADWK2820191200434'
        // deviceCode:'ADWK2820191200434'
      }).then(res => {
        if (res.data.code === 1) {
          console.log(res.data,'列表数据')
          this.bedList = res.data.data.chartList
        } else {
          showMessage(res.data.msg)
        }
      }).catch(() => {
        showMessage('网络连接异常，请检查网络重试！！')
      })
    },
    //开启手术弹窗,获取手术状态
    showSurgery () {
      console.log("长按")
      this.isSurgery = true
      this.axios.post('chart/showSwitch', {
        deviceCode: window.plus ? window.plus.getMac() : 'ADWK2820191200434',
        inHospitalId:this.inHospitalId,
        // deviceCode:'ADWK2820191200434',
      }).then(res =>{
        this.surgeryList = res.data.data.list
      })
    },
    //确定手术状态提交
    handleSetSurgery(){
      this.axios.post('chart/setSwitch', {
        deviceCode: window.plus ? window.plus.getMac() : 'ADWK2820191200434',
        inHospitalId:this.inHospitalId,
        // deviceCode:'ADWK2820191200434',
        typeList:this.surgeryList,
      }).then(res => {
        if (res.data.code === 1) {
          this.isSurgery = false
          this.axios.post('chart/getChartInfo', {
            deviceCode: window.plus ? window.plus.getMac() : 'ADWK2820191200434',
            // deviceCode:'ADWK2820191200434',
            bedCode:this.bedCode,
          }).then(res => {
            if (res.data.code === 1) {
              var bedList = this.bedList
              for ( let i in bedList) {
                if(bedList[i].inHospitalId == res.data.data.inHospitalId){
                  bedList[i].todayOperation = res.data.data.todayOperation
                }
              }
              this.bedrList = bedList
              //测试
              // this.bedList.forEach((item,index) => {
              //     if(item.inHospitalId == res.data.data.inHospitalId){
              //       this.bedList[index].todayOperation = res.data.data.todayOperation
              //     }
              // });
              showMessage('设置成功！')
            } else {
              showMessage(res.data.msg)
            }
          })
        } else {
          showMessage(res.data.msg)
        }
      }).catch(() => {
        showMessage('当前网络状态异常，请检查网络状态后重试！')
      })
    },
    handleBedTouchStart (bed) {
      this.inHospitalId = bed.inHospitalId
      this.bedCode = bed.bedCode
      this.$startTime = Date.now()
      if (bed.operationOnOff === 1) {
        this.$timeoutTimer = setTimeout(() => {
          // clearTimeout(this.$timeoutTimer)
          this.showSurgery(bed.bedCode)
        }, 2000)
      }
    },
    handleBedTouchEnd (bed) {
      const endTime = Date.now()
      if (bed.operationOnOff === 1) {
        clearTimeout(this.$timeoutTimer)
      }
      if (endTime - this.$startTime < 800) {
        console.log("短按")
        this.handleCheckPatientDetail(bed)
      }
    },
    //暂时未用代码
    handleSetOperation (bed) {
      console.log('set operation')
      this.axios.post('chart/setOperation', {
        inHospitalId: bed.inHospitalId,
        type: bed.operationName ? 0 : 1
      }).then(res => {
        if (res.data.code === 1) {
          showMessage('设置成功！')
        } else {
          showMessage(res.data.msg)
        }
      }).catch(() => {
        showMessage('当前网络状态异常，请检查网络状态后重试！')
      })
    },
    handleCheckPatientDetail (bed) {
      if (bed.isInHospital === 1) {
        this.showDetail = true;
        this.currentBed = bed;
      } else {
        this.showDesc = true
        this.currentBed = bed;
        this.currentDesc = bed.bz;
      }
    },
    handleSetBedDesc () {
      this.axios.post('chart/setBedBz', {
        deviceCode: window.plus ? window.plus.getMac() : 'ADWK2820191200434',
        bedCode: this.currentBed.bedCode,
        bz: this.currentDesc
      }).then(res => {
        if (res.data.code === 1) {
          this.showDesc = false
          showMessage('设置成功！')
          this.axios.post('chart/getChartList', {
            deviceCode: window.plus ? window.plus.getMac() : 'ADWK2820191200434'
          }).then(res => {
            if (res.data.code === 1) {
                     this.bedList = res.data.data.chartList
            } else {
              showMessage(res.data.msg)
            }
          }).catch(() => {
            showMessage('网络连接异常，请检查网络重试！！')
          })
        } else {
          showMessage(res.data.msg)
        }
      }).catch(() => {
        showMessage('网络连接异常，请检查网络重试！！')
      })
    },
    groupByNumber (arr, num) {
      const array = arr || []
      const result = []
      for (var i = 0; i < array.length; i += num) {
        result.push(array.slice(i, i + num))
      }
      return result
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

body {
  width: 1920px;
}

header {
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  background-color: #4081fb;
  color: white;
  font-size: 24px;
  text-align: center;
}

.header-icon {
  width: 110px;
  height: 21px;
  margin: 15px 10px 0 0;
}

main {
  height: 1030px;
  background-color: #d7e5ff;
  padding: 20px;
}

.patient-list {
  list-style: none;
  height: 1000px;
  background-color: #d7e5ff;
}

.patient-list > li {
  user-select: none;
  width: 170px;
  height: 176px;
  background-color: white;
  border-radius: 8px;
  margin-right: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  float: left;
}

.patient-info {
  text-align: center;
  line-height: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.patient-bed-name {
  font-size: 24px;
  color: #333333;
  line-height: 30px;
  text-align: left;
  padding: 0 10px;
  border-bottom: 1px solid #d7d7d7;
  position: relative;
}

.patient-bed-name .attention-list {
  position: absolute;
  top: 0;
  right: 10px;
}

.patient-bed-name .attention-list img + img {
  margin-left: 4px;
}

.patient-info.empty .patient-bed-name {
  background-color: #d7d7d7;
}

.patient-tag-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-size: 12px;
  padding: 0 10px;
  flex: auto;
}

.patient-tag-list > li {
  color: #6b6b6b;
  display: flex;
  line-height: 18px;
  justify-content: space-between;
  align-items: center;
}

.patient-list li:nth-child(10n) {
  margin-right: 0;
}

.patient-info-row {
  font-size: 28px;
  padding: 22px 0 12px 0;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
}

.patient-info-col {
  flex: auto;
  flex-basis: 300px;
  display: flex;
}

.patient-info-label {
  width: 130px;
  flex: none;
  display: inline-flex;
  justify-content: space-between;
}

.patient-info-col div:not(.patient-info-label) {
  flex: auto;
}

.patient-label {
  font-size: 16px;
  color: #333333;
  padding: 4px 0 10px 0;
  font-weight: bold;
  position: relative;
}

.patient-label .rank {
  position: absolute;
  font-size: 6px;
  top: 4px;
  right: 10px;
  border-radius: 4px;
  width: 40px;
  height: 16px;
  line-height: 16px;
  background-color: rgba(62, 140, 252, 0.1);
  color: #3e8cfc;
}

.msg-list {
  height: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.msg-label {
  width: 100px;
  height: 100%;
  line-height: 100px;
  text-align: center;
  color: #4d4d4d;
  font-size: 32px;
  letter-spacing: 1px;
  background-color: #e2e5e9;
  writing-mode: vertical-rl;
  float: left;
}

.msg-content {
  list-style: none;
  margin-left: 100px;
  height: 100%;
  padding: 30px 40px;
}

.msg-content > li {
  width: 360px;
  height: 100%;
  padding: 30px;
  background-color: #ea4a4a;
  border-radius: 10px;
  color: white;
  line-height: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  float: left;
}

.msg-content > li + li {
  margin-left: 30px;
}

.detail-dialog {
  position: absolute;
  width: 1120px;
  height: 930px;
  z-index: 999;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  padding: 0px 50px;
  border-radius: 30px;
  box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.4);
  background-color: white;
  color: #333333;
}
.surgery-button{
  width:60px;
  height:30px;
  outline:none;
  border:none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color:#b2b2b2;
  color:white;
}
.surgery-button-one{
  width:60px;
  height:30px;
  outline:none;
  border:none;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color:#b2b2b2;
  color:white;
  margin-right: 20px
}
.surgery-list{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.room-list {
  list-style: none;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 140px;
}

.room-list > li {
  width: 410px;
  height: 220px;
  line-height: 220px;
  background-color: #e94a4a;
  border-radius: 30px;
  text-align: center;
}

.room-list > li + li {
  margin-left: 60px;
}
</style>
