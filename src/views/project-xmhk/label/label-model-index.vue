// 标签管理-modal-添加索引配置

<template>
  <div class="label-model-index">
    <!-- label-model-index -->
    <el-dialog
      :title="`${preTitle}索引`"
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
            <el-form-item label="索引名称" prop="index">
              <el-input v-model="ruleForm.index" />
            </el-form-item>
            <el-form-item label="索引类型" prop="type">
              <el-input v-model="ruleForm.type" />
            </el-form-item>
            <el-form-item label="索引空间" prop="nodeZone">
              <ElSelectMultiCodes v-model="ruleForm.nodeZone" code="NODE_ZONE" />
            </el-form-item>
            <el-form-item label="分片数" prop="shards">
              <el-input-number v-model.number="ruleForm.shards" :min="1" controls-position="right" />
            </el-form-item>
            <el-form-item label="副本数" prop="replicas">
              <el-input-number v-model.number="ruleForm.replicas" :disabled="true" controls-position="right"/>
            </el-form-item>
            <el-form-item label="权重" prop="weight">
              <el-input-number v-model.number="ruleForm.weight" :disabled="true" controls-position="right"/>
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
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ElSelectCodes from '.././components/ElSelectCodes'
import ElSelectMultiCodes from '.././components/ElSelectMultiCodes'

export default {
  name: 'LabelModelIndex',
  components: { ElSelectCodes, ElSelectMultiCodes },
  props: {},
  data() {
    return {
      preTitle: '添加',
      dialogVisible: false,
      //
      ruleForm: {
        clusterName: null,
        index: null,
        type: 'default',
        nodeZone: [],
        shards: null,
        replicas: null,
        weight: null
      },
      rules: {
        clusterName: [
          { required: true, message: '请输入', trigger: 'change ' }
        ],
        index: [
          { required: true, message: '请输入', trigger: 'blur ' }
        ],
        type: [
          { required: true, message: '请输入', trigger: 'blur ' }
        ], shards: [
          { required: true, message: '请输入', trigger: 'blur ' }
        ], replicas: [
          { required: true, message: '请输入', trigger: 'blur ' }
        ], weight: [
          { required: true, message: '请输入', trigger: 'blur ' }
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
    save(formName) {
      let result = false
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // alert('submit!')
          // debugger
          result = this.ruleForm
          this.$emit('save', result)
          this.dialogVisible = false
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

