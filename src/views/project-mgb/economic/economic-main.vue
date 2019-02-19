// 区域经济
<template>
  <div class="economic-main">economic-main
    <PageSlot>
      <template slot="one">
        <div class="col-one-box">
          <ColTitle title="经济指标"/>
          <EconomicKpiMain/>
        </div>
      </template>
      <template slot="three">
        <div class="col-three-box">
          <ColTitle title="财政指标"/>
          <EconomicFinancialMain/>
        </div>
      </template>
    </PageSlot>
  </div>
</template>
<script>
import PageSlot from './../components/page-slot.vue'

import ColTitle from './../components/col-title.vue'
import EconomicKpiMain from './economic-kpi-main.vue'
import EconomicFinancialMain from './economic-financial-main.vue'

export default {
  name: 'EconomicMain',
  components: { PageSlot, ColTitle, EconomicKpiMain, EconomicFinancialMain },
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
.economic-main {
  font: inherit;

  .col-one-box {
    width: 2258px;
    height: 100%;
    background: url("./../assets/economic/economic-bg.svg") center center
      no-repeat;
    background-size: 100% 100%;
    background-position-x: 1.1px;
  }

  .col-three-box {
    width: 2258px;
    height: 100%;
    background: url("./../assets/economic/economic-bg.svg") center center
      no-repeat;
    background-size: 100% 100%;
    background-position-x: 1.1px;
  }
}
</style>

