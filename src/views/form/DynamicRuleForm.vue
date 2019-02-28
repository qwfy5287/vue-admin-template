// 动态验证表单
<template>
  <div class="dynamic-rule-form">
    dynamic-rule-form

    ruleform
    <el-form ref="ruleForm" :model="dynamicForm" label-width="80px">
      <el-form-item v-for="(item,index) in dynamicForm.form" :key="index" :label="item.label" :prop="'form['+index+'].value'" :rules="item.rules">
        <!-- input -->
        <el-input v-if="item.element=='input'" v-model="item.value"/>

        <!-- switch -->
        <el-switch v-if="item.element=='switch'" v-model="item.value"/>

        <!-- select -->
        <el-select v-if="item.element=='select'" v-model="item.value">
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"/>
        </el-select>

        <!-- textarea -->
        <el-input v-if="item.element=='textarea'" :autosize="{ minRows: 2, maxRows: 4}" v-model="item.value" type="textarea" placeholder="请输入内容"/>

        <!-- radio -->
        <el-radio-group v-if="item.element=='radio'" v-model="item.value">
          <el-radio v-for="(item,index) in item.options" :key="index" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>

        <!-- checkbox -->
        <el-checkbox-group v-if="item.element=='checkbox'" v-model="item.value">
          <el-checkbox v-for="(item,index) in item.options" :key="index" :label="item.label"/>
        </el-checkbox-group>

        <!-- range -->
        <div v-if="item.element=='range'">
          <el-col :span="11">
            <el-form-item :prop="'form['+index+'].start.value'" :rules="item.start.rules">
              <el-input-number v-model.number="item.start.value"/>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-form-item :prop="'form['+index+'].end.value'" :rules="item.end.rules">
              <el-input-number v-model.number="item.end.value"/>
            </el-form-item>
          </el-col>
        </div>

      </el-form-item>
      <!-- buttom -->
      <el-form-item>
        <el-button @click="submitForm">submit</el-button>
        <el-button @click="resetForm">reset</el-button>
        <el-button @click="clearValidate">clearValidate</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
export default {
  name: 'DynamicRuleForm',
  components: {},
  props: {},
  data() {
    return {
      dynamicForm: {
        form: [
          {
            name: 'name',
            label: '用户名',
            value: 'sss',
            rules: [{ min: 7, required: true, message: '输入错误' }],
            element: 'input'
          },
          {
            name: 'pwd',
            label: '密码',
            value: 'sss',
            rules: [{ min: 7, required: true, message: '输入错误' }],
            element: 'input'
          },
          {
            name: 'repwd',
            label: '确认密码',
            value: 'sss',
            rules: [{ min: 7, required: true, message: '输入错误' }],
            element: 'input'
          },
          {
            name: 'sex',
            label: '性别',
            value: null,
            es: null,
            element: 'radio',
            options: [
              {
                value: '男',
                label: '男'
              },
              {
                value: '女',
                label: '女'
              }
            ]
          },
          {
            name: 'role',
            label: '角色',
            value: null,
            element: 'select',
            options: [
              {
                value: '选项1',
                label: '黄金糕'
              },
              {
                value: '选项2',
                label: '双皮奶'
              },
              {
                value: '选项3',
                label: '蚵仔煎'
              },
              {
                value: '选项4',
                label: '龙须面'
              },
              {
                value: '选项5',
                label: '北京烤鸭'
              }
            ]
          },
          {
            name: 'remark',
            label: '备注',
            value: null,
            element: 'textarea',
            rules: { required: true, message: '输入错误' }
          },
          {
            name: 'age',
            label: '年龄',
            value: '12',
            element: 'input'
          },
          {
            name: 'disabled',
            label: '禁用',
            value: false,
            element: 'switch'
          },
          {
            name: 'hb_cnt_3y',
            label: '最近三年',
            value: [],
            element: 'checkbox',
            options: [
              {
                value: '{"range":{"hb_cnt_3y":{"lt":10}}}',
                label: '10次以下'
              },
              {
                value: '{"range":{"hb_cnt_3y":{"gte":10,"lte":20}}}',
                label: '10-20次'
              },
              {
                value: '{"range":{"hb_cnt_3y":{"gte":20,"lte":30}}}',
                label: '20-30次'
              }
            ]
          },
          {
            name: 'age',
            label: '年龄区间',
            value: null,
            element: 'range',

            start: {
              value: undefined,
              rules: [{ type: 'number', message: '必须为数字值' }]
            },
            end: {
              value: undefined,
              rules: [{ type: 'number', message: '必须为数字值' }]
            }
          }
        ]
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
    async fetchData() { },
    render() { },

    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$message('submit')
        } else {
          this.$message('error submit')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    clearValidate() {
      this.$refs.ruleForm.clearValidate()
    }
  }
}
</script>
<style lang="scss">
.dynamic-rule-form {
  font: inherit;
}
</style>

