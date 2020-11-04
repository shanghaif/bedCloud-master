<template>
  <div id="con">
    <div class="main-div" style="overflow:hidden">
      <div class="header-div">
        <span class="title">电子病历</span>
        <header-right></header-right>
      </div>
      <nav-doctor-left></nav-doctor-left>

      <div
        class="main-content"
        style="margin-top:40px;margin-right:40px;width:1640px;border-radius: 30px 30px 0 0;height:950px"
      >
        <iframe width="100%" height="100%" :src="url"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderRight from '../../components/HeaderRight.vue'
import NavDoctorLeft from '../../components/NavDoctorLeft.vue'
export default {
  data: function () {
    return {
      url: ''
    }
  },
  components: {
    NavDoctorLeft,
    HeaderRight
  }
}
</script>
