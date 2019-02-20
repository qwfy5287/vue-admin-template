// 预算总收入
<template>
  <div class="economic-financial-revexp">
    <!-- economic-financial-revexp -->
    <BigColumn :list="list" unit="亿元"/>
  </div>
</template>
<script>
import BigColumn from '@/views/echarts-big/big-column.vue'
import { financialRevenueExpenditure } from './../api/economic'

export default {
  name: 'EconomicFinancialRevexp',
  components: { BigColumn },
  props: {},
  data() {
    return {
      list: null
    }
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
      const res = await financialRevenueExpenditure()
      if (res.code === 0) {
        this.list = res.data
        // this.render()
      }
    },
    render() { }
  }
}
</script>
<style lang="scss">
.economic-financial-revexp {
  font: inherit;

  height: 823px;
}
</style>

