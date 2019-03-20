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

        <div>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
        <el-tabs v-model="tabsActive" type="border-card">
          <el-tab-pane v-for="(item,index) in filterTabs" :key="'label'+index" :label="item.label" :name="item.value">
            {{ item.label }}
            <LabelFormInfo v-if="item.value==='info'" ref="labelFormInfo" :params="labelFormInfoParams" :label-type="curLabelType" />
            <LabelFormValue v-if="item.value==='value'" ref="labelFormValue" :params="labelFormValueParams" :label-type="curLabelType" />
            <LabelFormQuery v-if="item.value==='query'" ref="labelFormQuery" :params="labelFormQueryParams" :label-type="curLabelType"/>
            <LabelFormDisplay v-if="item.value==='display'" ref="labelFormDisplay" :params="labelFormDisplayParams" :label-type="curLabelType" />
            <LabelFormArchive v-if="item.value==='archive'" ref="labelFormArchive" :params="labelFormArchiveParams" :label-type="curLabelType" />
          </el-tab-pane>
        </el-tabs>

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
      tabsModelValue: ['info', 'value', 'query', 'display'],
      labelFormInfoParams: null,
      labelFormValueParams: null,
      labelFormQueryParams: null,
      labelFormDisplayParams: null,
      labelFormArchiveParams: null,
      labelType: {
        document: 'document',
        group: 'group',
        data: 'data'
      },
      curLabelType: 'document'
    }
  },
  computed: {
    filterTabs() {
      let result = null

      switch (this.curLabelType) {
        case this.labelType.document:
          result = this.tabs.filter(d => this.tabsModelArchive.includes(d.value))
          break
        case this.labelType.group:
          result = this.tabs.filter(d => this.tabsModelGroup.includes(d.value))
          break
        case this.labelType.data:
          result = this.tabs.filter(d => this.tabsModelValue.includes(d.value))
          break
        default:
          break
      }

      return result
    }
  },
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
      this.curLabelType = data.labelType

      const dashboardUrlObj = JSON.parse(data.dashboardUrl)
      const detailSettingsObj = JSON.parse(data.detailSettings)
      const connectionSettingsObj = JSON.parse(data.connectionSettings)

      this.setLabelFormInfoParams({ data, dashboardUrlObj, detailSettingsObj, connectionSettingsObj })
      this.setLabelFormValueParams({ data, dashboardUrlObj, detailSettingsObj, connectionSettingsObj })
      this.setLabelFormQueryParams({ data, dashboardUrlObj, detailSettingsObj, connectionSettingsObj })
      this.setLabelFormDisplayParams({ data, dashboardUrlObj, detailSettingsObj, connectionSettingsObj })
      this.setLabelFormArchiveParams({ data, dashboardUrlObj, detailSettingsObj, connectionSettingsObj })
    },
    // 添加一级标签
    addTopLabelClick() {
      this.tabs = this.tabs.filter(d => this.tabsModelArchive.includes(d.value))
    },
    save() {
      let result = {}
      result = this.form

      switch (this.curLabelType) {
        case this.labelType.document:
          this.updateLabelFormInfoResult(result) &&
          this.updateLabelFormDisplayResult(result) &&
          this.updateLabelFormArchiveResult(result)

          break
        case this.labelType.group:

          break
        case this.labelType.data:

          break
        default:
          break
      }

      if (result) {
        console.log(result)
      } else {
        this.$message('submit error')
      }
    },
    // 更新参数
    updateLabelFormInfoResult(result) {
      let subResult = false
      const labelFormInfoResult = this.$refs['labelFormInfo'][0].save()

      if (labelFormInfoResult) {
        result = Object.assign({}, result, labelFormInfoResult)
        subResult = true
      } else {
        this.tabsActive = 'info'
        subResult = false
      }
      return subResult
    },
    updateLabelFormValueResult(result) {
      let subResult = false
      const labelFormValueResult = this.$refs['labelFormValue'][0].save()
      debugger

      if (labelFormValueResult) {
        result = Object.assign({}, result, labelFormValueResult)
        subResult = true
      } else {
        this.tabsActive = 'value'
        subResult = false
      }
      return subResult
    },
    updateLabelFormQueryResult(result) {
      let subResult = false
      const labelFormQueryResult = this.$refs['labelFormQuery'][0].save()
      debugger

      if (labelFormQueryResult) {
        result = Object.assign({}, result, labelFormQueryResult)
        subResult = true
      } else {
        this.tabsActive = 'query'
        subResult = false
      }
      return subResult
    },
    updateLabelFormDisplayResult(result) {
      let subResult = false
      const labelFormDisplayResult = this.$refs['labelFormDisplay'][0].save()

      if (labelFormDisplayResult) {
        let dashboardUrl
        switch (this.curLabelType) {
          case this.labelType.document:
            dashboardUrl = {
              'analysis': { 'url': labelFormDisplayResult.analysis },
              'detail': { 'url': labelFormDisplayResult.detail }
            }
            result = Object.assign({}, result, { dashboardUrl: JSON.stringify(dashboardUrl) })

            break
          case this.labelType.group:

            break
          case this.labelType.data:

            break
          default:
            break
        }
        subResult = true
      } else {
        this.tabsActive = 'display'
        subResult = false
      }
      return subResult
    },
    updateLabelFormArchiveResult(result) {
      let subResult = false
      const labelFormArchiveResult = this.$refs['labelFormArchive'][0].save()

      if (labelFormArchiveResult) {
        const connectionSettingsPre = JSON.parse(result.connectionSettings)
        const connectionSettings = Object.assign({}, connectionSettingsPre, labelFormArchiveResult)
        // {"docMethod":"split_no","separateRwFlag":0,"keymapping":"es_jcsx_rksx_rowkey","idSave":"true","advancedConfig":""}

        result = Object.assign({}, result, { connectionSettings: JSON.stringify(connectionSettings) })
        subResult = true
      } else {
        this.tabsActive = 'archive'
        subResult = false
      }
      return subResult
    },
    // 设置参数
    setLabelFormInfoParams({ data, dashboardUrlObj, detailSettingsObj, connectionSettingsObj }) {
      let result = null

      result = {
        ruleForm: {
          labelName: data.labelName,
          labelCode: data.labelCode,
          labelStatus: data.labelStatus,
          labelType: data.labelType,
          labelApp: data.labelApp,
          description: data.description
        }
      }

      this.labelFormInfoParams = result
    },
    setLabelFormValueParams({ data, dashboardUrlObj, detailSettingsObj, connectionSettingsObj }) {
      let result = null
      switch (this.curLabelType) {
        case this.labelType.document:
          result = {
            ruleForm: {
            }
          }
          break
        case this.labelType.group:
          result = {
            ruleForm: {
            }
          }
          break
        case this.labelType.data:
          result = {
            ruleForm: {
              generation: data.generation,
              valueType: data.valueType,
              minValue: detailSettingsObj.minValue,
              maxValue: detailSettingsObj.maxValue,
              systemDictionary: detailSettingsObj.systemDictionary,
              enumeration: detailSettingsObj.enumeration,
              dataStoreMapping: detailSettingsObj.dataStoreMapping,
              include_in_all: connectionSettingsObj.include_in_all,
              labelValue: detailSettingsObj.labelValue
            }
          }
          break

        default:
          break
      }

      this.labelFormValueParams = result
    },
    setLabelFormQueryParams({ data, dashboardUrlObj, detailSettingsObj, connectionSettingsObj }) {
      let result = null

      result = {
        ruleForm: {
          query_condition_term: detailSettingsObj.query_condition_term,
          query_pre_processor: detailSettingsObj.query_pre_processor,
          encodingOptions: detailSettingsObj.encodingOptions,
          chooseToSupport: detailSettingsObj.chooseToSupport,
          defaultDisplayNumber: detailSettingsObj.defaultDisplayNumber,
          customRange: detailSettingsObj.customRange,
          labelOrder: detailSettingsObj.labelOrder
        }
      }

      this.labelFormQueryParams = result
    },
    setLabelFormDisplayParams({ data, dashboardUrlObj, detailSettingsObj, connectionSettingsObj }) {
      let result = null
      switch (this.curLabelType) {
        case this.labelType.document:
          result = {
            ruleForm: {
              analysis: dashboardUrlObj.analysis.url,
              detail: dashboardUrlObj.detail.url
            }
          }
          break
        case this.labelType.group:
          result = {
            ruleForm: {
            }
          }
          break
        case this.labelType.data:
          result = {
            ruleForm: {
              displayInDataSheet: detailSettingsObj.displayInDataSheet,
              showInDetailFlag: detailSettingsObj.showInDetailFlag,
              interfaceFlag: data.interfaceFlag,
              codingMapping: detailSettingsObj.codingMapping,
              dictionaryMapping: detailSettingsObj.dictionaryMapping,
              data_show_format: detailSettingsObj.data_show_format
            }
          }
          break

        default:
          break
      }

      this.labelFormDisplayParams = result
    },
    setLabelFormArchiveParams({ data, dashboardUrlObj, detailSettingsObj, connectionSettingsObj }) {
      let result = null
      result = {
        ruleForm: {
          docMethod: connectionSettingsObj.docMethod,
          separateRwFlag: connectionSettingsObj.separateRwFlag,
          keymapping: connectionSettingsObj.keymapping,
          idSave: connectionSettingsObj.idSave,
          advancedConfig: connectionSettingsObj.advancedConfig
        }
      }
      this.labelFormArchiveParams = result
    }
  }
}
</script>
<style lang="scss">
.label-main {
  font: inherit;
}
</style>

