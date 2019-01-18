// 经济指标
<template>
  <div class="economic-kpi-main">economic-kpi-main
    <SecTitle width="800px" title="社会总资产"/>
    <div class="sec-body">
      <EconomicKpiAssets/>
    </div>
    <SecTitle width="800px" title="预算总收入"/>
    <div class="sec-body">
      <EconomicKpiBudget/>
    </div>
    <SecTitle width="800px" title="历年外资流动"/>
    <div class="sec-body">
      <EconomicKpiForeign/>
    </div>
    <SecTitle width="800px" title="招商投资统计"/>
    <div class="sec-body">
      <EconomicKpiInvestment/>
    </div>
  </div>
</template>
<script>
import SecTitle from './../components/sec-title.vue'
import EconomicKpiAssets from './economic-kpi-assets.vue'
import EconomicKpiBudget from './economic-kpi-budget.vue'
import EconomicKpiForeign from './economic-kpi-foreign.vue'
import EconomicKpiInvestment from './economic-kpi-investment.vue'
export default {
  name: 'EconomicKpiMain',
  components: { SecTitle, EconomicKpiAssets, EconomicKpiBudget, EconomicKpiForeign, EconomicKpiInvestment },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() { },
    fetchData() { },
    render() { }
  }
}
</script>
<style lang="scss">
.economic-kpi-main {
  font: inherit;

  .sec-body {
    padding: 50px;
  }
}
</style>

