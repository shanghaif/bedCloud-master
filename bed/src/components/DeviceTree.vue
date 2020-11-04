<template>
  <div class="device-sub-container">
    <div class="device-list" v-for="department in dataList" :key="department[nodeKey]">
      <div
        class="device-item"
        :style="{padding:'0 ' + (30 * depth) + 'px'}"
        @click="handleClickNode(department)"
      >
        <img
          src="../assets/more.png"
          :class="[{expanded:department[nodeKey] === expandedNode},'device-icon']"
          v-if="department[childKey]"
        />
        <span>{{department.name}}</span>
      </div>
      <device-tree
        :value="value"
        :data-list="department[childKey]"
        :depth="depth + 1"
        v-if="department[childKey]"
        v-show="department[nodeKey] === expandedNode"
        @node-click="handleSubTreeInput"
      ></device-tree>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    dataList: Array,
    depth: {
      type: Number,
      required: false,
      default: 0
    },
    nodeKey: {
      type: String,
      required: false,
      default: 'id'
    },
    childKey: {
      type: String,
      required: false,
      default: 'children'
    }

  },
  data: function () {
    return {
      expandedNode: ''
    }
  },
  methods: {
    handleClickNode (node) {
      if (node[this.childKey]) {
        if (this.expandedNode === node[this.nodeKey]) {
          this.expandedNode = ''
        } else {
          this.expandedNode = node[this.nodeKey]
        }
      } else {
        this.$emit('node-click', node)
      }
    },
    handleSubTreeClick (node) {
      this.$emit('node-click', node)
    }
  },
  name: 'device-tree'
}
</script>

<style scoped>
.device-sub-container {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}

.device-list > .device-item {
  line-height: 70px;
  border-bottom: 1px solid #d7d7d7;
  box-sizing: border-box;
  font-size: 24px;
  color: #333333;
  display: flex;
  align-items: center;
  position: relative;
}

.device-item:active {
  background-color: #d7d7d7;
}

.device-list > .device-item.current-node {
  color: white;
}

.device-list > .device-item.current-node:after {
  content: "";
  width: 700px;
  height: 72px;
  position: absolute;
  top: -1px;
  right: 0px;
  background-color: #5897f0;
  z-index: 1;
}

.device-list > .device-item > .device-icon {
  width: 28px;
  height: 28px;
  z-index: 2;
  transition: transform 0.5s ease;
}

.device-list > .device-item > .device-icon.expanded {
  transform: rotate(90deg);
}

.device-list > .device-item > span {
  margin-left: 10px;
  z-index: 2;
}
</style>
