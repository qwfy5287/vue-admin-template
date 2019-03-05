// 模板文件
<template>
  <div class="label-main">label-main
    <div>
      <el-button type="primary" @click="addTopLabelClick">添加一级标签</el-button>
    </div>
    <el-row>
      <el-col :span="8">left
        <LabelTree @add="labelTreeAdd" @nodeClick="labelTreeNodeClick" />
      </el-col>
      <el-col :span="16">right

        <div/>
        <el-tabs v-model="tabsActive" type="border-card">
          <el-tab-pane v-for="(item,index) in tabs" :key="'label'+index" :label="item.label" :name="item.value">
            {{ item.label }}
            <LabelFormInfo v-if="item.value==='info'" />
            <LabelFormValue v-if="item.value==='value'" />
            <LabelFormQuery v-if="item.value==='query'" />
            <LabelFormDisplay v-if="item.value==='display'" />
            <LabelFormArchive v-if="item.value==='archive'" />

          </el-tab-pane>
          <!-- <el-tab-pane label="用户管理">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
        </el-tabs>
        <div>
          <!-- 标签信息 -->
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

          <!-- 标签值设置 -->
          <div>
            <h3>标签值设置</h3>
            <el-form :v-model="form" label-width="180px" >
              <el-form-item label="生成方式">
                <el-input v-model="form.generation" />
              </el-form-item>
              <el-form-item :v-model="form" label="标签值类型">
                <el-input v-model="form.valueType" />
              </el-form-item>
              <el-form-item :v-model="form" label="最小值">
                <el-input v-model="form.minValue" />
              </el-form-item>
              <el-form-item :v-model="form" label="最大值">
                <el-input v-model="form.maxValue" />
              </el-form-item>
              <el-form-item :v-model="form" label="关联系统字典">
                <el-input v-model="form.systemDictionary" />
              </el-form-item>
              <el-form-item :v-model="form" label="合法值枚举">
                <el-input v-model="form.enumeration" />
              </el-form-item>
              <el-form-item :v-model="form" label="数据库存储映射">
                <el-input v-model="form.dataStoreMapping" />
              </el-form-item>
              <el-form-item :v-model="form" label="是否添加到多字段搜索">
                <el-input v-model="form.include_in_all" />
              </el-form-item>
              <el-form-item :v-model="form" label="标签默认值">
                <el-input v-model="form.labelValue" />
              </el-form-item>
            </el-form>
          </div>

          <!-- 查询条件设置 -->
          <div>
            <h3>查询条件设置</h3>
            <el-form :v-model="form" label-width="180px" >
              <el-form-item label="支持精确匹配查询">
                <el-input v-model="form.query_condition_term" />
              </el-form-item>
              <el-form-item :v-model="form" label="查询预处理">
                <el-input v-model="form.query_pre_processor" />
              </el-form-item>
              <el-form-item :v-model="form" label="使用关联的字典编码作为选项">
                <el-input v-model="form.encodingOptions" />
              </el-form-item>
              <!-- todo: 选项名称 -->
              <!-- <el-form-item :v-model="form" label="使用关联的字典编码作为选项">
              <el-input v-model="form.encodingOptions" />
            </el-form-item> -->
              <el-form-item :v-model="form" label="支持多选">
                <el-input v-model="form.chooseToSupport" />
              </el-form-item>
              <el-form-item :v-model="form" label="默认显示个数">
                <el-input v-model="form.defaultDisplayNumber" />
              </el-form-item>
              <el-form-item :v-model="form" label="允许自定义区间">
                <el-input v-model="form.customRange" />
              </el-form-item>
              <el-form-item :v-model="form" label="排序支持">
                <el-input v-model="form.labelOrder" />
              </el-form-item>
            </el-form>
          </div>

          <!-- 显示信息设置 -->
          <div>
            <h3>显示信息设置</h3>
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
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script>
import LabelTree from './label-tree'

import LabelFormInfo from './label-form-info'
import LabelFormValue from './label-form-value'
import LabelFormQuery from './label-form-query'
import LabelFormDisplay from './label-form-display'
import LabelFormArchive from './label-form-archive'

export default {
  name: 'LabelMain',
  components: { LabelTree, LabelFormInfo, LabelFormValue, LabelFormQuery, LabelFormDisplay, LabelFormArchive },
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
      },
      tabs: [{
        label: '标签信息',
        value: 'info',
        has: true
      }, {
        label: '标签值设置',
        value: 'value',
        has: true
      }, {
        label: '查询条件设置',
        value: 'query',
        has: true
      }, {
        label: '显示信息设置',
        value: 'display',
        has: true
      }, {
        label: '归档设置',
        value: 'archive',
        has: true
      }],
      tabsActive: 'info',
      tabsModelArchive: ['info', 'archive', 'display'],
      tabsModelGroup: ['info', 'display'],
      tabsModelValue: ['info', 'value', 'query', 'display']
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
    },
    // 添加一级标签
    addTopLabelClick() {
      this.tabs = this.tabs.filter(d => this.tabsModelArchive.includes(d.value))
    }
  }
}
</script>
<style lang="scss">
.label-main {
  font: inherit;
}
</style>

