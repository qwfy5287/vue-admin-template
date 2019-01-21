/**
 *
 */

import { echartSetting } from './echartSetting'

import {
  getLegendData,
  getXAxisData,
  getSeries,
  getOptionTooltip
} from './echartCommon'
import { dataBar } from './echartMock'

export const optionBar = {
  color: ['#49E0ED', '#7BA2CD'],
  tooltip: getOptionTooltip('单位'),
  grid: {
    bottom: '15%',
    left: '12%',
    right: '5%',
    top: '15%'
  },
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
    data: getLegendData(dataBar)
    // data: this.getLegendData()
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
      data: getXAxisData(dataBar)
      // data: this.getXAxisData()
    }
  ],
  yAxis: [
    {
      name: '单位：万元',
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
  series: getSeries(dataBar)
  // series: this.getSeries()
}
