<template>
  <div style="height:100%;position:relative;overflow:hidden;flex:auto;margin:0 15px" ref="parent">
    <span
      class="marqunee-text"
      :style="marqueeStyle"
      ref="child"
      @transitionend="handleMarqueeTransitionEnd"
    >{{marqueeText || '暂无'}}</span>
  </div>
</template>

<script>
export default {
  props: {
    marqueeText: String
  },
  data () {
    return {
      leftOffset: 0
    }
  },
  computed: {
    marqueeStyle () {
      return {
        left: this.leftOffset + 'px'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$refs.parent.clientWidth < this.$refs.child.clientWidth) {
        this.$refs.child.style.transition = 'left ' + ((this.$refs.child.clientWidth - this.$refs.parent.clientWidth) / 30) + 's linear'
        this.leftOffset = this.$refs.parent.clientWidth - this.$refs.child.clientWidth
      }
    })
  },
  methods: {
    handleMarqueeTransitionEnd () {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        if (this.leftOffset === 0) {
          this.leftOffset = this.$refs.parent.clientWidth - this.$refs.child.clientWidth
        } else {
          this.leftOffset = 0
        }
      }, 2000)
    }
  }
}
</script>

<style>
.marqunee-text {
  white-space: nowrap;
  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
}
</style>