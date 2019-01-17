/**
 * 基础配置
 */

const fontSizeTooltip = 45 // 50
const fontSizeLegend = 50
const fontSizeLabel = 50

/**
 * 图表配置
 */
export const echartSetting = {
  fontSizeTooltip,
  fontSizeLegend,
  fontSizeLabel,
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
  }
}

export function ss() {}
