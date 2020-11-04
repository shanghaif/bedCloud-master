<template>
  <div reportId="con">
    <div class="main-div">
      <div class="header-div">
        <div
          :class="['header-menu-item',{selected:currentTab === 'record'}]"
          @click="currentTab = 'record'"
        >体征录入</div>
        <div
          :class="['header-menu-item',{selected:currentTab === 'range'}]"
          @click="currentTab = 'range'"
        >体征正常范围值</div>
        <span class="setting" v-if="false">设置</span>
        <span class="login-out" @click="$router.go(-1)">退出</span>
      </div>
      <div style="padding:40px">
        <div
          class="record-list"
          v-loading="reportLoading"
          loading-bgColor="#f2f8fd"
          v-show="currentTab === 'record'"
        >
          <div class="record-list-item" v-for="(record,index) in reportList" :key="index">
            <div class="record-title">{{record.signName}}</div>
            <div
              style="width:520px;display:flex;align-items:center;justify-content:center;margin-bottom: 40px;margin-right:20px;position:relative"
            >
              <span class="record-tag" style>时间</span>
              <input
                v-model="record.signTime"
                type="time"
                class="record-input"
                style="padding:12px 78px 12px 17px;"
              />
              <img src="../../assets/time_icon.png" style="position:absolute;right:24px;top:12px" />
            </div>
            <div style="width:520px;display:flex;margin-right:20px">
              <template v-if="record.child">
                <div class="record-item" v-for="(item,index) in record.child" :key="index">
                  <span class="record-tag">{{item.signName}}</span>
                  <input
                    type="number"
                    v-model="item.signValue"
                    placeholder="请输入"
                    class="record-input"
                  />
                </div>
              </template>
              <template v-else>
                <div class="record-item">
                  <span class="record-tag">数值</span>
                  <input
                    type="number"
                    v-model="record.signValue"
                    placeholder="请输入"
                    class="record-input"
                  />
                </div>
              </template>
            </div>
          </div>
          <div class="status-bar">
            <span style="font-size:30px">患者当前不在床</span>
            <select-menu
              v-model="patientStatus"
              :data-list="patientStatuList"
              class="patient-status"
              style="margin-left:20px"
            ></select-menu>
            <button class="submit-btn" @click="submitRecord">提交</button>
          </div>
        </div>
        <div
          style="height:950px;margin-bottom:-40px;background-color:white;padding:60px;border-radius:30px;box-shadow:0 0 5px rgba(204,204,204,0.35);display:flex;flex-direction:column;align-items:center"
          v-show="currentTab === 'range'"
        >
          <div
            style="margin-bottom:30px;display: flex;align-items: flex-start;"
            v-for="area in rangeList"
            :key="area.itemId"
          >
            <span
              style="display:inline-block;font-size:30px;width:250px;text-align:right;line-height: 72px;"
            >{{area.itemName}}</span>
            <div style="display: inline-block;" v-if="area.child">
              <div v-for="item in area.child" :key="item.id" style="margin-bottom:30px">
                <span
                  style="display:inline-block;width:150px;line-height:72px;font-size:30px;text-align:center"
                >{{item.itemName}}</span>
                <input
                  v-model="item.signMinValue"
                  class="record-input"
                  style="width:420px;color:#999999"
                />
                <input
                  v-model="item.signMaxValue"
                  class="record-input"
                  style="width:420px;color:#999999"
                />
              </div>
            </div>
            <template v-else>
              <input
                v-model="area.signMinValue"
                class="record-input"
                style="width:420px;color:#999999;margin-left:150px"
              />
              <input
                v-model="area.signMaxValue"
                class="record-input"
                style="width:420px;color:#999999"
              />
            </template>
            <div class="status-bar" style="justify-content:center">
              <button class="submit-btn" @click="submitRecordRange">提交</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectMenu from '../../components/SelectMenu.vue'
import moment from 'moment'
import { showMessage } from '../../utils/utils'
export default {
  data: function () {
    return {
      currentTab: '',
      reportLoading: false,
      patientStatuList: [
        {
          id: '2',
          label: '外出'
        }, {
          id: '3',
          label: '检查'
        }, {
          id: '4',
          label: '手术'
        }, {
          id: '5',
          label: '回家'
        }, {
          id: '6',
          label: '会诊'
        }, {
          id: '7',
          label: '不在床'
        }, {
          id: '8',
          label: '吃饭'
        }, {
          id: '9',
          label: '复健'
        }
      ],
      patientStatus: '',
      reportList: [],
      rangeList: []
    }
  },
  watch: {
    currentTab (tab) {
      // this.reportLoading = true
      /* this.api.post('record/getList', {
        type: tab
      }).then(res => {
        if (res.data.code === 1) {
          this.reportList = res.data.data.reportList
          this.reportLoading = false
        }
      }) */
    }
  },
  components: {
    'select-menu': SelectMenu
  },
  mounted () {
    this.currentTab = 'record'
    this.api.post('bedside/signItemList').then(res => {
      if (res.data.code === 1) {
        this.reportList = res.data.data.map(item => item.child
          ? ({
            ...item,
            signTime: '',
            child: item.child.map(item => ({
              ...item,
              signValue: ''
            }))
          })
          : ({
            ...item,
            signValue: '',
            signTime: ''
          }))
        const deptId = res.data.data[0].deptId
        this.api.post('bedside/normalVitalSignList', {
          patientId: this.$store.state.patientInfo.patientId,
          deptId
        }).then(res => {
          if (res.data.code === 1) {
            this.rangeList = res.data.data
          }
        })
      }
    })
  },
  methods: {
    submitRecord () {
      const recordList = this.reportList.slice(0)
      const result = recordList.reduce((result, next) => result.concat(next.child
        ? next.child.map(child => ({
          deptId: next.deptId,
          patientId: this.$store.state.patientInfo.patientId,
          bedName: this.$store.state.bindBed,
          signId: child.id,
          signTime: next.signTime ? moment(this.$store.state.time.currentTime).format('YYYY-MM-DD ') + next.signTime + ':00' : '',
          newSignValue: child.signValue,
          inchargeNurseCode: this.$store.state.currentUser.code || this.$store.state.patientInfo.chargeNurseCode || '009127'
        }))
        : {
          deptId: next.deptId,
          patientId: this.$store.state.patientInfo.patientId,
          bedName: this.$store.state.bindBed,
          signId: next.id,
          signTime: next.signTime ? moment(this.$store.state.time.currentTime).format('YYYY-MM-DD ') + next.signTime + ':00' : '',
          newSignValue: next.signValue,
          inchargeNurseCode: this.$store.state.currentUser.code || this.$store.state.patientInfo.chargeNurseCode || '009127'
        }), []).filter(record => record.newSignValue)
      result.push({
        deptId: recordList[0].deptId,
        patientId: this.$store.state.patientInfo.patientId,
        bedName: this.$store.state.bindBed,
        isManual: 1,
        patientStatus: this.patientStatus || '1',
        inchargeNurseCode: this.$store.state.currentUser.code || this.$store.state.patientInfo.chargeNurseCode || '009127'
      })
      this.api.post('bedside/signInput', result).then(res => {
        if (res.data.code === 1) {
          showMessage('录入成功！')
        } else {
          showMessage(res.data.msg)
        }
      })
    },
    submitRecordRange () {
      const rangeList = this.rangeList.slice(0)
      this.api.post('bedside/normalVitalSignInput', rangeList.reduce((result, next) => result.concat(next.child ? next.child : next), []).map(({ patientId, ...item }) => ({
        ...item,
        oldPatientId: patientId,
        newPatientId: this.$store.state.patientInfo.patientId
      }))).then(res => {
        if (res.data.code === 1) {
          showMessage('录入成功！')
        } else {
          showMessage(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.header-div {
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.header-menu-item {
  min-width: 200px;
  line-height: 90px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #363939;
  position: relative;
}

.header-menu-item.selected {
  color: #0076fe;
}

.header-menu-item.selected:after {
  content: "";
  width: 60px;
  height: 15px;
  background-color: #0076fe;
  position: absolute;
  bottom: 0;
  left: 70px;
  border-radius: 10px;
}

.record-list {
  font-size: 0;
  height: 910px;
  overflow: auto;
}

.record-list-item {
  width: 590px;
  height: 340px;
  box-shadow: 1px 1px 10px rgba(150, 183, 233, 0.3);
  margin: 0px 30px 30px 0;
  background-color: #ffffff;
  font-size: 30px;
  border-radius: 30px;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.record-title {
  width: 100%;
  line-height: 75px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 36px;
  text-align: center;
  margin-bottom: 45px;
}

.record-list-item.new-record:after {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #fe384b;
  border-radius: 50%;
  top: 10px;
  right: 10px;
}

.record-list-item:nth-child(3n) {
  margin-right: 0;
}

.record-item {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.record-item + .record-item {
  margin-left: 20px;
}

.record-tag {
  margin-right: 20px;
  flex-basis: 90px;
  text-align: right;
  flex: none;
}

.record-input {
  width: 100%;
  height: 72px;
  line-height: 48px;
  margin: 0;
  padding: 12px;
  font-size: 30px;
  color: #90909e;
  background-color: #f2f8fd;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 6px;
}

.record-input + .record-input {
  margin-left: 40px;
}

.record-check-btn {
  width: 120px;
  height: 60px;
  line-height: 60px;
  border: 2px solid #0076fe;
  border-radius: 30px;
  text-align: center;
  color: #0076fe;
}

.status-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  padding: 0 50px;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.submit-btn {
  width: 390px;
  height: 72px;
  border: none;
  background-color: #3e8cfc;
  border-radius: 10px;
  color: white;
  font-size: 30px;
  margin-left: 30px;
}
</style>
