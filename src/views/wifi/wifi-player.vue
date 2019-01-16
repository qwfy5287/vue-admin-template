<template>
  <div class="wifi-player">
    <!-- wifi-player -->
    <div class="player-tools js-player">
      <div class="progress-bar">
        <div class="progress-tooltip js-floor-tooltip" style="display: none;">
          <p class="js-text"/>
        </div>
        <!-- :style="{left:playPointLeft+'px'}" -->
        <div class="play-point js-play-point" title="拖拽调节播放进度"/>
        <div class="js-floor-point-warp">
          <template v-if="floorPointList && floorPointList.length">
            <!-- <el-tooltip placement="top" content="Top Left 提示文字"> -->
            <!-- <div slot="content">多行信息
                <br>第二行信息
            </div>-->
            <!-- <el-button>Top center</el-button> -->
            <template v-for="(item,index) in floorPointList">
              <el-popover
                :key="index"
                :open-delay="250"
                trigger="hover"
                placement="bottom"
                width="160"
              >
                <p>{{ item.floorName }}</p>
                <p>{{ item.startTimeStr }} - {{ item.endTimeStr }}</p>
                <div
                  slot="reference"
                  :style="{left:item.left+'px'}"
                  class="floor-point js-floor-point"
                />
              </el-popover>
            </template>

            <!-- </el-tooltip> -->
          </template>
        </div>
        <div class="bar-already js-bar-already"/>
        <div class="js-bar-stop-warp">
          <template v-if="stopBarList && stopBarList.length">
            <template v-for="(item,index) in stopBarList">
              <div
                :key="index"
                :style="{left:item.left+'px',width:item.width+'px'}"
                class="js-bar-stop bar-stop"
              />
            </template>
          </template>
        </div>
        <div class="bar-all"/>
        <div class="bar-bg"/>
      </div>
      <div class="play-btn-group">
        <button
          v-show="canPlay"
          :class="{disabled:!canPlay}"
          type="button"
          class="js-play-btn play"
          @click="onPlayClick"
        >
          <i class="iconfont icon-play"/>
        </button>
        <button
          v-show="!canPlay"
          :class="{disabled:canPlay}"
          type="button"
          class="js-play-btn pause"
          @click="onPauseClick"
        >
          <i class="iconfont icon-pause"/>
        </button>
        <!-- <button type="button" class="js-play-btn pause disabled" style="display: none;">
                <i class="iconfont icon-pause"/>
        </button>-->
        <!--<button type="button" class="js-play-btn stop disabled">
                            <i class="iconfont icon-stop"></i>
        </button>-->
      </div>
      <div class="time-info-warp">
        <div class="time-info">
          进出机场时间：
          <span class="js-start-time"/>
          {{ startTimeStr }}-{{ endTimeStr }}
          <span class="js-end-time"/>
        </div>
        <div class="time-info">
          当前播放时间：
          <span class="js-current-time">
            <!-- &nbsp;-&nbsp; -->
            {{ curTimeStr }}
          </span>
        </div>
      </div>
      <div class="speed-tools">
        <!-- <select name="speedSetting">
          <option value="1">1倍速</option>
          <option value="2" selected>2倍速</option>
          <option value="5">5倍速</option>
          <option value="10">10倍速</option>
          <option value="15">15倍速</option>
          <option value="20">20倍速</option>
        </select>-->
        <el-select v-model="speedValue" placeholder="请选择">
          <el-option
            v-for="item in speedOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <!-- <div>
      <div id="progress">
        <div class="bar">
          <div class="hang"/>
          <span/>
        </div>
        <div class="pro-value">0%</div>
      </div>
    </div>-->
  </div>
</template>
<script>

/* eslint-disable no-undef */
/**
 * 常量定义
 */
// 轨迹图播放基础速度
// eslint-disable-next-line no-unused-vars
var BASE_TRACK_SPEED = 100
// 最大轨迹间隔时间
var MAX_TRACK_TIME_INTERVAL = 60 * 1000 * 2

export default {
  name: 'WifiPlayer',
  components: {},
  props: {
    buildingData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      buildingObj: {},
      floorsData: [],
      //
      timeCount: 0,
      startTime: 0,
      endTime: 0,
      speed: 1,

      data: [],
      sectionIndex: 0,
      sectionData: [],

      floorNow: null,

      canPlay: true,
      curTimeStr: null,
      startTimeStr: null,
      endTimeStr: null,

      speedOptions: [
        { label: '1倍速', value: 1 },
        { label: '2倍速', value: 2 },
        { label: '5倍速', value: 5 },
        { label: '10倍速', value: 10 },
        { label: '15倍速', value: 15 },
        { label: '20倍速', value: 20 }
      ],
      speedValue: 5,

      // 楼层切换标记列表
      floorPointList: [],
      stopBarList: [],

      playPointLeft: 0

    }
  },
  computed: {},
  watch: {},
  mounted() {
    // this.init()
  },
  methods: {
    init(data, buildingObj, floorsData) {
      const _vm = this

      if (!data) {
        this.$message.error('data 不能为空!')
        return false
      }

      //
      this.buildingObj = buildingObj
      this.floorsData = floorsData

      // 数据处理，加入 _index 数据索引
      // eslint-disable-next-line no-undef
      data = _.map(data, function(d, i) {
        d._index = i
        return d
      })
      this.data = data

      // eslint-disable-next-line no-undef
      const firstData = _.first(data)

      // 数据处理：合并连续相同楼层的数据，并判断探针数据是否超时中断
      const sectionData = []
      let tempFloorArr = []
      let tempFloorId = firstData.floorId
      let tempStartStamp = firstData._timestamp
      let tempEndStamp = null
      // eslint-disable-next-line no-undef
      _.each(data, function(d, i) {
        if (tempFloorId !== d.floorId) {
          sectionData.push({
            floorId: tempFloorId,
            floorName: _vm.getFloorName(tempFloorId),
            data: tempFloorArr,
            startStamp: tempStartStamp,
            endStamp: tempEndStamp
          })
          tempFloorArr = []
          tempFloorId = d.floorId
          tempStartStamp = d._timestamp
        }
        const nextData = data[i + 1]
        d._isTimeout = !(
          nextData && nextData._timestamp - d._timestamp < MAX_TRACK_TIME_INTERVAL
        )
        tempFloorArr.push(d)
        tempEndStamp = d._timestamp
      })
      sectionData.push({
        floorId: tempFloorId,
        floorName: this.getFloorName(tempFloorId),
        data: tempFloorArr,
        startStamp: tempStartStamp,
        endStamp: tempEndStamp
      })
      this.sectionData = sectionData
      // 时间设置

      this.startTime = firstData._timestamp
      // eslint-disable-next-line no-undef
      this.endTime = data.slice(-1)[0]._timestamp
      // 绘制时间相关的控件
      this.drawTime()
      this.countFloorTime(sectionData)

      // 绘制起始状态
      this.stop()
      this.start(firstData)

      // 进度条拖拽
      this.$nextTick(function() {
        // 绑定鼠标事件
        const $container = $(this.$el)
        const widthAll = $container.find('.bar-all').width()
        const $alreadyBar = $container.find('.js-bar-already')

        // window.onload = function () {
        // 1. 获取页面标签
        var mask = document.querySelector('.js-play-point') // bar.children[1]

        var bar_2 = document.querySelector('.progress-bar')

        let detTime = 0

        // 2. 监听鼠标拖拽事件
        mask.onmousedown = function(event) {
          //
          _vm.onPauseClick()
          detTime = _vm.endTime - _vm.startTime

          event = event || window.event

          // 2.1 求出初始值
          var initial = event.clientX - mask.offsetLeft

          document.onmousemove = function(event) {
            event = event || window.event

            // 2.2 求出走过的距离
            let distanceX = event.clientX - initial

            // 2.3 处理边界值
            if (distanceX < 0) {
              distanceX = 0
              // console.log('1 distanceX', distanceX)
            } else if (distanceX >= bar_2.offsetWidth - mask.offsetWidth) {
              distanceX = bar_2.offsetWidth - mask.offsetWidth
              // console.log('2 distanceX', distanceX)
            }
            // 2.3 赋值给小按钮
            // console.log('distanceX', distanceX)

            //
            // distanceX = distanceX - 15
            _vm.playPointLeft = distanceX
            _vm.setProgressBar(distanceX + 15)

            _vm.curTimeStr = _vm.getTimeStr(distanceX / widthAll * detTime + _vm.startTime)

            // mask.style.left = distanceX + 'px'
            // hang.style.width = distanceX + 'px'
            // 2.4 算出百分比
            // proValue.innerHTML = parseInt(distanceX / (bar.offsetWidth - mask.offsetWidth) * 100) + '%'

            return false
          }
          // 2.5 结束拖拽和移动事件
          document.onmouseup = function() {
            // 修改播放参数
            _vm.timeCount = $alreadyBar.width() / widthAll * detTime
            const timeNow = _vm.timeCount + _vm.startTime
            _vm.sectionData.forEach((d, i) => {
              if (d.startStamp <= timeNow && timeNow <= d.endStamp) {
                _vm.sectionIndex = i
              }
            })

            document.onmousemove = null
            document.onmouseup = null
          }
          return false
        }
        // }

        // let $body = $(this.$el.querySelector('.progress-bar'))
        // $body.on('mousedown', function (evt) {
        //   console.log('mousedown')
        //   $body.on('mouseup mousemove', function handler (evt) {
        //     if (evt.type === 'mouseup') {
        //       console.log('mouseup')
        //       // click
        //     } else {
        //       console.log('mousemove')
        //       _vm.playPointLeft = evt.offsetX - 5

        //       // _vm.playPointLeft = evt.clientX
        //       // drag
        //     }
        //     $body.off('mouseup mousemove', _vm.dargHandler)
        //   })
        // })
      })
    },
    fetchData() { },
    render() { },

    //
    onPlayClick() {
      if (!this.canPlay) {
        return
      }
      if (this.timeCount === 0) {
        if (!this.start()) return
      }
      this.play()
      this.canPlay = false
    },
    start(data) {
      // eslint-disable-next-line no-undef
      data || (data = _.first(this.data))
      // const $btn = this.$container.find('.js-play-btn.play')
      if (!data) {
        console.log('播放器数据为空！')
        // $btn.addClass('disabled')
        this.canPlay = false
        return false
      }
      this.canPlay = true
      // $btn.removeClass('disabled')

      this.timeCount = 1
      this.sectionIndex = 0
      // 绘制时间
      // this.$el.querySelector('.js-current-time').text()
      this.curTimeStr = this.getTimeStr(data._timestamp)
      this.setProgressBar(0)

      // 建筑设置
      const floorId = data.floorId
      const buildingNow = this.getBulidingObj(floorId, this.floorsData, this.buildingObj)

      // 展示航站楼
      buildingNow.show(floorId)
      buildingNow.switchFloor(floorId)
      const floorObj = (this.floorNow = buildingNow.getFloor(floorId))
      if (!floorObj) {
        console.log('没有找到对应楼层！', buildingNow, floorId)
        return false
      }
      // 绘制第一个节点的数据
      floorObj.setPos(data.x, data.y)
      floorObj.drawFootsteps([data])
      return true
    },

    stop() {
      // clearInterval(this.timer);
      // this.start();
      this.timeCount = 0
      this.onPauseClick()
      // this.$container
      //   .find('.js-play-btn')
      //   .filter('.pause')
      //   .trigger('click')
      // 修改人物
      this.floorNow && this.floorNow.changeDirection('none')
    },

    play() {
      const self = this
      const data = this.data
      const startTime = this.startTime
      const endTime = this.endTime
      const detTime = endTime - startTime
      // const $currentTime = this.$container.find('.js-current-time')
      const sectionData = this.sectionData
      let currentSection = sectionData[this.sectionIndex] || {}

      this.timer = setInterval(function() {
        const timeNow = startTime + self.timeCount
        // $currentTime.text(this.getTimeStr(timeNow))
        self.curTimeStr = self.getTimeStr(timeNow)
        self.setProgressBar((self.timeCount / detTime) * 100 + '%')

        const currentSectionData = currentSection.data || []
        // eslint-disable-next-line no-undef
        const iscurrentSectionEnd = _.last(currentSectionData)._timestamp < timeNow
        let dataCopy = []
        let isWalking = true
        if (iscurrentSectionEnd) {
          const nextSection = sectionData[self.sectionIndex + 1]
          if (nextSection && nextSection.startStamp <= timeNow) {
            self.sectionIndex++
            currentSection = nextSection
            // eslint-disable-next-line no-undef
            dataCopy.push(_.first(currentSection.data))
          } else {
            isWalking = false
          }
        }
        if (!iscurrentSectionEnd || !isWalking) {
          dataCopy = JSON.parse(
            JSON.stringify(
              currentSectionData.filter(function(d) {
                return d._timestamp <= timeNow
              })
            )
          )
        }
        // eslint-disable-next-line no-undef
        if (!_.isEmpty(dataCopy)) {
          // eslint-disable-next-line no-undef
          const lastData = _.last(dataCopy)
          const lastFloorId = lastData.floorId
          isWalking && (isWalking = !lastData._isTimeout)
          if (lastFloorId !== self.floorNow.id) {
            // 切换建筑和楼层
            const buildingNow = self.getBulidingObj(
              lastFloorId,
              self.floorsData,
              self.buildingObj
            )
            buildingNow.show(lastFloorId)
            buildingNow.switchFloor(lastFloorId)
            //
            self.$emit('switchBuildNav', buildingNow.name)
            self.$emit('switchFloorNav', buildingNow.name, lastFloorId)
            self.floorNow = buildingNow.getFloor(lastFloorId) || {}
          }

          const floorObj = self.floorNow
          let nextData = lastData
          isWalking && (nextData = data[lastData._index + 1])
          nextData || (nextData = lastData)

          // 添加当前时间点的位置信息
          const detT = nextData._timestamp - lastData._timestamp
          const detX = nextData.x - lastData.x
          const detY = nextData.y - lastData.y
          const t = timeNow - lastData._timestamp
          const xx = lastData.x + (detT === 0 ? 0 : detX * (t / detT))
          const yy = lastData.y + (detT === 0 ? 0 : detY * (t / detT))
          dataCopy.push({
            x: xx,
            y: yy,
            timestamp: timeNow
          })
          floorObj.changeDirection(null, detX, detY)
          floorObj.setPos(xx, yy)

          // 拆分数据，分段绘制足迹
          const footsteps = []
          let temp = []
          // eslint-disable-next-line no-undef
          _.each(dataCopy, function(val) {
            temp.push(val)
            if (val._isTimeout) {
              footsteps.push(temp)
              temp = []
            }
          })
          footsteps.push(temp)
          floorObj.drawFootsteps(footsteps)
        }

        // 注意：不可以放在前面，加上时间间隔后可能漏掉最后一个点
        if (timeNow > endTime) {
          self.stop()
          return
        }
        // 设置时间间隔
        self.timeCount += BASE_TRACK_SPEED * self.speedValue
      }, 1)
    },

    setProgressBar(width) {
      // eslint-disable-next-line no-undef
      const $container = $(this.$el)
      const $alreadyBar = $container.find('.js-bar-already')
      const $point = $container.find('.js-play-point')
      $alreadyBar.width(width)
      $point.css('left', ($alreadyBar.width() - $point.width() / 2) + 'px')
    },

    drawTime() {
      // this.

      try {
        const $container = $(this.$el)
        const startTime = this.startTime
        const endTime = this.endTime
        // // 显示起止时间
        // $container.find('.js-start-time').text(getTimeStr(startTime));
        // $container.find('.js-end-time').text(getTimeStr(endTime));

        this.startTimeStr = this.getTimeStr(this.startTime)
        this.endTimeStr = this.getTimeStr(this.endTime)

        // // 绘制播放进度条
        // eslint-disable-next-line no-unused-vars
        const self = this
        const $pointWarp = $container.find('.js-floor-point-warp')
        // const POINT_HTML = '<div class="floor-point js-floor-point"></div>'
        const $stopWarp = $container.find('.js-bar-stop-warp')
        // const STOP_BAR_HTML = '<div class="js-bar-stop bar-stop"></div>'

        const sectionData = this.sectionData
        const scale = $pointWarp.width() / (endTime - startTime)

        $pointWarp.find('.js-floor-point').remove()
        $stopWarp.find('.js-bar-stop').remove()

        _.each(sectionData, function(section, sectionIndex) {
          // 绘制楼层切换记号点
          // const $point = $(POINT_HTML).appendTo($pointWarp)
          // $point.data($.extend({}, section, {
          //   rangeTimeStr: self.getTimeStr(section.startStamp) + ' - ' + self.getTimeStr(section.endStamp)
          // }))
          // $point.css('left', ((section.startStamp - startTime) * scale - $point.width() / 2) + 'px')

          // 楼层切换标记列表

          self.floorPointList.push({
            // left: ((section.startStamp - startTime) * scale - $point.width() / 2),
            left: ((section.startStamp - startTime) * scale - 15 / 2),
            startTimeStr: self.getTimeStr(section.startStamp),
            endTimeStr: self.getTimeStr(section.endStamp),
            floorName: section.floorName
          })

          // 停止标记
          const data = section.data
          const lastIndex = data.length - 1
          const nextSection = sectionData[sectionIndex + 1]
          _.each(data, function(step, stepIndex) {
            if (step._isTimeout || stepIndex === lastIndex) {
              // const $stop = $(STOP_BAR_HTML).appendTo($stopWarp)
              const nextStep = stepIndex === lastIndex
                ? (nextSection ? nextSection.data[0] : null)
                : data[stepIndex + 1]
              // $stop.css('left', ((step._timestamp - startTime) * scale) + 'px')
              // nextStep && ($stop.width((nextStep._timestamp - step._timestamp) * scale))

              self.stopBarList.push({
                left: ((step._timestamp - startTime) * scale),
                width: nextStep ? ((nextStep._timestamp - step._timestamp) * scale) : 0
              })
            }
          })
        })
      } catch (error) {
        console.error(error)
      }
    },

    onPauseClick() {
      if (this.canPlay) {
        return
      }
      this.canPlay = true
      this.pause()
    },
    pause() {
      clearInterval(this.timer)
    },

    /**
     * common
     */
    /**
     * 获取时间戳对应的时间，格式为 hh:mm:ss
     */
    getTimeStr(timestamp) {
      const curTime = new Date(timestamp)

      let sec = curTime.getSeconds()
      let hour = curTime.getHours()
      let min = curTime.getMinutes()
      min = min < 10 ? '0' + min : min
      sec %= 60
      sec = sec < 10 ? '0' + sec : sec
      hour = hour < 10 ? '0' + hour : hour

      return `${hour}:${min}:${sec}`
    },
    /**
     * 根据楼层 id 获取对应建筑对象
     */
    getBulidingObj(floorId, floorsData, buildingObj) {
      let result = null
      const floorItem = floorsData.find(d => d.floorId.toString() === floorId.toString())
      if (floorItem) {
        result = buildingObj.find(d => d.id.toString() === floorItem.buildingId.toString())
      }

      if (!result) {
        throw new Error(`没有找到对应建筑！, ${floorsData}, ${floorId}`)
      }

      return result
    },
    /**
     * 根据楼层 id 获取建筑和楼层名称
     */
    getFloorName(floorId) {
      const floor = this.floorsData.find(d => d.floorId.toString() === floorId.toString()) || {}
      return (floor.buildingName || '-') + ' ' + (floor.floorName || '-')
    },
    /**
     * 计算各楼层总时间
     * @param {*} sectionData
     */
    countFloorTime(sectionData) {
      const timeMap = {}
      sectionData.forEach(d => {
        const floorId = d.floorId
        timeMap[floorId] || (timeMap[floorId] = 0)
        timeMap[floorId] += d.endStamp - d.startStamp
      })

      this.buildingObj.forEach(d => {
        const curBuildDataItem = this.buildingData.filter(sub => sub.buildingId === d.id)[0]
        d.setNavTime(timeMap, curBuildDataItem)
      })
    },

    dargHandler() {
    }
  }
}
</script>
<style lang="scss">
@import "./wifi-style";

.wifi-player {
  /**
 * 播放器
 */

  /* 播放按钮 */
  .player-tools {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    background-color: #518ce9;
    .play-btn-group {
      display: inline-block;
      margin: 0 15px;
      vertical-align: top;
      > button {
        width: 26px;
        height: 26px;
        padding: 0;
        font-size: 12px;
        color: #81a8e9;
        background-color: #fff;
        border-radius: 50%;
        border: 2px solid #81a8e9;
        box-shadow: 2px 2px 3px rgba(100, 100, 100, 0.4);
        cursor: pointer;
        line-height: 24px\9\0;
      }
    }
    .speed-tools {
      display: inline-block;
    }
  }

  /*ie11*/

  @media all and (-ms-high-contrast: none) {
    *::-ms-backdrop,
    .player-tools .play-btn-group > button {
      margin-top: 6px;
      line-height: 24px;
    }
  }

  /*ie10 */

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .player-tools .play-btn-group > button {
      margin-top: 6px;
      line-height: 24px;
    }
  }

  .player-tools {
    .play-btn-group {
      > button {
        + {
          .play-btn-group {
            > button {
              margin-left: 5px;
            }
          }
        }
        &:not(.disabled) {
          &:hover {
            color: #fff;
            background-color: #518ce9;
            border-color: #fff;
          }
          &:active {
            background-color: rgba(204, 204, 204, 0.6);
          }
        }
      }
      > button.disabled {
        color: #ccc;
        border-color: rgba(220, 220, 220, 0.6);
        cursor: not-allowed;
      }
    }
    .time-info-warp {
      font-size: 12px;
      color: #fff;
      display: inline-block;
    }
    .time-info {
      display: inline-block;
      + {
        .time-info {
          position: relative;
          margin-left: 30px;
          &::before {
            content: "";
            position: absolute;
            top: 20%;
            left: -16px;
            height: 60%;
            width: 0;
            border-left: 1px solid rgba(255, 255, 255, 0.35);
          }
        }
      }
    }
    .speed-tools {
      float: right;
    }
  }

  @media screen and (max-width: 750px) {
    .player-tools {
      height: 60px;
      line-height: 60px;
      .time-info-warp {
        margin: 5px;
      }
      .time-info {
        display: block;
        line-height: 25px;
        + {
          .time-info {
            margin-left: 0;
            &::before {
              border: none;
            }
          }
        }
      }
    }
  }

  .player-tools {
    background: $mainBg;

    .js-current-time {
      font-size: 14px;
      line-height: 46px;
      letter-spacing: 1px;
      color: #ffffff;
    }

    .speed-tools {
      & > .el-select {
        width: 100px;
      }
    }
  }

  /* 进度条 */
  .progress-bar {
    position: absolute;
    top: -15px;
    left: 10px;
    right: 12px;
    height: 15px;
    .bar-all {
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: #a7c7f8;
      z-index: 1;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        width: 10px;
        height: 100%;
        left: -10px;
        background-color: #fbac36;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        width: 10px;
        height: 100%;
        right: -10px;
        background-color: #a7c7f8;
      }
    }
    .bar-already {
      position: absolute;
      height: 100%;
      width: 0;
      background-color: #fbac39;
      z-index: 2;
    }
    .bar-stop {
      position: absolute;
      height: 100%;
      background-color: rgba(101, 98, 98, 0.5);
      z-index: 3;
    }
    .play-point {
      position: absolute;
      height: 100%;
      top: -2px;
      left: -10px;
      width: 20px;
      height: 20px;
      background: #f00;
      background: -moz-radial-gradient(
        center,
        ellipse cover,
        #f00 0%,
        #f00 45%,
        rgba(255, 58, 58, 0.5) 46%,
        rgba(255, 58, 58, 0.2) 100%
      );
      background: -webkit-radial-gradient(
        center,
        ellipse cover,
        #f00 0%,
        #f00 45%,
        rgba(255, 58, 58, 0.5) 46%,
        rgba(255, 58, 58, 0.2) 100%
      );
      background: radial-gradient(
        ellipse at center,
        #f00 0%,
        #f00 45%,
        rgba(255, 58, 58, 0.5) 46%,
        rgba(255, 58, 58, 0.2) 100%
      );
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0000', endColorstr='#ff9191', GradientType=1);
      border-radius: 50%;
      z-index: 5;
      cursor: e-resize;
    }
    .floor-point {
      position: absolute;
      top: 0;
      left: -7.5px;
      width: 15px;
      height: 15px;
      background: #ff0;
      background: -moz-radial-gradient(
        center,
        ellipse cover,
        #ff0 0%,
        #ff0 25%,
        rgba(255, 255, 0, 0.3) 26%,
        rgba(255, 255, 0, 0) 100%
      );
      background: -webkit-radial-gradient(
        center,
        ellipse cover,
        #ff0 0%,
        #ff0 25%,
        rgba(255, 255, 0, 0.3) 26%,
        rgba(255, 255, 0, 0) 100%
      );
      background: radial-gradient(
        ellipse at center,
        #ff0 0%,
        #ff0 25%,
        rgba(255, 255, 0, 0.3) 26%,
        rgba(255, 255, 0, 0) 100%
      );
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffff00', endColorstr='#fdff93', GradientType=1);
      border-radius: 50%;
      z-index: 4;
      cursor: pointer;
    }
    .progress-tooltip {
      position: absolute;
      bottom: 15px;
      padding: 10px;
      background-color: rgba(37, 37, 41, 0.6);
      > p {
        margin: 0;
        line-height: 1.5em;
        font-size: 12px;
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>

