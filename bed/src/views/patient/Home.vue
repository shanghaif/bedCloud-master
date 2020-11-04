<template>
  <div id="con">
    <div class="main-div">
      <div class="zhyi-head-div mb30" style="padding:0 50px">
        <img class="img-div" src="../../assets/patient_head.png" />
        <span>HI！杜云岚 病友</span>
        <div class="right-div" style="right:50px">
          <span class="mr40">08月10日 15:00 星期六</span>
          <img src="../../assets/setting.png" />
          <span class="mr40">设置</span>
          <img src="../../assets/sign_out.png" />
          <span>退出</span>
        </div>
      </div>

      <div class="main-content">
        <div style="padding-left:60px">
          <div class="index-report index-column">
            <img src="../../assets/report_check.png" style="width:164px;height: 164px;" />
            <span style="margin-top:35px">报告查询</span>
          </div>
          <div class="index-status">
            <div class="index-pay index-column">
              <img src="../../assets/pay_check.png" style="width:120px;height: 120px;" />
              <span style="margin-top:20px">在线缴费</span>
            </div>
            <div class="index-assess index-column">
              <img src="../../assets/assess_check.png" style="width:120px;height: 120px;" />
              <span style="margin-top:20px">患者评价</span>
            </div>
            <div class="index-column index-out-amount">
              <span style="color: #4e4e4e;font-weight: normal;">近24小时总入量 ml</span>
              <div
                style="display: flex;justify-content: space-between;align-items: center;width:100%"
              >
                <span style="font-size:42px;color: #393939;">1200</span>
                <span class="text-btn">+</span>
              </div>
            </div>
            <div class="index-column index-out-amount">
              <span style="color: #4e4e4e;font-weight: normal;">近24小时总出量 ml</span>
              <div
                style="display: flex;justify-content: space-between;align-items: center;width:100%"
              >
                <span style="font-size:42px;color: #393939;">800</span>
                <span class="text-btn">+</span>
              </div>
            </div>
          </div>
          <div class="index-message-list index-column">
            <div class="index-message-item" @click="$router.replace('/message')">
              <img src="../../assets/news_icon1.png" style="width: 90px;height:90px;margin-right:30px" />
              <span>用药提醒</span>
              <div style="flex:auto"></div>
              <span style="font-size:24px;color:#90909e">06-02 15:00</span>
            </div>
            <div class="index-message-item" @click="$router.replace('/message')">
              <img src="../../assets/news_icon2.png" style="width: 90px;height:90px;margin-right:30px" />
              <span>宣教指南</span>
              <div style="flex:auto"></div>
              <span style="font-size:24px;color:#90909e">06-02 15:00</span>
            </div>
            <div class="index-message-item" @click="$router.replace('/message')">
              <img src="../../assets/news_icon3.png" style="width: 90px;height:90px;margin-right:30px" />
              <span>治疗提醒</span>
              <div style="flex:auto"></div>
              <span style="font-size:24px;color:#90909e">06-02 15:00</span>
            </div>
            <div class="index-message-item" @click="$router.replace('/message')">
              <img src="../../assets/news_icon4.png" style="width: 90px;height:90px;margin-right:30px" />
              <span>生活提醒</span>
              <div style="flex:auto"></div>
              <span style="font-size:24px;color:#90909e">06-02 15:00</span>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.main-content {
  margin: 0;
  width: 100%;
  padding-top: 50px;
  background-color: transparent;
}

.index-report {
  width: 355px;
  height: 565px;
  background-color: #7d88e4;
  margin-right: 20px;
  float: left;
  border-radius: 30px;
}

.index-status {
  width: 741px;
  height: 565px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  margin-right: 45px;
  float: left;
}

.index-column {
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: white;
  line-height: 1;
  font-weight: bold;
}

.index-pay {
  width: 365px;
  height: 270px;
  background-color: #73d6ad;
}

.index-assess {
  width: 356px;
  height: 270px;
  background-color: #fbbd73;
}

.index-in-amount {
  width: 365px;
  height: 270px;
  background-color: white;
  justify-content: space-around;
  padding: 30px;
  align-items: flex-start;
}

.index-out-amount {
  width: 356px;
  height: 270px;
  background-color: white;
  justify-content: space-around;
  padding: 30px;
  align-items: flex-start;
}

.index-message-list {
  width: 640px;
  float: left;
  height: 560px;
  background-color: white;
}

.index-message-item {
  width: 560px;
  margin: 0 40px;
  display: flex;
  align-items: center;
  height: 140px;
  border-bottom: 1px solid #d7d7d7;
  font-size: 36px;
  color: #393939;
  font-weight: normal;
}

.index-message-item:last-child {
  border: none;
}

.text-btn {
  width: 66px;
  height: 66px;
  line-height: 66px;
  background-color: #3e8cfc;
  font-size: 40px;
  font-weight: normal;
  border-radius: 50%;
  text-align: center;
}
</style>
