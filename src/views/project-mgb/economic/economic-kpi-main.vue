// 经济指标
<template>
  <div class="economic-kpi-main">economic-kpi-main
    <SecTitle width="800px" title="社会总资产"/>
    <div class="sec-body">
      <EconomicKpiAssets/>
    </div>
    <SecTitle width="800px" title="预算总收入"/>
    <div class="sec-body">chart</div>
    <SecTitle width="800px" title="历年外资流动"/>
    <div class="sec-body">chart</div>
    <SecTitle width="800px" title="招商投资统计"/>
    <div class="sec-body">chart</div>
  </div>
</template>
<script>
import SecTitle from './../components/sec-title.vue'
import EconomicKpiAssets from './economic-kpi-assets.vue'
export default {
  name: 'EconomicKpiMain',
  components: { SecTitle, EconomicKpiAssets },
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

