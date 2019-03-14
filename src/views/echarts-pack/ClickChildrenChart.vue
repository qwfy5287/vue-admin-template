// 模板文件
<template>
  <div class="click-children-chart">
    click-children-chart
    <Echarts ref="echarts" :options="options"/>
  </div>
</template>
<script>
import Echarts from 'vue-echarts'

export default {
  name: 'ClickChildrenChart',
  components: { Echarts },
  props: {},
  data() {
    return {
      options: null,
      pointActive: null,
      pointActivePrev: null,
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
    init() {
      this.render()
    },
    async fetchData() { },
    render() {
      this.options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }
    }

  }
}
</script>
<style lang="scss">
.click-children-chart {
  font: inherit;
}
</style>

