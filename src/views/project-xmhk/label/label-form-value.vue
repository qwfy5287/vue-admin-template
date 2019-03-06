// 标签-表单-标签值设置
<template>
  <div class="label-form-value">
    label-form-value
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="180px" >
      <el-form-item label="生成方式">
        <el-input v-model="ruleForm.generation" />
      </el-form-item>
      <el-form-item label="标签值类型" prop="valueType">
        <el-input v-model="ruleForm.valueType" />
      </el-form-item>
      <el-form-item label="最小值">
        <el-input v-model="ruleForm.minValue" />
      </el-form-item>
      <el-form-item label="最大值">
        <el-input v-model="ruleForm.maxValue" />
      </el-form-item>
      <el-form-item label="关联系统字典">
        <el-input v-model="ruleForm.systemDictionary" />
      </el-form-item>
      <el-form-item label="合法值枚举">
        <el-input v-model="ruleForm.enumeration" />
      </el-form-item>
      <el-form-item label="数据库存储映射" prop="dataStoreMapping">
        <el-input v-model="ruleForm.dataStoreMapping" />
      </el-form-item>
      <el-form-item label="是否添加到多字段搜索">
        <el-input v-model="ruleForm.include_in_all" />
      </el-form-item>
      <el-form-item label="标签默认值">
        <el-input v-model="ruleForm.labelValue" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'LabelFormValue',
  components: {},
  props: {
    params: { type: Object, default: null }
  },
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
.label-form-value {
  font: inherit;
}
</style>

