<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  created () {
    window.app = this
    window.plus.registSocketListener()
    const bindRoom = process.env.NODE_ENV !== 'production' ? '' : window.plus.getSpStr('bindRoom')
    if (!bindRoom) {
      this.axios.post('device/bindcheck', {
        deviceCode: process.env.NODE_ENV !== 'production' ? 'EGP6CUQSEL' : window.plus.getMac()
      }).then(res => {
        if (res.data.code === 1) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('department')
          } else {
            window.plus.saveSpStr('bindRoom', res.data.data.name)
          }
          this.$store.commit('bindRoom', res.data.data.name)
          if (res.data.data.name) {
            this.$router.replace('/')
          }
        }
      })
    } else {  
      this.$store.commit('bindRoom', bindRoom)
      this.$router.replace('/')
    }
  },
  methods: {
    /* onSocketMessage (msg) {
      let socketData = JSON.parse(msg);
      console.log(socketData)
      switch (socketData.code) {
        case 'CALL': {
          if (socketData.data.deviceType === '1') {
            if (socketData.data.onoff === '1') {
              this.$router.replace('/bathCall?name=' + socketData.data.voiceMsg)
            } else {
              this.$router.replace('/')
            }
          }
        }
      }
    }, */
    // 安卓调用的函数，刷卡返回内容
    icInfo_callback () {
      if (this.$route.path === '/bathCall') {
        if (!this.$currentBathCall) {
          return
        }
        this.axios.post('http://192.90.111.30:8787/accurateCall/toiletCall', {
          deviceCode: this.$currentBathCall,
          proxyDeviceCode: window.plus.getMac(),
          onoff: 0
        }).then(res => {
          if (res.data.code === 1) {
            this.$router.replace('/')
            window.plus.closeLed()
          }
        })
      } else {
        this.$router.replace('/detail')
      }
    },
    // 安卓调用的函数，卫浴返回内容
    wy_callback (deviceCode) {
      this.$currentBathCall = deviceCode
      console.log(this.$store.state.bindRoom, '绑定的病房')
      if (this.$store.state.bindRoom) {
        this.axios.post('http://192.90.111.30:8787/accurateCall/toiletCall', {
          deviceCode,
          proxyDeviceCode: window.plus.getMac(),
          onoff: 1
        }).then(res => {
          if (res.data.code === 1) {
            this.$router.replace('/bathCall?name=' + this.$store.state.bindRoom)
            window.plus.openLed() 
          }
        })
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul,
ol {
  list-style: none;
}

html,
body {
  height: 100%;
}
</style>
