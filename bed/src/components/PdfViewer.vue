<template>
  <div style="width:100%;height:100%;position:relative">
    <div class="tool-bar top">
      <span style="font-size:14px;color:white;margin-left:10px">{{fileName}}</span>
      <span></span>
    </div>
    <canvas ref="canvas"></canvas>
    <div class="tool-bar bottom"></div>
  </div>
</template>

<script>
import pdfjsLib from 'pdfjs-dist/webpack'
import { showMessage } from '../utils/utils'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      padgeNum: 1,
      pageTotal: 0,
      rendering: true
    }
  },
  watch: {
    padgeNum (newIndex) {
      if (newIndex <= 0) {
        showMessage('已经是第一页了！')
        return
      }
      if (newIndex > this.pageTotal) {
        showMessage('已经是最后一页了！')
        return
      }
      if (this.rendering) {
        this.$pageBuffer = newIndex
      } else {
        this.renderPage(newIndex)
      }
    }
  },
  mounted () {
    this.$pageBuffer = null
    console.log(this.url)
    pdfjsLib.getDocument(this.url).promise.then(pdf => {
      this.$pdfDoc = pdf
      this.pageTotal = pdf.numPages
      this.renderPage(this.padgeNum)
    })
  },
  methods: {
    renderPage (num) {
      if (this.$pdfDoc) {
        this.rendering = true
        this.$pdfDoc.getPage(num).then(page => {
          const width = this.$el.clientWidth
          const height = this.$el.clientHeight
          const viewport = page.getViewport({ scale: 1 })
          const scale = Math.min(height / viewport.height, width / viewport.width)
          const scaledViewport = page.getViewport({ scale: scale })
          const context = this.$refs.canvas.getContext('2d')
          this.$refs.canvas.height = scaledViewport.height
          this.$refs.canvas.width = scaledViewport.width
          const renderTask = page.render({
            canvasContext: context,
            viewport: scaledViewport
          })
          renderTask.promise.then(() => {
            this.rendering = false
            if (this.$pageBuffer !== null) {
              this.renderPage(this.$pageBuffer)
              this.$pageBuffer = null
            }
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.tool-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.6);
}
.tool-bar.bottom {
  bottom: 0;
}
.tool-bar.top {
  top: 0;
}
</style>
