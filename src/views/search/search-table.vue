<template>
  <div class="search-table">
    <!-- search-table -->
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column prop="date" label="日期" width="180"/>
      <el-table-column prop="name" label="姓名" width="180"/>
      <el-table-column prop="address" label="地址"/>-->
      <el-table-column
        v-for="(item,index) of tableHead"
        :fixed="index == 5?'right':false"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        width="130"
      >
        <!-- <template slot-scope="scope">
          <span :class="{hasMore:hasMore(scope,index)}">{{ scope.row[Object.keys(scope.row)[index]] }}</span>

          <el-popover trigger="hover" placement="top" v-if="hasMore(scope,index)" width="310">
            <span class="tableText">{{ scope.row[Object.keys(scope.row)[index]] }}</span>
            <span slot="reference" class="name-wrapper more-box">
              <span class="more">更多</span>
            </span>
          </el-popover>
        </template>-->
      </el-table-column>
    </el-table>

    <el-pagination :total="50" layout="prev, pager, next"/>
  </div>
</template>
<script>
import { query } from '@/api/search'

export default {
  name: 'SearchTable',
  components: {},
  props: {},
  data() {
    return {
      tableHead: [],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }] }
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.fetchData()
    },
    async fetchData() {
      const res = await query()
      this.tableHead = res.tableHead
      this.tableData = res.tableData
    },
    render() { }
  }
}
</script>
<style lang="scss">
.search-table {
  .el-pagination {
    text-align: center;
  }
}
</style>

