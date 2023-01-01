import bingbao from '@/assets/svg/weather/bingbao.svg?component'
import lei from '@/assets/svg/weather/lei.svg?component'
import qing from '@/assets/svg/weather/qing.svg?component'
import shachen from '@/assets/svg/weather/shachen.svg?component'
import wu from '@/assets/svg/weather/wu.svg?component'
import xue from '@/assets/svg/weather/xue.svg?component'
import yin from '@/assets/svg/weather/yin.svg?component'
import yu from '@/assets/svg/weather/yu.svg?component'
import yun from '@/assets/svg/weather/yun.svg?component'

export enum WeeksEnum {
  '日' = 0,
  '一',
  '二',
  '三',
  '四',
  '五',
  '六'
}

export const WeatherImgs: Record<string, any> = {
  bingbao,
  lei,
  qing,
  shachen,
  wu,
  xue,
  yin,
  yu,
  yun
}
