// 大屏-柱状图
<template>
  <div class="big-bg big-bar">
    <!-- big-bar -->
    <Echarts :options="options"/>
  </div>
</template>
<script>
import Echarts from 'vue-echarts'
import { totalBudgetRevenue } from '@/api/echarts-big'
// import { echartSetting, getOptionTooltip } from './js/echartSetting.js'
import { getLegendData, getXAxisData, getSeries, getOptionTooltip } from './js/echartCommon.js'
import { getOptionBar } from './js/echartOptions.js'
export default {
  name: 'BigBar',
  components: { Echarts },
  props: {},
  data() {
    return {
      options: null,
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
      // this.render()
      this.fetchData()
    },
    async  fetchData() {
      const res = await totalBudgetRevenue()
      if (res.code === 0) {
        // debugger
        this.list = res.data
        this.render()
      }
    },
    render() {
      const tempOption = getOptionBar()
      tempOption.tooltip = getOptionTooltip('万元')
      tempOption.legend.data = getLegendData(this.list)
      tempOption.xAxis[0].data = getXAxisData(this.list)
      tempOption.series = getSeries(this.list)
      this.options = tempOption
    }

  }
}
</script>
<style lang="scss">
@import "./scss/style";
.big-bar {
  font: inherit;
  width: 100%;
  height: 100%;
  height: calc(100vh - 50px);

  .echarts {
    width: 100%;
    height: 100%;

    min-width: 400px;
    min-height: 300px;
  }
}
</style>

