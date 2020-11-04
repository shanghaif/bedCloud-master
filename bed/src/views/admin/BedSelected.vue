<template>
  <div class="main-div" id="bed_choice" v-cloak>
    <div class="header-div" style="position:relative">
      <div class="close" @click="$router.go(-1)">
        <img src="../../assets/close.png" />关闭
      </div>
      <span class="title">床位配置</span>
      <div
        @click.stop="getBedsList"
        style="position:absolute;display: flex;align-items: center;top:0;right:40px"
      >
        <img class="mr10" src="../../assets/refresh.png" />
        <span style="font-size:30px;color: #90909e;">刷新</span>
      </div>
    </div>
    <div class="choose-tip">
      <span>已选中</span>
      <span class="box1 mr40"></span>
      <span>可选</span>
      <span class="box3 mr40"></span>
      <span>不可选</span>
      <span class="box4"></span>
    </div>
    <div class="bed-content">
      <div
        class="bed-item"
        :class="bed.isSelect == '1' ? (bed.bedId == selectedBedId ? 'configured':'forbid') : (bed.bedId == selectedBedId ? 'selection' : '')"
        v-for="bed in bedList"
        :key="bed.bedId"
        @click="handleSelectBed(bed)"
      >
        <img class="mb20" src="../../assets/white_bed.png" v-if="bed.bedId == selectedBedId" />
        <img class="mb20" src="../../assets/defalt_bed.png" v-else />
        <div>{{bed.bedName}}</div>
      </div>
    </div>
    <div class="selection-info">
      <div class="left-box" v-if="selectedBedId">
        <span>已选床位：</span>
        <span class="bed-name">{{selectedBed.bedName}}</span>
      </div>
      <button class="zhyl-button-blue" @click="handleBindBed">确定选床</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      bedList: [],
      selectedBedId: ''
    }
  },
  computed: {
    selectedBed () {
      return this.bedList.find(bed => bed.bedId === this.selectedBedId) || {}
    }
  },
  mounted () {
    this.getBedsList()
  },
  methods: {
    handleSelectBed (bed) {
      this.selectedBedId = bed.bedId
    },
    getBedsList () {
      this.api.post('bedside/getBedList').then(res => {
        if (res.data.code === 1) {
          this.bedList = res.data.data.bedList
        } else {
          this.bedList = []
        }
      })
    },
    handleBindBed () {
      if (this.selectedBedId) {
        this.api.post('bedside/setBed', {
          bedId: this.selectedBedId
        }).then(res => {
          if (res.data.code === 1) {
            this.$router.replace('/')
            window.plus.saveSpStr('bindBed', this.selectedBed.bedName)
            this.$store.commit('bindBed', this.selectedBed.bedName)
            this.$bus.$emit('refresh-homedata')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.close:active {
  background-color: #e7e7e7;
}
.bed-info {
  padding: 0 60px;
  box-sizing: border-box;
  height: 112px;
  border-top: 1px solid #f2f2f2;
  font-size: 30px;
  line-height: 112px;
  color: #90909e;
  background-color: #ffffff;
}
.bed-info .name {
  color: #4e4e4e;
}
.bed-info .bed-num {
  width: 120px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  border-radius: 45px;
  background-color: #27d88b;
  color: #ffffff;
  text-align: center;
}
.choose-tip {
  height: 106px;
  line-height: 106px;
  font-size: 24px;
  color: #90909e;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.choose-tip .box1 {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #3e8cfc;
  margin-left: 15px;
}
.choose-tip .box2 {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #27d88b;
  margin-left: 15px;
}
.choose-tip .box3 {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-left: 15px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
}
.choose-tip .box4 {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-left: 15px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  background-color: #e1e4ee;
}
.bed-content {
  font-size: 0;
  margin-left: 60px;
  display: flex;
  flex-wrap: wrap;
  color: #4e4e4e;
  padding-bottom: 120px;
}
.bed-content .bed-item {
  width: 162px;
  height: 162px;
  border-radius: 30px;
  font-size: 30px;
  background-color: #ffffff;
  margin-right: 20px;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.bed-content .bed-item img {
  width: 90px;
  height: 60px;
}
.bed-content .forbid {
  color: #90909e;
  background-color: #e1e4ee;
}
.bed-content .configured {
  color: #ffffff;
  background-color: #27d88b;
}
.bed-content .selection {
  color: #ffffff;
  background-color: #3e8cfc;
}
.selection-info {
  background-color: #ffffff;
  height: 120px;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.selection-info .left-box {
  position: absolute;
  left: 60px;
  font-size: 30px;
  color: #90909e;
}
.selection-info .left-box .bed-name {
  color: #ffffff;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 45px;
  background-color: #3e8cfc;
  display: inline-block;
}
</style>
