/**
 * 根据对象的属性分组
 * @param {[]} list array
 * @param {String} props 分组字段
 */
export function groupBy(list, props) {
  return list.reduce((a, b) => {
    ;(a[b[props]] = a[b[props]] || []).push(b)
    return a
  }, {})
}
