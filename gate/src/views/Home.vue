<template>
  <div class="container">
    <div style="font-size:80px;margin-bottom:20px">
      {{$store.state.bindRoom}}
      <span
        style="font-size:60px"
        v-if="bedList.length > 0 "
      >{{`（${bedList[0].bedName}-${bedList[bedList.length - 1].bedName}）`}}</span>
    </div>
    <div class="bed-list">
      <div
        :class="['bed-list-items', {new:isNewPatient(bed.inTime)}]"
        v-for="bed in bedList"
        :key="bed.bedName"
        @click="lightOn"
      >
        <div style="flex:auto;align-self:stretch;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between">
          <p>
            <span style="font-size:50px;font-weight:bold;letter-spacing:1rem">{{bed.bedName}}</span>
            <span
              style="font-size:40px"
            >{{bed.patientName ? bed.patientName.substr(0,1) + '*' + bed.patientName.substr(2) : '暂无'}}</span>
          </p>
          <p
            :hidden="!bed.inTime"
            style="font-size:22px;padding:5px 10px;border:2px solid #5897f0;border-radius:30px;color:black;font-weight:bold"
          >{{'入院时间：' + formatDate(bed.inTime)}}</p>
          <p
            style="font-size:22px;padding:5px 10px;border:2px solid red;background-color:red;border-radius:30px;color:white;font-weight:bold"
            v-if="bed.level === '一级护理'"
          >一级护理</p>
          <p
            style="font-size:22px;padding:5px 10px;border:2px solid #5897f0;background-color:#5897f0;border-radius:30px;color:white;font-weight:bold"
            v-else-if="bed.level === '二级护理'"
          >二级护理</p>
          <p v-else style="height:43px"></p>
        </div>
        <div class="stuff-info">
          <img
            class="stuff-avatar"
            :src="'http://192.90.111.30:8783/resource/' + bed.nursePic"
            v-if="bed.nursePic"
          />
          <img class="stuff-avatar" src="../assets/nurse_avatar.png" v-else />
          <p>{{bed.nurseTitle || '管床护士'}}</p>
          <p>{{bed.nurseName || '暂无'}}</p>
        </div>
        <div class="stuff-info">
          <img
            class="stuff-avatar"
            :src="'http://192.90.111.30:8783/resource/' + bed.doctorPic"
            v-if="bed.doctorPic"
          />
          <img class="stuff-avatar" src="../assets/doctor_avatar.png" v-else />
          <p>{{bed.doctorTitle || '管床医生'}}</p>
          <p>{{bed.doctorName || '暂无'}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data: function () {
    return {
      date: Math.round(new Date().getTime() / 1000),
      bedList: []
    }
  },
  computed: {
    dateTime () {
      return moment(this.date).format('MM月DD日 HH:mm dddd')
    }
  },
  mounted () {
    this.axios.post('gate/init', {
      deviceCode: process.env.NODE_ENV !== 'production' ? 'EGP6CUQSEL' : window.plus.getMac()
    }).then(res => {
      if (res.data.code === 1) {
        this.bedList = res.data.data.bedList
      }
    })
    setInterval(() => {
      this.axios.post('gate/init', {
        deviceCode: process.env.NODE_ENV !== 'production' ? 'EGP6CUQSEL' : window.plus.getMac()
      }).then(res => {
        if (res.data.code === 1) {
          this.bedList = res.data.data.bedList
        }
      })
    }, 600000)
  },
  methods: {
    isNewPatient (date) {
      return moment().isSame(date, 'day');
    },
    formatDate (date) {
      return date ? moment(date).format('YYYY年MM月DD日') : '暂无'
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #5897f0;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 30px;
  padding-top: 0;
  color: white;
}

.status-info {
  position: absolute;
  top: 3.75vh;
  right: 20px;
  text-align: right;
}

.status-time {
  font-size: 3.75vh;
}

.status-version {
  font-size: 2.25vh;
  margin-top: 1.25vh;
}

.bed-list {
  margin: 5px -20px 5px -20px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: auto;
  justify-content: flex-start;
  overflow: auto;
}

.bed-list-items {
  flex: none;
  height: 267px;
  margin: 10px;
  padding: 40px 0px 25px 10px;
  background-color: white;
  border-radius: 30px;
  color: #3e8cfc;
  text-align: center;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.bed-list-items.new:after {
  content: "新";
  position: absolute;
  font-size: 24px;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: red;
  color: white;
  line-height: 40px;
}

.bed-name {
  letter-spacing: 1rem;
  font-size: 5.5vh;
  font-weight: bold;
  margin-bottom: 1vh;
}

.bed-patient-name {
  font-size: 4.5vh;
  margin-bottom: 5vh;
}

.stuff-info {
  text-align: center;
  color: #393939;
  font-size: 24px;
  font-weight: bold;
  display: inline-block;
  width: 200px;
}

.stuff-info + .stuff-info {
  margin-left: 20px;
}

.stuff-avatar {
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
}
</style>