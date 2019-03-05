// 标签-表单-标签值设置
<template>
  <div class="label-form-value">
    label-form-value
    <el-form :v-model="form" label-width="180px" >
      <el-form-item label="生成方式">
        <el-input v-model="form.generation" />
      </el-form-item>
      <el-form-item :v-model="form" label="标签值类型">
        <el-input v-model="form.valueType" />
      </el-form-item>
      <el-form-item :v-model="form" label="最小值">
        <el-input v-model="form.minValue" />
      </el-form-item>
      <el-form-item :v-model="form" label="最大值">
        <el-input v-model="form.maxValue" />
      </el-form-item>
      <el-form-item :v-model="form" label="关联系统字典">
        <el-input v-model="form.systemDictionary" />
      </el-form-item>
      <el-form-item :v-model="form" label="合法值枚举">
        <el-input v-model="form.enumeration" />
      </el-form-item>
      <el-form-item :v-model="form" label="数据库存储映射">
        <el-input v-model="form.dataStoreMapping" />
      </el-form-item>
      <el-form-item :v-model="form" label="是否添加到多字段搜索">
        <el-input v-model="form.include_in_all" />
      </el-form-item>
      <el-form-item :v-model="form" label="标签默认值">
        <el-input v-model="form.labelValue" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'LabelFormValue',
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
.label-form-value {
  font: inherit;
}
</style>

