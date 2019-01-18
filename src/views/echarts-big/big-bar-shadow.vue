// 大屏-柱状图-阴影
<template>
  <div class="big-bg big-bar-shadow">big-bar-shadow
    <Echarts :options="options"/>
  </div>
</template>
<script>
import Echarts from 'vue-echarts'
import { forestEcologicalFund } from '@/api/echarts-big'
// import { echartSetting } from './js/echartSetting.js'
export default {
  name: 'BigBarShadow',
  components: { Echarts },
  props: {},
  data() {
    return {
      options: null,
      list: [],
      colors: [
        [
          {
            offset: 0,
            color: '#f7734e'
          },
          {
            offset: 1,
            color: '#e12945'
          }
        ], [
          {
            offset: 0,
            color: '#96d668'
          },
          {
            offset: 1,
            color: '#01babc'
          }
        ], [
          {
            offset: 0,
            color: '#1a98f8'
          },
          {
            offset: 1,
            color: '#7049f0'
          }
        ],
        [
          {
            offset: 0,
            color: '#1a48f8'
          },
          {
            offset: 1,
            color: '#3a49f0'
          }
        ]

      ]
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
      const res = await forestEcologicalFund()
      if (res.code === 0) {
        // debugger
        this.list = res.data
        this.render()
      }
    },
    render() {
      this.options = {
        title: {
          text: '单位：万人',
          textStyle: {
            color: '#Fff',
            fontSize: 50
          },
          left: 20
        },
        legend: {
          data: this.getLegendData(),
          textStyle: {
            color: '#fff',
            fontSize: 50
          },
          right: 0
        },
        grid: {
          left: '1%',
          right: '4%',
          top: '25%',
          bottom: '0%',
          containLabel: true
        },

        tooltip: {
          show: 'true',
          textStyle: {
            fontSize: 50
          },
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.7)', // 背景
          padding: [8, 10], // 内边距
          extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', // 添加阴影
          formatter: function(params) {
            if (
              params.seriesIndex === '4' ||
              params.seriesIndex === '5' ||
              params.seriesIndex === '6' ||
              params.seriesIndex === '7'
            ) {
              return (
                params.name +
                '<br>' +
                params.seriesName +
                ':' +
                params.value +
                ' 万人'
                // console.log(params)
              )
            }
          }
        },
        // tooltip: {
        //   trigger: "axis",
        //   textStyle: {
        //     fontSize: 45
        //   },
        //   formatter: function(params) {
        //     if (
        //       params.seriesIndex === "4" ||
        //       params.seriesIndex === "5" ||
        //       params.seriesIndex === "6" ||
        //       params.seriesIndex === "7"
        //     ) {
        //       return (
        //         params.name +
        //         "<br>" +
        //         params.seriesName +
        //         ":" +
        //         params.value +
        //         " 人"
        //       );
        //     }
        //   }
        // },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#363e83'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#363e83 '
            }
          },
          axisLabel: {
            fontSize: 50,
            margin: 48,
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#363e83'
              }
            },
            axisLabel: {
              inside: false,
              textStyle: {
                fontSize: 50,
                margin: 48,
                color: '#fff'
              }
              // formatter:function(val){
              //     return val.split("").join("\n")
              // },
            },
            data: this.getXAxisData()
          },
          {
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: this.getXAxisData()
          }
        ],
        series: this.getSeries()
      }
    },
    //
    getLegendData() {
      return this.list.map(d => d.name)
    },
    getXAxisData() {
      return this.list[0].data.map(d => d.name)
    },
    getSeries() {
      const result = []

      let maxValue = 0
      this.list.forEach((d, i) => {
        if (d.name === '马尾全区') {
          result.push({
            name: d.name,
            type: 'line',
            itemStyle: {
              normal: {
                show: true,
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, this.colors[i]),
                barBorderRadius: [50, 50, 0, 0],
                borderWidth: 0
              }
            },
            zlevel: 2,
            lineStyle: {
              width: 4
            },
            data: d.data
          })
        } else {
          result.push({
            name: d.name,
            type: 'bar',
            itemStyle: {
              normal: {
                show: true,
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, this.colors[i - 1]),
                barBorderRadius: [50, 50, 0, 0],
                borderWidth: 0
              }
            },
            zlevel: 2,
            barWidth: '5%',
            data: d.data
          })
        }

        // 阴影最大值
        const curMax = Math.max.apply(Math, d.data.map(o => { return o.value }))
        if (curMax > maxValue) {
          maxValue = curMax
        }
      })

      // shdow
      maxValue = maxValue * 1.1
      this.list.forEach(d => {
        if (d.name !== '马尾全区') {
          result.push({
            name: d.name,
            type: 'bar',
            xAxisIndex: 1,
            zlevel: 1,
            itemStyle: {
              normal: {
                color: '#121847',
                borderWidth: 0,
                shadowBlur: {
                  shadowColor: 'rgba(255,255,255,0.31)',
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 2
                }
              }
            },
            barWidth: '5%',
            data: this.getXAxisData().map(d => maxValue)
          })
        }
      })

      return result
    }

  }
}
</script>
<style lang="scss">
@import "./scss/style";
.big-bar-shadow {
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

