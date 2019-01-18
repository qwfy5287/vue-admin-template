// 大屏-柱状图
<template>
  <div class="big-bg big-bar">
    <!-- big-bar -->
    <Echarts v-if="options" :options="options"/>
    <NotDataChart v-else/>
  </div>
</template>
<script>
import Echarts from 'vue-echarts'
import { totalBudgetRevenue } from '@/api/echarts-big'
import { echartSetting } from './js/echartSetting.js'

//
import NotDataChart from './components/not-data-chart.vue'

export default {
  name: 'BigBar',
  components: { Echarts, NotDataChart },
  props: {
    list: { type: Array, default: null }
  },
  data() {
    return {
      options: null
      // list: []
    }
  },
  computed: {},
  watch: {
    list() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.list && this.list.length) {
        this.render()
      }
      // this.fetchData()
    },
    async  fetchData() {
      const res = await totalBudgetRevenue()
      if (res.code === 0) {
        this.list = res.data
        this.render()
      }
    },
    render() {
      this.options = {
        color: ['#81F2EF', '#CECC7A'],
        // title: {
        //   text: '单位：万美元',
        //   left: '6%',
        //   top: '4%',
        //   textStyle: {
        //     color: '#A5D9E7',
        //     fontSize: 45
        //   }
        // },
        legend: {
          right: '6%',
          icon: 'roundRect',
          itemWidth: 60,
          itemHeight: 30,
          itemGap: 55,
          textStyle: {
            color: '#83B2BD',
            fontSize: echartSetting.fontSizeLegend
          },
          data: this.getLegendData()
        },
        grid: {
          left: '6%',
          right: '6%',
          top: '15%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // boundaryGap: ['10%', '10%'],
            axisLabel: {
              fontSize: 40,
              margin: 40
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff',
                width: 8
              }
            },
            axisTick: {
              show: true,
              length: 13,
              lineStyle: {
                color: '#BDFFFD',
                width: 6
              }
            },
            splitLine: {
              show: false
            },
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            name: '单位：万美元',
            nameTextStyle: echartSetting.nameTextStyle,
            type: 'value',
            axisLabel: {
              show: true,
              margin: 55,
              textStyle: {
                color: '#A5D9E7',
                fontSize: 40
              }
            },
            axisLine: {
              show: false
            }
            // splitLine: {
            //   show: true,
            //   lineStyle: {
            //     type: "solid",
            //     color: "#24383D"
            //   }
            // }
          }
        ],
        series: this.getSeries()
      }

      let projectArray = []
      const colorArray = ['#49E0ED', '#7BA2CD']
      let showDetails = ''

      // 提示框
      this.options.tooltip = {
        trigger: 'axis',
        padding: 15,
        textStyle: {
          fontSize: echartSetting.fontSizeTooltip
        },
        formatter: function(params) {
          for (var i = 0; i < params.length; i++) {
            if (params[i].value !== '0') {
              projectArray.push(
                '</br><span style="display:inline-block;margin-right:5px;margin-top:20px;border-radius:10px;width:20px;height:20px;background-color:' +
                colorArray[i] +
                '"></span>' +
                params[i].seriesName +
                ':' +
                params[i].value +
                '万美元'
              )
            }
          }
          if (projectArray.length !== 0) {
            showDetails = '' + params[0].name + projectArray.join('')
            projectArray = []
            return showDetails
          } else {
            showDetails = '' + params[0].name + '</br>各项暂无数据'
            projectArray = []
            return showDetails
          }
        }
      }
    },
    //
    getLegendData() {
      //  ['一般公共预算总收入', '地方一般公共预算总收入']
      return this.list.map(d => d.name)
    },
    getXAxisData() {
      return this.list[0].data.map(d => d.name)
    },
    getSeries() {
      const result = []

      this.list.forEach(d => {
        result.push({
          name: d.name,
          type: 'line',
          areaStyle: { normal: {}},
          symbol: 'circle',
          symbolSize: 15,
          data: d.data
        })
      })

      return result
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

