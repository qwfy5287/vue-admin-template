// 招商投资统计
<template>
  <div class="economic-kpi-investment">
    <!-- economic-kpi-investment -->
    <BigLineTwoAxis :list="list"/>
  </div>
</template>
<script>
import BigLineTwoAxis from '@/views/echarts-big/big-line-two-axis.vue'
import { kpiInvestment } from './../api/economic'
export default {
  name: 'EconomicKpiInvestment',
  components: { BigLineTwoAxis },
  props: {},
  data() {
    return {
      list: []
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
      const res = await kpiInvestment()
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
.economic-kpi-investment {
  font: inherit;

  height: 640px;
}
</style>

