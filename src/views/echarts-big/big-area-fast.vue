// 模板文件
<template>
  <div class="big-bg big-area-fast">big-area-fast
    <Echarts v-if="options" :options="options"/>
    <NotDataChart v-else/>
  </div>
</template>
<script>
import Echarts from 'vue-echarts'
import NotDataChart from './components/not-data-chart.vue'
import { getOptionArea } from './js/echartOptions.js'
// import { getLegendData, getXAxisData, getSeries } from './js/echartCommon.js'

import { kpiForeign } from '@/views/project-mgb/api/economic'

export default {
  name: 'BigAreaFast',
  components: { Echarts, NotDataChart },
  props: {},
  data() {
    return { options: null }
  },
  computed: {},
  watch: {
    list() {
      this.init()
    }
  },
  async mounted() {
    const res = await kpiForeign()
    this.list = res.data
    // debugger
    this.init()
  },
  methods: {
    init() {
      if (this.list && this.list.length) {
        this.render()
      }
    },
    fetchData() { },
    render() {
      const tempOption = getOptionArea(this.list)
      // tempOption.tooltip = getOptionTooltip('万元')
      // tempOption.legend.data = getLegendData(this.list)
      // tempOption.xAxis[0].data = getXAxisData(this.list)

      //
      // const series = getSeries(this.list)
      // debugger
      // tempOption.series = series
      this.options = tempOption
    }
  }
}
</script>
<style lang="scss">
@import "./scss/style";
.big-area-fast {
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

