<template>
  <div id="con">
    <div class="main-div zhyi-main-div">
      <div class="zhyi-head-div">
        <img class="img-div" src="@/assets/admin_head.png" />
        <span>HI！管理员</span>
        <div class="right-div">
          <span class="mr40">08月10日 15:00 星期六</span>
          <img src="../..//assets/setting.png" />
          <span class="mr40">配置项查看</span>
          <img src="../..//assets/sign_out.png" />
          <span>退出</span>
        </div>
      </div>

      <div class="box">
        <div class="left-box">
          <div class="box1">
            <div class="top-box">床头终端基础信息</div>

            <div class="box1-flex">
              <div class="box1-left">
                <div class="input-div">
                  <span>*当前医院</span>
                  <span class="info">湖南省湘雅附三医院</span>
                </div>
                <div class="input-div">
                  <span>*当前病区</span>
                  <span class="info">十二病床</span>
                </div>
                <div class="input-div">
                  <span>*当前病床</span>
                  <span
                    v-if="checked_item.bed_name"
                    class="info down black"
                    @tap="bed_choice"
                  >{{checked_item.bed_name}}</span>
                  <span v-else class="info down" @click="bed_choice">请选择床位</span>
                </div>
              </div>
              <div class="box1-right">
                <img src="../..//assets/erweima.png" />
              </div>
            </div>
          </div>
          <div class="box2">
            <div class="title mb20">
              <img src="../..//assets/title_icon.png" />日常任务
            </div>
            <div class="item-div border-bottom">
              <img src="../..//assets/hzxc_icon.png" />
              <span>床头终端患者宣教</span>
              <button class="zhyl-button">打卡</button>
            </div>
            <div class="item-div">
              <img src="../..//assets/ctwx_icon.png" />
              <span>床头终端各项维护</span>
              <button class="zhyl-button">打卡</button>
            </div>
          </div>
        </div>
        <div class="box3">
          <div class="title mb20">
            <img src="@/assets/title_icon.png" />关联设备
          </div>
          <div class="box3-content">
            <div class="item-div mb30">
              <span>体温计</span>
              <input type="text" placeholder="请扫描设备二维码" class="zhyl-input" />
            </div>
            <div class="item-div mb30">
              <span>血压仪</span>
              <input type="text" placeholder="请扫描设备二维码" class="zhyl-input" />
            </div>
            <div class="item-div mb30">
              <span>血氧仪</span>
              <input type="text" placeholder="请扫描设备二维码" class="zhyl-input" />
            </div>
            <div class="item-div mb30">
              <span>血糖仪</span>
              <input type="text" placeholder="请扫描设备二维码" class="zhyl-input" />
            </div>
            <div class="item-div">
              <span>智能床头柜</span>
              <input type="text" placeholder="请扫描设备二维码" class="zhyl-input" />
            </div>
          </div>
          <div class="box3-tip">
            <p class="mb20">一、使用扫码枪扫描床头终端二维码，完成扫码枪与床头终端配对</p>
            <p>二、点击设备二维码输入框，使用扫码枪扫描设备上的二维码，获取二维码信息，完成设备与床头终端配对</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      lastTime: 0,
      checked_item: {}
    }
  },
  methods: {
    // 选择床位
    bed_choice () {
      this.$router.push('/beds')
    },
    keyback_callback () {
      console.log('按了一次返回键哦')
      // 返回键监听
      const cTime = new Date().getTime()
      if ((cTime - this.lastTime) > 2000) {
        // mui.toast('再按一次退出程序')
        this.lastTime = cTime
      } else {
        // plus.closeApp() // 退出APP
      }
      return 'stop'
    },
    // 页面传来的参数
    pageShow_callback (res) {
      this.checked_item = JSON.parse(res)
    }
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 860px;
  display: flex;
  justify-content: space-between;
  margin-top:30px;
  padding: 0 60px;
}
.box .left-box {
  width: 1020px;
}
.box .box1 {
  width: 1020px;
  height: 450px;
  background-color: #639df1;
  border-radius: 30px;
  box-shadow: 0px 0px 15px #e5eff9;
  margin-bottom: 43px;
  overflow: hidden;
}
.box .box1 .top-box {
  height: 100px;
  background-color: #5897f0;
  border-bottom: 1px solid #62affd;
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
  line-height: 100px;
  text-align: center;
  margin-bottom: 38px;
}
.box1 .box1-flex {
  display: flex;
}
.box1 .box1-left {
  margin-right: 30px;
}
.box1 .box1-right {
  width: 274px;
  height: 274px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 22px;
  box-sizing: border-box;
}
.box1 .box1-right img {
  width: 100%;
  height: 100%;
}
.box1 .input-div {
  margin-bottom: 29px;
  color: #ffffff;
  margin-left: 50px;
  font-size: 30px;
}
.box1 .input-div .info {
  width: 420px;
  height: 72px;
  margin-left: 20px;
  background-color: #fcfcfc;
  border-radius: 10px;
  color: #babac2;
  display: inline-block;
  line-height: 72px;
  padding-left: 20px;
  position: relative;
}
.box1 .input-div .black {
  color: #4e4e4e;
}
.box1 .input-div .down::after {
  content: "";
  display: inline-block;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 35px;
  top: 0;
  bottom: 0;
  margin: auto;
  background-image: url("../../assets/down_icon.png");
}
.box1 .input-div:last-child {
  margin-bottom: 0;
}
.box .box2 {
  width: 1020px;
  height: 370px;
  border-radius: 30px;
  box-shadow: 0px 0px 15px #e5eff9;
  padding: 20px 30px 0;
  box-sizing: border-box;
  background-color: #ffffff;
}
.box .box2 .item-div {
  margin-left: 18px;
  display: flex;
  align-items: center;
  height: 120px;
  position: relative;
}
.box .box2 .border-bottom {
  border-bottom: 1px solid #d7d7d7;
}
.box .box2 .item-div img {
  margin: 0 20px;
  width: 60px;
  height: 60px;
}
.box .box2 .item-div span {
  font-size: 36px;
  color: #4e4e4e;
}
.box .box2 .item-div button {
  position: absolute;
  right: 0;
  width: 120px;
  height: 60px;
  font-size: 30px;
  border-radius: 30px;
}
.box .box3 {
  width: 740px;
  border-radius: 30px;
  height: 100%;
  box-shadow: 0px 0px 15px #e5eff9;
  padding: 20px 30px 0;
  box-sizing: border-box;
  background-color: #ffffff;
}
.box .box3 .box3-content {
  margin: 55px 0;
  text-align: right;
}
.box .box3 .box3-content span {
  font-size: 30px;
  color: #393939;
  margin-right: 20px;
}
.box .box3 .box3-tip {
  margin: 0 10px;
  background-color: #ffeedc;
  height: 155px;
  padding: 0 25px;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 10px;
}
.box .box3 .box3-tip p {
  font-size: 21px;
  color: #ff6600;
  line-height: 30px;
}
.box .title {
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  color: #4e4e4e;
}
.box .title img {
  width: 48px;
  height: 48px;
  margin-right: 20px;
}
</style>
