<template>
  <div class="main-div" id="infusion_list" v-cloak>
    <div class="header-div">
      <div class="close" @tap="go_back">
        <img src="../../assets/close.png" />关闭
      </div>
      <span class="title">输液任务</span>
    </div>
    <div class="content-box">
      <div class="box1">
        <div class="title">
          <img class="unlock" src="../../assets/unlock.png" />
          <span>输液清单</span>
          <img class="refresh" @tap="get_infusion_list" src="../../assets/refresh.png" />
        </div>
        <div class="guomin" v-if="allergy_history">过敏史：{{allergy_history}}</div>
        <div class="overflow">
          <!-- 皮试列表 -->
          <div class="item-div finish-test" v-for="(item,index) in skin_test_list" :key="index">
            <img src="../../assets/hedui_icon1.png" />
            <div class="item-div-body">
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
                  <strong :class="item.text_color">{{item.remain_time}}</strong>(分钟)
                </span>
                <span class="mr40" v-else>
                  超时时间
                  <strong class="red">{{item.remain_time}}</strong>(分钟)
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
                    class="zhyl-button finish mr20"
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

          <!-- 输液列表 -->
          <div class="item-div" v-for="(item,index) in infusion_list" :key="index">
            <img v-if="item.status ==2" src="../../assets/hedui_icon1.png" />
            <img v-else src="../../assets/hedui_icon.png" />
            <div class="item-div-body">
              <span
                v-if="item.temp_or_long == 1"
                class="type long"
                :class="item.status ==2 ? 'ccc' : ''"
              >长</span>
              <span v-else class="type short" :class="item.status ==2 ? 'ccc' : ''">临</span>
              <div class="infusion-content">
                <div class="infusion-content-item">
                  <div
                    :class="item.status == 3?'red':(item.status == 1?'green':(item.status?'ccc':''))"
                  >{{item.order_text}}</div>
                  <div class="time">
                    <span>{{item.drug_spec}}</span>
                    <button v-if="item.day > 0" class="day">第{{item.day}}天</button>
                  </div>
                </div>
              </div>
              <span class="fr">
                <button
                  class="zhyl-button pump mr20"
                  :class="item.beng_forbidden?(item.beng_status?'forbidden-finish':'forbidden'):(item.beng_status?'finish':(item.status?'forbidden':''))"
                  @tap="update_beng_status(item)"
                >泵</button>
                <button
                  class="zhyl-button"
                  :class="item.check_forbidden?(item.status == 2?'forbidden-finish':'forbidden') : (item.check_status?(item.beng_status?'':'finish'):'')"
                  @tap="infusion_check_status(item)"
                >{{item.check_text}}</button>
              </span>
            </div>
          </div>
          <!-- 分割符 -->
        </div>

        <div class="upload-more" v-if="false">
          <img src="../../assets/up_icon.png" />上滑加载
        </div>
      </div>
      <div class="right-box">
        <div class="box2 mb20">
          <div class="tab-box mb20">
            <span>输液卡一</span>
            <img class="jingbao" src="../../assets/jingbao.png" />
            <img class="lianjie" src="../../assets/lianjie.png" />
          </div>
          <div
            class="status-box"
            v-if="infusion_card.order_admin_id"
            :class="infusion_card.has_status?(infusion_card.has_status == 2?'stop':'active'):''"
          >{{infusion_card.status_text}}</div>
          <div class="status-box" v-else>暂无输液</div>
          <div class="p1" v-if="infusion_card.order_admin_id">{{infusion_card.order_text}}</div>
          <div class="p1" v-else>药名：暂无</div>
          <div class="p2">
            <span>剩余时间</span>
            <span class="gray">（min）</span>
            <span
              class="number"
              :class="infusion_card.text_color"
              v-if="infusion_card.order_admin_id"
            >{{infusion_card.remain_time}}</span>
            <span class="number" v-else>--</span>
            <a href="#keyboardPopover" @tap="setting(infusion_card.order_admin_id)">
              <img src="../../assets/setting.png" />
            </a>
          </div>
          <div
            class="half"
            v-if="infusion_card.order_admin_id && infusion_card.has_set_time == 1 && infusion_card.executed_half == 0"
          >
            <img
              v-if="infusion_card.is_half"
              src="../../assets/gou_icon.png"
              @tap="set_infusion_half(infusion_card,0)"
            />
            <img v-else src="../../assets/cirle_icon.png" @tap="set_infusion_half(infusion_card,1)" />
            <span class="active">只输半瓶</span>
          </div>
          <div class="half" v-else>
            <img v-if="infusion_card.is_half" src="../../assets/cirle_gou.png" />
            <img v-else src="../../assets/gou_wexuan.png" />
            <span>只输半瓶</span>
          </div>
          <div class="button-div" v-if="has_withdrawal">
            <button class="zhyl-button" style="width: 270px;" @tap="withdrawal_needles()">拔针</button>
          </div>
          <div class="button-div" v-else>
            <button
              v-if="infusion_card.status == 1"
              class="zhyl-button mr20"
              @tap="finish_infusion(infusion_card,1)"
            >完成</button>
            <button
              v-else
              class="zhyl-button mr20"
              :class="infusion_card.order_admin_id?'':'forbidden'"
              @tap="start_infusion(infusion_card)"
            >开始</button>
            <button
              class="zhyl-button"
              :class="infusion_card.start_time && infusion_card.order_admin_id && infusion_card.remain_time?'':'forbidden'"
              @tap="stop_infusion(infusion_card)"
            >暂停</button>
          </div>
        </div>

        <div class="box3">
          <div class="tab-box mb20">
            <div class="tab-item" :class="stop_page == 1?'active':''" @tap="get_stop_list(1)">暂停药物一</div>
            <div
              class="tab-item"
              v-if="stop_infusion_item.stop_count > 1"
              :class="stop_page == 2?'active':''"
              @tap="get_stop_list(2)"
            >暂停药物二</div>
          </div>
          <div class="status-box stop" v-if="stop_infusion_item.order_admin_id">已暂停</div>
          <div
            class="name"
            v-if="stop_infusion_item.order_admin_id"
          >{{stop_infusion_item.order_text}}</div>
          <div class="name" v-else>暂无</div>
          <div class="button-div">
            <button
              class="zhyl-button mr20"
              @tap="continue_infusion(stop_infusion_item)"
              :class="stop_infusion_item.continue_forbidden == 0 && stop_infusion_item.order_admin_id?'':'forbidden'"
            >继续</button>
            <button
              class="zhyl-button"
              @tap="finish_infusion(stop_infusion_item,2)"
              :class="stop_infusion_item.order_admin_id?'':'forbidden'"
            >抛弃</button>
          </div>
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
        <!--        <span class="error-tip">不能为空</span>-->
      </div>
      <div class="dialog-button">
        <button class="zhyl-button dialog-cancel" @tap="close_sign_dialog">取消</button>
        <button class="zhyl-button dialog-sure" @tap="confirm_result">确定</button>
      </div>
    </div>

    <!-- 核对弹窗1 -->
    <div class="check-dialog" v-show="showCheck">
      <div class="dialog-title">提示</div>
      <div class="message">
        <img class="mr30" src="../../assets/shuaka_tip.png" />
        <span>
          <div>{{order_text}}</div>
          <div class="red">皮试结果：阳性</div>
          <div>请对核对输液药物前找医生核实！</div>
          <div class="gray-text">
            <img
              v-if="gou_check"
              class="mr30"
              src="../../assets/check_icon.png"
              @tap="set_gou_check(1)"
            />
            <img v-else class="mr30" src="../../assets/uncheck_icon.png" @tap="set_gou_check(0)" />
            医嘱已修改
          </div>
        </span>
      </div>
      <div class="dialog-button">
        <button class="zhyl-button dialog-cancel" @tap="close_check_dialog">取消</button>
        <button class="zhyl-button dialog-sure" @tap="confirm_doctor_change">确定</button>
      </div>
    </div>

    <!-- 核对弹窗2 -->
    <div class="check-dialog-tip" v-show="showCheckTip">
      <img class="mr30" src="../../assets/shuaka_tip.png" />
      <span>医嘱已修改，请刷新列表</span>
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

    <!-- 输液监控器配对弹窗 -->
    <!-- <div class="submit-success-dlg">
      <div class="title">提示</div>
      <img src="../../assets/peidui_icon.png" />
      <div class="message mt30">输液监控器（一）配对中！</div>
      <div class="close mt30">3秒后自动关闭</div>
    </div>-->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      skin_test_list: [
        {
          status: 2,
          temp_or_long: 1,
          skin_test_result: '2',
          order_text: '头孢脂素类，青霉素，破伤风抗毒素等需皮试的药物名称A'
        },
        {
          status: 2,
          temp_or_long: 1,
          skin_test_result: '1',
          order_text: '头孢脂素类，青霉素，破伤风抗毒素等需皮试的药物名称B'
        },
        {
          status: 0,
          temp_or_long: 1,
          order_text: '头孢脂素类，青霉素，破伤风抗毒素等需皮试的药物名称C'
        }
      ],
      infusion_list: [
        {
          status: 1,
          temp_or_long: 0,
          order_text: '5%氯化钠注射液',
          drug_spec: '100ml / 静滴 / Bid',
          check_text: '已核',
          check_status: 'finish',
          beng_status: ''
        },
        {
          status: 1,
          temp_or_long: 0,
          order_text: '5%氯化钠注射液',
          drug_spec: '100ml / 静滴 / Bid',
          check_text: '完成',
          check_status: '',
          beng_status: 'finish'
        },
        {
          status: 3,
          temp_or_long: 0,
          order_text: '甲硫氨酸维B1注射（暂停）',
          drug_spec: '100ml / 静滴 / Bid',
          check_text: '核对',
          check_status: '',
          check_forbidden: 1,
          beng_status: ''
        }
      ],
      infusion_card: {
        order_admin_id: 1,
        order_text: '5%氯化钠注射液',
        has_status: 1,
        status_text: '正在输液中',
        remain_time: 60,
        text_color: 'green'
      },
      stop_infusion_item: { order_admin_id: 1, order_text: '甲硫氨酸维B1注射（暂停）' },
      allergy_history: '青霉素过敏',
      set_time: '',
      order_admin_id: '',
      showSign: false,
      showCheck: false,
      showCheckTip: false,
      showSure: false,
      isSetting: false,
      skin_total_time: '',
      stop_page: 1,
      skin_test_result: 1,
      result_text: '',
      order_text: '',
      check_dialog_status: 1,
      gou_check: 0
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
  margin-right: 10px;
}

.box1 .item-div .item-div-body {
  display: inline-block;
  width: 917px;
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
  right: 100px;
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
  font-size: 32px;
  color: #393939;
}

.box2 .p2 {
  height: 100px;
  line-height: 100px;
  padding-left: 30px;
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

/* 鐨瘯 */
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
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #3e8cfc;
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
</style>
