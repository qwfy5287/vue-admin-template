// 大屏-柱状图
<template>
  <div class="big-bg big-column">
    <!-- big-column -->
    <Echarts :options="options"/>
  </div>
</template>
<script>
import Echarts from 'vue-echarts'
import { financialRevenueExpenditure } from '@/api/echarts-big'
// import { echartSetting, getOptionTooltip } from './js/echartSetting.js'
import { getLegendData, getXAxisData, getSeries, getOptionTooltip } from './js/echartCommon.js'
import { getOptionColumn } from './js/echartOptions.js'
export default {
  name: 'BigColumn',
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
      const res = await financialRevenueExpenditure()
      if (res.code === 0) {
        // debugger
        this.list = res.data
        this.render()
      }
    },
    render() {
      const tempOption = getOptionColumn()
      tempOption.tooltip = getOptionTooltip('亿元')
      tempOption.legend.data = getLegendData(this.list)
      tempOption.legend.show = false
      tempOption.grid = {
        // bottom: '15%',
        // left: '12%',
        // right: '5%',
        // top: '15%',
        left: '3%',
        right: '13%',
        bottom: '3%',
        containLabel: true
      }
      tempOption.yAxis[0].data = getXAxisData(this.list)
      tempOption.yAxis[0].axisLabel = {
        fontSize: 40,
        margin: 0
      }
      tempOption.series = this.getSeries(this.list)

      // column
      // tempOption.xAxis[0].type = 'value'
      // tempOption.xAxis[0].name = '单位：万元'
      // tempOption.yAxis[0].type = 'category'
      // tempOption.yAxis[0].name = ''

      this.options = tempOption
    },
    /**
     * 获取 series 数据
     * @param {[]} list 数据列表
     */
    getSeries(list) {
      const result = []

      var colorList = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: '#0b1731' // 0% 处的颜色
        }, {
          offset: 1,
          color: '#67d9f3' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      }

      list.forEach(d => {
        result.push({
          name: d.name,
          type: 'bar',
          barWidth: '50%',
          // lineStyle: {
          //   normal: {
          //     width: 3,
          //     shadowColor: 'rgba(0,0,0,0.4)',
          //     shadowBlur: 10,
          //     shadowOffsetY: 10
          //   }
          // },
          itemStyle: {
            color: function(params) {
              return colorList
            }
          },
          data: d.data
        })
      })

      return result
      // return [
      //   {
      //     name: '一般公共预算总收入',
      //     type: 'bar',
      //     barWidth: '20%',
      //     lineStyle: {
      //       normal: {
      //         width: 3,
      //         shadowColor: 'rgba(0,0,0,0.4)',
      //         shadowBlur: 10,
      //         shadowOffsetY: 10
      //       }
      //     },
      //     data: [10, 20, 30]
      //   },
      //   {
      //     name: '地方一般公共预算总收入',
      //     type: 'bar',
      //     yAxisIndex: 1,
      //     barWidth: '20%',

      //     data: []
      //   }
      // ]
    }

  }
}
</script>
<style lang="scss">
@import "./scss/style";
.big-column {
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

