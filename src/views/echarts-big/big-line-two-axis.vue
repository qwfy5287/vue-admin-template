// 大屏-折线图-双坐标
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
        // debugger
        this.list = res.data
        this.render()
      }
    },
    render() {
      this.options = {
        // title: {
        //   text: '单位：万元',
        //   left: '6%',
        //   top: '4%',
        //   textStyle: {
        //     color: '#A5D9E7',
        //     fontSize: 45
        //   }
        // },
        color: ['#81f2ef', '#cccc69'],
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          bottom: '15%',
          left: '12%',
          right: '12%',
          top: '18%'
        },
        legend: {
          // right: '15%',
          icon: 'roundRect',
          itemWidth: 60,
          itemHeight: 30,
          itemGap: 55,
          textStyle: {
            color: '#83B2BD',
            fontSize: echartSetting.fontSizeLegend
          },
          // data: ["一般公共预算总收入", "地方一般公共预算总收入"]
          data: this.getLegendData()
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
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
            splitLine: {
              show: false
            },
            data: this.getXAxisData()
          }
        ],
        yAxis: [
          {
            name: '单位：个',
            nameTextStyle: echartSetting.nameTextStyle,
            type: 'value',
            position: 'left',
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              margin: 40,
              textStyle: {
                color: '#A5D9E7',
                fontSize: 40
              }
            },
            axisTick: {
              show: true,
              length: 26,
              lineStyle: {
                color: '#6AC5D7'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: '#24383D'
              }
            }
          },
          {
            name: '单位：万元',
            nameTextStyle: echartSetting.nameTextStyle,
            type: 'value',
            position: 'right',
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              margin: 40,
              textStyle: {
                color: '#A5D9E7',
                fontSize: 40
              }
            },
            axisTick: {
              show: true,
              length: 26,
              lineStyle: {
                color: '#6AC5D7'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: '#24383D'
              }
            }
          },
          {
            type: 'value',
            show: false
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 22,
            xAxisIndex: [0],
            bottom: 70,
            start: 0,
            end: 80,
            color: '#fff'
          },
          {
            type: 'inside',
            show: true,
            height: 22,
            xAxisIndex: [0],
            start: 10,
            end: 35
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
          fontSize: 45
        },
        formatter: function(params) {
          for (var i = 0; i < params.length; i++) {
            if (params[i].value !== '0') {
              if (params[i].seriesName === '项目数') {
                projectArray.push(
                  '</br><span style="display:inline-block;margin-right:5px;margin-top:20px;border-radius:10px;width:45px;height:45px;background-color:' +
                  colorArray[i] +
                  '"></span>' +
                  params[i].seriesName +
                  ':' +
                  params[i].value +
                  '个'
                )
              } else {
                projectArray.push(
                  '</br><span style="display:inline-block;margin-right:5px;margin-top:20px;border-radius:10px;width:45px;height:45px;background-color:' +
                  colorArray[i] +
                  '"></span>' +
                  params[i].seriesName +
                  ':' +
                  params[i].value +
                  '万元'
                )
              }
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

      this.list.forEach((d, i) => {
        if (i === 0) {
          result.push({
            name: d.name,
            type: 'pictorialBar',
            barCategoryGap: '0%',
            symbol:
              'path://d="M150 50 S150 130 130 130 L170 130 S150 130 150 50 Z"',
            // itemStyle: {
            //   normal: {
            //     color: 'rgba(73, 224, 237,1)'
            //   },
            //   emphasis: {
            //     opacity: 1
            //   }
            // },
            data: d.data
          })
        } else {
          result.push(
            {
              name: d.name,
              type: 'line',
              stack: '总量',
              lineStyle: {
                normal: {
                  width: 5,
                  color: '#CCCC69',
                  shadowColor: 'rgba(0,0,0,0.4)',
                  shadowBlur: 10,
                  shadowOffsetY: 10
                }
              },
              // 标记的图形
              symbol: 'circle',
              symbolSize: 20,
              yAxisIndex: i,
              data: d.data
            }
          )

          // result.push({
          //   name: d.name,
          //   type: 'line',
          //   barWidth: '20%',
          //   // lineStyle: {
          //   //   normal: {
          //   //     width: 3,
          //   //     shadowColor: 'rgba(0,0,0,0.4)',
          //   //     shadowBlur: 10,
          //   //     shadowOffsetY: 10
          //   //   }
          //   // },
          //   lineStyle: echartSetting.lineStyle,
          //   yAxisIndex: i,
          //   data: d.data
          // })
        }
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
.big-bar {
  font: inherit;
  width: 100%;
  height: 100%;
  // height: calc(100vh - 50px);

  .echarts {
    width: 100%;
    height: 100%;

    min-width: 400px;
    min-height: 300px;
  }
}
</style>

