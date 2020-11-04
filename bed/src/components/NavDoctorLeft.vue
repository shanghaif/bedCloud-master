<template>
  <div class="nav-left">
    <div class="left-item" @click="changeTab(0)">
      <img src="../assets/nav_index.png" /> 首页
    </div>
    <div class="left-item" @click="changeTab(1)">
      <img src="../assets/nav_report.png" /> 报告
    </div>
    <div class="left-item" @click="changeTab(2)">
      <img src="../assets/nav_advice.png" /> 医嘱
    </div>
    <div class="left-item" @click="changeTab(3)">
      <img src="../assets/nav_three.png" /> 三测单
    </div>
    <div class="left-item" @click="changeTab(4)">
      <img src="../assets/nav_num.png" /> 出入量
    </div>
    <div class="left-item" @click="changeTab(5)">
      <img src="../assets/nav_record.png" /> 电子病历
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeTab (index) {
      switch (index) {
        case 0:
          this.$router.replace('/doctor')
          break
        case 1:
          this.$router.replace('/report')
          break
        case 2:
          this.$router.replace('/advise')
          break
        case 3:
          // plus.navigateTo(webUrl + 'doctors/home.html', 'doctors_home')
          break
        case 4:
          this.$router.replace('/intake')
          break
        case 5:
          this.$router.replace('/record')
          break
      }
    }
  }
}
</script>
