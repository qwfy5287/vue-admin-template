// 模板文件
<template>
  <div class="click-chart">
    click-chart
    <Echarts ref="echarts" :options="options"/>
    <!-- {{ activeItem }} -->

    <template v-if="activeItem">
      <h3>{{ activeItem.name }} {{ activeItem.seriesName }}</h3>
      <div>
        {{ activeItem.children }}
        <ClickChildrenChart />
      </div>
    </template>
  </div>
</template>
<script>
import Echarts from 'vue-echarts'

import ClickChildrenChart from './ClickChildrenChart'

export default {
  name: 'ClickChart',
  components: { Echarts, ClickChildrenChart },
  props: {},
  data() {
    return {
      options: null,
      activePoint: null,
      activePointPrev: null,
      activeItem: null,
      list: null
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() { this.render() },
    async fetchData() { },
    render() {
      this.options = {
        xAxis: {
          type: 'category',
          data: ['四月', '五月', '六月']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '贵宾',
          data: [
            { name: '四月', value: 820,
              children: [{ name: '普卡', value: 123 }, { name: '银卡', value: 452 }] },
            { name: '五月', value: 932,
              children: [{ name: '普卡', value: 125 }, { name: '银卡', value: 234 }] },
            { name: '六月', value: 901,
              children: [{ name: '普卡', value: 362 }, { name: '银卡', value: 659 }]
            }],
          type: 'line'
        }]
      }

      //

      this.$nextTick(function() {
        this.$refs.echarts.chart.on('click', (params) => {
          // debugger
          // 控制台打印数据的名称
          // console.log(params)

          this.canelHighlightPoint()

          this.activePoint = {
            seriesIndex: params.seriesIndex,
            dataIndex: params.dataIndex
          }

          this.highlightPoint()

          if (this.activePoint) {
            this.activePointPrev = this.activePoint
          }

          this.activeItem = {
            children: params.data.children,
            seriesName: params.seriesName,
            name: params.name
          }
        })

        this.$refs.echarts.chart.on('mouseout', (params) => {
          this.highlightPoint()
        })
      })
    },
    highlightPoint() {
      if (this.activePoint) {
        // 高亮当前图形
        this.$refs.echarts.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: this.activePoint.seriesIndex,
          dataIndex: this.activePoint.dataIndex
        })
      }
    },
    canelHighlightPoint() {
      if (this.activePointPrev) {
        // 取消之前高亮的图形
        this.$refs.echarts.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: this.activePointPrev.seriesIndex,
          dataIndex: this.activePointPrev.dataIndex
        })
      }
    }

  }
}
</script>
<style lang="scss">
.click-chart {
  font: inherit;
}
</style>

