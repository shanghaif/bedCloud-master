<template>
  <div>
    <div
      style="width:100%;height:100%;background-color:rgba(0,0,0,0.3);position:fixed;top:0;z-index:9998"
      v-if="datePicker"
      @click="datePicker = false"
    ></div>
    <div class="date-picker-container">
      <span @click="prevDay">&lt; 前一天</span>
      <div class="date-picker" @click="datePicker = true">
        <span>{{value.format('MM月DD日')}}</span>
        <img src="../assets/calendar_icon.png" style="width:48px;height:48px" />
      </div>
      <span @click="nextDay">后一天 &gt;</span>
    </div>
    <div class="data-picker-dialog" v-show="datePicker">
      <div class="data-picker-dialog-title">选择日期</div>
      <div class="data-picker-title">
        <img src="../assets/left_arrow.png" style="width:48px;height:48px" @click="prevMonth" />
        <span>{{showDate.format('YYYY-MM')}}</span>
        <img src="../assets/right_arrow.png" style="width:48px;height:48px" @click="nextMonth" />
      </div>
      <div class="data-picker-dialog-content">
        <div
          class="data-picker-date-line"
          style="border-top:1px solid #E7E7E7;border-bottom:1px solid #E7E7E7;"
        >
          <div class="data-picker-date">日</div>
          <div class="data-picker-date">一</div>
          <div class="data-picker-date">二</div>
          <div class="data-picker-date">三</div>
          <div class="data-picker-date">四</div>
          <div class="data-picker-date">五</div>
          <div class="data-picker-date">六</div>
        </div>
        <div class="data-picker-date-line" v-for="(dateGroup,index) in dateList" :key="index">
          <div
            :class="['data-picker-date',{other:!date.isShowingMonth || date.isOutRange,selected:date.totalDate.isSame(value,'day')}]"
            v-for="(date,index) in dateGroup"
            :key="index"
            @click="handlePickDate(date)"
          >{{date.date}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groupByNumber } from '../utils/utils.js'
import moment from 'moment'
export default {
  props: {
    value: {
      type: moment,
      default: () => {
        return moment(this.$store.state.time.currentTime)
      }
    },
    end: {
      type: String,
      required: false,
      default: () => {
        return moment(this.$store.state.time.currentTime)
      }
    }
  },
  data () {
    return {
      datePicker: false,
      showDate: moment(this.$store.state.time.currentTime).set({
        date: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      })
    }
  },
  computed: {
    dateList () {
      const days = this.showDate.day()
      return groupByNumber(new Array(42).fill(0).map((_, index) => {
        const date = moment(this.showDate).add(index - days, 'days')
        return {
          date: date.date(),
          isShowingMonth: this.showDate.isSame(date, 'month'),
          isOutRange: Boolean(this.end) && date.isAfter(this.end, 'day'),
          totalDate: date
        }
      }), 7)
    }
  },
  methods: {
    handlePickDate (date) {
      if (date.isOutRange) {
        return
      }
      if (!date.isShowingMonth) {
        if (this.showDate.isBefore(date.totalDate)) {
          this.nextMonth()
        } else {
          this.prevMonth()
        }
      }
      this.$emit('input', date.totalDate)
      this.datePicker = false
    },
    prevMonth () {
      this.showDate = moment(this.showDate).subtract(1, 'months')
    },
    prevDay () {
      this.$emit('input', moment(this.value).subtract(1, 'days'))
    },
    nextMonth () {
      this.showDate = moment(this.showDate).add(1, 'months')
    },
    nextDay () {
      if (this.end && moment(this.value).add(1, 'days').isAfter(this.end, 'day')) {
        return
      }
      this.$emit('input', moment(this.value).add(1, 'days'))
    }
  }
}
</script>

<style scope>
.date-picker {
  width: 450px;
  height: 90px;
  padding: 0 30px;
  line-height: 90px;
  background-color: #e3ebfb;
  border-radius: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 100px;
}

.date-picker-container {
  margin-left: 200px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #90909e;
}

.data-picker-dialog {
  width: 690px;
  height: 800px;
  position: fixed;
  background-color: white;
  margin: -400px 0 0 -345px;
  left: 50%;
  top: 50%;
  padding-top: 10px;
  border-radius: 30px;
  z-index: 9999;
}

.data-picker-dialog-title {
  margin-left: 50px;
  height: 80px;
  line-height: 80px;
  font-size: 30px;
  font-weight: bold;
  color: #333333;
}

.data-picker-title {
  height: 70px;
  padding: 0 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 27px;
  font-weight: bold;
  color: #333333;
}

.data-picker-dialog-content {
  padding: 0px 30px;
  border-bottom: 1px solid #e7e7e7;
}

.data-picker-date-line {
  display: flex;
  height: 80px;
  font-size: 0;
}

.data-picker-date {
  font-size: 24px;
  line-height: 80px;
  text-align: center;
  color: #393939;
  display: inline-block;
  width: 90px;
  height: 100%;
}

.data-picker-date:first-child {
  color: #3e8cfc;
  margin-left: 0;
}

.data-picker-date.selected {
  background-color: #3e8cfc;
  color: white;
}

.data-picker-date.other {
  color: #d6c8c6;
}

.data-picker-btn {
  margin: 40px 0;
  width: 325px;
  height: 72px;
  background-color: #3e8cfc;
  color: white;
  border-radius: 10px;
  font-size: 30px;
}
</style>
