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
