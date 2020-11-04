<template>
  <span class="right-div">
    <slot name="custom"></slot>
    <span class="mr40" @click.stop="setting" style="display: flex;align-items: center;">
      <img class="mr10" src="../assets/setting.png" />设置
    </span>
    <span @click="sign_out" style="display: flex;align-items: center;">
      <img class="mr10" src="../assets/sign_out.png" />退出
    </span>
  </span>
</template>

<script>
export default {
  methods: {
    setting () {
      this.$bus.$emit('open-config')
    },
    sign_out () {
      this.$router.go(-1)
    }
  }
}
</script>
