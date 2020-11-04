<template>
  <div class="device-sub-container">
    <div class="device-list" v-for="department in dataList" :key="department[nodeKey]">
      <div
        :class="[{'current-node':department[nodeKey] == value[nodeKey]},'device-item']"
        @click="handleClickNode(department)"
      >
        <img
          src="../assets/expande_icon.png"
          :class="[{expanded:department[nodeKey] === expandedNode},'device-icon']"
          v-if="department[childKey]"
        />
        <img
          src="../assets/leaf_icon_selected.png"
          class="device-icon"
          v-else-if="department[nodeKey] == value[nodeKey]"
        />
        <img src="../assets/leaf_icon_unselected.png" class="device-icon" v-else />
        <span>{{department.name}}</span>
      </div>
      <device-tree
        :value="value"
        :data-list="department[childKey]"
        :node-key="nodeKey"
        :child-key="childKey"
        :search-key="searchKey"
        v-if="department[childKey]"
        v-show="department[nodeKey] === expandedNode"
        @input="handleSubTreeInput"
      ></device-tree>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    dataList: Array,
    nodeKey: {
      type: String,
      required: false,
      default: 'id'
    },
    childKey: {
      type: String,
      required: false,
      default: 'children'
    },
    searchKey: {
      type: String,
      required: false,
      default: 'sort'
    },
    searchWord: {
      type: String,
      required: false,
      default: ''
    }

  },
  data: function () {
    return {
      expandedNode: ''
    }
  },
  watch: {
    searchWord (word) {
      const currentExpandedNode = this.dataList.find(data => data[this.nodeKey] === this.expandedNode)
      if (currentExpandedNode && currentExpandedNode[this.searchKey].indexOf(word) !== 0) {
        this.expandedNode = ''
      }
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
        this.$emit('input', node)
      }
    },
    handleSubTreeInput (node) {
      this.$emit('input', node)
    },
    handlePickNodeStart (node) {
      if (!node[this.childKey]) {
        this.$emit('input', node)
        this.$callTimer = setTimeout(() => {
          this.handleNodeLongPress(node)
        }, 1000)
      }
    },
    handlePickNodeEnd () {
      clearTimeout(this.$callTimer)
    },
    handleNodeLongPress (node) {
      if (this.value[this.nodeKey] === node[this.nodeKey]) {
        clearTimeout(this.$callTimer)
        this.$emit('pressing', node)
        // 将拨打电话事件传输到事件总线
        // this.$eventBus.$emit('call', node)
      }
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
  font-size: 28px;
  color: #333333;
  padding-left: 30px;
  display: flex;
  align-items: center;
  position: relative;
}

.device-list > .device-item.current-node {
  color: white;
}

.device-list > .device-item.current-node:after {
  content: "";
  width: 1300px;
  height: 72px;
  position: absolute;
  top: -1px;
  right: 0px;
  background-color: #5897f0;
  z-index: 1;
}

.device-list .device-list > .device-item {
  padding-left: 0;
  margin-left: 30px;
}

.device-list > .device-sub-container > .device-list {
  padding-left: 30px;
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
