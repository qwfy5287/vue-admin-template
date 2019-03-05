// 标签-表单-显示信息设置
<template>
  <div class="label-form-display">
    label-form-display

    <el-form :v-model="form" label-width="180px" >
      <el-form-item label="显示于数据列表">
        <el-input v-model="form.displayInDataSheet" />
      </el-form-item>
      <el-form-item :v-model="form" label="显示于画面详细页">
        <el-input v-model="form.showInDetailFlag" />
      </el-form-item>
      <el-form-item :v-model="form" label="是否可以调用接口">
        <el-input v-model="form.interfaceFlag" />
      </el-form-item>
      <el-form-item :v-model="form" label="使用关联的字典编码映射出显示信息">
        <el-input v-model="form.codingMapping" />
      </el-form-item>
      <el-form-item :v-model="form" label="自定义字典映射">
        <el-input v-model="form.dictionaryMapping" />
      </el-form-item>
      <el-form-item :v-model="form" label="数据显示格式">
        <el-input v-model="form.data_show_format" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'LabelFormDisplay',
  components: {},
  props: {},
  data() {
    return { form: {}}
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
.label-form-display {
  font: inherit;
}
</style>

