/**
 * 预算总收入
 */
export function totalBudgetRevenue() {
  return new Promise(resolve => {
    resolve({
      msg: 'success',
      code: 0,
      data: [
        {
          name: '一般公共预算总收入',
          data: [
            { name: '1月', value: 1906.0 },
            { name: '2月', value: 1651.0 },
            { name: '3月', value: 3031.0 },
            { name: '4月', value: 2398.0 },
            { name: '5月', value: 2649.0 },
            { name: '6月', value: 2160.0 },
            { name: '7月', value: 2935.0 },
            { name: '8月', value: 2649.0 },
            { name: '9月', value: 2160.0 },
            { name: '10月', value: 2935.0 },
            { name: '11月', value: 2965.0 },
            { name: '12月', value: 2649.0 }
          ]
        },
        {
          name: '地方一般公共预算总收入',
          data: [
            { name: '1月', value: 1906.0 },
            { name: '2月', value: 1651.0 },
            { name: '3月', value: 3031.0 },
            { name: '4月', value: 2398.0 },
            { name: '5月', value: 2649.0 },
            { name: '6月', value: 2160.0 },
            { name: '7月', value: 2935.0 },
            { name: '8月', value: 2649.0 },
            { name: '9月', value: 2160.0 },
            { name: '10月', value: 2935.0 },
            { name: '11月', value: 2965.0 },
            { name: '12月', value: 2649.0 }
          ]
        }
      ]
    })
  })
}

/**
 * 森林生态效益补偿基金 万元
 */
export function forestEcologicalFund() {
  // return request({
  //   url: '/home/care/socialPremiumNumber',
  //   method: 'get'
  // })

  return new Promise(resolve => {
    resolve({
      msg: 'success',
      code: 0,
      // 按年
      data: [
        {
          name: '马尾全区',
          data: [
            { name: '2017年', value: 8465.0 },
            { name: '2018年', value: 7513.0 }
          ]
        },
        {
          name: '亭江镇',
          data: [
            { name: '2017年', value: 0 },
            { name: '2018年', value: 457.2164 }
          ]
        },
        {
          name: '马尾镇',
          data: [{ name: '2017年', value: 0 }, { name: '2018年', value: 365 }]
        },
        {
          name: '琅岐镇',
          data: [{ name: '2017年', value: 0 }, { name: '2018年', value: 125 }]
        },
        {
          name: '罗星街道',
          data: [{ name: '2017年', value: 0 }, { name: '2018年', value: 648 }]
        }
      ]

      // // 按月
      // data: [
      //   {
      //     name: '马尾全区',
      //     data: [
      //       { name: '2017年1月', value: 356.0 },
      //       { name: '2017年2月', value: 985.0 },
      //       { name: '2017年3月', value: 625.0 },
      //       { name: '2017年4月', value: 486.0 },
      //       { name: '2017年5月', value: 985.0 },
      //       { name: '2017年6月', value: 7513.0 }
      //     ]
      //   },
      //   {
      //     name: '亭江镇',
      //     data: [
      //       { name: '2017年1月', value: 356.0 },
      //       { name: '2017年2月', value: 985.0 },
      //       { name: '2017年3月', value: 625.0 },
      //       { name: '2017年4月', value: 486.0 },
      //       { name: '2017年5月', value: 985.0 },
      //       { name: '2017年6月', value: 124.0 }
      //     ]
      //   },
      //   {
      //     name: '马尾镇',
      //     data: [
      //       { name: '2017年1月', value: 356.0 },
      //       { name: '2017年2月', value: 985.0 },
      //       { name: '2017年3月', value: 625.0 },
      //       { name: '2017年4月', value: 486.0 },
      //       { name: '2017年5月', value: 985.0 },
      //       { name: '2017年6月', value: 124.0 }
      //     ]
      //   },
      //   {
      //     name: '琅岐镇',
      //     data: [
      //       { name: '2017年1月', value: 356.0 },
      //       { name: '2017年2月', value: 985.0 },
      //       { name: '2017年3月', value: 625.0 },
      //       { name: '2017年4月', value: 486.0 },
      //       { name: '2017年5月', value: 985.0 },
      //       { name: '2017年6月', value: 124.0 }
      //     ]
      //   },
      //   {
      //     name: '罗星街道',
      //     data: [
      //       { name: '2017年1月', value: 356.0 },
      //       { name: '2017年2月', value: 985.0 },
      //       { name: '2017年3月', value: 625.0 },
      //       { name: '2017年4月', value: 486.0 },
      //       { name: '2017年5月', value: 985.0 },
      //       { name: '2017年6月', value: 124.0 }
      //     ]
      //   }
      // ]
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
          name: '一般公共预算总收入',
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
