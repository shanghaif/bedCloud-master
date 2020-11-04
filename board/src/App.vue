<template>
  <article>
    <header style="flex:none">
      <span>小儿外科护理单元信息展示</span>
      <span style="position:absolute;right:6px">{{currentDate}}</span>
    </header>
    <div style="flex:auto;display:flex;padding:15px 10px;color: #6b6b6b;">
      <section style="width: 816px;flex:none;display:flex;flex-direction:column;margin-right:10px">
        <section style="flex:none;margin-bottom:10px">
          <table class="hospital-table" border>
            <tr>
              <td colspan="2" style="text-align:left">
                <span style="display:inline-block;width:50%">科主任：{{boardData.deptLeader}}</span>
                <span style="display:inline-block;width:50%">护士长：{{boardData.matron}}</span>
              </td>
              <td class="label">住院人数</td>
              <td>
                <marquee-text :marquee-text="boardData.inHospitalCount"></marquee-text>
              </td>
            </tr>
            <tr>
              <td class="label">{{`今日出院 (${countNum(boardData.todayOut)})`}}
              </td>
              <td>
                <span v-if=" !boardData.todayOut ||( boardData.todayOut.length <= 27)">{{boardData.todayOut||'暂无'}}</span>
                <marquee-text scrollamount="1"  v-if="boardData.todayOut && boardData.todayOut.length > 27" :marquee-text="boardData.todayOut"></marquee-text>
              </td>
              <td class="label">{{`今日手术 (${countNum(boardData.todayOperation)})`}}</td>
              <td>
<!--                <marquee-text :marquee-text="boardData.todayOperation"></marquee-text>-->
                <span v-if=" !boardData.todayOperation ||( boardData.todayOperation.length <= 27)">{{boardData.todayOperation||'暂无'}}</span>
                <marquee-text scrollamount="1"  v-if="boardData.todayOperation && boardData.todayOperation.length > 27" :marquee-text="boardData.todayOperation"></marquee-text>
              </td>
            </tr>
            <tr>
              <td class="label">{{`今日转出 (${countNum(boardData.todayChangeOut)})`}}</td>
              <td colspan="1">
<!--                <marquee-text :marquee-text="boardData.todayChangeOut"></marquee-text>-->
                <span v-if=" !boardData.todayChangeOut ||( boardData.todayChangeOut.length <= 27)">{{boardData.todayChangeOut||'暂无'}}</span>
                <marquee-text scrollamount="1"  v-if="boardData.todayChangeOut && boardData.todayChangeOut.length > 27" :marquee-text="boardData.todayChangeOut"></marquee-text>
              </td>

              <td class="label">{{`明日手术 (${countNum(boardData.tomorrowOperation)})`}}</td>
              <td>
<!--                <marquee-text :marquee-text="boardData.tomorrowOperation"></marquee-text>-->
                <span v-if=" !boardData.tomorrowOperation ||( boardData.tomorrowOperation.length <= 27)">{{boardData.tomorrowOperation||'暂无'}}</span>
                <marquee-text scrollamount="1"  v-if="boardData.tomorrowOperation && boardData.tomorrowOperation.length > 27" :marquee-text="boardData.tomorrowOperation"></marquee-text>
              </td>
            </tr>
            <tr>
              <td class="label">{{`今日入院 (${countNum(boardData.todayIn)})`}}</td>
              <td>
<!--                <marquee-text :marquee-text="boardData.todayIn"></marquee-text>-->
                <span v-if=" !boardData.todayIn ||( boardData.todayIn.length <= 27)">{{boardData.todayIn||'暂无'}}</span>
                <marquee-text scrollamount="1"  v-if="boardData.todayIn && boardData.todayIn.length > 27" :marquee-text="boardData.todayIn"></marquee-text>
              </td>
              <td class="label">{{`病危 (${countNum(boardData.criticallyill)})`}}</td>
              <td>
<!--                <marquee-text :marquee-text="boardData.criticallyill"></marquee-text>-->
                <span v-if=" !boardData.criticallyill ||( boardData.criticallyill.length <= 27)">{{boardData.criticallyill||'暂无'}}</span>
                <marquee-text scrollamount="1"  v-if="boardData.criticallyill && boardData.criticallyill.length > 27" :marquee-text="boardData.criticallyill"></marquee-text>
              </td>
            </tr>
            <tr>
              <td class="label">{{`今日转入 (${countNum(boardData.todayChangeIn)})`}}</td>
              <td colspan="3">
<!--                <marquee-text :marquee-text="boardData.todayChangeIn"></marquee-text>-->
                <span v-if=" !boardData.todayChangeIn ||( boardData.todayChangeIn.length <= 48)">{{boardData.todayChangeIn||'暂无'}}</span>
                <marquee-text scrollamount="1"  v-if="boardData.todayChangeIn && boardData.todayChangeIn.length > 48" :marquee-text="boardData.todayChangeIn"></marquee-text>
              </td>
            </tr>
            <tr>
              <td class="label">{{`一级护理 (${countNum(boardData.nursingGradeOne)})`}}</td>
              <td colspan="3">
<!--                <marquee-text :marquee-text="boardData.nursingGradeOne"></marquee-text>-->
                <span v-if=" !boardData.nursingGradeOne ||( boardData.nursingGradeOne.length <= 48)">{{boardData.nursingGradeOne||'暂无'}}</span>
                <marquee-text scrollamount="1"  v-if="boardData.nursingGradeOne && boardData.nursingGradeOne.length > 48" :marquee-text="boardData.nursingGradeOne"></marquee-text>
              </td>
            </tr>
            <tr>
              <td class="label">{{`二级护理 (${countNum(boardData.nursingGradeTwo)})`}}</td>
              <td colspan="3">
<!--                <marquee-text :marquee-text="boardData.nursingGradeTwo"></marquee-text>-->
                <span v-if=" !boardData.nursingGradeTwo ||( boardData.nursingGradeTwo.length <= 48)">{{boardData.nursingGradeTwo||'暂无'}}</span>
                <marquee-text scrollamount="1"  v-if="boardData.nursingGradeTwo && boardData.nursingGradeTwo.length > 48" :marquee-text="boardData.nursingGradeTwo"></marquee-text>
              </td>
            </tr>
          </table>
        </section>
        <section style="flex:auto;display:flex">
          <section class="area-item" v-for="group in boardData.groupList" :key="group.groupName">
            <p
              style="background-color:#0099cc;color:white;font-size:14px;text-align:center;line-height:30px;font-weight:bold"
            >{{`${group.groupName}（组长：${group.leaderName}）`}}</p>
            <div class="bed-list">
              <span
                :class="['bed-item',{
                    none:bed.status === 0,
                    danger:bed.status === 1,
                    first:bed.status === 2,
                    second:bed.status === 3,
                    new:bed.status === 4,
                    operate:bed.status === 5,
                    normal:bed.status === 6
                  }]"
                v-for="bed in group.bedList"
                :key="bed.bedCode"
              >{{bed.bedCode}}</span>
            </div>
            <p class="section-title">护理执行</p>
            <table
              border
              style="width:100%;background-color:white;border-color:#f3f3f3;font-size:12px"
            >
              <tr
                v-for="nurse in group.nurseDoing"
                :key="nurse.nurseName"
                :style="{color: nurse.redFlag ? '#000000' : '#000000'}"
              >
                <td style="width:133px">
                  <marquee-text :marquee-text="(nurse.nurseName || '').replace('_',':')"></marquee-text>
                </td>
                <td style="text-align:left">
                  <marquee-text :marquee-text="nurse.bedCodes"></marquee-text>
                </td>
              </tr>
            </table>
          </section>
        </section>
      </section>
      <section style="flex:auto;display:flex;flex-direction:column">
        <section style="margin-bottom:40px">
          <p style="line-height:30px;font-weight:bold">联系电话</p>
          <table class="contacts" border style="width:100%">
            <tr v-for="(contact, index) in groupedContacts[0]" :key="contact.itemName">
              <td class="label">{{contact.itemName}}</td>
              <td style="text-align:left">
                <marquee-text :marquee-text="contact.itemValue"></marquee-text>
              </td>
              <template v-if="groupedContacts[1][index]">
                <td class="label">{{groupedContacts[1][index].itemName}}</td>
                <td style="text-align:left">
                  <marquee-text :marquee-text="groupedContacts[1][index].itemValue"></marquee-text>
                </td>
              </template>
            </tr>
          </table>
        </section>
        <section style="display:flex;flex-direction:column;flex:auto">
          <p style="line-height:30px;font-weight:bold">自定义</p>
          <div
            style="padding:10px;flex: auto;color:white;background-color:#0099cc;border-radius:10px"
            v-html="boardData.customText"
          ></div>
        </section>
        <section class="legend-list">
          <span class="legend-item">
            <span class="legend-block danger"></span>病危病重
          </span>
          <span class="legend-item">
            <span class="legend-block first"></span>一级护理
          </span>
          <span class="legend-item">
            <span class="legend-block second"></span>二级护理
          </span>
          <span class="legend-item">
            <span class="legend-block new"></span>今日入院
          </span>
          <span class="legend-item">
            <span class="legend-block operate"></span>今日手术
          </span>
          <span class="legend-item">
            <span class="legend-block"></span>无护理等级
          </span>
          <span class="legend-item">
            <span class="legend-block none"></span>无患者
          </span>
        </section>
      </section>
    </div>
    <button class="refresh-btn" @click="refreshData"></button>
    <marquee
      style="line-height:53px;background-color:white;font-size:24px;color:red"
    >{{boardData.noticeText || '祝患者早日康复！'}}</marquee>
  </article>
</template>

<script>
import moment from 'moment'
import MarqueeTextVue from './components/MarqueeText.vue'
export default {
  data: function () {
    return {
      dateTime: 0,
      boardData: {}
    }
  },
  computed: {
    groupedContacts () {
      return this.boardData.contacts ? [this.boardData.contacts.slice(0, 10), this.boardData.contacts.slice(10)] : [[], []]
    },
    currentDate () {
      return moment(this.dateTime).format('YYYY年MM月DD日 HH:mm dddd')
    }
  },
  created () {
    this.axios.post('getTime', {
      deviceCode: window.plus.getMac()
    }).then(res => {
      if (res.data.code === 1) {
        console.log('update system time', res.data.data.time)
        this.dateTime = Number(res.data.data.time)
        window.plus.updateSysTime(Number(res.data.data.time))
      }
    }).finally(() => {
      const now = new Date(this.dateTime)
      const leftMilliSec = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds())
      const dateTimer = setTimeout(() => {
        clearTimeout(dateTimer)
        this.dateTime = this.dateTime + leftMilliSec
        this.$nextTick(() => {
          setInterval(() => {
            this.dateTime = this.dateTime + 60000
          }, 60000)
        })
      }, leftMilliSec)
    })
  },
  mounted () {
    window.app = this
    window.plus.registSocketListener();
    this.getBoardData()
    setInterval(this.getBoardData, 300000)
  },
  components: {
    'marquee-text': MarqueeTextVue
  },
  methods: {
    countNum (str) {
      return str ? str.split('、').length : 0
    },
    onSocketMessage (socketJson) {
      const socketData = JSON.parse(socketJson)
      console.log(socketData)
      if (socketData.code === 'APIPULL') {
        this.getBoardData()
      }
    },
    refreshData () {
      this.getBoardData()
    },
    getBoardData () {
      this.axios.post('chart/getNursingBoardView', {
        deviceCode:window.plus.getMac()
      }).then(res => {
        if (res.data.code === 1) {
          this.boardData = res.data.data
        }
      })
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

.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

article {
  background-color: #fcfcfc;
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  height: 26px;
  line-height: 26px;
  background-color: #0099cc;
  color: white;
  font-size: 12px;
  text-align: center;
}

tr td {
  height: 32px;
  padding: 0 10px;
}

table {
  text-align: center;
  vertical-align: middle;
  border-collapse: collapse;
  border: 1px solid #3fb3d9;
  font-size: 14px;
  background-color: #0099cc;
  color: white;
}

.hospital-table tr td {
  width: 328px;
}

.hospital-table tr:first-child {
  font-weight: bold;
}

tr td.label {
  width: 120px;
  font-weight: bold;
}

.contacts tr td.label {
  width: 80px;
}

tr:not(:first-child) td:nth-child(2n) {
  text-align: left;
}
.area-item {
  width: 270px;
  background-color: white;
  margin-right: 3px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 1px 5px #ededed;
}
.area-item:last-child {
  margin: 0;
}
.legend-list {
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  color: #4e4e4e;
  font-weight: bold;
  background-color: white;
  flex: none;
}
.legend-item {
  display: flex;
  align-items: center;
  font-size: 8px;
}
.legend-block {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  border-radius: 50%;
  background-color: #0099ff;
  color: white;
}
.section-title {
  line-height: 32px;
  background-color: #c9e1ff;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.2em;
  font-weight: bold;
}
.bed-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 2px 3px;
  min-height: 150px;
}
.bed-item {
  font-size: 12px;
  margin: 2px;
  width: 40px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  border-radius: 3px;
  background-color: #cccccc;
  color: #6b6b6b;
}
.legend-block.danger,
.bed-item.danger {
  border: none;
  background-color: #cc0000;
  color: white;
}
.legend-block.first,
.bed-item.first {
  border: none;
  background-color: #ff8cff;
  color: white;
}
.legend-block.second,
.bed-item.second {
  border: none;
  background-color: #57e26e;
  color: white;
}
.legend-block.new,
.bed-item.new {
  border: none;
  background-color: #ff9100;
  color: white;
}
.legend-block.operate,
.bed-item.operate {
  border: none;
  background-color: #33ffff;
  color: white;
}
.legend-block.normal,
.bed-item.normal {
  border: none;
  background-color: #0099ff;
  color: white;
}
.legend-block.none,
.bed-item.none {
  border: none;
  background-color: #cccccc;
  color: #444444;
}
.refresh-btn {
  width: 100%;
  height: 53px;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: transparent;
  border: none;
}
.refresh-btn:focus {
  border: 2px solid greenyellow;
}
</style>
