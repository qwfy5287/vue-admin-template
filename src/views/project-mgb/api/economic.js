/**
 * 经济指标
 */

/**
 * 历年外资流动
 */
export function kpiForeign() {
  // return request({
  //   url: '/home/care/socialPremiumNumber',
  //   method: 'get'
  // })

  return new Promise(resolve => {
    resolve({
      msg: 'success',
      code: 0,
      data: [
        {
          name: '历年出口总额',
          data: [
            { name: '2014', value: 159.5028 },
            { name: '2015', value: 133.1888 },
            { name: '2016', value: 153.9521 },
            { name: '2017', value: 171.3251 },
            { name: '2018', value: 156.5 }
          ]
        },
        {
          name: '历年实际利用外资',
          data: [
            { name: '2014', value: 13.7462 },
            { name: '2015', value: 15.7467 },
            { name: '2016', value: 18.0988 },
            { name: '2017', value: 17.9669 },
            { name: '2018', value: 5.1709 }
          ]
        }
      ]
    })
  })
}

/**
 * 招商投资统计
 */
export function kpiInvestment() {
  // return request({
  //   url: '/home/care/socialPremiumNumber',
  //   method: 'get'
  // })

  return new Promise(resolve => {
    resolve({
      msg: 'success',
      code: 0,
      data: [
        {
          name: '项目数',
          data: [
            { name: '2月', value: 12.0 },
            { name: '3月', value: 13.0 },
            { name: '4月', value: 29.0 },
            { name: '5月', value: 17.0 },
            { name: '6月', value: 14.0 },
            { name: '7月', value: 21.0 },
            { name: '8月', value: 143.0 },
            { name: '9月', value: 12.0 },
            { name: '10月', value: 10.0 },
            { name: '11月', value: 5.0 }
          ]
        },
        {
          name: '投资额',
          data: [
            { name: '2月', value: 22999.0 },
            { name: '3月', value: 17766.0 },
            { name: '4月', value: 32851.0 },
            { name: '5月', value: 46857.0 },
            { name: '6月', value: 25457.0 },
            { name: '7月', value: 47310.0 },
            { name: '8月', value: 22207.0 },
            { name: '9月', value: 22948.0 },
            { name: '10月', value: 13954.0 },
            { name: '11月', value: 6815.0 }
          ]
        }
      ]
    })
  })
}

/**
 * 2018年1-9月财政收支
 */
export function financialRevenueExpenditure() {
  return new Promise(resolve => {
    resolve({
      msg: 'success',
      code: 0,
      data: [
        {
          name: '2018年1-9月财政收支',
          data: [
            { name: '全区财政总收入', value: 74.0 },
            { name: '地方级收入', value: 19.0 },
            { name: '中央级收入', value: 9.0 },
            { name: '政府性基金收入', value: 45.0 },
            { name: '财政总支出', value: 81.0 },
            { name: '一般公共预算支出', value: 34.0 },
            { name: '政府性基金预算支出', value: 47.0 }
          ]
        }
      ]
    })
  })
}

/**
 * 科创投入统计
 */
export function technologyInvestment() {
  return new Promise(resolve => {
    resolve({
      msg: 'success',
      code: 0,
      data: {
        total: 12000,
        data: [
          {
            name: '科创投入统计',
            data: [
              { name: '构建生态制度', value: 2301 },
              { name: '强化综合防控', value: 2000 },
              { name: '落实功能区划', value: 1800 },
              { name: '坚持转型升级', value: 1600 },
              { name: '探索共治共享', value: 1400 },
              { name: '加强人文建设', value: 1200 }
            ]
          }
        ]
      }
    })
  })
}
