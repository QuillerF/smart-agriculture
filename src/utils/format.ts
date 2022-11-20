import { round, isNaN, isUndefined, isNull, isArray } from 'lodash'
export declare interface instanceObject {
  [key: string]: string
}

export const cnUnitChar = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿', '万亿']

const skipUnitChars = ['', '万', '亿']

/**
 * 自动计算数字的量级
 * @param num 数字
 * @param floor 偏移量
 */
export function autoNumberLevel(num: number, floor = 0) {
  // 获取数字对应的绝对值
  let abs = round(Math.abs(num))
  // 需要对比的目标数字
  let index = 0
  let level = 0

  while (abs >= Math.pow(10, index * 4 + floor)) {
    level = index
    index++
  }
  return Math.pow(10, level * 4)
}

/**
 * s
 * @param str 需要转换的数字
 * @param round 四舍五入的位数
 * @param floor 对单位偏移的层数
 * @param space 非正常数字显示时显示的默认值
 */
export function automaticNumber(str: string | number, precision = 0, offset = 0, space = '--') {
  if (isNaN(Number(str)) || str === null || str === undefined) {
    return space
  }
  let num = Number(str)
  if (!isNumber(num)) {
    return space
  }
  // 获取量级
  const level = autoNumberLevel(num, offset)

  return round(num / level, precision)
}

/**
 * s
 * @param str 需要转换的数字
 * @param floor 对单位偏移的层数
 * @param space 非正常数字显示时显示的默认值
 */
export function automaticUnit(str: string | number, offset = 0, unit = '') {
  if (isNaN(Number(str)) || str === null || str === undefined) {
    return unit
  }
  let num = Number(str)
  if (!isNumber(num)) {
    return unit
  }
  // 获取量级
  const level = autoNumberLevel(num, offset)

  const index = (level.toString().length - 1) / 4

  return `${skipUnitChars[index]}${unit}`
}

/**
 * 验证当前变量是否是字符串
 * @param str 需要验证的字符串获取数字
 * @returns true 是数字 false 不是
 */
export function isNumber(str: string | number) {
  if (isNull(str) || isUndefined(str) || isArray(str)) {
    return false
  }

  const num = Number(str)
  if (isNaN(num)) {
    return false
  }
  return true
}

/**
 * 对数字进行四舍五入
 * @param str 数字或能转换为数字的字符串
 * @param floor 四舍五入的层级
 * @param nullValue 如果不是数字返回的字符串
 * @param unit 数字的单位
 * @returns 能显示的字符串
 */
export function toFixed(str: string | number, floor: number, nullValue: string = '--', unit: string = '') {
  if (isNaN(Number(str)) || str === null || str === undefined) {
    return nullValue
  }
  const num = Number(str)
  const floorNum = num % 1 !== 0 ? num.toFixed(floor) : num
  return isNaN(num) || isNull(str) ? nullValue : unit ? `${floorNum}${unit}` : Number(floorNum)
}

/**
 * 对数字进行四舍五入，并根据数值的大小，对其进行单位的转换
 * @param str 需要转换的数值
 * @param floor 需要替换的层数
 * @param nullValue 如果数值无效显示值
 * @param unit 单位
 * @returns 能显示的字符串
 */
export function toFixedAutoUnit(str: string | number, floor: number, nullValue: string = '--', unit: string = '') {
  const { value: selNum, unit: selUnit } = AutoUnit(str)

  return toFixed(selNum, floor, nullValue, `${selUnit}${unit}`)
}

/**
 * 对数字的位数进行 4个单位的减少
 * @param str 需要转换的数值
 * @returns value + unit
 */
export function AutoUnit(str: string | number) {
  let num = Number(str)
  let selUnit: string = ''
  let selNum = Number(str)
  const units = cnUnitChar.filter((unit, index) => index % 4 === 0)
  if (!isNaN(num)) {
    let index = 0
    while (num > Math.pow(10, index * 4)) {
      selNum = num / Math.pow(10, index * 4)
      selUnit = units[index]
      ++index
    }
  }

  return {
    value: selNum,
    unit: selUnit
  }
}

/**
 * 将数字转换出对应的逗号
 * @param str 需要转换的数字
 * @param nullValue 默认显示的空值
 * @param split 添加的符号
 * @param isMend 是否补0
 * @returns 返回添加 ， 的参数
 */
export function DotString(str: string | number, nullValue: string = '--', split = ',', isMend: Boolean = true) {
  if (isNaN(Number(str)) || str === null) {
    return nullValue
  }
  str = Number(str).toFixed(2)
  const int = parseInt(str.toString())
  const isNegative = Number(str) < 0
  const decimal = round(parseInt(str.toString()) - Number(str), 2)
  // 获取整数转换的字符串
  let numstr = Math.abs(int)
    .toString()
    .split('')
    .reverse()
    .reduce((con: string[], num: string, index) => {
      if (index % 3 === 0 && index !== 0 && num !== '-') {
        con.push(split)
      }
      con.push(num)
      return con
    }, [])
    .reverse()
    .join('')
  if (decimal !== 0) {
    const decimalstr = Math.abs(decimal).toString().replace(/^0/, '')
    numstr = `${isNegative ? '-' : ''}${numstr}${decimalstr}`
  }
  let isDot = numstr.split('.')
  let len
  if (isDot && isDot[1]) {
    len = isDot[1].length
  }
  if (len === 1) {
    numstr = `${numstr}0`
  }
  if (isDot && !isDot[1] && isMend) {
    numstr = `${numstr}.00`
  }
  if (decimal === 0 && Number(str) < 0) {
    numstr = `-${numstr}`
  }
  return numstr
}

/**
 * 超出隐藏
 * @param str 需要处理的字符串
 * @param num 保留长度
 * @param omit 默认的后缀
 * @returns
 */
export function textOverFlow(str: string, num: number, omit = '...') {
  return str.length > num ? `${str.slice(0, num)}${omit}` : str
}

/**
 * JSON转url参数
 * @param data Json格式数据
 * */
export const formatJsonToUrlParams = (data: instanceObject) => {
  typeof data === 'object'
    ? Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&')
    : ''
}

/**
 * 创建一个长度为n的数组
 * @param len 数字
 */
export function creatLenAry(len: number, unit: any) {
  if (unit) {
    return Array.from({ length: len }, (v, k) => k + 1 + unit)
  }
  return Array.from({ length: len }, (v, k) => k + 1)
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

export function formatNumber(val: any, isWan: any = false, isParseInt: any = false, isMend: Boolean = true) {
  let num = val
  if (isWan) {
    const flag = val - 10000 >= 0
    num = flag ? Number(val / 10000).toFixed(2) : Number(val).toFixed(2)
  }
  if (isParseInt) {
    num = Math.round(num)
  }
  return DotString(num, '--', ',', isMend)
}
// 升降序排列
// order A:升序 D：降序
export function sortByAscending(ary: any = [], key: string = '', order = 'A') {
  let sortAry = ary.sort((a: any, b: any) => {
    if (a[key] === b[key]) {
      return 0
    } else if (a[key] != 0 && !a[key]) {
      return 1
    } else if (b[key] != 0 && !b[key]) {
      return -1
    } else if (order === 'A') {
      return a[key] - b[key]
    } else {
      return b[key] - a[key]
    }
  })
  return sortAry
}

export default formatJsonToUrlParams
