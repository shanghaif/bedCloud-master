<template>
  <div class="main-div" id="order_task_list" v-cloak>
    <div class="header-div">
      <div class="close" @tap="go_back">
        <img src="../../assets/close.png" />关闭
      </div>
      <span class="title">{{title}}</span>
    </div>

    <div class="content-box">
      <div class="box1" style="width: 100%">
        <div class="title-div">
          <span>{{title}}</span>
          <span class="right-box">
            <span
              v-if="type == 3"
              class="red mr30"
              style="font-weight: normal;"
            >过敏史：{{allergy_history}}</span>
            <img class="refresh" src="../../assets/refresh.png" />
          </span>
        </div>
        <div class="overflow">
          <!-- 皮试列表 -->
          <div class="item-div finish-test" v-for="(item,index) in skin_test_list" :key="index">
            <img src="../../assets/hedui_icon.png" />
            <div class="item-div-body" style="padding: 0 17px;">
              <div class="skin-content">{{item.order_text}}</div>
              <div class="time" v-if="item.status == 0">
                <span class="mr20">皮试时间（分钟）</span>
                <a
                  href="#keyboardPopover"
                  @tap="set_order_id(item.order_admin_id)"
                  v-if="item.skin_forbidden == 0"
                >
                  <input
                    class="zhyl-input input-time"
                    type="text"
                    v-model="item.total_time"
                    placeholder="请选择皮试时间"
                  />
                </a>
                <input
                  v-else
                  disabled="disabled"
                  class="zhyl-input input-time forbidden-input"
                  type="text"
                  placeholder="请选择皮试时间"
                  v-model="item.total_time"
                  @tap="set_order_id(item.order_admin_id)"
                />
                <button
                  @tap="start_skin_test(item.order_admin_id,item.skin_forbidden)"
                  class="zhyl-button fr"
                  :class="item.skin_forbidden?'forbidden-finish':'skin-test'"
                >皮试</button>
              </div>
              <div class="time" v-if="item.status == 1">
                <span class="mr40" v-if="item.over_time == 0">
                  剩余时间
                  <strong>{{item.remain_time}}</strong>(分钟)
                </span>
                <span class="mr40" v-else>
                  超时时间
                  <strong class="yellow">{{item.remain_time}}</strong>(分钟)
                </span>
                <span>
                  设定时间
                  <strong>{{item.total_time}}</strong>(分钟)
                </span>
                <span class="on-test" v-if="item.can_input == 0 && item.over_time == 0">皮试中...</span>
                <span v-else class="fr">
                  <button
                    v-if="item.can_input == 0"
                    class="zhyl-button finish fr"
                    @tap="discard_skin_test(item.order_admin_id)"
                  >抛弃</button>
                  <button
                    v-if="item.can_input == 1"
                    class="zhyl-button finish mr10"
                    @tap="confirm_skin_result(item,1)"
                  >阴</button>
                  <button
                    v-if="item.can_input == 1"
                    class="zhyl-button finish"
                    @tap="confirm_skin_result(item,2)"
                  >阳</button>
                </span>
              </div>
              <button
                class="zhyl-button yang"
                v-if="item.status == 2 && item.skin_test_result == 2"
              >阳</button>
              <button
                class="zhyl-button yin"
                v-if="item.status == 2 && item.skin_test_result == 1"
              >阴</button>
            </div>
          </div>
          <!-- 分割符 -->

          <!-- 医嘱列表 -->
          <template v-if="type != 6">
            <div class="item-div" v-for="(item,index) in order_task_list" :key="index">
              <!--img
                v-if="item.check_forbidden == 0 && item.executed_count == 0"
                src="../../assets/hedui_icon2.png"
              /-->
              <img
                v-if="item.check_forbidden == 0 && item.executed_count == item.count_num || true"
                src="../../assets/hedui_icon1.png"
              />
              <!--img
                v-if="item.check_forbidden == 0 && item.executed_count > 0 && item.executed_count < item.count_num"
                src="../../assets/hedui_icon.png"
              /-->
              <div class="item-div-body">
                <span
                  v-if="item.temp_or_long == 1"
                  class="type long"
                  :class="item.check_forbidden == 0 && item.executed_count == item.count_num ? 'ccc' : ''"
                >长</span>
                <span
                  v-else
                  class="type short"
                  :class="item.check_forbidden == 0 && item.executed_count == item.count_num ? 'ccc' : ''"
                >临</span>
                <div class="infusion-content">
                  <div class="infusion-content-item">
                    <div
                      :class="item.check_forbidden == 0 && item.executed_count == item.count_num ? 'ccc' : ''"
                    >{{item.order_text}}</div>
                    <div class="time">
                      <span>{{item.drug_spec}}</span>
                      <button v-if="item.day > 0" class="day">第{{item.day}}天</button>
                    </div>
                  </div>
                </div>
                <span class="middle fr">
                  <button
                    class="zhyl-button"
                    v-if="item.check_forbidden == 0 && item.executed_count == 0"
                    @tap="excution_doctor_order(item)"
                  >核对</button>
                  <button class="zhyl-button forbidden" v-if="item.check_forbidden == 1">核对</button>
                  <button
                    class="zhyl-button finish"
                    v-if="item.check_forbidden == 0 && item.executed_count > 0 && item.executed_count < item.count_num"
                    @tap="excution_doctor_order(item)"
                  >核对{{item.executed_count}}/{{item.count_num}}</button>
                  <button
                    class="zhyl-button forbidden-finish"
                    v-if="item.check_forbidden == 0 && item.executed_count == item.count_num"
                  >已核对</button>
                </span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="item-div" v-for="(item,index) in order_task_list" :key="index">
              <img v-if="item.check_status == 0" src="../../assets/hedui_icon2.png" />
              <img
                v-if="item.check_status == 1 && item.report_flag == 0"
                src="../../assets/hedui_icon.png"
              />
              <img
                v-if="item.check_status == 1 && item.report_flag == 1"
                src="../../assets/hedui_icon1.png"
              />
              <div class="item-div-body">
                <span
                  v-if="item.is_express == 0"
                  class="type express"
                  :class="item.status ==2 ? 'ccc' : ''"
                >急</span>
                <div class="infusion-content">
                  <div class="infusion-content-item">
                    <div :class="item.status == 2 ? 'ccc' : ''">{{item.order_text}}</div>
                    <div class="time">
                      <span>{{item.lab_application_id}}</span>
                    </div>
                  </div>
                </div>
                <span class="middle fr">
                  <button
                    class="zhyl-button"
                    v-if="item.check_status == 0"
                    @tap="check_sample(item)"
                  >核对</button>
                  <button
                    class="zhyl-button finish"
                    v-if="item.check_status == 1 && item.report_flag == 0"
                  >报告未回</button>
                  <button
                    class="zhyl-button forbidden-finish"
                    v-if="item.check_status == 1 && item.report_flag == 1"
                  >报告已回</button>
                </span>
              </div>
            </div>
          </template>
          <!-- 分割符 -->
        </div>
      </div>
    </div>

    <!-- 弹出键盘 -->
    <div id="keyboardPopover" class="mui-popover" style="display:none">
      <div class="keyboard-div">
        <button class="keyboard-item keyboard-number big">10</button>
        <button class="keyboard-item keyboard-number big">15</button>
        <button class="keyboard-item keyboard-number big">20</button>
        <button class="keyboard-item keyboard-number big">30</button>
        <button class="keyboard-item keyboard-number">1</button>
        <button class="keyboard-item keyboard-number">2</button>
        <button class="keyboard-item keyboard-number">3</button>
        <button class="keyboard-item keyboard-number">4</button>
        <button class="keyboard-item keyboard-number">5</button>
        <button class="keyboard-item keyboard-number">6</button>
        <button class="keyboard-item keyboard-number">7</button>
        <button class="keyboard-item keyboard-number">8</button>
        <button class="keyboard-item keyboard-number">9</button>
        <button class="keyboard-item" @tap="reset_number">清空</button>
        <button class="keyboard-item keyboard-number">0</button>
        <button class="keyboard-item" @tap="delete_number">删除</button>
        <button class="zhyl-button-blue" @tap="set_order_time">确定</button>
      </div>
    </div>

    <!-- 护士签名弹窗 -->
    <div class="nurse-sign-dialog" v-show="showSign">
      <div class="dialog-title">提示</div>
      <div class="message">{{order_text}}皮试结果为{{result_text}}，需双人核对刷卡签字。</div>
      <div class="input-div mt30">
        <span class="red">*</span>
        <span class="text mr20">护士签名</span>
        <input type="text" placeholder="请护士签字" class="zhyl-input" />
        <!--        <input type="text" value="张小静 工号45086" placeholder="请护士签字" class="zhyl-input" disabled="disabled" />-->
      </div>
      <div class="input-div mt30">
        <span class="red">*</span>
        <span class="text mr20">护士签名</span>
        <!--        <input type="text" placeholder="请护士签字" class="zhyl-input" disabled="disabled" />-->
        <input type="text" placeholder="请护士签字" class="zhyl-input" />
        <!--              <span class="error-tip">不能为空</span>-->
      </div>
      <div class="dialog-button">
        <button class="zhyl-button dialog-cancel" @tap="close_sign_dialog">取消</button>
        <button class="zhyl-button dialog-sure" @tap="confirm_result">确定</button>
      </div>
    </div>

    <!-- 皮试时间确定弹窗 -->
    <div class="keyboard-sure-dialog" v-show="showSure">
      <div class="dialog-title">提示</div>
      <div class="message">
        您是否确定设置皮试时间为
        <span class="red">{{skin_total_time}}</span>分钟
      </div>
      <div class="dialog-button mt90">
        <button class="zhyl-button dialog-cancel" @tap="close_sure_dialog">取消</button>
        <button class="zhyl-button dialog-sure" @tap="set_skin_time">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      type: 3,
      title: '注射任务',
      allergy_history: '青霉素过敏',
      skin_test_list: [
        {
          status: 0,
          temp_or_long: 1,
          order_text: '头孢脂素类，青霉素，破伤风抗毒素等需皮试的药物名称A'
        }
      ],
      order_task_list: [
        {
          status: 2,
          temp_or_long: 0,
          order_text: '清开灵（每支装2毫升）',
          drug_spec: '2ml / 肌注 / Bid',
          check_status: 0,
          check_forbidden: 0,
          executed_count: 0,
          count_num: 1
        },
        {
          status: 2,
          temp_or_long: 0,
          order_text: '阿米卡星0.2g（20万单位）',
          drug_spec: '0.2g / 肌注 / Q',
          check_status: 0,
          check_forbidden: 0,
          executed_count: 0,
          count_num: 1,
          day: 1
        },
        {
          status: 2,
          temp_or_long: 1,
          order_text: '氯化钾注射液（10ml:1g）/中国大家',
          drug_spec: '0.3g / 肌注 / Bid',
          check_status: 0,
          check_forbidden: 1,
          executed_count: 0,
          count_num: 1
        },
        {
          status: 2,
          temp_or_long: 1,
          order_text: '克林霉素（2ml:0.6g）',
          drug_spec: '0.25mg / 肌注 / Bid',
          check_status: 0,
          check_forbidden: 1,
          executed_count: 0,
          count_num: 1
        }
      ],
      set_time: '',
      order_admin_id: '',
      showSign: false,
      showCheck: false,
      showCheckTip: false,
      showSure: false,
      skin_total_time: '',
      stop_page: 1,
      skin_test_result: 1,
      result_text: '',
      order_text: ''
    }
  }

}
</script>

<style scoped>
.yellow {
  color: #fe6238 !important;
}

.red {
  color: red !important;
}

.green {
  color: #35bf00 !important;
}

.fr {
  position: absolute;
  right: 0;
}

.ccc {
  color: #cccccc !important;
  border-color: #cccccc !important;
}

.box1 .item-div .type.ccc {
  background-color: #f2f2f2;
}

.content-box .zhyl-button {
  width: 120px;
  height: 60px;
  font-size: 30px;
  border-radius: 30px;
  color: #3e8cfc;
  border: 4px solid #3e8cfc;
  background-color: #ffffff;
}

.zhyl-button.forbidden {
  color: #cccccc;
  border: 4px solid #cccccc;
}

.zhyl-button.forbidden-finish {
  color: #ffffff;
  background-color: #cccccc;
  border: none;
}

.zhyl-button.finish {
  color: #ffffff;
  background-color: #3e8cfc;
  border: none;
}

.content-box {
  margin: 30px 30px 0;
  display: flex;
  justify-content: space-between;
}

.box1 {
  height: 960px;
  width: 1050px;
  background-color: #ffffff;
  border-radius: 30px 30px 0 0;
}

.box1 .overflow {
  height: 780px;
  overflow: auto;
  padding: 0 40px 0 30px;
}

.box1 .guomin {
  padding: 0 0 0 40px;
  font-size: 30px;
  color: rgb(254, 56, 75);
  line-height: 60px;
}

.box1 .upload-more {
  position: absolute;
  width: 1050px;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #90909e;
}

.box1 .title {
  height: 120px;
  font-size: 36px;
  font-weight: bold;
  color: #3e8cfc;
  line-height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box1 .title .unlock {
  position: absolute;
  left: 30px;
}

.box1 .title .refresh {
  position: absolute;
  right: 40px;
}

.box1 .item-div {
  border-bottom: 1px solid #f2f2f2;
  line-height: 45px;
  position: relative;
  padding: 32px 0;
}

.box1 .item-div img {
  display: inline-block;
  vertical-align: top;
  width: 48px;
  height: 48px;
}

.box1 .item-div .item-div-body {
  display: inline-block;
  width: 927px;
}

.box1 .item-div .infusion-content {
  font-size: 36px;
  color: #393939;
  text-align: justify;
  word-break: break-all;
  display: inline-block;
  width: 600px;
  position: relative;
  line-height: 60px;
}

.box1 .item-div .time {
  height: 60px;
  line-height: 60px;
  margin-top: 15px;
}

.box1 .item-div .time span {
  font-size: 24px;
  color: #90909e;
}

.box1 .item-div .skin-test {
  position: absolute;
  right: 0;
  background-color: #fe6238;
  border: none;
  color: #ffffff;
}

.box1 .item-div .type {
  width: 48px;
  height: 48px;
  display: inline-block;
  vertical-align: top;
  line-height: 48px;
  text-align: center;
  border-radius: 50%;
  margin: 0 17px;
}

.box1 .item-div .short {
  color: #35bf00;
  background-color: #e3f7ef;
}

.box1 .item-div .long {
  color: #fe6238;
  background-color: #ffeedc;
}

.box1 .item-div .express {
  color: #fe010f;
  background-color: #fe9f8e;
}

.box1 .item-div .pump {
  width: 90px;
  text-align: center;
  font-size: 24px;
}

.box2 {
  width: 790px;
  height: 570px;
  background-color: #ffffff;
  border-radius: 30px;
  position: relative;
}

.tab-box {
  height: 120px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  position: relative;
}

.tab-box span {
  font-size: 32px;
  font-weight: bold;
  color: #3e8cfc;
  line-height: 1;
}

.tab-box .jingbao {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 85px;
}

.tab-box .lianjie {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 30px;
}

.box3 .tab-box {
  height: 100px;
}

.tab-box .tab-item {
  flex: 1;
  text-align: center;
  font-size: 32px;
  color: #90909e;
  font-weight: bold;
  line-height: 1;
}

.tab-box .tab-item.active {
  color: #4e4e4e;
}

.status-box {
  width: 730px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: auto;
  background-color: #cccccc;
  color: #ffffff;
}

.status-box.stop {
  background-color: #f47373;
}
.status-box.active {
  background-color: #35bf00;
}

.box2 .p1 {
  height: 96px;
  line-height: 96px;
  padding-left: 30px;
  border-bottom: 1px solid#e4e4e4;
  font-size: 32px;
  color: #393939;
}

.box2 .p2 {
  height: 100px;
  line-height: 100px;
  padding-left: 30px;
  border-bottom: 1px solid#e4e4e4;
  font-size: 24px;
  color: #393939;
  position: relative;
}

.box2 .p2 .gray {
  color: #4e4e4e;
}

.box2 .p2 .number {
  font-size: 72px;
  font-weight: bold;
  color: #90909e;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
}

.box2 .p2 img {
  position: absolute;
  right: 30px;
  width: 48px;
  height: 48px;
  top: 0;
  bottom: 0;
  margin: auto;
}

.box2 .half {
  margin-top: 25px;
  font-size: 30px;
  color: #90909e;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box2 .half .active {
  color: #3e8cfc;
}

.box2 .half img {
  height: 48px;
  width: 48px;
  margin-right: 10px;
}

.box3 {
  width: 790px;
  height: 350px;
  background-color: #ffffff;
  border-radius: 30px;
  position: relative;
}

.box3 .name {
  width: 730px;
  margin: auto;
  height: 100px;
  line-height: 100px;
  font-size: 32px;
  color: #393939;
}

.button-div {
  position: absolute;
  bottom: 30px;
  width: 100%;
  text-align: center;
}

.item-div.finish-test .skin-content {
  width: 760px;
}

.finish-test .yang {
  position: absolute;
  right: 0;
  color: #fe384b;
  font-weight: bold;
  background-color: #ffebed;
  border: none;
}

.finish-test .yin {
  position: absolute;
  right: 0;
  color: #35bf00;
  font-weight: bold;
  background-color: #e3f7ef;
  border: none;
}

.box1 .item-div .time strong {
  font-size: 36px;
  color: #3e8cfc;
  vertical-align: top;
  margin: 0 10px;
}

.box1 .item-div .time span.on-test {
  position: absolute;
  right: 0;
  font-size: 30px;
  color: #fe6238;
}

.box1 .item-div .skin-content {
  font-size: 36px;
  color: #393939;
  text-align: justify;
  word-break: break-all;
  display: inline-block;
  position: relative;
}

.item-div .shuaka {
  width: 860px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  font-size: 36px;
  color: #4e4e4e;
  margin: 30px auto 0;
  box-shadow: 0 0 10px 10px #cccccc26;
}

.item-div .input-time {
  background-image: url("../../assets/time_icon.png");
  background-size: 48px;
  background-repeat: no-repeat;
  background-position: right 20px center;
}

.item-div .forbidden-input {
  background-color: #f0f0f0;
}

.box1 .item-div .infusion-content-item .time {
  margin-top: 0;
}

.item-div .day {
  width: 80px;
  height: 36px;
  margin-left: 20px;
  line-height: 36px;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #3e8cfc;
  background-color: white;
  border: 2px solid #3e8cfc;
  padding: 0;
  vertical-align: middle;
}

.item-div a {
  height: 72px;
  display: inline-block;
  color: #393939;
}

.keyboard-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  width: 500px;
  margin: 60px;
}

.keyboard-div .keyboard-item {
  width: 152px;
  height: 74px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  color: #4e4e4e;
  background-color: #ffffff;
}

.keyboard-div .keyboard-item.big {
  width: 114px;
}

.keyboard-div .zhyl-button-blue {
  width: 100%;
}

.mui-popover-arrow {
  display: none;
}

.mui-backdrop {
  opacity: 0;
}

#keyboardPopover {
  width: 620px;
  height: 640px;
  border-radius: 30px;
  background-color: #3c485e;
}

.keyboard-div button:enabled:active,
.keyboard-div button.mui-active:enabled {
  background-color: #fad715;
}

/* 鎶ゅ＋绛惧悕寮圭獥 */
.nurse-sign-dialog {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 900px;
  height: 800px;
  border-radius: 30px;
  background-color: #ffffff;
  text-align: center;
  z-index: 999;
}
.dialog-title {
  font-size: 48px;
  font-weight: bold;
  color: #393939;
  padding: 50px 0;
  line-height: 1;
}
.nurse-sign-dialog .message {
  font-size: 36px;
  padding: 0 70px;
  line-height: 1.4;
}

.nurse-sign-dialog .input-div {
  height: 72px;
  font-size: 30px;
  text-align: left;
  padding-left: 70px;
}
.nurse-sign-dialog .input-div .text {
  color: #4e4e4e;
}
.nurse-sign-dialog .input-div .zhyl-input {
  width: 460px;
}
.nurse-sign-dialog .error-tip {
  font-weight: bold;
  color: #ff0000;
}
.nurse-sign-dialog .dialog-button {
  margin-top: 90px;
}
.dialog-cancel {
  width: 200px;
  height: 100px;
  border-radius: 50px;
  margin-right: 20px;
  background-color: #f2f8fd !important;
  color: #3e8cfc !important;
  font-size: 36px;
}
.dialog-sure {
  width: 200px;
  height: 100px;
  border-radius: 50px;
  font-size: 36px;
}

/* 鏍稿寮圭獥1 */
.check-dialog {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 1200px;
  height: 650px;
  border-radius: 30px;
  background-color: #ffffff;
  text-align: center;
  z-index: 999;
}
.check-dialog .message {
  display: flex;
  padding: 0 80px;
  font-size: 36px;
  color: #393939;
  line-height: 1.4;
  text-align: left;
}
.check-dialog .message img {
  width: 64px;
  height: 64px;
}
.check-dialog .message .gray-text {
  display: flex;
  align-items: center;
  font-size: 30px;
  color: #90909e;
  margin: 60px 0;
}

/* 鏍稿寮圭獥1 */
.check-dialog-tip {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 860px;
  height: 200px;
  border-radius: 30px;
  background-color: #ffffff;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: #393939;
  line-height: 1;
}

.keyboard-sure-dialog {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 765px;
  height: 450px;
  border-radius: 30px;
  background-color: #ffffff;
  text-align: center;
  z-index: 999;
}
.keyboard-sure-dialog .message {
  font-size: 36px;
  color: #393939;
  line-height: 1;
  text-align: center;
}
.mt90 {
  margin-top: 90px;
}

.order-content {
  margin: 30px 30px 0;
  background-color: #ffffff;
  border-radius: 30px 30px 0 0;
  height: 960px;
  padding: 0 30px;
  overflow: auto;
}

.order-content .zhyl-button {
  width: 120px;
  height: 60px;
  font-size: 30px;
  border-radius: 30px;
  color: #3e8cfc;
  border: 4px solid #3e8cfc;
  background-color: #ffffff;
  position: absolute;
  right: 0;
  bottom: 46px;
}

.order-content .zhyl-button.active {
  border: none;
  background-color: #3e8cfc;
  color: #ffffff;
}

.order-content .day {
  width: 80px;
  height: 36px;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #3e8cfc;
  border: 2px solid #3e8cfc;
  padding: 0;
  vertical-align: middle;
}

.title-div {
  height: 120px;
  font-size: 36px;
  font-weight: bold;
  color: #3e8cfc;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 40px 0 30px;
}

.title-div .right-box {
  position: absolute;
  right: 30px;
  display: flex;
  line-height: 1;
  align-items: center;
}

.order-content .item-div {
  border-bottom: 1px solid #f2f2f2;
  line-height: 45px;
  position: relative;
  padding: 32px 0;
}

.order-content .item-div img {
  display: inline-block;
  vertical-align: top;
  width: 48px;
  height: 48px;
}

.order-content .item-div .item-div-body {
  display: inline-block;
}

.order-content .item-div .content {
  font-size: 36px;
  color: #393939;
  text-align: justify;
  word-break: break-all;
  display: inline-block;
  width: 1610px;
  position: relative;
}

.order-content .item-div .content.small {
  width: 1525px;
}

.order-content .item-div .content .infusion-content {
  width: 580px;
  display: inline-block;
}

.order-content .item-div .gray {
  font-size: 24px;
  color: #90909e;
}

.order-content .item-div .skin-test {
  background-color: #fe6238;
  border: none;
  color: #ffffff;
}

.order-content .item-div .type {
  width: 48px;
  height: 48px;
  display: inline-block;
  vertical-align: top;
  line-height: 48px;
  text-align: center;
  border-radius: 50%;
  margin: 0 17px;
  font-size: 28px;
}

.order-content .item-div .short {
  color: #35bf00;
  background-color: #e3f7ef;
}

.order-content .item-div .long {
  color: #fe6238;
  background-color: #ffeedc;
}

.order-content .item-div .pump {
  width: 90px;
  text-align: center;
  font-size: 24px;
  position: absolute;
  right: 128px;
  background-color: #ffffff;
}

.order-content .item-div .finish {
  background-color: #cccccc;
  border: none;
  color: #ffffff;
}

.box1 .item-div .item-div-body {
  width: auto;
}
.box1 .item-div .infusion-content {
  width: 1300px;
}
.box1 .item-div .skin-content {
  width: 1395px;
}

.item-div .middle {
  top: 62px;
}
</style>
