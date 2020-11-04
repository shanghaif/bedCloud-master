<template>
  <div class="loading-container" :style="{ backgroundColor }" v-show="show">
    <div class="loading-spin">
      <img class="rotate" src="../../assets/loading_icon.png" style="width: 60px; height: 60px" />
      <p style="margin: 10px 0 0 0">{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: null,
      show: false,
      backgroundColor: ''
    }
  }
}
</script>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate {
  animation: rotate 1s linear infinite;
}
.loading-container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
}
.loading-spin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
