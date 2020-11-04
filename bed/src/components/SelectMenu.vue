<template>
  <div :class="['select-body',{opened:opened}]" @click.stop="toggleOpen">
    {{value ? dataList.find(item => item[nodeKey] === value)[label] : '请选择'}}
    <div class="select-list-body" v-show="opened">
      <div
        :class="['select-list-option',{selected:data[nodeKey] === value}]"
        v-for="data in dataList"
        :key="data[nodeKey]"
        @click.stop="selectOption(data)"
      >{{data[label]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    dataList: {
      type: Array,
      require: false,
      default: function () {
        return []
      }
    },
    nodeKey: {
      type: String,
      require: false,
      default: 'id'
    },
    label: {
      type: String,
      require: false,
      default: 'label'
    }
  },
  data () {
    return {
      opened: false
    }
  },
  methods: {
    toggleOpen () {
      if (!this.opened) {
        this.opened = true
        const handleCancelMenu = () => {
          this.opened = false
          document.body.removeEventListener('click', handleCancelMenu)
        }
        document.body.addEventListener('click', handleCancelMenu)
      }
    },
    selectOption (data) {
      this.opened = false
      if (this.value === data[this.nodeKey]) {
        this.$emit('input', '')
      } else {
        this.$emit('input', data[this.nodeKey])
      }
    }
  }
}
</script>

<style scoped>
.select-body {
  width: 300px;
  height: 72px;
  margin: 0;
  padding: 12px 24px;
  line-height: 48px;
  font-size: 30px;
  color: #4e4e4e;
  background-color: #f2f8fd;
  border-radius: 6px;
  border: 2px solid transparent;
  position: relative;
  user-select: none;
}

.select-body::after {
  position: absolute;
  width: 30px;
  height: 30px;
  margin-top: -15px;
  top: 50%;
  right: 25px;
  content: "";
  background-image: url("../assets/down_icon.png");
}

.select-body.opened {
  border: 2px solid #3e8cfc;
}

.select-list-body {
  width: 100%;
  min-height: 112px;
  position: absolute;
  padding: 25px 0;
  bottom: calc(100% + 16px);
  left: 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 20px rgba(150, 183, 233, 0.3);
}

.select-list-option {
  line-height: 72px;
  padding: 0 20px;
}

.select-list-option.selected {
  background-color: #3e8cfc;
  color: white;
}
</style>
