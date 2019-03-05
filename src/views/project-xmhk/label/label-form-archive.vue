// 标签-表单-归档设置
<template>
  <div class="label-form-archive">
    label-form-archive

    <el-form :v-model="form" label-width="180px" >
      <el-form-item label="归档方式">
        <el-input v-model="form.docMethod" />
      </el-form-item>
      <el-form-item :v-model="form" label="支持读写分离">
        <el-input v-model="form.separateRwFlag" />
      </el-form-item>
      <!-- todo: 索引设置 -->
      <el-form-item :v-model="form" label="主键映射字段">
        <el-input v-model="form.keymapping" />
      </el-form-item>
      <el-form-item :v-model="form" label="主映射字段是否存储">
        <el-input v-model="form.idSave" />
      </el-form-item>
      <el-form-item :v-model="form" label="ElasticSearch 高级配置">
        <el-input v-model="form.advancedConfig" />
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
export default {
  name: 'LabelFormArchive',
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
.label-form-archive {
  font: inherit;
}
</style>

