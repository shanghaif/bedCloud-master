<template>
  <div class="main-div" id="intake_output" v-cloak>
    <div class="header-div">
      <span class="title">出入量查询</span>
      <span class="right-div">
        <img src="../../assets/sign_out.png" />
        <span @click="$router.go(-1)">退出</span>
      </span>
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
      <div class="left-item" @click="$router.replace('/fee')">
        <img src="../../assets/nav_pay.png" /> 缴费
      </div>
      <div class="left-item selected">
        <img src="../../assets/nav_num.png" /> 出入量
      </div>
      <div class="left-item">
        <img src="../../assets/nav_evaluate.png" /> 评价
      </div>
    </div>
    <div class="content">
      <div class="header-box">
        <span class="mr20" :class="isDetail?'active':''" @click="choicePage(true)">
          <img class="mr10" src="../../assets/detail_icon1.png" v-if="isDetail" />
          <img class="mr10" src="../../assets/detail_icon.png" v-else />
          明细
        </span>
        <span :class="isDetail?'':'active'" @click="choicePage(false)">
          <img class="mr10" src="../../assets/tubiao_icon.png" v-if="isDetail" />
          <img class="mr10" src="../../assets/tubiao_icon1.png" v-else />
          统计
        </span>
        <img class="refresh" src="../../assets/refresh.png" />
      </div>
      <div class="flex-box" v-show="isDetail">
        <div class="box-item mr40 statistics" style="background-color:transparent">
          <div class="box-title mb50">
            <span>入量记录</span>
            <span class="right-title" @click="insertIntakeInput">
              <div class="add-btn">
                <img src="../../assets/plus_icon.png" style="position:absolute;left:16px;top:16px" />
                新增
              </div>
            </span>
          </div>
          <div style="height:660px;overflow:auto">
            <div class="record-items" v-for="record in inputRecordList" :key="record.id">
              <div style="display:flex;flex-direction:column">
                <span style="font-size:30px;line-height:50px;color:#393939">{{record.name}}</span>
                <span style="font-size:24px;line-height:30px;color:#90909e">{{record.createTime}}</span>
              </div>
              <span
                style="font-size:30px;line-height:80px;margin-right:100px;font-weight:bold"
              >{{record.weight + record.enUnit}}</span>
              <img
                src="../../assets/edit_icon.png"
                style="position:absolute;right:40px;top:42px"
                @click="editInputRecord(record)"
              />
            </div>
          </div>
        </div>
        <div class="box-item statistics" style="background-color:transparent">
          <div class="box-title mb50">
            <span>出量记录</span>
            <span class="right-title" @click="insertIntakeOutput">
              <div class="add-btn">
                <img src="../../assets/plus_icon.png" style="position:absolute;left:16px;top:16px" />
                新增
              </div>
            </span>
          </div>
          <div style="height:660px;overflow:auto">
            <div class="record-items" v-for="record in outputRecordList" :key="record.id">
              <div style="display:flex;flex-direction:column">
                <span style="font-size:30px;line-height:50px;color:#393939">{{record.name}}</span>
                <span style="font-size:24px;line-height:30px;color:#90909e">{{record.createTime}}</span>
              </div>
              <span
                style="font-size:30px;line-height:80px;margin-right:100px;font-weight:bold"
              >{{record.weight + record.enUnit}}</span>
              <img
                src="../../assets/edit_icon.png"
                style="position:absolute;right:40px;top:42px"
                @click="editOutputRecord(record)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex-box" v-show="!isDetail">
        <div class="box-item mr40 statistics">
          <div class="box-title mb50">
            <span>入量统计</span>
          </div>
          <div
            class="statistics-time mb40"
          >{{`统计时间：${recordStartTime.format('MM-DD HH:mm:ss')}至${recordEndTime.format('MM-DD HH:mm:ss')}`}}</div>
          <div class="chart-flex">
            <div id="echart1" class="chart"></div>
            <div class="text">
              <div class="p1">总入量（ml）</div>
              <div class="p2">{{inputSum}}</div>
            </div>
          </div>
          <div class="legend">
            <div class="legend-item" v-for="(record,index) in inputList" :key="index">
              <span class="circular mr20" :style="{ backgroundColor:color[index] }"></span>
              <span class="text1 mr30">{{record.category}}</span>
              <span class="progress-bar mr40">
                <div
                  :style="{ width: record.weight / inputSum * 100 + '%',backgroundColor:color[index] }"
                  class="bar-width"
                ></div>
              </span>
              <span class="text2">{{record.weight}}ml</span>
            </div>
          </div>
        </div>
        <div class="box-item statistics">
          <div class="box-title mb50">
            <span>出量统计</span>
          </div>
          <div
            class="statistics-time mb40"
          >{{`统计时间：${recordStartTime.format('MM-DD HH:mm:ss')}至${recordEndTime.format('MM-DD HH:mm:ss')}`}}</div>
          <div class="chart-flex">
            <div id="echart2" class="chart"></div>
            <div class="text">
              <div class="p1">总出量（ml）</div>
              <div class="p2">{{outputSum}}</div>
            </div>
          </div>
          <div class="legend">
            <div class="legend">
              <div class="legend-item" v-for="(record,index) in outputList" :key="index">
                <span class="circular mr20" :style="{ backgroundColor:color[index] }"></span>
                <span class="text1 mr30">{{record.category}}</span>
                <span class="progress-bar mr40">
                  <div
                    :style="{ width: record.weight / outputSum * 100 + '%',backgroundColor:color[index] }"
                    class="bar-width"
                  ></div>
                </span>
                <span class="text2">{{record.weight}}ml</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="add-amount-dlg" v-show="showDialog">
      <div class="dlg-top">
        <div class="title mb50">
          <span>新增出入量</span>
          <img @click="showDialog = false" src="../../assets/close_dlg.png" />
        </div>
        <div class="tab-div">
          <div
            class="tab-item"
            :class="tabId === item.categoryId?'active':''"
            v-for="item in intakeTabList"
            :key="item.categoryId"
            @click="choiceTab(item.categoryId)"
          >{{item.category}}</div>
        </div>
        <swiper class="intake-output-slider mt30">
          <swiper-slide v-for="(group,index) in groupedCurrentItems" :key="index">
            <div
              class="intake-output-item"
              :class="itemId === item.id?'active':''"
              v-for="item in group"
              :key="item.id"
              @click="choiceItem(item.id)"
            >
              <div>{{item.name}}</div>
              <div>{{item.cnUnit}}</div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="dlg-keyboard">
        <div class="input-div">
          <div class="input">{{keyboardValue}}</div>
        </div>
        <div class="keyboard-div">
          <span class="keyboard-item">1</span>
          <span class="keyboard-item">2</span>
          <span class="keyboard-item">3</span>
          <span class="keyboard-item">4</span>
          <span class="keyboard-item">5</span>
          <span class="keyboard-item">6</span>
          <span class="keyboard-item">7</span>
          <span class="keyboard-item">8</span>
          <span class="keyboard-item">9</span>
          <span class="keyboard-item">0</span>
        </div>
        <div class="operate">
          <span class="backspace" @click="backspace">
            <img class="mr10" src="../../assets/backspace_icon.png" />退格
          </span>
          <span class="sure" @click="insertIntake">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import echarts from 'echarts'
import { groupByNumber, showMessage } from '../../utils/utils.js'
import Axios from 'axios'
export default {
  data () {
    return {
      showDialog: false,
      isDetail: true,
      color: ['#5897f0', '#faa961', '#73d6ad', '#b373f4', '#70762e'],
      curType: 'input',
      inputTabList: [],
      outputTabList: [],
      tabId: 0,
      itemId: 0,
      inputRecordList: [],
      outputRecordList: [],
      inputList: [],
      outputList: [],
      keyboardValue: '' // 键盘值
    }
  },
  computed: {
    recordStartTime () {
      return this.$store.getters.recordStartTime
    },
    recordEndTime () {
      return this.$store.getters.recordEndTime
    },
    inputSum () {
      return this.inputList.reduce((result, next) => result + Number(next.weight || 0), 0)
    },
    outputSum () {
      return this.outputList.reduce((result, next) => result + Number(next.weight || 0), 0)
    },
    intakeTabList () {
      if (this.curType === 'input') {
        return this.inputTabList
      } else {
        return this.outputTabList
      }
    },
    groupedCurrentItems () {
      if (this.curType === 'input') {
        return groupByNumber((this.inputTabList.find(tab => tab.categoryId === this.tabId) || {}).items, 16)
      } else {
        return groupByNumber((this.outputTabList.find(tab => tab.categoryId === this.tabId) || {}).items, 16)
      }
    }
  },
  mounted () {
    Axios.all([
      this.api.get('bedside/inputItems?deviceCode=' + window.plus.getMac()),
      this.api.get('bedside/outputItems?deviceCode=' + window.plus.getMac()),
      this.api.post('bedside/inputRecords', {
        patientId: this.$store.state.patientInfo.patientId,
        startTime: this.recordStartTime.format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.recordEndTime.format('YYYY-MM-DD HH:mm:ss')
      }),
      this.api.post('bedside/outputRecords', {
        patientId: this.$store.state.patientInfo.patientId,
        startTime: this.recordStartTime.format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.recordEndTime.format('YYYY-MM-DD HH:mm:ss')
      }),
      this.api.post('bedside/inputRecordStats', {
        patientId: this.$store.state.patientInfo.patientId,
        startTime: this.recordStartTime.format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.recordEndTime.format('YYYY-MM-DD HH:mm:ss')
      }),
      this.api.post('bedside/outputRecordStats', {
        patientId: this.$store.state.patientInfo.patientId,
        startTime: this.recordStartTime.format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.recordEndTime.format('YYYY-MM-DD HH:mm:ss')
      })
    ]).then(([inItemRes, outItemRes, inRecRes, outRecRes, inRes, outRes]) => {
      if (inItemRes.data.code === 1) {
        this.inputTabList = inItemRes.data.data
      }
      if (outItemRes.data.code === 1) {
        this.outputTabList = outItemRes.data.data
      }
      if (inRecRes.data.code === 1) {
        this.inputRecordList = inRecRes.data.data
      }
      if (inRecRes.data.code === 1) {
        this.outputRecordList = outRecRes.data.data
      }
      if (inRes.data.code === 1) {
        this.inputList = inRes.data.data
      }
      if (outRes.data.code === 1) {
        this.outputList = outRes.data.data
      }
      this.init_echarts()
    })
    this.my_keyboard()
  },
  components: {
    swiper: Swiper,
    'swiper-slide': SwiperSlide
  },
  methods: {
    // 关闭
    go_back: function () {
      this.$router.go(-1)
    },
    // 明细与系统页面切换
    choicePage (value) {
      this.isDetail = value
    },
    choiceTab: function (id) {
      this.keyboardValue = ''
      this.tabId = id
      this.itemId = 0
    },
    choiceItem (id) {
      this.keyboardValue = ''
      this.itemId = id
    },
    editInputRecord (record) {
      this.$edit = true
      this.curType = 'input'
      this.tabId = Number(record.categoryId)
      this.keyboardValue = record.weight.toString()
      this.itemId = record.itemId
      this.$id = record.id
      this.$nextTick(() => {
        this.showDialog = true
      })
    },
    editOutputRecord (record) {
      this.$edit = true
      this.curType = 'output'
      this.tabId = Number(record.categoryId)
      this.keyboardValue = record.weight.toString()
      this.itemId = record.itemId
      this.$id = record.id
      this.$nextTick(() => {
        this.showDialog = true
      })
    },
    insertIntakeInput () {
      this.$edit = false
      this.curType = 'input'
      this.tabId = Number((this.inputTabList[0] || {}).categoryId)
      this.itemId = 0
      this.keyboardValue = ''
      this.showDialog = true
    },
    // 新增出入量录入
    insertIntakeOutput () {
      this.$edit = false
      this.curType = 'output'
      this.tabId = Number((this.outputTabList[0] || {}).categoryId)
      this.itemId = 0
      this.keyboardValue = ''
      this.showDialog = true
    },
    insertIntake () {
      if (this.curType === 'input') {
        this.insertIntakeInputConfirm()
      } else {
        this.insertIntakeOutputConfirm()
      }
    },
    insertIntakeOutputConfirm () {
      if (!this.itemId) {
        showMessage('请选择出量类型！')
        return
      }
      if (!this.keyboardValue) {
        showMessage('请输入出量数量！')
        return
      }
      if (this.$edit) {
        this.api.post('bedside/editRecord', {
          id: this.$id,
          weight: Number(this.keyboardValue)
        }).then(res => {
          if (res.data.code === 1) {
            showMessage('修改出量记录成功！')
            this.showDialog = false
            this.api.post('bedside/outputRecords', {
              patientId: this.$store.state.patientInfo.patientId,
              startTime: this.recordStartTime.format('YYYY-MM-DD HH:mm:ss'),
              endTime: this.recordEndTime.format('YYYY-MM-DD HH:mm:ss')
            }).then(res => {
              if (res.data.code === 1) {
                this.outputRecordList = res.data.data
              }
            })
          }
        })
      } else {
        this.api.post('bedside/addOutputRecord', {
          itemId: this.itemId,
          patientId: this.$store.state.patientInfo.patientId,
          bedName: this.$store.state.bindBed,
          weight: Number(this.keyboardValue)
        }).then(res => {
          if (res.data.code === 1) {
            showMessage('添加出量记录成功！')
            this.showDialog = false
            this.api.post('bedside/outputRecords', {
              patientId: this.$store.state.patientInfo.patientId,
              startTime: this.recordStartTime.format('YYYY-MM-DD HH:mm:ss'),
              endTime: this.recordEndTime.format('YYYY-MM-DD HH:mm:ss')
            }).then(res => {
              if (res.data.code === 1) {
                this.outputRecordList = res.data.data
              }
            })
          }
        })
      }
    },
    insertIntakeInputConfirm () {
      if (!this.itemId) {
        showMessage('请选择入量类型！')
        return
      }
      if (!this.keyboardValue) {
        showMessage('请输入入量数量！')
        return
      }
      if (this.$edit) {
        this.api.post('bedside/editRecord', {
          id: this.$id,
          weight: Number(this.keyboardValue)
        }).then(res => {
          if (res.data.code === 1) {
            showMessage('修改入量记录成功！')
            this.showDialog = false
            this.api.post('bedside/inputRecords', {
              patientId: this.$store.state.patientInfo.patientId,
              startTime: this.recordStartTime.format('YYYY-MM-DD HH:mm:ss'),
              endTime: this.recordEndTime.format('YYYY-MM-DD HH:mm:ss')
            }).then(res => {
              if (res.data.code === 1) {
                this.inputRecordList = res.data.data
              }
            })
          }
        })
      } else {
        this.api.post('bedside/addInputRecord', {
          itemId: this.itemId,
          patientId: this.$store.state.patientInfo.patientId,
          bedName: this.$store.state.bindBed,
          weight: Number(this.keyboardValue)
        }).then(res => {
          if (res.data.code === 1) {
            showMessage('添加入量记录成功！')
            this.showDialog = false
            this.api.post('bedside/inputRecords', {
              patientId: this.$store.state.patientInfo.patientId,
              startTime: this.recordStartTime.format('YYYY-MM-DD HH:mm:ss'),
              endTime: this.recordEndTime.format('YYYY-MM-DD HH:mm:ss')
            }).then(res => {
              if (res.data.code === 1) {
                this.inputRecordList = res.data.data
              }
            })
          }
        })
      }
    },
    // 键盘输入方法
    my_keyboard () {
      document.body.querySelectorAll('.keyboard-item').forEach(btn => {
        btn.addEventListener('click', () => {
          this.$nextTick(() => {
            this.keyboardValue += btn.innerText
          })
        })
      })
    },
    // 退格
    backspace () {
      if (this.keyboardValue.length > 0) {
        this.keyboardValue = this.keyboardValue.substring(0, this.keyboardValue.length - 1)
      }
    },
    // 初始化echarts图
    init_echarts () {
      // 指定图表的配置项和数据
      var option = {
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          label: {
            normal: {
              position: 'inside',
              show: true,
              fontSize: 24
            }
          },
          color: this.color,

          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      var option1 = option
      option1.series[0].data = this.inputList.map(record => ({
        value: record.weight,
        name: record.category
      }))
      // 基于准备好的dom，初始化echarts实例
      var myChart1 = echarts.init(document.getElementById('echart1'))
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1)

      var option2 = option
      option2.series[0].data = this.outputList.map(record => ({
        value: record.weight,
        name: record.category
      }))

      // 基于准备好的dom，初始化echarts实例
      var myChart2 = echarts.init(document.getElementById('echart2'))
      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(option2)
    }
  }
}
</script>
<style scoped>
.header-div .right-div {
  position: absolute;
  right: 40px;
  display: flex;
  align-items: center;
  top: 0;
  font-size: 30px;
  color: #4e4e4e;
}

.header-div .right-div img {
  width: 48px;
  height: 48px;
}

.content {
  padding: 0 30px;
  margin-left: 200px;
}

.header-box {
  display: flex;
  align-items: center;
  height: 123px;
  position: relative;
}

.header-box span {
  display: flex;
  align-items: center;
  font-size: 30px;
  color: #90909e;
}

.header-box .active {
  color: #3e8cfc;
}

.header-box .refresh {
  position: absolute;
  top: 37.5px;
  right: 0;
}

.flex-box {
  display: flex;
  justify-content: space-between;
}

.flex-box .box-item {
  flex: 1;
}

.flex-box .box-item .box-title {
  margin-bottom: 33px;
  position: relative;
  height: 80px;
}

.flex-box .box-title span {
  font-size: 36px;
  font-weight: bold;
  color: #3e8cfc;
  line-height: 80px;
}

.flex-box .box-title button {
  width: 160px;
  height: 80px;
  font-size: 30px;
  color: #ffffff;
  background-color: #3e8cfc;
  position: absolute;
  right: 0;
  border-radius: 40px;
}

.record-item {
  width: 100%;
  height: 120px;
  border-radius: 30px;
  background-color: #ffffff;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
}

.record .record-item:last-child {
  margin-bottom: 0;
}

.record-item .text {
  font-size: 30px;
  color: #393939;
  line-height: 40px;
}

.record-item .time {
  font-size: 24px;
  color: #90909e;
  line-height: 30px;
}

.record-item .amount {
  position: absolute;
  right: 152px;
  font-size: 30px;
  color: #1e1e1e;
}

.record-item .edit {
  position: absolute;
  right: 40px;
  width: 36px;
  height: 36px;
}

/* 新增入量弹窗 */

.add-amount-dlg {
  background-color: #ffffff;
  width: 1250px;
  height: 1060px;
  border-radius: 30px;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.add-amount-dlg .dlg-top {
  height: 598px;
  padding: 50px 50px 0;
}

.add-amount-dlg .title {
  font-size: 36px;
  font-weight: bold;
  color: #393939;
  line-height: 48px;
}

.add-amount-dlg img {
  width: 48px;
  height: 48px;
  float: right;
}

.add-amount-dlg .tab-div {
  height: 90px;
  display: flex;
  position: relative;
}

.add-amount-dlg .tab-div::after {
  content: "";
  height: 1px;
  width: 100%;
  background-color: #e7e7e7;
  position: absolute;
  bottom: 0;
}

.add-amount-dlg .tab-item {
  width: 140px;
  text-align: center;
  font-size: 30px;
  color: #393939;
  line-height: 80px;
  padding-top: 10px;
}

.add-amount-dlg .tab-item.active {
  color: #3e8cfc;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  background-color: #ffffff;
  z-index: 1;
}

.add-amount-dlg .tab-item.active::before {
  content: "";
  display: block;
  width: 140px;
  height: 10px;
  position: absolute;
  top: 0;
  background-color: #3e8cfc;
  border-radius: 10px 10px 0 0;
}

/* 轮播样式 */

.intake-output-slider {
  height: 318px;
}

.intake-output-slider .intake-output-item {
  width: 120px;
  height: 120px;
  display: inline-block;
  text-align: center;
  font-size: 24px;
  color: #4e4e4e;
  margin: 0 27px 27px 0;
  border-radius: 24px;
  background-color: #f2f8fd;
  padding: 30px 0;
  line-height: 1.4;
}

.intake-output-slider .intake-output-item.active {
  color: #ffffff;
  background-color: #3e8cfc;
}

.intake-output-slider .intake-output-item:nth-child(8n) {
  margin-right: 0;
}

.intake-output-slider .mui-slider-group .mui-slider-item img {
  width: 80px;
  height: 80px;
}

.intake-output-slider .mui-indicator {
  width: 20px;
  height: 20px;
  background-color: #d0d0d8;
}

.intake-output-slider .mui-active.mui-indicator {
  background-color: #3e8cfc;
}

/* 弹窗键盘 */

.add-amount-dlg .dlg-keyboard {
  height: 462px;
  background-color: #3c485e;
  text-align: center;
}

.dlg-keyboard .input-div {
  padding: 30px 0;
  height: 132px;
  border-bottom: 1px solid #808fae;
}

.dlg-keyboard .input-div .input {
  width: 860px;
  height: 72px;
  border: none;
  background-color: #ffffff;
  text-align: right;
  font-size: 32px;
  display: inline-block;
  line-height: 72px;
  padding: 0 20px;
}

.dlg-keyboard .keyboard-div {
  width: 860px;
  margin: 30px auto 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 30px;
  font-weight: bold;
  color: #4e4e4e;
}

.dlg-keyboard .keyboard-div .keyboard-item {
  width: 150px;
  height: 72px;
  line-height: 72px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #ffffff;
}

.dlg-keyboard .keyboard-div .keyboard-item:active {
  background-color: #90909e;
}

.dlg-keyboard .operate {
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  color: #4e4e4e;
}

.dlg-keyboard .operate .backspace {
  width: 325px;
  height: 72px;
  line-height: 72px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 27.5px;
}

.dlg-keyboard .operate .sure {
  width: 325px;
  height: 72px;
  line-height: 72px;
  border-radius: 10px;
  background-color: #3e8cfc;
  color: #ffffff;
}

/* 统计 */

.statistics {
  height: 841px;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 20px 40px;
}

.record-items {
  height: 120px;
  border-radius: 30px;
  background-color: white;
  margin-bottom: 15px;
  padding: 15px 40px 25px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.record-items:last-child {
  margin-bottom: 0;
}

.statistics .box-title .right-title {
  position: absolute;
  right: 0;
}

.statistics .box-title .right-title span {
  font-size: 30px;
  color: #393939;
  font-weight: normal;
}

.statistics .box-title .right-title .add-btn {
  display: inline-block;
  color: white;
  width: 160px;
  height: 80px;
  background-color: #3e8cfc;
  border-radius: 40px;
  font-size: 30px;
  line-height: 80px;
  padding-left: 70px;
  position: relative;
}

.statistics .box-title .right-title .add-btn:active {
  background-color: #87abfc;
}

.statistics .box-title .right-title span.active {
  color: #0076fe;
}

.statistics-time {
  text-align: center;
  font-size: 24px;
  color: #90909e;
}

.chart {
  height: 260px;
  width: 260px;
}

.chart-flex {
  display: flex;
  justify-content: space-between;
  width: 585px;
  margin: auto;
  align-items: center;
  margin-bottom: 90px;
}

.chart-flex .text {
  line-height: 1;
  color: #393939;
  text-align: right;
}

.chart-flex .text .p1 {
  font-size: 30px;
  margin-bottom: 30px;
}

.chart-flex .text .p2 {
  font-size: 48px;
  font-weight: bold;
}

.legend {
  height: 250px;
  overflow: auto;
}

.legend-item {
  height: 30px;
  margin-bottom: 35px;
  margin-left: 130px;
  display: flex;
  align-items: center;
  line-height: 1;
}

.legend-item:last-child {
  margin-bottom: 0;
}

.legend-item .circular {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.legend-item .text1 {
  font-size: 24px;
  color: #393939;
  width: 72px;
}

.legend-item .text2 {
  font-size: 30px;
  color: #393939;
  text-align: right;
  width: 85px;
}

.legend-item .progress-bar {
  background-color: #f2f8fd;
  height: 18px;
  width: 300px;
  border-radius: 9px;
}

.legend-item .bar-width {
  height: 100%;
  border-radius: 9px;
}

.legend-item.blue .circular,
.legend-item.blue .bar-width {
  background-color: #5897f0;
}

.legend-item.yellow .circular,
.legend-item.yellow .bar-width {
  background-color: #faa961;
}

.legend-item.purple .circular,
.legend-item.purple .bar-width {
  background-color: #b373f4;
}

.legend-item.green .circular,
.legend-item.green .bar-width {
  background-color: #73d6ad;
}
</style>
