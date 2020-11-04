<template>
  <div id="con">
    <div class="main-div">
      <div class="header-div">
        <span class="title">消息中心</span>
        <span class="setting" v-if="false">设置</span>
        <span class="login-out" @click="$router.go(-1)">退出</span>
      </div>
      <div class="nav-left">
        <div class="left-item" @click="$router.replace('/')">
          <img src="../../assets/nav_index.png" /> 首页
        </div>
        <div class="left-item selected">
          <img src="../../assets/nav_news.png" /> 消息
        </div>
        <div class="left-item" @click="$router.replace('/reports')">
          <img src="../../assets/nav_report.png" /> 报告
        </div>
<!--        <div class="left-item" @click="$router.replace('/fee')">-->
<!--          <img src="../../assets/nav_pay.png" /> 缴费-->
<!--        </div>-->
        <div class="left-item" @click="$router.replace('/fee')">
          <img src="../../assets/nav_pay.png" /> 缴费
        </div>
        <div class="left-item" @click="$router.replace('/intake')">
          <img src="../../assets/nav_num.png" /> 出入量
        </div>
        <div class="left-item">
          <img src="../../assets/nav_evaluate.png" /> 评价
        </div>
      </div>

      <div class="main-content">
        <div class="message-aside">
          <div
            :class="['message-aside-menu',{selected:selectedMsgType === Number(key)}]"
            v-for="(type,key) in $store.state.message.list"
            :key="key"
            @click="$store.dispatch('switchType', Number(key))"
          >
            <img src="../../assets/news_icon1.png" class="message-type-icon" v-if="key === '1'" />
            <img src="../../assets/news_icon2.png" class="message-type-icon" v-if="key === '2'" />
            <img src="../../assets/news_icon3.png" class="message-type-icon" v-if="key === '3'" />
            <img src="../../assets/news_icon4.png" class="message-type-icon" v-if="key === '4'" />
            <img src="../../assets/news_icon5.png" class="message-type-icon" v-if="key === '5'" />
            <img src="../../assets/news_icon6.png" class="message-type-icon" v-if="key === '6'" />
            <span>{{type.name}}</span>
            <span class="message-badge" v-show="type.unread > 0"></span>
          </div>
        </div>
        <div class="message-content">
          <p class="message-type-title">{{($store.state.message.list[selectedMsgType] || {}).name}}</p>
          <div
            style="width:100%;display:inline-block;"
            v-if="Number($store.state.message.list[selectedMsgType].id) === 17"
          >
            <table>
              <thead>
                <tr style="width: 1640px;">
                  <th style="width:260px">医嘱类别</th>
                  <th style="width:400px">药物名称</th>
                  <th style="width:400px">时间</th>
                  <th style="width:220px">用药方式</th>
                  <th style="width:200px">频率</th>
                  <th style="width:240px">类别</th>
                </tr>
              </thead>
              <tbody style="vertical-align: middle;text-align: center;background-color: white;">
                <tr
                  v-for="(record,key) in $store.state.message.list[selectedMsgType].list"
                  :key="key"
                >
                  <td>{{JSON.parse(record.content).tempOrLong}}</td>
                  <td>{{JSON.parse(record.content).orderText}}</td>
                  <td>{{JSON.parse(record.content).date}}</td>
                  <td>{{JSON.parse(record.content).drugAdminstraCode}}</td>
                  <td>{{JSON.parse(record.content).drugFrequencyCode + '_' + JSON.parse(record.content).drugFrequencyName}}</td>
                  <td>{{JSON.parse(record.content).orderCategory}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="message-list" v-else-if="Number($store.state.message.list[selectedMsgType].id) === 24">
            <div
              :class="['message-item',{voice:message.contentType === 3,unread:message.isRead === '0'}]"
              v-for="(message) in $store.state.message.list[selectedMsgType].list"
              :key="`${message.msgId}-${message.fileId}`"
              @click="handleSetKey()"
            >
              <template>
                <img
                  src="../../assets/hs_hread.png"
                  style="margin-right:20px;width:60px;height:60px"
                />
                <div class="weixin-open">
                  <img
                    src="../../assets/message_3.png"
                    style="margin-right:20px;width:30px;height:30px"
                    v-if="!timesCount"
                  />
                  <img
                    src="../../assets/message_4.gif"
                    style="margin-right:20px;width:30px;height:30px"
                    v-if="timesCount"
                  />
<!--                  <img-->
<!--                    :src='timesCount'-->
<!--                    style="margin-right:20px;width:30px;height:30px"-->
<!--                    alt=""-->
<!--                  />-->
                </div>
                <span style="font-size:24px;line-height:40px;">{{message.msgTitle.length/2}}"</span>
              </template>
              <div style="flex:auto"></div>
              <span
                style="font-size:24px;color:#90909e;flex:none;line-height: 40px;margin-left:20px"
              >{{message.msgTime}}</span>
            </div>
          </div>
          <div class="message-list" v-else>
            <div
              :class="['message-item',{voice:message.contentType === 3,unread:message.isRead === '0'}]"
              v-for="(message, index) in $store.state.message.list[selectedMsgType].list"
              :key="`${message.msgId}-${message.fileId}`"
              @click="handleSetUnread(message,index)"
            >
              <template
                v-if="message.contentType === '1' || Number($store.state.message.list[selectedMsgType].id) === 20"
              >
                <div
                  style="background-color:#27D88B;width:40px;height:40px;border-radius:50%;position:relative;margin-right:20px;flex:none;"
                  v-if="message.isVoiceText"
                >
                  <span class="voice-icon" :class="{active:playingVoice === message.msgId}"></span>
                </div>
                <span
                  style="font-size:24px;line-height:40px"
                >{{message.content.split('；').map(content => content + '元').join('；')}}</span>
              </template>
              <template v-if="message.contentType === '3'">
                <img class="message-icon" src="../../assets/nurse_head.png" />
                <div class="message-voice" :class="{isRead:message.isRead}" style="margin:auto">
                  <span
                    class="voice-icon"
                    :class="{active:playingVoice === message.msgId}"
                    style="transform:rotate(-45deg) scale(1.5);left:16px;top:28px"
                  ></span>
                  <span>{{playingVoice === message.msgId ? playTimerCount + ' "' : message.voiceLen + ' "'}}</span>
                </div>
              </template>
              <template v-if="message.contentType === '4'">
                <img
                  src="../../assets/pdf_file_icon.png"
                  style="margin-right:20px;width:40px;height:40px"
                />
                <span style="font-size:24px;line-height:40px">{{message.fileName}}</span>
              </template>
              <div style="flex:auto"></div>
              <span
                style="font-size:24px;color:#90909e;flex:none;line-height: 40px;margin-left:10px"
              >{{message.msgTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showMessage } from '../../utils/utils'
export default {
  data: function () {
    return {
      messageList: [],
      playingVoice: 0,
      playTimerCount: 0,
      timesCount: false,
      times: ''
    }
  },
  computed: {
    selectedMsgType () {
      return this.$store.state.message.selectedType
    }
  },
  methods: {
    handlePlayingVoice (index) {
      var self = this
      if (self.$store.state.message.list[index].msgId === self.playingVoice) return
      clearInterval(self.$playTimer)
      self.$store.state.message.list[index].isRead = false
      self.playingVoice = self.$store.state.message.list[index].msgId
      self.playTimerCount = self.$store.state.message.list[index].voiceLen
      // TODO: playing message voice.
      self.$playTimer = setInterval(function () {
        self.playTimerCount--
        if (self.playTimerCount === 0) {
          self.playingVoice = 0
          clearInterval(self.$playTimer)
        }
      }, 1000)
    },
    handleSetUnread (message, index) {
      if (message.isRead === '0') {
        this.api.post('message/changeReadStatus', {
          msgId: message.msgId,
          fileId: message.fileId,
          recordId: message.recordId
        }).then(res => {
          if (res.data.code === 1) {
            this.$store.commit('setUnread', {
              msgType: this.selectedMsgType,
              unread: this.$store.state.message.list[this.selectedMsgType].unread - 1,
              msgTime: message.msgTime
            })
            this.$store.commit('setMsg', { fileId: message.fileId, message: { ...message, isRead: '1' } })
            switch (message.contentType) {
              case '1':
                this.playingVoice = message.msgId
                break
              case '2': break
              case '3':
                this.handlePlayingVoice(index)
                break
              case '4':
                this.$router.push('/education?src=' + encodeURIComponent(message.content))
                break
            }
          }
        })
      } else {
        switch (message.contentType) {
          case '1':
            this.playingVoice = message.msgId
            break
          case '2': break
          case '3':
            this.handlePlayingVoice(index)
            break
          case '4':
            this.$router.push('/education?src=' + encodeURIComponent(message.content))
            break
        }
      }
    },
    handleSetKey () {
      this.timesCount = !this.timesCount
      // var timesCounts = 0
      // this.times = setInterval(function () {
      //   timesCounts++
      //   this.timesCount = require('../../assets/message_' + timesCounts + '.png')
      //   console.log(this.timesCount)
      //   if (timesCounts === 3) {
      //     this.timesCount = require('../../assets/message_1.png')
      //     timesCounts = 0
      //     clearInterval(this.times)
      //   }
      // }, 1000)
    },
    // payShow () {
    //   showMessage('该功能暂未开放，敬请期待！')
    // }
  }
}
</script>

<style scoped>
tr {
  border: 1px solid #e2e2e2;
}

th,
td {
  font-weight: normal;
  padding: 10px;
  text-align: left;
}

th:first-child,
td:first-child {
  padding-left: 40px;
  text-align: left;
}

th:last-child,
td:last-child {
  padding-right: 50px;
  text-align: right;
}

table {
  width: 100%;
  font-size: 24px;
  line-height: 40px;
  border-radius: 10px;
  color: #868686;
}

thead {
  color: #393939;
  background-color: #fcfcfc;
}

.main-content {
  margin-top: 0;
  margin-left: 200px;
  height: 990px;
  width: 1720px;
  background-color: transparent;
}

.message-aside {
  width: 340px;
  height: 100%;
  float: left;
  background-color: white;
}

.message-aside-menu {
  height: 140px;
  padding: 25px 40px;
  font-size: 30px;
  color: #393939;
  display: flex;
  align-items: center;
  position: relative;
}

.message-aside-menu.selected {
  background-color: #e0ebfc;
  color: #393939;
}

.message-type-icon {
  width: 90px;
  height: 90px;
  border-radius: 30px;
  margin-right: 30px;
}

.message-badge {
  position: absolute;
  width: 20px;
  height: 20px;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  color: #333;
  border-radius: 50%;
  color: white;
  background-color: #fe384b;
  top: 25px;
  left: 113px;
}

.message-content {
  margin-left: 340px;
  height: 100%;
  padding: 35px 40px 0 40px;
  overflow: hidden;
}

.message-type-title {
  font-size: 36px;
  line-height: 45px;
  margin-bottom: 20px;
  margin-top: 0;
}

.message-list {
  height: 890px;
  border-radius: 30px 30px 0 0;
  overflow: auto;
}

.message-item {
  padding: 30px;
  background-color: white;
  display: flex;
  align-items: flex-start;
  position: relative;
}

.message-item:not(.voice) {
  border-radius: 20px;
  margin-bottom: 15px;
}

.message-item.unread::after {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fe384b;
  position: absolute;
  top: 10px;
  right: 10px;
}

.message-icon {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-right: 22px;
}

.message-voice {
  display: inline-block;
  background-color: #27d88b;
  width: 300px;
  height: 66px;
  border-radius: 35px;
  position: relative;
  font-size: 30px;
  line-height: 66px;
  padding-left: 60px;
  color: white;
}

.message-voice.isRead:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fe384b;
  top: 50%;
  margin-top: -10px;
  margin-left: 20px;
  left: 100%;
}

.message-voice:before {
  content: "";
  border-color: transparent #27d88b transparent transparent;
  border-width: 10px 22px;
  border-style: solid;
  position: absolute;
  top: 23px;
  left: -34px;
}

.voice-icon {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
  left: 12px;
  top: 17px;
  clip: rect(0, 50px, 50px, 0);
  transform: rotate(-45deg);
}

.voice-icon:before {
  content: "";
  width: 10px;
  height: 10px;
  border: 3px solid white;
  background-color: transparent;
  position: absolute;
  top: -5px;
  left: -5px;
  border-radius: 50%;
}

.voice-icon.active:before {
  animation: twinkle1 1s linear infinite;
  opacity: 0;
}

.voice-icon:after {
  content: "";
  width: 20px;
  height: 20px;
  border: 3px solid white;
  background-color: transparent;
  position: absolute;
  top: -10px;
  left: -10px;
  border-radius: 50%;
}

.voice-icon.active:after {
  animation: twinkle2 1s linear infinite;
  opacity: 0;
}

.weixin-open{
  height: 40px;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-image: url("../../assets/weixin.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

@keyframes twinkle1 {
  32% {
    opacity: 0;
  }
  33% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes twinkle2 {
  65% {
    opacity: 0;
  }
  66% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
</style>
