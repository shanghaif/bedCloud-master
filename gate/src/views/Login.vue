<template>
  <div class="container">
    <div class="ward-container">
      <div class="head-avtar-container">
        <img class="head-avatar" src="../assets/admin_head.png" />
      </div>
      <p class="ward-title">病房</p>
      <input
        :value="$store.state.bindRoom"
        class="ward-input"
        placeholder="尚未分配病房"
        @click="handleSelectRoom"
      />
    </div>
    <p class="copy-right">版权所有：湖南新云医疗装备工业有限公司 版本号：version 1.0</p>
  </div>
</template>

<script>
export default {
  computed: {
    isBinded () {
      return this.$store.state.bindRoom !== ''
    }
  },
  watch: {
    isBinded: {
      immediate: true,
      handler: function (bind) {
        if (bind) {
          setTimeout(() => {
            this.$router.replace('/')
          }, 2000)
        }
      }
    }
  },
  methods: {
    handleSelectRoom () {
      if (!this.isBinded) {
        this.$router.push('/roomSelect')
      }
    }
  }
}
</script>

<style>
.container {
  background-color: #5897f0;
  height: 100%;
}

.ward-container {
  width: 680px;
  height: 400px;
  padding: 0 90px;
  position: absolute;
  top: 400px;
  left: 50%;
  margin-left: -340px;
  background-color: white;
  border-radius: 30px;
}

.head-avtar-container {
  width: 200px;
  height: 200px;
  position: absolute;
  top: -130px;
  left: 50%;
  margin-left: -100px;
  background-color: white;
  border-radius: 50%;
}

.head-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin: 20px;
}

.ward-title {
  color: #3e8cfc;
  font-size: 36px;
  font-weight: bold;
  margin-top: 125px;
}

.ward-input {
  width: 500px;
  height: 72px;
  font-size: 30px;
  margin-top: 45px;
  padding: 12px 30px 12px 25px;
  border: none;
  outline: none;
  color: #90909e;
  background-color: #f2f8fd;
  border-radius: 10px;
}

.ward-input:focus {
  border: none;
  outline: none;
}

.copy-right {
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: #f2f8fd;
  position: absolute;
  bottom: 50px;
}
</style>