<template>
  <div class="container">
    <div class="main-div" id="room_choice" v-cloak>
      <div class="header-div">
        <div class="close" @click="$router.go(-1)">
          <img src="../assets/close.png" style="width:40px;height:40px" />
          <span>关闭</span>
        </div>
        <span class="title">请选择病房</span>
      </div>
    </div>
    <div class="room-content">
      <div
        class="room-item"
        :class="room.isSelect == '1' ? (room.roomId == selectedRoomId ? 'configured':'forbid') : (room.roomId == selectedRoomId ? 'selection' : '')"
        v-for="room in roomList"
        :key="room.roomId"
        @click="selectedRoomId = room.roomId"
      >
        <div>{{room.roomName}}</div>
      </div>
    </div>
    <div class="selection-info">
      <div class="left-box" v-if="selectedRoomId > 0">
        <span>已选房间：</span>
        <span class="room-name">{{selectedRoom.roomName}}</span>
      </div>
      <button class="bind-room-btn" @click="handleBindRoomCheck">选择病房</button>
    </div>
    <template v-if="selectedConfirm">
      <div class="shadow"></div>
      <div class="confirm-dialog">
        <p style="font-size:50px;font-weight:bold;line-height:80px">提示</p>
        <p style="font-size:30px">该房间已被选用，是否仍选择该房间？</p>
        <img
          src="../assets/close_dlg.png"
          style="width:48px;height:48px;position:absolute;top:15px;right:15px"
          @click="selectedConfirm = false"
        />
        <div class="confirm-btn-container">
          <div
            class="confirm-dialog-btn"
            style="background-color:#f2f8fd;color:#3e8cfc"
            @click="selectedConfirm = false"
          >取消</div>
          <div
            class="confirm-dialog-btn"
            style="background-color:#3e8cfc;color:#f2f8fd"
            @click="handleBindroom"
          >确定</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data: function () {
    return {
      selectedConfirm: false,
      roomList: [],
      selectedRoomId: 0
    }
  },
  computed: {
    selectedRoom () {
      return this.roomList.find(room => room.roomId === this.selectedRoomId) || {}
    }
  },
  mounted () {
    this.axios.post('gate/getRoomList', {
      deviceCode: process.env.NODE_ENV !== 'production' ? 'EGP6CUQSEL' : window.plus.getMac()
    }).then(res => {
      if (res.data.code === 1) {
        this.roomList = res.data.data.roomList
      } else {
        Message.error(res.data.msg)
      }
    }).catch(() => {
      Message.error('网络连接失败，请稍后再试！')
    })
  },
  methods: {
    handleBindRoomCheck () {
      if (this.selectedRoom.isSelect === 1) {
        this.selectedConfirm = true
      } else {
        this.handleBindroom()
      }
    },
    handleBindroom () {
      this.axios.post('gate/setRoom', {
        deviceCode: process.env.NODE_ENV !== 'production' ? 'EGP6CUQSEL' : window.plus.getMac(),
        roomId: this.selectedRoom.roomId
      }).then(res => {
        if (res.data.code === 1) {
          console.log('储存的病床id', this.selectedRoom.roomName)
          this.$store.commit('bindRoom', this.selectedRoom.roomName)
          this.$router.replace('/')
        } else {
          Message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: #f2f8fd;
  height: 100%;
}
.close {
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 24px;
  font-weight: normal;
}
.header-div {
  background-color: #ffffff;
  line-height: 80px;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  position: relative;
  margin-bottom: 30px;
  box-shadow: 2px 2px 15px #e8e9ef;
  flex: none;
}
.room-info {
  padding: 0 60px;
  box-sizing: border-box;
  height: 112px;
  border-top: 1px solid #f2f2f2;
  font-size: 30px;
  line-height: 112px;
  color: #90909e;
  background-color: #ffffff;
}
.room-info .name {
  color: #4e4e4e;
}
.room-info .room-num {
  width: 120px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  border-radius: 45px;
  background-color: #27d88b;
  color: #ffffff;
  text-align: center;
}
.room-content {
  display: flex;
  flex-wrap: wrap;
  color: #4e4e4e;
  padding: 0 20px;
  margin: -10px;
  flex: auto;
  align-content: flex-start;
}
.room-content .room-item {
  width: 110px;
  height: 80px;
  border-radius: 20px;
  font-size: 24px;
  background-color: #ffffff;
  margin: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 1px 1px 5px #e7e7e7;
}
.room-content .room-item img {
  width: 90px;
  height: 60px;
}
.room-content .forbid {
  color: #90909e;
  background-color: #e1e4ee;
}
.room-content .configured {
  color: #ffffff;
  background-color: #27d88b;
}
.room-content .selection {
  color: #ffffff;
  background-color: #3e8cfc;
}
.selection-info {
  background-color: #ffffff;
  height: 100px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}
.selection-info .left-box {
  position: absolute;
  left: 20px;
  font-size: 26px;
  color: #90909e;
}
.selection-info .left-box .room-name {
  color: #3e8cfc;
  font-size: 24px;
  width: 90px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 10px;
  background-color: #ecf4ff;
  display: inline-block;
}
.bind-room-btn {
  width: 260px;
  height: 50px;
  background-color: #3e8cfc;
  border: none;
  border-radius: 10px;
  font-size: 24px;
  color: white;
  outline: none;
}
.bind-room-btn:active {
  background-color:#89b9fd;
}
.shadow {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
  z-index: 9998;
  position: fixed;
  top: 0px;
  left: 0px;
}
.confirm-dialog {
  position: fixed;
  z-index: 9999;
  width: 450px;
  height: 300px;
  padding: 20px 50px;
  background-color: white;
  left: 50%;
  margin-left: -225px;
  top: 400px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  text-align: center;
}
.confirm-btn-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 26px;
}
.confirm-dialog-btn {
  width: 150px;
  line-height: 60px;
  border-radius: 30px;
}
</style>
