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
  debugger

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
