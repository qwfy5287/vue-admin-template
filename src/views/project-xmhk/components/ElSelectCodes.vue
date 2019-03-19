// 下拉框 codes
<template>
  <div class="el-select-codes">
    <!-- el-select-codes -->

    <!-- <input
      @change="$emit('change', $event.target.sss)"
    > -->
    <!-- <input
      :value="sss"
      type="text"
      @input="$emit('update', sss)"
    > -->

    <el-select :value="innerValue" @change="change($event)" >
      <!-- <el-select v-model="sss" @change="$emit('update', sss)" > -->
      <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.value" />
    </el-select>
  </div>
</template>
<script>
import { codes } from '.././api/system/cache.js'

export default {
  name: 'VueTemplate',
  components: {},
  model: {
    prop: 'sss',
    event: 'update'
  },
  //   props: {
  //   },
  //   props: ['value', 'size', 'showAllTip', 'showAllTipLabel'],
  props: {
    sss: { type: String, default: null },
    code: { type: String, default: null }
    // value: { type: String, default: null }
  },
  data() {
    return {
      options: [
        {
          'id': 1080,
          'code': 'LABEL_STATUS',
          'name': '上线',
          'value': 'online',
          'parentValue': null,
          'uniqueFlag': null,
          'status': '1',
          'remark': null,
          'orderNo': 1,
          'param1': null,
          'param2': null,
          'param3': null,
          'param4': null,
          'param5': null,
          'defaultFlag': null
        },
        {
          'id': 1081,
          'code': 'LABEL_STATUS',
          'name': '下线',
          'value': 'downline',
          'parentValue': null,
          'uniqueFlag': null,
          'status': '1',
          'remark': null,
          'orderNo': 2,
          'param1': null,
          'param2': null,
          'param3': null,
          'param4': null,
          'param5': null,
          'defaultFlag': null
        }
      ],
      innerValue: null
    //   sel: null

    //   'LABEL_STATUS':
    }
  },
  computed: {
    // innerValue() {
    //   return this.sss
    // }
    // innerValue: function() {
    //   // `this` points to the vm instance
    //   return this.sss
    // }
  },
  watch: {
    sss: function(val) {
      this.innerValue = this.sss
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() { this.fetchData() },
    async fetchData() {
      const res = await codes()
      if (res && res['SYS_CODE']) {
        const item = res['SYS_CODE'][this.code]
        if (item) {
          this.options = item
        }
      }
    },
    render() { },
    change: function(val) {
    //   this.$emit('input', val)
      this.innerValue = val
      this.$emit('update', val)
    }
  }
}
</script>
<style lang="scss">
.el-select-codes {
  font: inherit;
}
</style>

