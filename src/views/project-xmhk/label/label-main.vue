// 模板文件
<template>
  <div class="label-main">label-main
    <el-row>
      <el-col :span="8">left
        <LabelTree @add="labelTreeAdd" @nodeClick="labelTreeNodeClick" />
      </el-col>
      <el-col :span="16">right

        <div>
          <h3>标签信息</h3>
          <el-form :v-model="form" label-width="180px" >
            <el-form-item label="标签名称">
              <el-input v-model="form.labelName" />
            </el-form-item>
            <el-form-item :v-model="form" label="标签代码">
              <el-input v-model="form.labelCode" />
            </el-form-item>
            <el-form-item :v-model="form" label="标签状态">
              <el-input v-model="form.labelStatus" />
            </el-form-item>
            <el-form-item :v-model="form" label="标签类型">
              <el-input v-model="form.labelType" />
            </el-form-item>
            <el-form-item :v-model="form" label="标签应用">
              <el-input v-model="form.labelApp" />
            </el-form-item>
            <el-form-item :v-model="form" label="标签描述">
              <el-input v-model="form.description" />
            </el-form-item>
          </el-form>
        </div>

        <div>
          <h3>标签值设置</h3>
          <el-form :v-model="form" label-width="180px" >
            <el-form-item label="生成方式">
              <el-input v-model="form.generation" />
            </el-form-item>
            <el-form-item :v-model="form" label="标签代码">
              <el-input v-model="form.labelCode" />
            </el-form-item>
            <el-form-item :v-model="form" label="标签状态">
              <el-input v-model="form.labelStatus" />
            </el-form-item>
            <el-form-item :v-model="form" label="标签类型">
              <el-input v-model="form.labelType" />
            </el-form-item>
            <el-form-item :v-model="form" label="标签应用">
              <el-input v-model="form.labelApp" />
            </el-form-item>
            <el-form-item :v-model="form" label="标签描述">
              <el-input v-model="form.description" />
            </el-form-item>
          </el-form>
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script>
import LabelTree from './label-tree'
export default {
  name: 'LabelMain',
  components: { LabelTree },
  props: {},
  data() {
    return {
      form: {
        name: '',
        labelName: '标签名称',
        labelCode: '标签代码',
        labelStatus: '标签状态',
        labelType: '标签类型',
        labelApp: '标签应用',
        description: '标签描述'
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() { },
    fetchData() { },
    render() { },
    labelTreeAdd(val) {
      this.form.name = val
    },
    labelTreeNodeClick(data) {
      this.form = data
    }
  }
}
</script>
<style lang="scss">
.label-main {
  font: inherit;
}
</style>

