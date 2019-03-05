// 标签-表单-查询条件设置
<template>
  <div class="label-form-query">
    label-form-query
    <el-form :v-model="form" label-width="180px" >
      <el-form-item label="支持精确匹配查询">
        <el-input v-model="form.query_condition_term" />
      </el-form-item>
      <el-form-item :v-model="form" label="查询预处理">
        <el-input v-model="form.query_pre_processor" />
      </el-form-item>
      <el-form-item :v-model="form" label="使用关联的字典编码作为选项">
        <el-input v-model="form.encodingOptions" />
      </el-form-item>
      <!-- todo: 选项名称 -->
      <!-- <el-form-item :v-model="form" label="使用关联的字典编码作为选项">
              <el-input v-model="form.encodingOptions" />
            </el-form-item> -->
      <el-form-item :v-model="form" label="支持多选">
        <el-input v-model="form.chooseToSupport" />
      </el-form-item>
      <el-form-item :v-model="form" label="默认显示个数">
        <el-input v-model="form.defaultDisplayNumber" />
      </el-form-item>
      <el-form-item :v-model="form" label="允许自定义区间">
        <el-input v-model="form.customRange" />
      </el-form-item>
      <el-form-item :v-model="form" label="排序支持">
        <el-input v-model="form.labelOrder" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'LabelFormQuery',
  components: {},
  props: {},
  data() {
    return {
      form: {}
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() { },
    async fetchData() { },
    render() { }
  }
}
</script>
<style lang="scss">
.label-form-query {
  font: inherit;
}
</style>

