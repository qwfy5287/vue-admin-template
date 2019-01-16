import request from '@/utils/request'

/**
 * 请求mac对应的日期数据
 * @param {*} mac
 * @param {*} date
 */
export function getTimeData(params) {
  // return request({
  //   url: 'http://192.168.22.202:18082/distinction/api/wifi/dates',
  //   method: 'get',
  //   params
  // })

  return new Promise(resolve => {
    resolve({
      list: [
        { year: '2016', monthAndDay: '12-12', date: '20161212' },
        { year: '2017', monthAndDay: '05-01', date: '20170501' },
        { year: '2017', monthAndDay: '05-03', date: '20170503' }
      ]
    })
  })
}

/**
 * 获取轨迹数据
 */
export function getData(params) {
  // return request({
  //   url: 'http://192.168.22.202:18082/distinction/api/wifi/details',
  //   method: 'get',
  //   params
  // })
  return new Promise(resolve => {
    resolve({
      list: [
        {
          floorId: '5877',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '0',
          y: '0',
          z: '0',
          apTime: '2017-05-01 10:00:00'
        },
        {
          floorId: '5877',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '0.1',
          y: '0.2',
          z: '0',
          apTime: '2017-05-01 10:01:00'
        },
        {
          floorId: '5877',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '0.1',
          y: '0',
          z: '0',
          apTime: '2017-05-01 10:03:00'
        },
        {
          floorId: '5877',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '0.2',
          y: '0.2',
          z: '0',
          apTime: '2017-05-01 10:04:00'
        },
        {
          floorId: '5877',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '0.2',
          y: '0',
          z: '0',
          apTime: '2017-05-01 10:05:00'
        },
        {
          floorId: '5877',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '0.3',
          y: '0.2',
          z: '0',
          apTime: '2017-05-01 10:07:30'
        },
        {
          floorId: '5877',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '0.3',
          y: '0',
          z: '0',
          apTime: '2017-05-01 10:08:00'
        },
        {
          floorId: '5877',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '0.4',
          y: '0.2',
          z: '0',
          apTime: '2017-05-01 10:09:00'
        },
        {
          floorId: '5878',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '1',
          y: '1',
          z: '0',
          apTime: '2017-05-01 10:10:00'
        },
        {
          floorId: '5878',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '1',
          y: '0.9',
          z: '0',
          apTime: '2017-05-01 10:11:00'
        },
        {
          floorId: '5878',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '0.8',
          y: '0.8',
          z: '0',
          apTime: '2017-05-01 10:12:00'
        },
        {
          floorId: '5877',
          areaId: '27849',
          storeId: '27849',
          mac: 'mac1',
          x: '0.5',
          y: '0.5',
          z: '0',
          apTime: '2017-05-01 10:13:00'
        }
      ]
    })
  })
}

/**
 * 获取 楼层和建筑数据
 */
export function getFloors(params) {
  // return request({
  //   url: 'http://192.168.22.202:18082/distinction/api/floors',
  //   method: 'get',
  //   params
  // })
  return new Promise(resolve => {
    resolve({
      list: [
        {
          floorId: 5402,
          regionId: 150,
          buildingId: 1,
          floorName: '出发层',
          height: 90,
          width: 400,
          floorType: '商铺',
          mapUrl: 'xiamenjichangt4_1_chufaceng.svg',
          merchantId: 1,
          buildingName: 'T4'
        },
        {
          floorId: 5403,
          regionId: 150,
          buildingId: 1,
          floorName: '抵达层',
          height: 92,
          width: 363,
          floorType: '商铺',
          mapUrl: 'xiamenjichangt4_1_didaceng.svg',
          merchantId: 1,
          buildingName: 'T4'
        },
        {
          floorId: 5404,
          regionId: 150,
          buildingId: 1,
          floorName: '西指廊夹层',
          height: 51,
          width: 339,
          floorType: '商铺',
          mapUrl: 'xiamenjichangt4_1_zhilangjia.svg',
          merchantId: 1,
          buildingName: 'T4'
        },
        {
          floorId: 5405,
          regionId: 150,
          buildingId: 1,
          floorName: '西指廊一层',
          height: 300,
          width: 40,
          floorType: '商铺',
          mapUrl: 'xiamenjichangt4_1_zhilang1.svg',
          merchantId: 1,
          buildingName: 'T4'
        },
        {
          floorId: 5406,
          regionId: 150,
          buildingId: 1,
          floorName: '西指廊二层',
          height: 326,
          width: 106,
          floorType: '商铺',
          mapUrl: 'xiamenjichangt4_1_zhilang2.svg',
          merchantId: 1,
          buildingName: 'T4'
        },
        {
          floorId: 5407,
          regionId: 150,
          buildingId: 1,
          floorName: '主楼三层',
          height: 37,
          width: 135,
          floorType: '商铺',
          mapUrl: 'xiamenjichangt4_1_zhulou3.svg',
          merchantId: 1,
          buildingName: 'T4'
        },
        {
          floorId: 5408,
          regionId: 150,
          buildingId: 1,
          floorName: '地下室',
          height: 96,
          width: 325,
          floorType: '商铺',
          mapUrl: 'xiamenjichangt4_1_dixiashi.svg',
          merchantId: 1,
          buildingName: 'T4'
        },
        {
          floorId: 5875,
          regionId: 150,
          buildingId: 4954,
          floorName: '停车层',
          height: 174,
          width: 284,
          floorType: '停车层',
          mapUrl: 'xiamenT3_4954_5875.svg',
          merchantId: 1,
          buildingName: 'T3'
        },
        {
          floorId: 5876,
          regionId: 150,
          buildingId: 4954,
          floorName: '到达层',
          height: 102,
          width: 352,
          floorType: '到达层',
          mapUrl: 'xiamenT3_4954_5876.svg',
          merchantId: 1,
          buildingName: 'T3'
        },
        {
          floorId: 5877,
          regionId: 150,
          buildingId: 4954,
          floorName: '出发层',
          height: 138,
          width: 805,
          floorType: '出发层',
          mapUrl: 'xiamenT3_4954_5877.svg',
          merchantId: 1,
          buildingName: 'T3'
        },
        {
          floorId: 5878,
          regionId: 150,
          buildingId: 4954,
          floorName: '出发夹层',
          height: 133.8,
          width: 783.34,
          floorType: '出发夹层',
          mapUrl: 'xiamenT3_4954_5878.svg',
          merchantId: 1,
          buildingName: 'T3'
        }
      ]
    })
  })
}
