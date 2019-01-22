import { echartSetting } from './echartSetting'

/**
 * 获取 marker html 字符串
 * @param {String} marker mark html string
 */
export function getMarker(marker) {
  let result = marker

  const element$ = document.createElement('div')
  element$.innerHTML = marker
  element$.firstChild.style.width = '40px'
  element$.firstChild.style.height = '40px'

  result = element$.innerHTML
  return result
}

/**
 * 获取 tooltip formatter
 * @param {[]} series
 * @param {String} units
 */
export function getFormatter(series, units) {
  let result = ''

  const list = []
  let axisValueLabel = ''

  series.forEach(d => {
    list.push(`${getMarker(d.marker)} ${d.seriesName}: ${d.value} ${units}`)

    axisValueLabel = d.axisValueLabel
  })

  result = `${axisValueLabel}<br />${list.join('<br />')}`

  return result
}

/**
 * option.tooltip  提示框
 * @param {String} unit 单位
 */
export function getOptionTooltip(unit = '') {
  return {
    trigger: 'axis',
    padding: 15,
    textStyle: {
      fontSize: echartSetting.fontSizeTooltip
    },
    formatter: function(series) {
      return getFormatter(series, unit)
    }
  }
}

/**
 * 获取 grid
 * @param {Object} param0
 */
export function getOptionGrid(
  { top, right, bottom, left } = {
    bottom: '15%',
    left: '12%',
    right: '5%',
    top: '15%'
  }
) {
  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  }
}

/**
 * 获取 Legend
 * @param {[]} data 数组
 */
export function getOptionLegend(data) {
  return {
    right: '6%',
    icon: 'roundRect',
    itemWidth: 60,
    itemHeight: 30,
    itemGap: 55,
    textStyle: {
      color: '#83B2BD',
      fontSize: echartSetting.fontSizeLegend
    },
    data: data
  }
}

export function getOptionXAxis(data) {
  const xAxis = [
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
      data: data
    }
  ]

  return xAxis
  // return Object.assign(xAxis, data)
}

/**
 * 获取 yAxis
 * @param {String} unit 单位
 */
export function getOptionYAxis(unit = '单位：万元') {
  return [
    {
      name: unit,
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
      type: 'value',
      show: false
    }
  ]
}

/**
 * 获取 zoom
 */
export function getOptionZoom() {
  return [
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
  ]
}

// ===   数据处理   ===

/**
 * 获取 Legend 数据
 * @param {[]} list 数据列表
 */
export function getLegendData(list) {
  //  ['一般公共预算总收入', '地方一般公共预算总收入']

  if (!list) {
    throw new Error('list 不能为空')
  }

  return list.map(d => d.name)
}

/**
 * 获取 xAxis 数据
 * @param {[]} list 数据列表
 */
export function getXAxisData(list) {
  return list[0].data.map(d => d.name)
}

/**
 * 获取 series 数据
 * @param {[]} list 数据列表
 */
export function getSeries(list) {
  const result = []

  list.forEach(d => {
    result.push({
      name: d.name,
      type: 'bar',
      barWidth: '20%',
      // lineStyle: {
      //   normal: {
      //     width: 3,
      //     shadowColor: 'rgba(0,0,0,0.4)',
      //     shadowBlur: 10,
      //     shadowOffsetY: 10
      //   }
      // },
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
