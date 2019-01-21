/**
 * 基础配置
 */

const fontSizeTooltip = 45 // 50
const fontSizeLegend = 50
const fontSizeLabel = 50
const fontColor = '#A5D9E7'

/**
 * 图表配置
 */
export const echartSetting = {
  fontSizeTooltip,
  fontSizeLegend,
  fontSizeLabel,
  fontColor,
  // pie tooltip
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
    textStyle: {
      fontSize: fontSizeTooltip
    }
  },
  pie: {},
  // 折线图: 线宽
  lineStyle: {
    width: 4
  },
  // yAxis 单位样式
  nameTextStyle: {
    fontSize: 40,
    color: fontColor,
    padding: [0, 0, 20, 0]
  }
}
