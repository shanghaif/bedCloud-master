<template>
  <div class="container" id="app">
    <img class="calling-icon" src="../assets/bath_calling_icon.gif" />
    <div class="calling-content">{{name}}正在卫浴呼叫！</div>
    <div class="check-tip">
      <img src="../assets/bath_check.png" style="width:72px;height:72px;margin-right:5px" />
      <span>请护士刷卡处置</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      name: ''
    }
  },
  mounted () {
    this.name = this.$route.query.name
  }
}
</script>

<style scoped>
.container {
  background-color: #fe384b;
  height: 100%;
  color: white;
}

.calling-icon {
  position: absolute;
  left: 50%;
  top: 380px;
  width: 200px;
  height: 200px;
  margin-left: -100px;
}

.calling-content {
  position: absolute;
  width: 100%;
  top: 610px;
  font-size: 44px;
  text-align: center;
}

.check-tip {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 680px;
  font-size: 24px;
  text-align: center;
}

.check-area {
  position: absolute;
  left: 390px;
  top: 490px;
}

.check-area-item {
  width: 500px;
  height: 60px;
  font-size: 24px;
  border-radius: 45px;
  background-color: rgba(255, 255, 255, 0.6);
  color: #4e4e4e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
}

.check-area-item.checked {
  justify-content: space-between;
  background-color: white;
}

.check-area-item + .check-area-item {
  margin-top: 20px;
}
</style>