// 标签-表单-显示信息设置
<template>
  <div class="label-form-display">
    label-form-display
    {{ params }}
    <el-form ref="ruleForm" :rules="ruleForm" :model="ruleForm" label-width="180px" >

      <template v-if="labelType==='document'">
        <el-form-item label="分类分析图表">
          <el-input v-model="ruleForm.analysis" />
        </el-form-item>
        <el-form-item label="画像详细图表">
          <el-input v-model="ruleForm.detail" />
        </el-form-item>
      </template>

      <template v-if="labelType==='group'">
        group
      </template>

      <template v-if="labelType==='data'">
        data
        <el-form-item label="显示于数据列表">
          <el-input v-model="ruleForm.displayInDataSheet" />
        </el-form-item>
        <el-form-item label="显示于画面详细页">
          <el-input v-model="ruleForm.showInDetailFlag" />
        </el-form-item>
        <el-form-item label="是否可以调用接口">
          <el-input v-model="ruleForm.interfaceFlag" />
        </el-form-item>
        <el-form-item label="使用关联的字典编码映射出显示信息">
          <el-input v-model="ruleForm.codingMapping" />
        </el-form-item>
        <el-form-item label="自定义字典映射">
          <el-input v-model="ruleForm.dictionaryMapping" />
        </el-form-item>
        <el-form-item label="数据显示格式">
          <el-input v-model="ruleForm.data_show_format" />
        </el-form-item>
      </template>

    </el-form>
  </div>
</template>
<script>
import ElSelectCodes from '.././components/ElSelectCodes'

export default {
  name: 'LabelFormDisplay',
  components: { ElSelectCodes },
  props: {
    params: { type: Object, default: null },
    labelType: { type: String, default: null }
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
.label-form-display {
  font: inherit;
}
</style>

