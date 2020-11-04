<template>
  <div style="height:100%;position:relative;overflow:hidden" ref="parent">
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
      console.log('parentWidth:' + this.$refs.parent.clientWidth)
      console.log('childWidth:' + this.$refs.child.clientWidth)
      if (this.$refs.parent.clientWidth < this.$refs.child.clientWidth) {
        this.$refs.child.style.transition = 'left ' + (this.$refs.child.clientWidth / 50) + 's linear'
        this.leftOffset = this.$refs.parent.clientWidth - this.$refs.child.clientWidth
      }
    })
  },
  methods: {
    handleMarqueeTransitionEnd () {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        console.log('leftOffset:' + this.leftOffset)
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