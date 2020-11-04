<template>
  <div
    class="main-div"
    style="display: flex;flex-direction: column;align-items:center;background-color:white"
    v-cloak
  >
    <div class="header-div">
      <div class="close" @click="$router.go(-1)">
        <img src="../../assets/close.png" />关闭
      </div>
      <span class="title">检验报告详情</span>
    </div>
    <div style="padding:30px 60px;width:100%;height:990px;overflow:auto">
      <div style="font-size:36px;line-height:1.3;margin-bottom:20px">{{test.title}}</div>
      <div
        style="font-size:24px;color:#90909E;padding-bottom:30px;border-bottom:1px solid #D7D7D7"
      >报告时间：{{test.time}}</div>
      <div
        style="font-size:24px;line-height:1.3;margin-top:30px;padding-bottom:30px;border-bottom:1px solid #e7e7e7"
      >
        <table style="width:100%;text-align:center">
          <thead>
            <tr style="border-top:1px solid black;border-bottom:1px solid black">
              <td style="width:10%">编号</td>
              <td style="width:35%">检验项目</td>
              <td style="width:15%">结果</td>
              <td style="width:15%">报警</td>
              <td style="width:10%">单位</td>
              <td style="width:15%">参考范围</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in test.testList" :key="item.code">
              <td>{{item.code}}</td>
              <td>{{item.name}}</td>
              <td>{{item.ration}}</td>
              <td
                style="color:red"
              >{{item.abnormal === 'L' ? '↓' : (item.abnormal === 'H' ? '↑' : '')}}</td>
              <td v-html="formatUnit(item.rationUnit)"></td>
              <td>{{item.range}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'check-detail',
  data () {
    return {
      test: {
        title: '',
        time: '',
        testList: []
      }
    }
  },
  mounted () {
    this.api.post('report/getTest', {
      reportId: this.$route.query.reportId
    }).then(res => {
      if (res.data.code === 1) {
        this.test = res.data.data
      }
    })
  },
  methods: {
    formatUnit (unit) {
      if (unit.indexOf('/') >= 0 && unit.indexOf('`') >= 0) {
        const a = unit.split('/')
        const [num, pow] = a[0].split('`')
        return `${num}<sup>${pow}</sup>/${a.pop()}`
      } else {
        return unit
      }
    }
  }
}
</script>

<style scoped>
table td {
  height: 40px;
}
</style>
