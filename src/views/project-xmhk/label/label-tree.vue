// 模板文件
<template>
  <div class="label-tree">label-tree
    <el-tree
      :data="data5"
      :expand-on-click-node="false"
      show-checkbox
      node-key="id"
      default-expand-all
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span class="label">{{ node.label }}</span>
        <span class="btn-box">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-circle-plus"
            @click="() => append(data)"
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
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() { },
    fetchData() { },
    render() { }
  }
}
</script>
<style lang="scss">
.label-tree {
  font: inherit;
}
</style>

