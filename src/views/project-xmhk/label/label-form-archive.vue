// 标签-表单-归档设置
<template>
  <div class="label-form-archive">
    label-form-archive
    {{ params }}
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="180px" >
      <!-- <el-form-item label="归档方式" prop="docMethod" >
        <ElSelectCodes v-model="ruleForm.docMethod" code="LABEL_DOC_METHOD" />
      </el-form-item> -->
      <!-- <el-form-item label="支持读写分离">
        <el-switch
          v-model="ruleForm.separateRwFlag"
          :active-value="1"
          :inactive-value="0"/>
      </el-form-item> -->
      <!-- todo: 索引设置 -->
      <el-form-item label="索引" prop="indexSettings">
        <!-- <el-input v-model="ruleForm.indexSettings" /> -->

        <el-input v-model="ruleForm.indexSettings" />
        <div>
          索引配置信息展示
        </div>
        <el-button @click="btnAddIndexSettings">添加索引</el-button>
      </el-form-item>
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

    <LabelModelIndex ref="labelModelIndex" @save="labelModelIndexSave" />

  </div>
</template>
<script>
import ElSelectCodes from '.././components/ElSelectCodes'

import LabelModelIndex from './label-model-index'

export default {
  name: 'LabelFormArchive',
  components: { ElSelectCodes, LabelModelIndex },
  props: {
    params: { type: Object, default: null },
    labelType: { type: String, default: null }
  },
  data() {
    return {
      ruleForm: {
        indexSettings: null,
        keymapping: null,
        idSave: null,
        advancedConfig: null
      },
      rules: {
        indexSettings: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
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
      // eslint-disable-next-line no-undef
      this.ruleForm = _.merge({}, this.ruleForm, this.params.ruleForm)
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
    },
    // 添加索引配置
    btnAddIndexSettings() {
      this.$refs.labelModelIndex.edit()
    },
    labelModelIndexSave(val) {
      debugger
      this.ruleForm.indexSettings = val
    }
  }
}
</script>
<style lang="scss">
.label-form-archive {
  font: inherit;
}
</style>

