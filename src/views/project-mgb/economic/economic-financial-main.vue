// 财政指标
<template>
  <div class="economic-financial-main">economic-financial-main
    <SecTitle width="800px" title="2018年1-9月财政收支"/>
    <div class="sec-body">
      <EconomicFinancialRevexp />
    </div>
    <!-- <SecTitle width="800px" title="预算总收入"/>
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
    </div> -->
  </div>
</template>
<script>
import SecTitle from './../components/sec-title.vue'
import EconomicKpiAssets from './economic-kpi-assets.vue'
import EconomicKpiBudget from './economic-kpi-budget.vue'
import EconomicKpiForeign from './economic-kpi-foreign.vue'
import EconomicKpiInvestment from './economic-kpi-investment.vue'

import EconomicFinancialRevexp from './economic-financial-revexp.vue'
export default {
  name: 'EconomicFinancialMain',
  components: { SecTitle, EconomicKpiAssets, EconomicKpiBudget, EconomicKpiForeign, EconomicKpiInvestment, EconomicFinancialRevexp },
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
.economic-financial-main {
  font: inherit;

  .sec-body {
    padding: 50px;
  }
}
</style>

