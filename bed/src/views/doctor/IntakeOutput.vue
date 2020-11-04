<template>
  <div id="con">
    <div class="main-div">
      <div class="header-div">
        <span class="title">出入量</span>
        <header-right></header-right>
      </div>
      <nav-doctor-left></nav-doctor-left>
      <div class="main-content" style="margin-top:40px">
        <div class="flex-box">
          <div class="box-item mr40 statistics">
            <div class="box-title mb50">
              <span>入量记录</span>
              <span class="right-title">
                <span class="mr30">小结</span>
                <span class="active">大结</span>
              </span>
            </div>
            <div class="statistics-time mb40">统计时间：06-24 00:09:00至06-25 00:09:00</div>
            <div class="chart-flex">
              <div id="echart1" class="chart"></div>
              <div class="text">
                <div class="p1">总入量（ml）</div>
                <div class="p2">1200</div>
              </div>
            </div>
            <div class="legend">
              <div class="legend-item blue">
                <span class="circular mr20"></span>
                <span class="text1 mr30">引流量</span>
                <span class="progress-bar mr40">
                  <div style="width: 36%;" class="bar-width"></div>
                </span>
                <span class="text2">288ml</span>
              </div>
              <div class="legend-item purple">
                <span class="circular mr20"></span>
                <span class="text1 mr30">尿量</span>
                <span class="progress-bar mr40">
                  <div style="width: 25%;" class="bar-width"></div>
                </span>
                <span class="text2">200ml</span>
              </div>
              <div class="legend-item yellow">
                <span class="circular mr20"></span>
                <span class="text1 mr30">出血</span>
                <span class="progress-bar mr40">
                  <div style="width: 22%;" class="bar-width"></div>
                </span>
                <span class="text2">176ml</span>
              </div>
              <div class="legend-item green">
                <span class="circular mr20"></span>
                <span class="text1 mr30">呕吐</span>
                <span class="progress-bar mr40">
                  <div style="width: 17%;" class="bar-width"></div>
                </span>
                <span class="text2">136ml</span>
              </div>
            </div>
          </div>
          <div class="box-item statistics">
            <div class="box-title mb50">
              <span>出量统计</span>
              <span class="right-title">
                <span class="mr30">小结</span>
                <span class="active">大结</span>
              </span>
            </div>
            <div class="statistics-time mb40">统计时间：06-24 00:09:00至06-25 00:09:00</div>
            <div class="chart-flex">
              <div id="echart2" class="chart"></div>
              <div class="text">
                <div class="p1">总出量（ml）</div>
                <div class="p2">800</div>
              </div>
            </div>
            <div class="legend">
              <div class="legend-item blue">
                <span class="circular mr20"></span>
                <span class="text1 mr30">输液量</span>
                <span class="progress-bar mr40">
                  <div style="width: 60%;" class="bar-width"></div>
                </span>
                <span class="text2">720ml</span>
              </div>
              <div class="legend-item yellow">
                <span class="circular mr20"></span>
                <span class="text1 mr30">饮品</span>
                <span class="progress-bar mr40">
                  <div style="width: 20%;" class="bar-width"></div>
                </span>
                <span class="text2">240ml</span>
              </div>
              <div class="legend-item purple">
                <span class="circular mr20"></span>
                <span class="text1 mr30">输血</span>
                <span class="progress-bar mr40">
                  <div style="width: 12%;" class="bar-width"></div>
                </span>
                <span class="text2">144ml</span>
              </div>
              <div class="legend-item green">
                <span class="circular mr20"></span>
                <span class="text1 mr30">粮食</span>
                <span class="progress-bar mr40">
                  <div style="width: 8%;" class="bar-width"></div>
                </span>
                <span class="text2">96ml</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderRight from '../../components/HeaderRight.vue'
import NavDoctorLeft from '../../components/NavDoctorLeft.vue'
import echarts from 'echarts'
export default {
  data: function () {
    return {
      pickDate: false,
      currentTab: 0,
      recordList: [{
        id: 1,
        type: '护理类',
        name: '一级护理',
        norm: '/',
        unit: '天',
        count: 1,
        fee: 9.00

      }, {
        id: 2,
        type: '护理类',
        name: '特级护理',
        norm: '/',
        unit: '瓶',
        count: 1,
        fee: 27.00
      }, {
        id: 3,
        type: '中成药',
        name: '康复新液',
        norm: '100ML四川好医生',
        unit: '瓶',
        count: 3,
        fee: 139.00
      }, {
        id: 4,
        type: '中成药',
        name: '康复新液',
        norm: '100ML四川好医生',
        unit: '',
        count: 3,
        fee: 139.00
      }, {
        id: 5,
        type: '中成药',
        name: '复方苦参注射液',
        norm: '5ML山西振东',
        unit: '支',
        count: 5,
        fee: 203.00
      }, {
        id: 6,
        type: '中成药',
        name: '复方苦参注射液',
        norm: '5ML山西振东',
        unit: '支',
        count: 5,
        fee: 203.00
      }, {
        id: 7,
        type: '中成药',
        name: '复方苦参注射液',
        norm: '5ML山西振东',
        unit: '支',
        count: 5,
        fee: 203.00
      }, {
        id: 8,
        type: '护理类',
        name: '一级护理',
        norm: '/',
        unit: '床日',
        count: 1,
        fee: 9.00
      }]
    }
  },
  mounted () {
    this.init_echarts()
  },
  components: {
    NavDoctorLeft,
    HeaderRight
  },
  methods: {
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
          color: ['#5897f0', '#faa961', '#73d6ad', '#b373f4'],

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
      option1.series[0].data = [
        {
          value: 60,
          name: '60%'
        }, {
          value: 20,
          name: '20%'
        },
        {
          value: 8,
          name: '8%'
        },
        {
          value: 12,
          name: '12%'
        }

      ]

      // 基于准备好的dom，初始化echarts实例
      var myChart1 = echarts.init(document.getElementById('echart1'))
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1)

      var option2 = option
      option2.series[0].data = [
        {
          value: 36,
          name: '36%'
        }, {
          value: 22,
          name: '22%'
        },
        {
          value: 17,
          name: '17%'
        },
        {
          value: 25,
          name: '25%'
        }
      ]
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

/* 莉��㊥�桁�� */

.intake-output-slider {
  height: 318px !important;
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

.swiper-pagination-bullet {
  width: 20px !important;
  height: 20px !important;
}

/* 綣合����� */

.add-amount-dlg .dlg-keyboard {
  height: 462px;
  background-color: #3c485e;
  text-align: center;
}

.dlg-keyboard .input-div {
  padding: 30px 0;
  border-bottom: 1px solid #808fae;
}

.dlg-keyboard .input-div input {
  width: 860px;
  height: 72px;
  border: none;
  background-color: #ffffff;
  text-align: right;
  font-size: 32px;
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

.statistics {
  height: 841px;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 0 40px;
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

.legend-item {
  height: 30px;
  margin-bottom: 35px;
  margin-left: 130px;
  display: flex;
  align-items: center;
  line-height: 1;
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
