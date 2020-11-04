import Vuex from 'vuex'
import Vue from 'vue'
import message from './message.js'
import time from './time.js'

const defaultPatientInfo = {
  admId: '',
  age: '',
  allergyInfo: '',
  attentionList: [],
  bedCode: '',
  bedName: '',
  chargeDoctor: '',
  chargeDoctorCode: '',
  chargeNurse: '',
  chargeNurseCode: '',
  clinicCardValue: '',
  conditionCode: '',
  depositAmount: '',
  diagnosis: '',
  dietNursing: '',
  hasDanger: '',
  healthInsurance: '',
  id: 0,
  inHospitalId: '',
  inTime: '',
  money: '',
  mrn: '',
  nursingLevel: '',
  operationName: null,
  operationTime: null,
  patientBirthday: '',
  patientCode: '',
  patientId: '',
  patientName: '',
  sex: 0,
  totalMoney: '',
  weight: ''
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bindBed: '',
    patientInfo: defaultPatientInfo,
    userInputAmount: 0,
    userOutputAmount: 0,
    volumeConfig: [],
    outConfig: [],
    checkInConfig: {},
    currentUser: {}
  },
  mutations: {
    bindBed (state, payload) {
      state.bindBed = payload
    },
    getPatientInfo (state, payload) {
      state.patientInfo = payload || defaultPatientInfo
    },
    getOutConfig (state, payload) {
      state.outConfig = payload
    },
    getVolumeConfig (state, payload) {
      state.volumeConfig = payload
    },
    minLeft (state, payload) {
      state.checkMinLeft = payload
    },
    getCheckInConfig (state, payload) {
      state.checkInConfig = payload
    },
    getUserInputOutput (state, payload) {
      state.userInputAmount = payload.inputStats
      state.userOutputAmount = payload.outputStats
    },
    login (state, payload) {
      state.currentUser = {
        name: payload.name,
        code: payload.workcode,
        type: payload.identity
      }
    }
  },
  modules: { message, time }
})
