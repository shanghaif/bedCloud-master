<template>
  <div id="con" style="background-color:#FE384B;height: 100%;text-align: center;">
    <div class="calling-dialog" v-if="callingTarget.code">
      <p style="font-size:32px;margin: 0;">{{`与${callingTarget.name}通话中`}}</p>
      <div class="calling-btn" @click="handleHangUp">挂断</div>
    </div>
    <img src="../assets/bath_call_icon.gif" style="width:200px;height:200px;margin-top: 200px;" />
    <transition-group class="call-list" name="calling" tag="ul">
      <li
        class="call-item"
        style="line-height: 57px;"
        v-for="call in $store.state.bathCallList"
        :key="call"
      >{{call}}</li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      callingTarget: {
        code: '',
        name: '医生办公室'
      }
    }
  },
  methods: {
    handleHangUp () {
      this.callingTarget = {
        code: '',
        name: ''
      }
    }
  }
}
</script>

<style>
.call-list {
  height: 235px;
  overflow: auto;
  margin-top: 30px;
  color: white;
  font-size: 48px;
}

.call-list .call-item + .call-item {
  margin-top: 30px;
}

.calling-dialog {
  width: 400px;
  height: 170px;
  background-color: white;
  position: absolute;
  top: 30px;
  left: 40px;
  border-radius: 13px;
  padding: 33px 0 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.calling-btn {
  width: 360px;
  height: 55px;
  border-radius: 30px;
  background-color: #fe6238;
  color: white;
  font-size: 28px;
  text-align: center;
}

.calling-move {
  transition: transform 1s;
}

.calling-enter-active,
.calling-leave-active {
  transition: all 1s;
}

.calling-enter,
.calling-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
</style>
