// 模板文件
<template>
  <div class="label-tree">label-tree
    <!-- default-expand-all -->
    <!-- show-checkbox -->
    <el-tree
      :data="data5"
      :expand-on-click-node="false"
      node-key="id"
      @node-click="nodeClick"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span class="label">{{ node.label }}</span>
        <span class="btn-box">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-circle-plus"
            @click="() => append(node,data)"
          />
          <el-button
            type="text"
            size="mini"
            icon="el-icon-remove"
            @click="() => remove(node, data)"
          />
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>

import { queryAll } from '.././api/label'

let id = 1000

export default {
  name: 'LabelTree',
  components: {},
  props: {},
  data() {
    const data = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]
    return {
      data5: JSON.parse(JSON.stringify(data))
    }
  },
  computed: {},
  watch: {
    // params: function() {
    //   this.init()
    // }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.fetchData()
    },
    fetchData() {
      const list = queryAll()
      this.data5 = list
    },
    render() { },
    append(node, data) {
      debugger

      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }

      newChild.pId = data.id

      data.children.push(newChild)

      this.$emit('add', 'parentId', newChild)
    },
    nodeClick(data, node, component) {
      this.$emit('nodeClick', data)
    }
  }
}
</script>
<style lang="scss">
.label-tree {
  font: inherit;
}
</style>

