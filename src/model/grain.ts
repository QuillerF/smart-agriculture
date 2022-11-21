import * as echarts from 'echarts'

const dataArr = [
  {
    value: 91,
    name: '存储量'
  }
]

const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  {
    offset: 0,
    color: '#2387ec' // 0% 处的颜色
  },
  {
    offset: 0.99,
    color: '#2ce7ad' // 100% 处的颜色
  },
  {
    offset: 1,
    color: '#aad7fc' // 100% 处的颜色
  }
])

const colorSet = [
  [0.91, color],
  [1, '#202e5c']
]

const rich = {
  title: {
    fontSize: 16,
    color: '#31e4ff',
    lineHeight: 30
  },
  value: {
    fontSize: 32,
    color: '#31e4ff',
    lineHeight: 40
  }
}
export const Option = {
  backgroundColor: 'transparent',
  series: [
    {
      type: 'gauge',
      radius: 95,
      center: ['50%', 121],
      startAngle: '225',
      endAngle: '-45',
      pointer: {
        show: false
      },
      detail: {
        formatter(value: number) {
          let num = Math.round(value)
          return `{title|存储量}\n{value|${num}}\n{title|万吨}`
        },
        rich,
        offsetCenter: [0, 0]
      },
      data: dataArr,
      title: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: colorSet,
          width: 30,
          opacity: 1
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    }
  ]
}
