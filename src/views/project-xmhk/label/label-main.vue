// 模板文件
<template>
  <div class="label-main">label-main
    <el-row>
      <el-col :span="8">left
        <LabelTree/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LabelTree from './label-tree'
export default {
  name: 'LabelMain',
  components: { LabelTree },
  props: {},
  data() {
    return {}
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
.label-main {
  font: inherit;
}
</style>

