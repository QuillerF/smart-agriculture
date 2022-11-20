// 数字显示逗号
import { isNaN } from 'lodash'
import { DotString as toDotString } from './format'

export function DotString(val: any, isWan: any = false, isParseInt: any = false, isMend: Boolean = true) {
  let num = val
  if (isNaN(Number(num)) || num === null || num === undefined || num === '') {
    return '--'
  }
  if (isWan) {
    const flag = val - 10000 >= 0
    num = flag ? Number(val / 10000).toFixed(2) : Number(val).toFixed(2)
  }
  if (isParseInt) {
    num = Math.round(num)
  }
  return toDotString(num, '--', ',', isMend)
}

export function formatText(val: any, isOn = false) {
  if (!isOn) {
    return ''
  }
  if (val === '' || val === null || val === undefined) {
    return ''
  }
  const flag = val - 10000 >= 0
  return flag ? '万' : ''
}
