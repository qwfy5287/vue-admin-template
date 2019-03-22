// 标签-表单-标签信息
<template>
  <div class="label-form-info">
    label-form-info

    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="180px" >
      <el-form-item label="标签名称" prop="labelName" >
        <el-input v-model="ruleForm.labelName" />
      </el-form-item>
      <el-form-item label="标签代码" prop="labelCode">
        <el-input v-model="ruleForm.labelCode" />
      </el-form-item>
      <el-form-item label="标签状态" prop="labelStatus">
        <!-- {{ ruleForm.labelStatus }} -->
        <!-- <el-input v-model="ruleForm.labelStatus" /> -->
        <ElSelectCodes v-model="ruleForm.labelStatus" />
      </el-form-item>
      <el-form-item label="标签类型" prop="labelType">
        <!-- <el-input v-model="ruleForm.labelType" /> -->
        <ElSelectCodes v-model="ruleForm.labelType" code="PORTRAIT_LABEL_TYPE" />
      </el-form-item>
      <el-form-item label="标签应用">
        <el-input v-model="ruleForm.labelApp" />
      </el-form-item>
      <el-form-item label="标签描述">
        <el-input v-model="ruleForm.description" />
      </el-form-item>

      <!--  -->
      <el-form-item>
        <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button> -->
        <el-button type="primary" @click="save">save</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ElSelectCodes from '.././components/ElSelectCodes'

export default {
  name: 'LabelFormInfo',
  components: { ElSelectCodes },
  props: {
    params: { type: Object, default: null }
  },
  data() {
    return {
      ruleForm: {},
      rules: {
        labelName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        labelCode: [
          { required: true, message: '请输入标签代码', trigger: 'blur' },
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
    //
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
.label-form-info {
  font: inherit;
}
</style>

