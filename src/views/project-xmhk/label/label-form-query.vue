// 标签-表单-查询条件设置
<template>
  <div class="label-form-query">
    label-form-query
    <el-form :model="ruleForm" label-width="180px" >
      <el-form-item label="支持精确匹配查询">
        <el-input v-model="ruleForm.query_condition_term" />
      </el-form-item>
      <el-form-item label="查询预处理">
        <el-input v-model="ruleForm.query_pre_processor" />
      </el-form-item>
      <el-form-item label="使用关联的字典编码作为选项">
        <el-input v-model="ruleForm.encodingOptions" />
      </el-form-item>
      <!-- todo: 选项名称 -->
      <!-- <el-form-item  label="使用关联的字典编码作为选项">
              <el-input v-model="ruleForm.encodingOptions" />
            </el-form-item> -->
      <el-form-item label="支持多选">
        <el-input v-model="ruleForm.chooseToSupport" />
      </el-form-item>
      <el-form-item label="默认显示个数">
        <el-input v-model="ruleForm.defaultDisplayNumber" />
      </el-form-item>
      <el-form-item label="允许自定义区间">
        <el-input v-model="ruleForm.customRange" />
      </el-form-item>
      <el-form-item label="排序支持">
        <el-input v-model="ruleForm.labelOrder" />
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
      ruleForm: {},
      rules: {
        valueType: [
          { required: true, message: '请输入标签值类型', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        dataStoreMapping: [
          { required: true, message: '请输入数据库存储映射', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        labelStatus: [
          { required: true, message: '请输入标签状态', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        labelType: [
          { required: true, message: '请输入标签类型', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {
    params: function() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.params && this.params.ruleForm) {
        this.render()
      }
    },
    async fetchData() { },
    render() {
      this.ruleForm = this.params.ruleForm
    },
    save(formName) {
      let result = false
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // alert('submit!')
          // debugger
          result = this.ruleForm
          this.$emit('save', result)
        } else {
          console.log('error submit!!')
          result = false
        }
      })
      return result
    }
  }
}
</script>
<style lang="scss">
.label-form-query {
  font: inherit;
}
</style>

