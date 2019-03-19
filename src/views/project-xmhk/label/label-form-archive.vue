// 标签-表单-归档设置
<template>
  <div class="label-form-archive">
    label-form-archive
    {{ params }}
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="180px" >
      <el-form-item label="归档方式" prop="docMethod" >
        <!-- <el-input v-model="ruleForm.docMethod" /> -->
        <ElSelectCodes v-model="ruleForm.docMethod" code="LABEL_DOC_METHOD" />
      </el-form-item>
      <el-form-item label="支持读写分离">
        <!-- <el-input v-model="ruleForm.separateRwFlag" /> -->
        <el-switch
          v-model="ruleForm.separateRwFlag"
          :active-value="1"
          :inactive-value="0"/>
      </el-form-item>
      <!-- todo: 索引设置 -->
      <el-form-item label="主键映射字段">
        <el-input v-model="ruleForm.keymapping" />
      </el-form-item>
      <el-form-item label="主映射字段是否存储" prop="idSave">
        <!-- <el-input v-model="ruleForm.idSave" /> -->
        <el-switch
          v-model="ruleForm.idSave"
          active-value="true"
          inactive-value="false"/>
      </el-form-item>
      <el-form-item label="ElasticSearch 高级配置">
        <el-input v-model="ruleForm.advancedConfig" />
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import ElSelectCodes from '.././components/ElSelectCodes'

export default {
  name: 'LabelFormArchive',
  components: { ElSelectCodes },
  props: {
    params: { type: Object, default: null },
    labelType: { type: String, default: null }
  },
  data() {
    return {
      ruleForm: {},
      rules: {
        docMethod: [
          { required: true, message: '请选择归档方式', trigger: 'change' }
          // { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        idSave: [
          { required: true, message: '请选择', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      }}
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
    save(formName) {
      let result = false
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
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
.label-form-archive {
  font: inherit;
}
</style>

