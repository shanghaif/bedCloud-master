<template>
  <div class="main-div" style="display: flex;flex-direction: column;align-items:center" v-cloak>
    <div class="header-div">
      <div class="close" @click="$router.go(-1)">
        <img src="../../assets/close.png" />关闭
      </div>
      <span class="title">宣教指南详情</span>
    </div>
    <iframe
      :src="pdfSrc"
      style="width:100%;height:950px;margin:auto;margin:20px 0"
      v-if="src.split('.').pop() === 'pdf'"
    ></iframe>
    <video-player
      :options="videoOption"
      id="video-player"
      class="video-js"
      style="width:100%;height:990px"
      v-else-if="['webm','mp4'].indexOf(src.split('.').pop()) !== -1"
    />
    <iframe :src="src" style="width:100%;height:950px;margin:auto;margin:20px 0" v-else></iframe>
  </div>
</template>

<script>
import 'video.js/dist/video-js.min.css'
import VideoPlayer from '../../components/VideoPlayer'
export default {
  name: 'education-page',
  data: function () {
    return {
      src: '',
      videoOption: {
        autoplay: true
      }
    }
  },
  computed: {
    pdfSrc () {
      return 'http://192.90.111.30:8783/resource/pdfjs/web/viewer.html?file=' + encodeURIComponent(this.src)
    }
  },
  components: {
    'video-player': VideoPlayer
  },
  mounted () {
    if (this.$route.query.src) {
      this.videoOption = {
        controls: true,
        autoplay: true,
        preload: 'auto',
        sources: [
          {
            src: 'http://192.90.111.30:8783/resource' + decodeURIComponent(this.$route.query.src),
            type: 'video/webm'
          }
        ]
      }
      this.$nextTick(() => {
        this.src = 'http://192.90.111.30:8783/resource' + decodeURIComponent(this.$route.query.src)
      })
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.close:active {
  background-color: #e7e7e7;
}
</style>
