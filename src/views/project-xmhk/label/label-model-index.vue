// 标签管理-modal-添加索引配置

<template>
  <div class="label-model-index">
    <!-- label-model-index -->
    <el-dialog
      :title="`${preTitle}接口`"
      :visible.sync="dialogVisible"
      width="60%"
      top="5vh"
    >
      <div v-if="dialogVisible">
        <!-- 内容区域 -->
        <!-- 表单 -->
        <div class="form-box">
          <el-form v-if="ruleForm" ref="ruleForm" :rules="rules" :model="ruleForm" label-width="180px">
            <el-form-item label="集群名称" prop="clusterName" >
              <ElSelectCodes v-model="ruleForm.clusterName" code="ES_CLUSTER_NAME" />
            </el-form-item>
            <el-form-item label="索引名称" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="分组编码" prop="code">
              <!-- <el-input v-model="ruleForm.code" />
              <el-button @click="genCode()">
                生成编码
              </el-button> -->

              <el-input v-model="ruleForm.code" class="input-with-select">
                <el-button slot="append" @click="genCode()">
                  生成编码
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="标签库" prop="label">
              <el-select v-model="ruleForm.label">
                <el-option v-for="option in labelOptions" :key="option.value" :label="option.label" :value="option.value" />
              </el-select>
            </el-form-item>
            <el-form-item v-if="ruleForm.label" label="查询标签" prop="subLabels">
              <!-- <el-button @click="setsubLabels">
                设置
              </el-button> -->
              <el-input v-show="false" v-model="ruleForm.subLabels" />

              <!-- @check-change="handleCheckChange" -->
              <!-- :props="props" -->
              <!-- <div class="tree-box">
                <el-tree
                  :data="treeData"
                  show-checkbox
                  :props="defaultProps"
                  default-expand-all
                />
              </div> -->
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark" />
            </el-form-item>

            <!-- <el-form-item>
              <el-button type="primary" @click="submitForm">
                保存
              </el-button>
              <el-button type="primary" @click="run">
                执行
              </el-button>
              <el-button>
                重置
              </el-button>
            </el-form-item> -->
          </el-form>
        </div>
        <!-- End 表单 -->
        <!-- End内容区域 -->
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ElSelectCodes from '.././components/ElSelectCodes'

export default {
  name: 'LabelModelIndex',
  components: { ElSelectCodes },
  props: {},
  data() {
    return {
      preTitle: '添加',
      dialogVisible: false,
      //
      ruleForm: {
        name: null,
        code: null,
        label: null,
        subLabels: null,
        remark: null,
        clusterName: null
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur ' }
        ],
        code: [
          { required: true, message: '请输入', trigger: 'blur ' }
        ],
        subLabels: [
          { required: true, message: '请选择', trigger: 'change ' }
        ],
        label: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      labelOptions: [{
        label: '用户标签库1',
        value: '100'
      }, {
        label: '用户标签库2',
        value: '200'
      }, {
        label: '用户标签库3',
        value: '300'
      }],
      treeData: [
        {
          id: 1,
          pid: 0,
          name: '用户标签库',
          children: [
            {
              id: 2,
              pid: 1,
              name: '基础标签库',
              children: []
            },
            {
              id: 3,
              pid: 1,
              name: '基础标签库',
              children: []
            },
            {
              id: 4,
              pid: 1,
              name: '行为标签库',
              children: [
                {
                  id: 5,
                  pid: 4,
                  name: '行程相关',
                  children: [
                    {
                      id: 111,
                      pid: 5,
                      name: '保险偏好'
                    },
                    {
                      id: 112,
                      pid: 5,
                      name: '附加服务偏好'
                    },
                    {
                      id: 113,
                      pid: 5,
                      name: '附加服务占比'
                    }
                  ]
                }
              ]
            },
            {
              id: 7,
              pid: 1,
              name: '模型标签',
              children: []
            }
          ]
        }
      ], // 穿梭框 - 源数据 - 树形
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
  },
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() { },
    async fetchData() { },
    render() { },
    edit(item) {
      if (item) {
        this.preTitle = '编辑'
      } else {
        this.preTitle = '添加'
      }

      this.dialogVisible = true
    },
    // submitForm() {
    //   this.dialogVisible = false
    // },
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$message('submit')
          this.dialogVisible = false
        } else {
          this.$message('error submit')
          return false
        }
      })
    },
    //  生成编码
    genCode() {
      this.ruleForm.code = this.uuid()
    },
    //  生成 uuid
    uuid() {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'

      var uuid = s.join('')
      // 去掉 -
      uuid = uuid.replace(new RegExp('-', 'g'), '')
      return uuid
    }
  }
}
</script>
<style lang="scss">
.label-model-index {
  font-size: inherit;

  .tree-box {
    height: 200px;
    overflow: auto;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }
}
</style>

