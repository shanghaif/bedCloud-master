import Vue from 'vue'
import Axios from 'axios'
import moment from 'moment'
import store from '../store'

const audioCtx = new AudioContext()

export function showMessage (msg, callback) {
  const messageDOM = document.createElement('div')
  messageDOM.innerText = msg
  messageDOM.style.width = '800px'
  messageDOM.style.position = 'fixed'
  messageDOM.style.borderRadius = '30px'
  messageDOM.style.top = '40%'
  messageDOM.style.left = '50%'
  messageDOM.style.marginLeft = '-400px'
  messageDOM.style.padding = '30px'
  messageDOM.style.backgroundColor = 'black'
  messageDOM.style.color = 'white'
  messageDOM.style.opacity = 0
  messageDOM.style.fontSize = '32px'
  messageDOM.style.textAlign = 'center'
  messageDOM.style.lineHeight = '60px'
  messageDOM.style.wordBreak = 'break-word'
  messageDOM.style.zIndex = 1008
  messageDOM.style.transition = 'opacity 0.5s ease'
  document.body.appendChild(messageDOM)
  const timerIn = setTimeout(() => {
    clearTimeout(timerIn)
    messageDOM.style.opacity = 0.6
    const timerOut = setTimeout(() => {
      clearTimeout(timerOut)
      messageDOM.style.opacity = 0
      const timerRemove = setTimeout(() => {
        clearTimeout(timerRemove)
        document.body.removeChild(messageDOM)
        if (callback) {
          callback()
        }
      }, 1000)
    }, 1000)
  }, 200)
}

export function joinChannel (devCode) {
  return Vue.prototype.call.post('getChannel', {
    deviceCode: devCode
  }).then(res => {
    if (res.data.code === 1) {
      return res.data.data.channelId
    } else {
      throw new Error(res.msg)
    }
  }, () => {
    throw new Error('网络异常，请检查您的网络。')
  })
}

export function establishPhoneCall (devCode, channelId) {
  return Vue.prototype.call.post('bedCall', {
    deviceCode: devCode,
    channelId: channelId
  }).then(res => {
    if (res.data.code === 1) {
      window.plus.voice_toggleSpeaker(true)
      return {
        deviceCode: window.plus.getMac(),
        channelId: channelId
      }
    } else {
      window.plus.voice_end()
      throw new Error(res.msg)
    }
  }, () => {
    window.plus.voice_end()
    throw new Error('网络异常，请检查您的网络。')
  })
}

export function exitPhoneCall (devCode, channelId) {
  return Vue.prototype.call.post('deviceExit', {
    deviceCode: devCode,
    channelId: channelId
  }).then(res => {
    if (res.data.code === 1) {
      window.plus.voice_toggleSpeaker(false)
    } else {
      throw new Error(res.msg)
    }
  }, () => {
    throw new Error('网络异常，请检查您的网络。')
  })
}

export function playSound (url, loop) {
  return Axios.get(url, {
    responseType: 'arraybuffer'
  }).then(res => res.data).then(arrBuffer => {
    return new Promise((resolve, reject) => {
      audioCtx.decodeAudioData(arrBuffer, function (audioBuffer) {
        const audioBufferSourceNode = audioCtx.createBufferSource()
        audioBufferSourceNode.buffer = audioBuffer
        audioBufferSourceNode.connect(audioCtx.destination)
        audioBufferSourceNode.loopStart = 5
        audioBufferSourceNode.loop = loop
        audioBufferSourceNode.start()
        resolve({
          stop () {
            console.log('stop playing')
            audioBufferSourceNode.stop()
            audioBufferSourceNode.disconnect()
          }
        })
      }, function (err) {
        reject(err)
      })
    })
  })
}

export function groupByNumber (arr, num) {
  const array = arr || []
  const result = []
  for (var i = 0; i < array.length; i += num) {
    result.push(array.slice(i, i + num))
  }
  return result
}

export function inPeriod (startTime, endTime) {
  const now = store.state.time.currentTime
  console.log(now)
  if (startTime && endTime) {
    const [startHour, startMin, startSec] = startTime.split(':')
    const [endHour, endMin, endSec] = endTime.split(':')
    const startDate = moment(now).set({
      hour: startHour,
      minute: startMin,
      second: startSec
    })
    let endDate = moment(now).set({
      hour: endHour,
      minute: endMin,
      second: endSec
    })
    if (!startDate.isBefore(endDate)) {
      endDate = endDate.add(1, 'day')
    }
    return moment(now).isBetween(startDate, endDate)
  } else {
    return false
  }
}
