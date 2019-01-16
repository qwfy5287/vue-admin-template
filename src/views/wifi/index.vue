// test url
// http://localhost:9528/#/wifi/index?mac=06696c1f93d0&datein=20170501

<template>
  <div class="wifi-main">
    <!-- wifi-main -->
    <input id="mac" type="hidden" value>
    <input id="datein" type="hidden" value>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">WIFI轨迹图</div>
        <div class="panel-toolbar">
          <form class="form-inline form-xs">
            <div class="form-group">
              <el-select v-model="yearValue" placeholder="请选择" @change="yearSelectChange">
                <el-option
                  v-for="item in yearOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="form-group">
              <el-select v-model="dayValue" placeholder="请选择">
                <el-option
                  v-for="item in dayOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="form-group">
              <el-button type="primary" @click="getData2">搜索</el-button>
            </div>
          </form>
        </div>
      </div>
      <div class="panel-body">
        <!-- 商场平面轨迹图 start-->
        <div
          id="track-container"
          class="cannot-select not-border-bottom"
          data-require_date="true"
          data-date_sort="asc"
        >
          <div class="js-error error-msg" style="display: none;"/>
          <div class="zoomer-tools">
            <button
              :class="{disabled:!canZoomIn}"
              type="button"
              class="btn zoom-btn js-zoom-in-tools"
              title="放大视图"
              @click="zoomOut"
            >
              <i class="iconfont icon-search-add"/>
            </button>
            <button
              :class="{disabled:!canZoomOut}"
              type="button"
              class="btn zoom-btn js-zoom-out-tools"
              title="缩小视图"
              @click="zoomIn"
            >
              <i class="iconfont icon-search-minus"/>
            </button>
          </div>
          <div id="track-canvas-container">
            <svg class="js-main-svg" width="100%" height="100%"/>
          </div>
          <!-- 播放工具 start-->
          <WifiPlayer
            ref="wifiPlayer"
            :building-data="buildingData"
            @switchBuildNav="switchBuildNav"
            @switchFloorNav="switchFloorNav"
          />
          <!-- / 播放工具 end-->
        </div>
        <!-- / 商场平面轨迹图 end-->
        <!-- 楼层导航 start-->
        <div class="floor-nav cannot-select">
          <el-tabs v-model="buildActiveName" :stretch="true">
            <el-tab-pane
              v-for="(item,index) in buildingData"
              :key="index"
              :label="item.buildingName"
              :name="item.buildingName"
            >
              <ul class="floor-ul">
                <li
                  v-for="(subItem,subIndex) in item.floorOpts"
                  :key="subIndex"
                  :class="{disabled:subItem.disabled,active:subItem.active}"
                >
                  {{ subItem.floorName }}
                  <span class="float-right">{{ subItem.timeStr||'' }}</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- / 楼层导航 end-->
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-undef */

import * as d3 from 'd3'
import * as _ from 'lodash'

import * as trackToolsMap from './track-tools/map.js'

import { getTimeData, getData, getFloors } from '@/api/wifi'

import WifiPlayer from './wifi-player.vue'

import { groupBy } from '@/utils/es6-extend'

export default {
  name: 'Wifi',
  components: { WifiPlayer },
  props: {},
  data() {
    return {
      buildingObj: null,
      playerObj: null,
      viewScale: 5,
      SCALE_STEP: 1,
      page_mac: null,
      page_date: null,
      floorsData: null,
      timeData: null,
      sort: 'asc',

      yearOptions: [
      ],
      yearValue: null,
      dayOptions: [
      ],
      dayValue: null,

      buildingList: [],
      buildingData: null,
      buildActiveName: null,

      //
      mac: null,
      datein: null,

      canZoomIn: true,
      canZoomOut: true
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const query = this.$route.query
      if (query.mac && query.datein) {
        await this.initBuildings()

        this.page_mac = query.mac || '06696c1f93d0'
        this.page_date = query.datein || '20180205'
        this.getPageData()
      } else {
        this.$message.error(`缺少参数 mac 或 datein`)
      }
    },
    fetchData() { },
    render() { },

    //
    async initBuildings() {
      const svgW = 400
      const svgH = 300
      const mainGroup = d3.select('.js-main-svg').append('g')
        .attr('class', 'js-main-group')
        .attr('width', svgW)
        .attr('height', svgH)

      // 地图层
      const d3_mapContainer = mainGroup.append('g')
        .attr('class', 'js-map-container')
        .attr('width', svgW)
        .attr('height', svgH)
        .attr('transform', 'translate(' + svgW / 2 + ',' + svgH / 2 + ')')

      // ajax
      const res = await getFloors()

      this.floorsData = res.list || []

      // 数据处理
      this.buildingData = groupBy(this.floorsData, 'buildingId')
      this.buildingData = _.map(this.buildingData, function(d, key) {
        var temp = _.first(d) || {}
        temp.isShow = true
        temp.active = false
        return {
          buildingName: temp.buildingName,
          buildingId: key,
          isShow: true,
          floorOpts: d
        }
      })

      // 创建建筑对象
      this.buildingObj = this.buildingData.map((opts) => {
        this.buildActiveName = opts.buildingName
        return trackToolsMap.default.instance(opts, d3_mapContainer)
      })

      // End ajax
    },
    setScale(scale) {
      var isValid = true
      _.each(this.buildingObj, function(bd) {
        isValid = isValid && bd.setScale(scale)
      })
      return isValid
    },
    zoomOut() {
      if (!this.canZoomIn) { return }
      this.viewScale += this.SCALE_STEP
      if (this.setScale(this.viewScale)) {
        this.canZoomIn = true
      } else {
        this.viewScale -= this.SCALE_STEP
        this.canZoomIn = false
      }
    },
    zoomIn() {
      if (!this.canZoomOut) { return }
      this.viewScale -= this.SCALE_STEP
      if (this.setScale(this.viewScale)) {
        this.canZoomOut = true
      } else {
        this.viewScale += this.SCALE_STEP
        this.canZoomOut = false
      }
    },
    getPageData() {
      // 请求时间
      this.getTimeData2()
    },

    /**
     * 请求mac对应的日期数据
     * @param {*} mac
     * @param {*} date
     */
    async getTimeData2(mac, date) {
      // var sort = $container.data('date_sort')
      try {
        const res = await getTimeData({ mac: this.page_mac, sort: 'asc' })

        const isExistDate = res.list.find(d => d.date === this.page_date)
        if (!isExistDate) {
          this.$message.error('没有找到指定日期!')
          return false
        }

        this.setYearOptions(res)

        this.getData2()
      } catch (error) {
        console.log(error)
      }

      // util.ajax({
      //   url: 'api/wifi/dates',
      //   // containerLoading: $container.closest('.panel-body'),
      //   data: {
      //     mac: mac,
      //     sort: sort || ''
      //   },
      //   success: function(result) {
      // })
    },

    /**
     * 获取轨迹数据
     */
    async  getData2() {
      const _vm = this

      try {
        const res = await getData({ mac: this.page_mac, datein: this.dayValue })
        if (res) {
          if (res.list.length === 0) {
            this.$message.error('track', '对不起，没有找到轨迹数据!')
            return
          }

          // 数据格式处理
          var trackData = _.chain(res.list)
            .map(function(d) {
              d.x = parseFloat(d.x)
              d.y = parseFloat(d.y)
              var date = d.apTime.replace(/-/g, '/').split('.')[0] // IE兼容
              d._timestamp = new Date(date).getTime()
              return d
            }).sort(function(a, b) {
              return a._timestamp - b._timestamp
            }).value()

          // 绘制轨迹，确保请求到楼层数据
          if (this.floorsData) {
            _vm.drawTrack(trackData, this.floorsData)
            return
          }
          var count = 0
          var t = setInterval(function() {
            if (!floorsData && count < 50) {
              count++
              return
            }
            clearInterval(t)
            _vm.drawTrack(trackData, floorsData)
          }, 300)
        }
      } catch (error) {
        console.log(error)
      }
    },

    /**
    * 绘制轨迹
    * @param {*} data 轨迹数据
    * @param {*} floorsData 楼层数据
    */
    drawTrack(data, floorsData) {
      // if (_.isEmpty(data)) { errorHandler.show('track', '对不起，缺少轨迹数据!') } else { errorHandler.hide('track') }
      // if (_.isEmpty(floorsData)) { errorHandler.show('floor', '对不起，缺少楼层数据!') } else { errorHandler.hide('floor') }
      // if (_.isEmpty(data) || _.isEmpty(floorsData)) { return }
      // // 设置播放器数据，绘制初始状态

      // //
      // this.playerObj.init(data)

      if (data) {
        this.$refs.wifiPlayer.init(data, this.buildingObj, this.floorsData)
      }
    },

    setYearOptions(arg) {
      this.yearOptions = []

      this.timeData = groupBy(arg.list, 'year') || {}
      // 渲染下拉菜单
      let yearList = _.map(this.timeData, function(d, key) {
        d = _.sortBy(d, 'date')
        return {
          year: key
        }
      })
      if (this.sort === 'desc') {
        yearList = _.reverse(yearList)
      }

      yearList.forEach(d => {
        this.yearOptions.push({ label: d.year, value: d.year })
      })

      //
      this.yearValue = this.page_date.slice(0, 4) || this.yearOptions[0].value

      if (this.yearValue) {
        this.setDayOptions()
      }
    },
    setDayOptions() {
      this.dayOptions = []
      const dayList = this.timeData[this.yearValue]
      dayList.forEach(d => {
        this.dayOptions.push({
          label: d.monthAndDay,
          value: d.date
        })
      })

      //
      this.dayValue = this.page_date || this.dayOptions[0].value
    },
    yearSelectChange() {
      this.setDayOptions()
    },

    //
    switchBuildNav(buildName) {
      this.buildActiveName = buildName
    },
    switchFloorNav(buildName, floorId) {
      this.buildingData.forEach((d, dIndex) => {
        if (d.buildingName === buildName) {
          d.floorOpts.forEach((s, sIndex) => {
            if (s.floorId === Number(floorId)) {
              this.$set(this.buildingData[dIndex].floorOpts[sIndex], 'active', true)
            } else {
              this.$set(this.buildingData[dIndex].floorOpts[sIndex], 'active', false)
            }
          })
        }
      })
    }

  }
}
</script>
<style lang="scss">
@import "./wifi-style";
.wifi-main {
  font: inherit;

  .float-right {
    float: right;
  }

  /**
 * 基础样式
 */

  // body,
  // select,
  // input,
  // button {
  //   font-family: "微软雅黑", "黑体", "tahoma", "helvetica", "arial", "宋体",
  //     sans-serif;
  // }

  // body,
  ol,
  ul,
  li {
    margin: 0;
    padding: 0;
  }

  ol,
  ul {
    list-style: none;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  a {
    color: #0880f1;
  }

  .not-underline {
    text-decoration: none;
  }

  :focus {
    outline: none;
  }

  .cannot-select {
    -moz-user-select: none;
    /*火狐*/
    -webkit-user-select: none;
    /*webkit浏览器*/
    -ms-user-select: none;
    /*IE10*/
    -khtml-user-select: none;
    /*早期浏览器*/
    user-select: none;
  }

  .hidden {
    display: none;
  }

  .relative {
    position: relative;
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: inherit;
    font-style: normal;
    /*-webkit-font-smoothing: antialiased;*/
    /*-webkit-text-stroke-width: 0.2px;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    font-weight: bold;
  }

  .iconfont.icon-spin {
    display: inline-block;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }

  .icon-spin {
    -webkit-animation: icon-spin 1.5s infinite linear;
    animation: icon-spin 1.5s infinite linear;
  }

  @-webkit-keyframes icon-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }

  @keyframes icon-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }

  /**
 * 表单
 */

  button:disabled,
  select:disabled,
  optgroup:disabled,
  option:disabled,
  select[disabled] > option {
    color: #aaa;
  }

  .form-inline .form-group {
    display: inline-block;
    margin: 0;
    vertical-align: middle;
  }

  @media (min-width: 550px) {
  }

  .form-xs select {
    height: 24px;
    padding: 1px 5px;
    font-size: 12px;
  }

  /**
 * 按钮
 */

  .btn {
    padding: 2px 8px;
    color: #518ce9;
    background-color: #fff;
    border: 1px solid #518ce9;
    cursor: pointer;
  }

  .btn:not(.disabled):hover {
    color: #fff;
    background-color: #518ce9;
    border-color: #518ce9;
  }

  .btn:not(.disabled):active {
    color: #fff;
    background-color: #3c79d8;
    border-color: #3c79d8;
  }

  .btn:not(.disabled).active {
    color: #fff;
    background-color: #518ce9;
  }

  .btn.disabled {
    color: #bbb;
    border-color: #bbb;
    cursor: not-allowed;
  }

  /**
 * 容器
 */

  body {
    background-color: #eee;
  }

  .panel {
    position: relative;
    width: 100%;
    min-width: 500px;
    background-color: #fff;
    // todo
    border: 0px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 6px rgba(125, 125, 125, 0.1);

    .panel-header {
      background-color: #ffffff;
      padding: 10px;
      font-size: 16px;
      background-color: #f8f8f8;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .panel-title {
        display: inline-block;
        font-size: 14px;
        color: #000;
        display: inline-block;
        font-size: 14px;
        color: #666e7a;
        font-weight: bold;
      }
      .panel-toolbar {
        float: right;
        margin: 0;
        li {
          display: inline-block;
          margin-left: 6px;
          font-size: 14px;
          color: #999;
          cursor: pointer;
          &:hover {
            color: #333;
          }
        }
        .form-inline {
          .form-group {
            margin-top: -4px;
            margin-top: -4px;
          }
        }
        .el-select {
          width: 120px;
        }
      }

      .panel-title {
        display: inline-block;
        font-size: 14px;
        color: #000;
        display: inline-block;
        font-size: 14px;
        color: #666e7a;
        font-weight: bold;
      }
    }

    .panel-body {
      position: relative;
      background-color: #fff;
    }
  }

  @media screen and (min-width: 500px) {
    html {
      overflow-x: hidden;
    }
  }

  .border-top {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  /* 右侧工具栏 */

  /**
 * 加载中
 */

  .panel-tooltip-warp {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: #888;
    background: rgba(255, 255, 255, 0.75);
    z-index: 5;
    .panel-tooltip {
      position: absolute;
      top: 50%;
      margin-top: -25px;
      margin-bottom: 0;
      width: 100%;
      text-align: center;
      > i {
        font-size: 26px;
      }
    }
    .panel-tooltip-msg {
      display: block;
      padding: 5px 15px;
    }
  }
  .panel-tooltip-warp.text-danger {
    color: #c23531;
  }

  /**
 * 错误信息
 */
  .error-msg {
    position: absolute;
    right: 2px;
    left: 0;
    margin: 0;
    padding: 20px 60px;
    text-align: center;
    color: #ea0000;
    background-color: rgba(248, 248, 248, 0.7);
    z-index: 15;
    p {
      margin: 0;
      + {
        p {
          margin-top: 5px;
        }
      }
    }
  }

  /**
 * 缩放按钮
 */
  .zoomer-tools {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 10px;
    height: 10px;
    z-index: 20;
    .zoom-btn {
      position: relative;
      width: 26px;
      height: 26px;
      margin-bottom: 5px;
      padding: 0;
      font-size: 16px;
      z-index: 10;
    }
  }

  #track-container {
    position: relative;
    width: 70%;
    height: 348px;
    background-color: #fff;
    border: 2px solid #518ce9;

    border: 2px solid #304156;
    border-left: 0;
    height: calc(100vh - 89px);

    .zoomer-tools {
      .zoom-btn {
        background-color: #fff;
        color: #62709a;
        border: 1px solid #62709a;
        border-radius: 50%;
        &:hover {
          background-color: #518ce9;
          color: #fff;
        }
      }
    }

    &.not-border-bottom {
      border-bottom: none;
    }
  }

  #track-canvas-container {
    width: 100%;
    height: 100%;
  }

  /**
 * 楼层导航
 */
  .floor-nav {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 70%;
    padding: 5px 8px;
    font-size: 14px;
    background-color: #518ce9;
    .building-btn {
      width: 30%;
      height: 35px;
      margin-bottom: 10px;
      font-size: 14px;
      color: #84b4fc;
      background-color: transparent;
      border-color: transparent;
      border-bottom-color: #84b4fc;
      cursor: default;
      + {
        .building-btn {
          margin-left: 4%;
        }
      }
      &:active {
        background-color: transparent;
        border-color: transparent;
      }
    }
    .building-btn.active {
      color: #fff;
      background-color: transparent;
      border-bottom-color: #fff;
    }
    .building-btn.disabled {
      color: #b9bbbf;
      border-bottom-color: #b9bbbf;
    }

    background: $mainBg;
    color: white;
    .floor-ul {
      & > li {
        background: #62709a;
        padding: 10px 8px;
        & + li {
          margin-top: 5px;
        }

        &.disabled {
          background: #62709a;
          color: #acb1c6;
        }

        &.active {
          // color: #ededed;
          background: #828daf;
        }
      }
    }
  }

  // override element-ui
  .el-tabs--border-card {
    background: none;
  }

  .el-tabs {
    .el-tabs__header {
      margin: 0 0 10px;
    }

    .el-tabs__nav-wrap::after {
      background-color: #62709a;
    }

    .el-tabs__item.is-active {
      color: #ffffff;
    }
    .el-tabs__item {
      color: #acb1c6;
    }
    .el-tabs__active-bar {
      background-color: #ffffff;
    }
  }
}
</style>

