/**
 * 查询
 * @param {Object} queryData
 */
export function query(queryData) {
  return new Promise(resolve => {
    resolve({
      tableHead: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'gender'
        },
        {
          label: '身份证号码',
          prop: 'idCard'
        },
        {
          label: '籍贯',
          prop: 'birthPlace'
        },
        {
          label: '手机号',
          prop: 'tel'
        },
        {
          label: '航班号',
          prop: 'flightNo'
        },
        {
          label: '出行日期',
          prop: 'flightDate'
        },
        {
          label: '出行目的地',
          prop: 'flightDestination'
        },
        // {
        //   label: '年龄区间',
        //   prop: 'name'
        // },
        {
          label: 'MAC地址',
          prop: 'mac'
        }
      ],
      tableData: [
        {
          name: '张杰',
          gender: '男',
          idCard: '3502***3537',
          birthPlace: '厦门',
          tel: '18036246325',
          flightNo: 'T4250',
          flightDate: '2018.12.03',
          flightDestination: '北京',
          mac: '110.110.110.110'
        },
        {
          name: '张杰',
          gender: '男',
          idCard: '3502***3537',
          birthPlace: '厦门',
          tel: '18036246325',
          flightNo: 'T4250',
          flightDate: '2018.12.03',
          flightDestination: '北京',
          mac: '110.110.110.110'
        },
        {
          name: '张杰',
          gender: '男',
          idCard: '3502***3537',
          birthPlace: '厦门',
          tel: '18036246325',
          flightNo: 'T4250',
          flightDate: '2018.12.03',
          flightDestination: '北京',
          mac: '110.110.110.110'
        }
      ]
    })
  })
}
