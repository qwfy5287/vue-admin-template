/* eslint-disable no-undef */
// define(['d3', 'lodash'], function (d3, _) {

import * as d3 from 'd3'
// import * as _ from 'lodash'
// import * as $ from 'jquery'

const FLOOR_BG_PATH = './static/img/track/'

const ICON_PATH = FLOOR_BG_PATH
const IS_PERSON_ICON = true // 是否使用人物gif
const ICON_HEIGHT = IS_PERSON_ICON ? 56 : 40
const ICON_WIDTH = IS_PERSON_ICON ? 70 : 48

const PATH_STORKE_WIDTH = 3
const ARROW_DIS = 31.5 // 箭头间距

const DEFAULT_OPTS = {
  drawTrack: true,
  drawPerson: true,
  drawPoint: false,

  clickable: false,
  draggable: false,

  scaleMax: 10,
  scaleMin: 0.5
}

function subject(d) {
  return { x: 0, y: d3.event.y }
}

const FLOOR_DRAG_OBJ = d3
  .drag()
  // .subject(subject)
  // .origin(function() {
  //   const t = d3.select(this)
  //   const transform = d3.transform(t.attr('transform'))
  //   return {
  //     x: t.attr('x') + transform.translate[0],
  //     y: t.attr('y') + transform.translate[1]
  //   }
  // })
  .subject(function(d) {
    return d
  })
  .on('start', function() {
    // 防止zoom时节点无法拖动
    d3.event.sourceEvent.stopPropagation()
    d3.select(this).classed('dragging', true)
  })
  .on('drag', function dragmove(d) {
    const t = d3.select(this)
    const transform = d3.transform(t.attr('transform'))
    d3.select(this).attr('transform', function(d, i) {
      return (
        'translate(' +
        [d3.event.x, d3.event.y] +
        ')scale(' +
        transform.scale[0] +
        ')'
      )
    })
  })
  .on('end', function() {
    d3.select(this).classed('dragging', false)
  })

/**
 * 建筑
 * @param {*} opts
 */
function Building(opts, d3_container) {
  opts = $.extend(true, {}, DEFAULT_OPTS, opts)

  this.opts = opts
  this.id = opts.buildingId
  this.name = opts.buildingName || '-'
  this.d3_container = d3_container
    .append('g')
    .attr('id', 'wifi-building-' + this.id)
    .attr('class', 'js-building-container hidden')

  this.floor = {}
  this.personIcon = {}

  this.scale = 1

  // 绘制楼层、楼层导航
  this.draw(opts.floorOpts)

  opts.scale && this.setScale(opts.scale)

  if (opts.isShow) {
    const floorShow =
      _.find(opts.floorOpts, function(d) {
        return d.isShow
      }) || {}
    this.show(floorShow.floorId, floorShow.buildingName)
  }

  // 绑定点击切换事件
  if (opts.clickable) {
    this.bindClickAction()
  }
}

Building.prototype.draw = function(floorOpts) {
  if (floorOpts.length <= 0) {
    console.info(this.name + ' 缺少楼层地图信息！')
    return
  }

  // 添加楼层和人物容器，创建楼层对象
  const self = this
  const buildingOpt = this.opts
  const d3_container = this.d3_container
  d3_container.append('g').attr('class', 'js-floor-container')
  d3_container.append('g').attr('class', 'js-person-container')
  _.each(floorOpts, function(opts) {
    opts.drawTrack === undefined && (opts.drawTrack = buildingOpt.drawTrack)
    opts.drawPerson === undefined && (opts.drawPerson = buildingOpt.drawPerson)
    opts.drawPoint === undefined && (opts.drawPoint = buildingOpt.drawPoint)
    opts.draggable === undefined && (opts.draggable = buildingOpt.draggable)
    self.floor[opts.floorId] = new Floor(d3_container, opts)
  })

  // 绘制楼层导航
  this.drawNavs(floorOpts)
}

/**
 * 绘制楼层导航
 */
Building.prototype.drawNavs = function(floorOpts) {
  const tab = d3
    .select('.js-building-nav')
    .append('button')
    .attr('id', 'building-nav-' + this.id)
    .attr('class', 'js-building-nav-btn btn building-btn')
    .text(this.name)
  const ul = d3
    .select('.js-floor-nav-list')
    .append('ul')
    .attr('class', 'js-floor-nav floor-tabs hidden')
  const li = ul
    .selectAll('li')
    .data(floorOpts)
    .enter()
    .append('li')
  li.append('span')
    .attr('class', 'floor-title')
    .text(function(d) {
      return d.floorName
    })
  li.append('span').attr('class', 'floor-time js-floor-time')

  this.d3_nav_title = tab
  this.d3_nav_list = ul
}

Building.prototype.setNavTime = function(timeMap, curbuildDataItem) {
  this.d3_nav_list
    .selectAll('li')
    .classed('disabled', function(d) {
      return timeMap[d.floorId] === undefined
    })
    .selectAll('.js-floor-time')
    .text(function(d) {
      if (timeMap[d.floorId] !== undefined) {
        let sec = timeMap[d.floorId] / 1000
        let hour = Math.floor(sec / 3600)
        let min = Math.floor((sec % 3600) / 60)
        min = min < 10 ? '0' + min : min
        sec %= 60
        sec = sec < 10 ? '0' + sec : sec
        hour = hour < 10 ? '0' + hour : hour
        return hour + ':' + min + ':' + sec
      }
      return ''
    })

  //
  curbuildDataItem.floorOpts.forEach(d => {
    d['disabled'] = timeMap[d.floorId] === undefined

    if (timeMap[d.floorId] !== undefined) {
      let sec = timeMap[d.floorId] / 1000
      let hour = Math.floor(sec / 3600)
      let min = Math.floor((sec % 3600) / 60)
      min = min < 10 ? '0' + min : min
      sec %= 60
      sec = sec < 10 ? '0' + sec : sec
      hour = hour < 10 ? '0' + hour : hour
      d['timeStr'] = hour + ':' + min + ':' + sec
    } else {
      d['timeStr'] = ''
    }
  })
}

/**
 * 设置缩放比例
 */
Building.prototype.setScale = function(scale) {
  if (scale > this.opts.scaleMax || scale < this.opts.scaleMin) return false
  this.scale = scale
  _.each(this.floor, function(floor) {
    floor.setScale(scale)
  })
  return true
}

Building.prototype.showNav = function() {
  // debugger
  d3.selectAll('.js-building-nav-btn').classed('active', false)
  this.d3_nav_title.classed('active', true)
  d3.selectAll('.js-floor-nav').classed('hidden', true)
  this.d3_nav_list.classed('hidden', false)
}

/**
 * 展示建筑
 * @param floorId 可缺省，用于切换楼层
 */
Building.prototype.show = function(floorId, buildingName) {
  // debugger
  if (this.d3_container.classed('hidden')) {
    d3.selectAll('.js-building-container').classed('hidden', true)
    this.d3_container.classed('hidden', false)
    this.showNav()
  }

  // buildingName&&

  floorId && this.switchFloor(floorId)
}

Building.prototype.getFloor = function(floorId) {
  if (!this.floor) return null
  return this.floor[floorId]
}

/**
 * 切换楼层
 */
Building.prototype.switchFloor = function(floorId) {
  if (!floorId) return

  // 切换导航状态
  d3.selectAll('.js-floor-nav li.active').classed('active', false)
  this.d3_nav_list.selectAll('li').classed('active', function(d) {
    return d.floorId === floorId
  })

  // 切换楼层
  if (this.activeFloorId === floorId) return
  this.activeFloorId = floorId
  const floor = this.getFloor(floorId)
  floor && floor.show()
}

/**
 * 绑定鼠标点击切换事件
 */
Building.prototype.bindClickAction = function() {
  const self = this
  // 添加鼠标样式
  this.d3_nav_title.classed('clickable', true)
  this.d3_nav_list.classed('clickable', true)

  // 建筑切换
  this.d3_nav_title.on('click', function() {
    const $this = $(this)
    if ($this.hasClass('active') || $this.hasClass('disabled')) return
    self.showNav()
  })
  // 楼层切换
  this.d3_nav_list.selectAll('li').on('click', function() {
    const $this = $(this)
    if ($this.hasClass('active') || $this.hasClass('disabled')) return
    let data = d3.select(this).data() || []
    data = data[0] || {}
    self.show(data.floorId)
  })
}

/**
 * 楼层
 * @param {*} opts
 */
function Floor(d3_floor, opts) {
  this.opts = opts
  this.id = opts.floorId

  const w = opts.width
  const h = opts.height
  this.width = w
  this.height = h
  this.posX = w / 2
  this.posY = h / 2
  this.scale = 1
  this.d3_warp = d3_floor
  this.d3_container = this.d3_warp
    .select('.js-floor-container')
    .append('g')
    .datum(opts)
    .attr('id', 'floor-' + this.id)
    .attr('class', 'js-floor-group')
    .attr('transform', 'translate(' + -this.posX + ',' + -this.posY + ')')
    .classed('hidden', !this.isShow)

  this.d3_bg = null
  this.drawBackground()

  this.xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, w])
  this.yScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, h])

  // 足迹
  if (opts.drawTrack) {
    this.d3_footsteps = null
    this.initFootsteps()
  }

  // 人物
  if (opts.drawPerson) {
    this.walkDirection = null
    this.personIcon = null
    this.initPersonIcon()
  }

  // 拖拽
  if (opts.draggable) {
    this.d3_container.call(FLOOR_DRAG_OBJ)
  }

  // 设置背景颜色
  // var bgColor = FLOOR_BG_COLOR[floorBgColorIndex];
  // if (!bgColor) {
  //     var colorLen = FLOOR_BG_COLOR.length;
  //     floorBgColorIndex = floorBgColorIndex - colorLen;
  //     bgColor = FLOOR_BG_COLOR[floorBgColorIndex];
  // }
  // floorBgColorIndex++;
  // this.bgColor = bgColor;
}

/**
 * 设置缩放比例
 */
Floor.prototype.setScale = function(scale) {
  this.scale = scale
  this.setPos(null, null, scale)
  if (this.opts.drawTrack) {
    this.d3_footsteps
      .selectAll('.js-step')
      .attr('stroke-width', PATH_STORKE_WIDTH / scale)
  }
}

/**
 * 设置位移
 */
Floor.prototype.setPos = function(x, y, scale) {
  if (x || x === 0) {
    this.posX = this.width * x
  }
  if (y || y === 0) {
    this.posY = this.height * y
  }
  !scale && (scale = this.scale)
  this.d3_container.attr(
    'transform',
    'translate(' +
      -this.posX * scale +
      ',' +
      -this.posY * scale +
      ')scale(' +
      scale +
      ')'
  )
}

/**
 * 楼层底图
 */
Floor.prototype.drawBackground = function() {
  const opts = this.opts
  const w = this.width
  const h = this.height

  this.d3_bg = this.d3_container.append('g').attr('class', 'floor-bg')

  this.d3_bg
    .append('image')
    .attr('onerror', 'notFindfloorMap()')
    .attr('href', FLOOR_BG_PATH + opts.mapUrl)
    .attr('width', w)
    .attr('height', h)

  // this.d3_bg.append('path')
  //     .attr('d', function (d) {
  //         return d.mainPath;
  //     })
  //     .attr('fill', '#fff')
  //     .attr('stroke-width', '1')
  //     .attr('stroke', '#aaa');

  // this.d3_bg.each(function (d) {
  //     var group = d3.select(this);
  //     if (d.others) {
  //         d.others.forEach(function (item) {
  //             var tag = group.append(item.tag);
  //             item.attr.forEach(function (attribute) {
  //                 tag.attr(attribute.key, attribute.value);
  //             })
  //         })
  //     }
  // });
}

/**
 * 人物
 */
Floor.prototype.initPersonIcon = function(centerX, centerY) {
  const floorId = this.id
  this.personIcon = this.d3_warp
    .select('.js-person-container')
    .append('image')
    .attr('id', 'person-icon-floor-' + floorId)
    .attr('class', 'js-person-icon hidden')
    .attr('width', ICON_WIDTH)
    .attr('height', ICON_HEIGHT)
    .attr('x', -ICON_WIDTH / 2)
  if (IS_PERSON_ICON) {
    this.personIcon.attr('y', -ICON_HEIGHT + 5)
  } else {
    this.personIcon
      .attr('y', -ICON_HEIGHT / 2)
      .attr('transform', 'rotate(-45)')
      .attr('opacity', '.8')
  }
  this.changeDirection('none')
}

/**
 * 切换人物方向
 */
Floor.prototype.changeDirection = function(direction, detX, detY) {
  if (IS_PERSON_ICON) {
    if (!direction) {
      direction = 'none'

      if (detX || detY) {
        const angle = Math.atan2(
          (detY || 0) * this.height,
          (detX || 0) * this.width
        )
        const abs = Math.abs(angle)
        // PI = Math.PI,
        // let direction = 'none'
        if (abs <= 0.7853981633974483) {
          // PI * 0.25
          direction = 'right'
        } else if (abs >= 2.356194490192345) {
          // PI * 0.7
          direction = 'left'
        } else {
          if (angle > 0) {
            direction = 'front'
          } else {
            direction = 'back'
          }
        }
      }
    }
    if (direction === this.walkDirection) return
    this.walkDirection = direction

    this.personIcon.attr('xlink:href', ICON_PATH + 'walk-' + direction + '.gif')
  } else {
    this.personIcon.attr('xlink:href', ICON_PATH + 'arrow.png')
    if (detX !== undefined && detY !== undefined) {
      const angle = Math.atan2(detY * this.height, detX * this.width)
      this.personIcon.attr(
        'transform',
        'rotate(' + ((angle / Math.PI) * 180 + 45) + ')'
      )
    }
  }
}

/**
 * 足迹
 */
Floor.prototype.initFootsteps = function() {
  this.d3_footsteps = this.d3_container
    .append('g')
    .attr('class', 'floor-footsteps')
  this.d3_footsteps.append('g').attr('class', 'js-step-container')
  this.d3_footsteps.append('g').attr('class', 'js-arrow-container')

  const x = this.xScale
  const y = this.yScale
  this.lineScaleFn = d3
    .line()
    // .interpolate("linear")
    .x(function(d) {
      return x(d.x)
    })
    .y(function(d) {
      return y(d.y)
    })
}

Floor.prototype.drawFootsteps = function(pathData) {
  if (!pathData) return
  if (!_.isArray(_.first(pathData))) pathData = [pathData]
  // const self = this
  const d3_step_container = this.d3_footsteps.select('g.js-step-container')
  d3_step_container.selectAll('.js-step').remove()
  d3_step_container
    .selectAll('path')
    .data(pathData)
    .enter()
    .append('path')
    .attr('class', 'js-step')
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-dasharray', '1,2.5')
    .attr('stroke-opacity', 0.65)
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', PATH_STORKE_WIDTH / this.scale)
  d3_step_container.selectAll('.js-step').attr('d', this.lineScaleFn)

  // 箭头
  const arrowData = []
  const w = this.width
  const h = this.height
  let disLast = 0
  _.each(pathData, function(arr) {
    _.each(_.initial(arr), function(d, i) {
      const x1 = d.x * w
      const y1 = d.y * h
      const detX = arr[i + 1].x * w - x1
      const detY = arr[i + 1].y * h - y1
      if (detX === 0 && detY === 0) {
        return
      }
      const distance = Math.sqrt(Math.pow(detX, 2) + Math.pow(detY, 2))
      const disSum = disLast + distance
      if (disSum >= ARROW_DIS) {
        const n = disSum / ARROW_DIS
        let xA = x1
        let yA = y1
        const angle = Math.atan2(detY, detX)
        for (let index = 1; index < n; index++) {
          const dis = index === 1 && i !== 0 ? ARROW_DIS - disLast : ARROW_DIS
          xA = detX === 0 ? xA : (detX / distance) * dis + xA
          yA = detY === 0 ? yA : (detY / distance) * dis + yA
          // 添加箭头数据
          arrowData.push({
            x: xA,
            y: yA,
            angle: angle
          })
        }
      }
      disLast = disSum % ARROW_DIS
    })
  })

  this.d3_footsteps.selectAll('.js-step-arrows').remove()
  this.d3_footsteps
    .select('g.js-arrow-container')
    .selectAll('path')
    .data(arrowData)
    .enter()
    .append('path')
    .classed('js-step-arrows', true)
    .attr('fill', 'red')
    .attr('stroke', 'red')
    .attr('stroke-width', 0)
    .attr('fill-opacity', 0.65)
    .attr('d', 'M-3.5 -1L0 0L-3.5 1z')
    .attr('transform', function(d, i) {
      const x = d.x
      const y = d.y
      return (
        'rotate(' +
        (d.angle / Math.PI) * 180 +
        ',' +
        x +
        ',' +
        y +
        ')' +
        'translate(' +
        x +
        ',' +
        y +
        ')'
      )
    })
}

/**
 * 热力配色
 */
// const colorScale = d3.interpolate(
//   d3.rgb(0, 0, 255),
//   d3.rgb(0, 255, 255),
//   d3.rgb(0, 255, 0),
//   d3.rgb(255, 255, 0),
//   d3.rgb(255, 0, 0)
// )
Floor.prototype.drawPoint = function(pointList, maxR, maxVal, minVal) {
  if (!this.d3_point_container) {
    this.d3_point_container = this.d3_container
      .append('g')
      .attr('class', 'floor-point-container')
  }

  const xScale = this.xScale
  const yScale = this.yScale
  // this.lineScaleFn = d3.svg
  //     .line()
  //     // .interpolate("linear")
  //     .x(function (d) {
  //         return x(d.x);
  //     })
  //     .y(function (d) {
  //         return y(d.y);
  //     });
  const rScale = d3
    .scaleLinear()
    .domain([0, maxR])
    .range([0.5, 2.5])
  // var valrScale = d3.scale.linear()
  //     .domain([minVal, maxVal])
  //     .range([0, 1]);

  // 绘制
  const d3_point_container = this.d3_point_container
  d3_point_container.selectAll('.js-point').remove()
  d3_point_container
    .selectAll('.js-point')
    .data(pointList)
    .enter()
    .append('circle')
    .attr('class', 'js-point probe-point')
    .attr('cx', function(d) {
      return xScale(d.x)
    })
    .attr('cy', function(d) {
      return yScale(d.y)
    })
    .attr('r', function(d) {
      return rScale(d.r)
    })
    .attr('fill', function(d) {
      return '#ff0000'
      // return colorScale(valrScale(d.val));
    })
    .attr('stroke', 'black')
    .attr('stroke-width', 0.35)
    .attr('fill-opacity', 0.6)

  d3_point_container.selectAll('.js-point-bg').remove()
  const d3_point = d3_point_container
    .selectAll('.js-point-bg')
    .data(pointList)
    .enter()
    .append('circle')
    .attr('class', 'js-point-bg')
    .attr('cx', function(d) {
      return xScale(d.x)
    })
    .attr('cy', function(d) {
      return yScale(d.y)
    })
    .attr('r', function(d) {
      return rScale(d.r) + 1
    })
    .attr('fill', function(d) {
      return 'rgba(0,0,0,0)'
    })
  return d3_point
}

/**
 * 楼层区块
 */
Floor.prototype.areaClolors = {
  // 'erea0': '#b1d452',
  // 'erea1': '#f29d64',
  // 'erea2': '#7fa6c5',
  // 'erea3': '#aa68a8',
  erea0: '#eee',
  erea1: '#7fa6c5',
  erea2: '#7fa6c5',
  erea3: '#7fa6c5',
  visitedColor: '#aa68a8'
}

Floor.prototype.drawArea = function(url) {
  const self = this
  const areaClolors = this.areaClolors
  d3.json(url, function(areaJson) {
    self.json_area = areaJson
    // 先画一层
    var floorGroup = (self.d3_area = self.d3_bg
      .select('.js-floor-container')
      .append('g')
      .attr('id', 'floor-area-' + self.id)
      .attr('class', 'floor-area')
      .classed('hidden', !self.isShow))
    // 商铺
    var areaGroup = floorGroup.append('g').attr('class', 'area-group')

    var areaItem = areaGroup.selectAll('path.area').data(areaJson)
    areaItem
      .enter()
      .append('path')
      .attr('class', function(d) {
        return 'area areaid-' + d.id
      })
      .attr('d', function(d) {
        return d.path
      })
      .attr('stroke', 'rgba(255,255,255,.1)')
      .attr('stroke-width', 1)
      .attr('fill', function(d) {
        return areaClolors[d.type]
      })
  })
}

Floor.prototype.show = function() {
  this.d3_warp.selectAll('.js-floor-group').classed('hidden', true)
  this.d3_container.classed('hidden', false)
  // 切换人物
  if (this.opts.drawPerson) {
    this.d3_warp
      .select('.js-person-container')
      .selectAll('.js-person-icon')
      .classed('hidden', true)
    this.personIcon.classed('hidden', false)
  }
  // if (this.d3_area) {
  //     this.d3_area.selectAll('.floor-area').classed('hidden', true);
  //     this.d3_area.selectAll('#floor-area-' + this.id).classed('hidden', false);
  // }
}

window.notFindfloorMap = function() {
  d3.select(event.srcElement)
    .attr('onerror', null)
    .attr('href', FLOOR_BG_PATH + 'not-map.jpg')
    .attr('width', 100)
    .attr('height', 70)
}

/**
 * 获取当前显示的建筑对象
 */
function getBulidingNow(buildings) {
  return _.find(buildings, function(bd) {
    return !bd.d3_container.classed('hidden')
  })
}

/**
 * 获取当前显示的楼层对象
 */
function getFloorNow(buildings) {
  var buildingObj = getBulidingNow(buildings)
  if (!buildingObj) return null
  return buildingObj.getFloor(buildingObj.activeFloorId)
}

/**
 * 绑定拖拽事件
 */
function bindDrag(d3_svg, buildings) {
  var drag = d3
    .drag()
    .subject(subject)
    // .origin(function() {
    //   var floorObj = getFloorNow(buildings)
    //   if (!floorObj) return
    //   const floorContainer = floorObj.d3_container
    //   const transform = d3.transform(floorContainer.attr('transform'))
    //   return {
    //     x: floorContainer.attr('x') + transform.translate[0],
    //     y: floorContainer.attr('y') + transform.translate[1]
    //   }
    // })
    .on('dragstart', function() {
      // 防止zoom时节点无法拖动
      d3.event.sourceEvent.stopPropagation()
      d3.select(this).classed('dragging', true)
    })
    .on('drag', function dragmove(d) {
      var floorObj = getFloorNow(buildings)
      if (!floorObj) return
      var scale = floorObj.scale
      floorObj.posX = -d3.event.x / scale
      floorObj.posY = -d3.event.y / scale
      floorObj.d3_container.attr(
        'transform',
        'translate(' + [d3.event.x, d3.event.y] + ')scale(' + scale + ')'
      )
    })
    .on('dragend', function() {
      d3.select(this).classed('dragging', false)
    })
  d3_svg.call(drag)
}

/**
 * 绑定缩放事件
 */
function bindZoom(d3_svg, buildings) {
  const svgW = $(d3_svg.node()).width()
  const svgH = $(d3_svg.node()).height()
  const zoom = d3.behavior
    .zoom()
    .scaleExtent([0.1, 10])
    .on('zoomstart', function() {
      d3.event.sourceEvent.stopPropagation()
      if (!d3.select(this).classed('dragging')) {
        d3.select(this).classed('zoomming', true)
      }
    })
    .on('zoom', function() {
      if (!d3.select(this).classed('zoomming')) {
        return
      }
      // var buildingObj = getBulidingNow(buildings);
      // if (!buildingObj)
      //     return;
      // _.each(buildingObj.floor, function (floorObj) {
      var floorObj = getFloorNow(buildings)
      if (!floorObj) return
      // const floorContainer = floorObj.d3_container
      // const transform = d3.transform(floorContainer.attr('transform'))
      // const oldTranslate = transform.translate
      const newTranslate = d3.event.translate
      const newScale = d3.event.scale
      // console.log(floorObj.scale, newScale);
      // floorObj.scale = floorObj.scale*(newScale);
      floorObj.d3_container.attr(
        'transform',
        'translate(' +
          [newTranslate[0] - svgW / 2, newTranslate[1] - svgH / 2] +
          ')scale(' +
          floorObj.scale * newScale +
          ')'
      )
      // });
    })
    .on('zoomend', function() {
      d3.select(this).classed('zoomming', false)
    })

  d3_svg.call(zoom)

  // bindZoomBtn();
}

// eslint-disable-next-line no-unused-vars
function bindZoomBtn() {
  let scale = 1

  function zoomIn() {
    const svg = d3.select('body').select('svg')
    const container = svg.select('g')
    const h = svg.attr('height')
    const w = svg.attr('width')

    // Note: works only on the <g> element and not on the <svg> element
    // which is a common mistake
    scale = scale + 0.1
    container.attr(
      'transform',
      'translate(' +
        w / 2 +
        ', ' +
        h / 2 +
        ') ' +
        'scale(' +
        scale +
        ') ' +
        'translate(' +
        -w / 2 +
        ', ' +
        -h / 2 +
        ')'
    )
  }

  function zoomOut() {
    const svg = d3.select('body').select('svg')
    const container = svg.select('g')
    const h = svg.attr('height')
    const w = svg.attr('width')

    // Note: works only on the <g> element and not on the <svg> element
    // which is a common mistake
    scale = scale - 0.1
    container.attr(
      'transform',
      'translate(' +
        w / 2 +
        ', ' +
        h / 2 +
        ') ' +
        'scale(' +
        scale +
        ') ' +
        'translate(' +
        -w / 2 +
        ', ' +
        -h / 2 +
        ')'
    )
  }
  d3.select('#zoomin').on('click', zoomIn)
  d3.select('#zoomout').on('click', zoomOut)
}

export default {
  instance: function(opt, d3_container) {
    return new Building(opt, d3_container)
  },
  getMapInstance(opt, d3_container) {
    return new Building(opt, d3_container)
  },
  getBulidingNow: getBulidingNow,
  getFloorNow: getFloorNow,
  bindDrag: bindDrag,
  bindZoom: bindZoom
}
// });
