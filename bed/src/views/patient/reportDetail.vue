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
      <span class="title">检查报告详情</span>
    </div>
    <div style="padding:30px 60px;width:100%;height:990px">
      <div style="font-size:36px;line-height:1.3;margin-bottom:20px">{{report.title}}</div>
      <div
        style="font-size:24px;color:#90909E;padding-bottom:30px;border-bottom:1px solid #D7D7D7"
      >报告时间：{{report.time}}</div>
      <div
        style="font-size:24px;line-height:1.3;margin-top:30px;padding-bottom:30px;border-bottom:1px solid #e7e7e7"
      >
        <div style="font-size:30px;font-weight:bold;margin-bottom:10px">报告内容：</div>
        <div
          v-for="(content,index) in report.content.split('**').filter(Boolean)"
          :key="index"
          style="text-indent: 2em;"
        >{{content}}</div>
      </div>
      <div style="font-size:24px;line-height:1.3;margin-top:30px">
        <div style="font-size:30px;font-weight:bold;margin-bottom:10px">诊断结果：</div>
        <div
          v-for="(result,index) in report.result.split('**').filter(Boolean)"
          :key="index"
        >{{result}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'report-detail',
  data () {
    return {
      report: {
        title: '',
        time: '',
        result: '',
        doctor: '',
        content: ''
      }
    }
  },
  mounted () {
    this.api.post('report/getReport', {
      reportId: this.$route.query.reportId
    }).then(res => {
      if (res.data.code === 1) {
        this.report = res.data.data
      }
    })
  }
}
</script>
