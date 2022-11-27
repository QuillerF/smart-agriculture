import * as echarts from 'echarts'
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
  grid: { right: 5, left: 20, bottom: 40 },
  tooltip: {},
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
      color: '#eeeeee'
    }
  },
  yAxis: {
    show: true,
    name: '占比(%)',
    min: 0,
    max: 100,
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
      name: '2021年',
      stack: 'year',
      type: 'bar',
      color: '#fdc81e',
      barWidth: 15,
      data: [30, 40, 20, 15, 14],
      label: {
        show: false,
        position: 'top',
        color: '#ffffff'
      },
      itemStyle: {
        color(params: { dataIndex: number }) {
          const colorList = ['#fdc81e', 'transparent']
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colorList[0] },
            { offset: 1, color: colorList[1] }
          ])
        }
      }
    },
    {
      name: '2022年',
      stack: 'year',
      color: '#22c6fc',
      type: 'bar',
      barWidth: 15,
      data: [10, 20, 15, 14, 15],
      label: {
        show: true,
        formatter: '+{c}%',
        position: 'top',
        color: '#ffffff'
      },
      itemStyle: {
        color() {
          const colorList = ['#22c6fc', 'transparent']
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colorList[0] },
            { offset: 1, color: colorList[1] }
          ])
        }
      }
    }
  ]
}
