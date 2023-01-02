import dayjs from 'dayjs'

import { cloneDeep } from 'lodash'

export enum CropTypeEnum {
  '玉米' = 1,
  '小麦' = 2
}

const Colors = [
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: '#fdc81e' // 0% 处的颜色
      },
      {
        offset: 1,
        color: 'transparent' // 100% 处的颜色
      }
    ],
    global: false // 缺省为 false
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: 'transparent' // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#fdc81e ' // 100% 处的颜色
      }
    ],
    global: false // 缺省为 false
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: '#22c6fc' // 0% 处的颜色
      },
      {
        offset: 1,
        color: 'transparent ' // 100% 处的颜色
      }
    ],
    global: false // 缺省为 false
  },
  {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: 'transparent' // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#22c6fc ' // 100% 处的颜色
      }
    ],
    global: false // 缺省为 false
  }
]

// 配置 收入增长
export const Option = {
  color: ['#1C86F1'],
  backgroundColor: '#030f30',
  legend: {
    show: true,
    textStyle: {
      color: '#ecf0ff'
    },
    itemHeight: 12,
    itemWidth: 12,
    right: 37,
    top: 22
  },
  grid: { right: 5, left: 10, bottom: 40, containLabel: true },
  tooltip: {
    valueFormatter: (value: any) => `${value}%`
  },
  xAxis: {
    type: 'category',
    data: ['小麦收入', '玉米收入', '水稻收入', '其他收入'],
    axisLine: {
      show: true,
      lineStyle: {
        color: '#314157'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#eeeeee',
      margin: 10
    }
  },
  yAxis: {
    show: true,
    name: '占比(%)',
    min(data: { min: number }) {
      return data.min < 0 ? data.min - 50 : 0
    },
    max(data: { max: number }) {
      return data.max < 30 || isNaN(data.max) ? 30 : null
    },
    nameTextStyle: {
      color: '#eee'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#314157'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#1a2843'
      }
    },
    axisLabel: {
      color: '#eee'
    }
  },
  series: [
    {
      name: `${dayjs().get('year') - 1}年`,
      stack: 'year',
      type: 'bar',
      color: '#fdc81e',
      barWidth: 15,
      data: [] as any,
      label: {
        show: false,
        position: 'top',
        color: '#ffffff'
      },
      itemStyle: {
        color(params: { value: number }) {
          return params.value < 0 ? Colors[1] : Colors[0]
        }
      }
    },
    {
      name: `${dayjs().get('year')}年`,
      stack: 'year',
      color: '#22c6fc',
      type: 'bar',
      barWidth: 15,
      data: [] as any,
      label: {
        show: true,
        formatter: (params: { value: number }) => `${params.value > 0 ? '+' : ''}${params.value}%`,
        position: 'top',
        color: '#ffffff'
      },
      itemStyle: {
        color(params: { value: number }) {
          return params.value < 0 ? Colors[3] : Colors[2]
        }
      }
    }
  ]
}

export const ProjectOption = {
  color: ['#1C86F1'],
  backgroundColor: '#030f30',
  legend: {
    show: true,
    textStyle: {
      color: '#ecf0ff'
    },
    itemHeight: 12,
    itemWidth: 12,
    right: 37,
    top: 22
  },
  grid: { right: 5, left: 10, bottom: 40, containLabel: true },
  tooltip: {
    valueFormatter: (value: any) => `${value}元`
  },
  xAxis: {
    type: 'category',
    data: ['2019', '2020', '2021', '2022'],
    axisLine: {
      show: true,
      lineStyle: {
        color: '#314157'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#eeeeee'
    }
  },
  yAxis: {
    show: true,
    name: '价格(元)',
    min(data: { min: number }) {
      return data.min < 0 ? null : 0
    },
    max: (data: { max: number }) => (data.max < 3 || isNaN(data.max) ? 3 : null),
    nameTextStyle: {
      color: '#eee'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#314157'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#1a2843'
      }
    },
    axisLabel: {
      color: '#eee'
    }
  },
  series: [
    {
      name: '小麦',
      type: 'bar',
      color: '#fdc81e',
      barWidth: 15,
      barGap: '70%',
      data: [] as any,
      label: {
        show: false,
        position: 'top',
        color: '#ffffff'
      },
      itemStyle: {
        color(params: { value: number }) {
          return params.value < 0 ? Colors[1] : Colors[0]
        }
      }
    },
    {
      name: '玉米',
      color: '#22c6fc',
      type: 'bar',
      barWidth: 15,
      barGap: '70%',
      data: [] as any,
      label: {
        show: false,
        formatter: '{c}元',
        position: 'top',
        color: '#ffffff'
      },
      itemStyle: {
        color(params: { value: number }) {
          return params.value < 0 ? Colors[3] : Colors[2]
        }
      }
    }
  ]
}
