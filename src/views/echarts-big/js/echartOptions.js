/**
 *
 */

import { echartSetting } from './echartSetting'

import {
  getLegendData,
  getXAxisData,
  getSeries,
  getOptionTooltip,
  getOptionGrid,
  getOptionLegend,
  getOptionXAxis,
  getOptionYAxis,
  getOptionZoom
} from './echartCommon.js'
import { dataBar } from './echartMock'

/**
 * 基础配置 柱状图
 */
export const optionBar = {
  color: echartSetting.color,
  tooltip: getOptionTooltip('单位'),
  grid: getOptionGrid(),
  legend: getOptionLegend(getLegendData(dataBar)),
  xAxis: getOptionXAxis(getXAxisData(dataBar)),
  yAxis: getOptionYAxis(),
  dataZoom: getOptionZoom(),
  series: getSeries(dataBar)
}

/**
 * 获取 基础配置 柱状图
 */
export function getOptionBar() {
  return {
    color: echartSetting.color,
    tooltip: getOptionTooltip('单位'),
    grid: getOptionGrid(),
    legend: getOptionLegend(getLegendData(dataBar)),
    xAxis: getOptionXAxis(getXAxisData(dataBar)),
    yAxis: getOptionYAxis(),
    dataZoom: getOptionZoom(),
    series: getSeries(dataBar)
  }
}

/**
 * 获取 基础配置 区域图
 * @param {[]} list 数据列表
 */
export function getOptionArea(list) {
  const chartData = list || dataBar

  const series = getSeries(chartData)
  // debugger

  series.forEach(d => {
    d.type = 'line'
    d.areaStyle = { normal: {}}
    d.symbol = 'circle'
    // d.symbol = 'roundRect'
    d.symbolSize = 15
  })

  return {
    color: echartSetting.color,
    tooltip: getOptionTooltip('万美元'),
    grid: getOptionGrid(),
    legend: getOptionLegend(getLegendData(chartData)),
    xAxis: getOptionXAxis(getXAxisData(chartData)),
    yAxis: getOptionYAxis(),
    dataZoom: getOptionZoom(),
    series: series
  }
}
