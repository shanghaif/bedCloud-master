<template>
  <div id="con" style="display: flex;flex-direction: column;height: 100%;overflow: hidden;">
    <div class="top-bar">
      <span>
        <img src="../assets/logo.png" style="width:32px;height:24px;margin-right:20px" />
        <span style="color:#0091DB;margin-right:15px">医护分机</span>
        <span>{{$store.getters.currentDate}}</span>
      </span>
      <span style="display: flex;">
        <span style="margin-right:30px;line-height: 32px;" @click.stop="openConfig">设置</span>
        <span style="margin-right:30px;line-height: 32px;">{{`${$store.state.bindInfo.hospitalName}  ${$store.state.bindInfo.areaName}  ${$store.state.bindInfo.name}`}}</span>
      </span>
    </div>
    <div class="main-content" style="postion:relative">
      <transition-group
        class="notice-list"
        name="notice"
        tag="div"
        style="position:absolute;width:100%"
      >
        <div class="notice-item" v-for="notice in noticeList" :key="notice.channelId">
          <div>
            <div style="line-height: 1;">
              <span style="font-size:28px">{{notice.targetName}}</span>
            </div>
            <div style="margin-top:10px">患者呼叫！</div>
          </div>
          <img src="../assets/notice_call_icon.png" style="width:48px;height:48px;margin-top:-10px" />
        </div>
      </transition-group>
      <router-view style="flex: auto;"></router-view>
      <ul class="nav-right">
        <li
          :class="[{selected:$route.path === '/list/beds'},'nav-right-item']"
          @click="$router.push('/list/beds')"
        >患者一览</li>
        <li
          :class="[{selected:$route.path === '/list/nurses'},'nav-right-item']"
          @click="$router.push('/list/nurses')"
        >护士一览</li>
<!--        <li-->
<!--          :class="[{selected:$route.path === '/list/doctors'},'nav-right-item']"-->
<!--          @click="$router.push('/list/doctors')"-->
<!--        >医生一览</li>-->
        <li
          :class="[{selected:$route.path === '/phonebook'},'nav-right-item']"
          @click="$router.push('/phonebook')"
        >电话薄</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    noticeList () {
      return this.$store.state.noticeList
    }
  },
  methods: {
    openConfig () {
      this.$eventBus.$emit('open-config')
    }
  }
}
</script>

<style>
</style>
