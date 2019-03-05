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
      <el-form-item label="标签状态">
        <el-input v-model="ruleForm.labelStatus" />
      </el-form-item>
      <el-form-item label="标签类型">
        <el-input v-model="ruleForm.labelType" />
      </el-form-item>
      <el-form-item label="标签应用">
        <el-input v-model="ruleForm.labelApp" />
      </el-form-item>
      <el-form-item label="标签描述">
        <el-input v-model="ruleForm.description" />
      </el-form-item>

      <!--  -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'LabelFormInfo',
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {},
      rules: {
        labelName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }}
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() { },
    async fetchData() { },
    render() { },
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
    }
  }
}
</script>
<style lang="scss">
.label-form-info {
  font: inherit;
}
</style>

