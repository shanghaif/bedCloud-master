<template>
  <div class="main-div" id="hospital_login" v-cloak>
    <div class="login">
      <div class="close" @click="$router.go(-1)">
        <img src="../assets/close_white.png" />关闭
      </div>
      <div class="login-mode">
        <div class="p1">登陆方式</div>
        <div class="flex-box">
          <div class="box">
            <div class="top">
              <div style="margin-bottom:8px">医生、护士</div>
              <div>实施人员、护工</div>
            </div>
            <div class="middle">刷卡登陆</div>
            <div class="img-div">
              <img src="../assets/login_icon1.png" />
            </div>
          </div>
          <div class="box">
            <div class="top">
              <div>患者</div>
            </div>
            <div class="middle">刷手环登陆</div>
            <div class="img-div">
              <img src="../assets/login_icon2.png" />
            </div>
          </div>
          <div class="box">
            <div class="top">
              <div style="margin-bottom:8px">医护实习生</div>
              <div>患者家属</div>
            </div>
            <div class="middle">扫描二维码</div>
            <div class="img-div">
              <img src="../assets/login_icon3.png" />
            </div>
          </div>
          <div class="box">
            <div class="top">
              <div style="margin-bottom:8px">医生、护士</div>
              <div>实施人员、护工</div>
            </div>
            <div class="middle">账户登陆</div>
            <div class="img-div">
              <img src="../assets/login_icon4.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="login-box">
        <div style="height: 120px;padding-top: 60px;">
          <div v-if="showMsg" class="error-msg-tip">
            <img src="../assets/error-msg.png" />
            {{msg}}
          </div>
        </div>
        <h1>账户登陆</h1>
        <div class="mb30">
          <input
            type="text"
            class="zhyl-input mb30"
            v-model="username"
            placeholder="请输入工号"
            @click.stop="handleKeyboard(1)"
          />
        </div>
        <div class="mb30">
          <input
            type="password"
            class="zhyl-input mb30"
            v-model="password"
            placeholder="请输入密码"
            @click.stop="handleKeyboard(2)"
          />
        </div>
        <button class="zhyl-button-blue" @click="login">登录</button>
        <div class="keyboard-div">
          <button class="keyboard-item keyboard-number">1</button>
          <button class="keyboard-item keyboard-number">2</button>
          <button class="keyboard-item keyboard-number">3</button>
          <button class="keyboard-item keyboard-number">4</button>
          <button class="keyboard-item keyboard-number">5</button>
          <button class="keyboard-item keyboard-number">6</button>
          <button class="keyboard-item keyboard-number">7</button>
          <button class="keyboard-item keyboard-number">8</button>
          <button class="keyboard-item keyboard-number">9</button>
          <button class="keyboard-item" @click="reset">清空</button>
          <button class="keyboard-item keyboard-number">0</button>
          <button class="keyboard-item" @click="deleteNum">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data: function () {
    return {
      username: '',
      password: '',
      showMsg: false
    }
  },
  mounted () {
    /* document.body.onclick = function () {
      $('.keyboard-number').off('click')
    } */
  },
  methods: {
    handleKeyboard (type) {
      const self = this
      $('.keyboard-number').off('click')
      $('.keyboard-number').on('click', function (ev) {
        ev.stopPropagation()
        self.$nextTick(() => {
          if (type === 1) {
            self.username += this.innerText
          } else {
            self.password += this.innerText
          }
        })
      })
    },
    login () {

    },
    reset () {

    },
    deleteNum () {

    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #5897f0;
  position: relative;
}

.login .close {
  position: absolute;
  left: 30px;
  top: 40px;
  font-size: 30px;
  color: #ffffff;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.login .close img {
  width: 48px;
  height: 48px;
  margin-right: 10px;
}

.login-mode {
  width: 1100px;
  padding-top: 280px;
  margin: 0 50px;
  color: #ffffff;
}

.login-mode .p1 {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  position: relative;
  line-height: 1;
}

.login-mode .p1::before {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 468px;
  margin: auto;
  height: 1px;
  background-color: #f2f8fd;
}

.login-mode .p1::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 468px;
  margin: auto;
  height: 1px;
  background-color: #f2f8fd;
}

.login-mode .flex-box {
  display: flex;
  margin-top: 40px;
  text-align: center;
}

.login-mode .flex-box .box {
  flex: 1;
}

.login-mode .flex-box .top {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 110px;
  font-size: 24px;
  font-weight: bold;
  line-height: 28px;
}

.login-mode .flex-box .middle {
  width: 120px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #5897f0;
  background-color: #cee1fb;
  border-radius: 15px;
  margin: auto;
}

.login-mode .flex-box .img-div {
  margin-top: 25px;
}

.login-mode .flex-box .img-div img {
  width: 159px;
  height: 160px;
}

.login-box {
  border-radius: 20px;
  height: 1000px;
  width: 680px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 40px;
  margin: auto;
  background-color: #ffffff;
  text-align: center;
}

.login-box .error-msg-tip {
  width: 600px;
}

.login-box h1 {
  font-size: 36px;
  font-weight: bold;
  color: #3e8cfc;
  height: 70px;
  line-height: 1;
  padding-top: 5px;
  text-align: left;
  padding-left: 90px;
}

.login-box .zhyl-button-blue {
  width: 500px;
}

/* 登录键盘 */
.keyboard-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  width: 500px;
  margin: 28px auto 0;
}

.keyboard-div .keyboard-item {
  width: 152px;
  height: 74px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  color: #4e4e4e;
  background-color: white;
}

.keyboard-div button:enabled:active,
.keyboard-div button.mui-active:enabled {
  background-color: #fad715;
}
</style>
